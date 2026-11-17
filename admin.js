/**
 * Faith's Furniture General Dealers - Dealer Admin Management Module
 * Real-time Inventory Tracker, Order Audit & Bespoke Request Manager
 */

const DealerAdmin = {
  activeTab: 'inventory',

  init() {
    this.setupListeners();
  },

  setupListeners() {
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminModal = document.getElementById('adminModal');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    const addProductForm = document.getElementById('addProductForm');

    if (adminToggleBtn) {
      adminToggleBtn.addEventListener('click', () => this.open());
    }

    if (closeAdminBtn && adminModal) {
      closeAdminBtn.addEventListener('click', () => adminModal.classList.remove('open'));
    }

    // Admin Tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.dataset.tab;
        this.renderCurrentTab();
      });
    });

    // Add Product Form Submit
    if (addProductForm) {
      addProductForm.addEventListener('submit', (e) => this.handleAddProduct(e));
    }
  },

  open() {
    const adminModal = document.getElementById('adminModal');
    if (!adminModal) return;
    this.updateStats();
    this.renderCurrentTab();
    adminModal.classList.add('open');
    lucide.createIcons();
  },

  updateStats() {
    const totalItems = state.products.length;
    const lowStockCount = state.products.filter(p => p.stockQty <= 3).length;
    
    // Inventory value in ZMW
    const inventoryValZMW = state.products.reduce((acc, p) => acc + (p.priceZMW * (p.stockQty || 1)), 0);
    
    // Orders count
    const savedOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');

    const statTotalProducts = document.getElementById('statTotalProducts');
    const statInventoryVal = document.getElementById('statInventoryVal');
    const statLowStock = document.getElementById('statLowStock');
    const statTotalOrders = document.getElementById('statTotalOrders');

    if (statTotalProducts) statTotalProducts.textContent = totalItems;
    if (statInventoryVal) statInventoryVal.textContent = formatPrice(inventoryValZMW);
    if (statLowStock) statLowStock.textContent = lowStockCount;
    if (statTotalOrders) statTotalOrders.textContent = savedOrders.length;
  },

  renderCurrentTab() {
    const inventoryView = document.getElementById('adminInventoryView');
    const addProductView = document.getElementById('adminAddProductView');
    const ordersView = document.getElementById('adminOrdersView');

    if (!inventoryView || !addProductView || !ordersView) return;

    inventoryView.style.display = this.activeTab === 'inventory' ? 'block' : 'none';
    addProductView.style.display = this.activeTab === 'add-product' ? 'block' : 'none';
    ordersView.style.display = this.activeTab === 'orders' ? 'block' : 'none';

    if (this.activeTab === 'inventory') {
      this.renderInventoryTable();
    } else if (this.activeTab === 'orders') {
      this.renderOrdersTable();
    }
    lucide.createIcons();
  },

  renderInventoryTable() {
    const tbody = document.getElementById('adminInventoryTbody');
    if (!tbody) return;

    tbody.innerHTML = state.products.map(p => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${p.primaryImage}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;">
            <div>
              <strong style="color: var(--wood-900); display: block;">${p.name}</strong>
              <small style="color: var(--text-muted); font-size: 0.75rem;">ID: ${p.id}</small>
            </div>
          </div>
        </td>
        <td><span style="font-size: 0.8rem; background: var(--cream-100); padding: 2px 8px; border-radius: 4px;">${p.categoryName}</span></td>
        <td><strong>${formatPrice(p.priceZMW)}</strong></td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <button class="qty-btn" onclick="DealerAdmin.adjustStock('${p.id}', -1)" style="border: 1px solid #ccc; width: 22px; height: 22px; border-radius: 4px;">-</button>
            <span style="font-weight: 700; min-width: 20px; text-align: center; color: ${p.stockQty <= 3 ? '#b91c1c' : '#15803d'};">
              ${p.stockQty || 0}
            </span>
            <button class="qty-btn" onclick="DealerAdmin.adjustStock('${p.id}', 1)" style="border: 1px solid #ccc; width: 22px; height: 22px; border-radius: 4px;">+</button>
          </div>
        </td>
        <td>
          <span style="font-size: 0.75rem; font-weight: 700; color: ${p.inStock ? '#15803d' : '#b91c1c'};">
            ${p.inStock ? 'Available' : 'Out of Stock'}
          </span>
        </td>
        <td>
          <button onclick="DealerAdmin.deleteProduct('${p.id}')" title="Delete Product" style="color: #b91c1c; padding: 4px 8px; font-size: 0.8rem; font-weight: 600;">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderOrdersTable() {
    const tbody = document.getElementById('adminOrdersTbody');
    if (!tbody) return;

    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    if (orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No customer orders received yet. Test by submitting a checkout order!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = orders.map(ord => `
      <tr>
        <td><strong>#${ord.orderId}</strong></td>
        <td>${ord.date}</td>
        <td>
          <strong>${ord.customer.name}</strong><br>
          <small style="color: var(--text-muted);">${ord.customer.phone} (${ord.customer.city})</small>
        </td>
        <td>${ord.items.length} Item(s)</td>
        <td><strong>${formatPrice(ord.totalZMW)}</strong></td>
        <td>
          <span style="font-size: 0.75rem; background: var(--gold-100); color: var(--gold-600); font-weight: 700; padding: 3px 8px; border-radius: 4px;">
            ${ord.status}
          </span>
        </td>
      </tr>
    `).join('');
  },

  adjustStock(productId, delta) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    product.stockQty = Math.max(0, (product.stockQty || 0) + delta);
    product.inStock = product.stockQty > 0;

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    this.updateStats();
    this.renderInventoryTable();
    renderProducts();
    showToast(`Stock updated for ${product.name}`);
  },

  deleteProduct(productId) {
    if (!confirm("Are you sure you want to remove this item from the dealer showroom catalog?")) return;

    state.products = state.products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    this.updateStats();
    this.renderInventoryTable();
    renderProducts();
    showToast('Product removed from catalog');
  },

  handleAddProduct(e) {
    e.preventDefault();

    const name = document.getElementById('newProdName').value;
    const category = document.getElementById('newProdCategory').value;
    const priceZMW = Number(document.getElementById('newProdPrice').value);
    const material = document.getElementById('newProdMaterial').value;
    const stockQty = Number(document.getElementById('newProdStock').value);
    const imageUrl = document.getElementById('newProdImage').value || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
    const description = document.getElementById('newProdDesc').value;

    const categoryNames = {
      living: 'Living Room',
      dining: 'Dining Room',
      bedroom: 'Bedroom',
      office: 'Executive Office',
      outdoor: 'Outdoor & Patio'
    };

    const newProduct = {
      id: 'ff-' + Date.now().toString().slice(-4),
      name,
      category,
      categoryName: categoryNames[category] || 'Showroom Spec',
      priceZMW,
      priceUSD: Math.round(priceZMW / state.exchangeRate),
      rating: 5.0,
      reviewsCount: 1,
      material,
      woodType: material,
      dimensions: 'Custom Showroom Spec',
      warranty: '5 Years Structural Guarantee',
      badge: 'New Arrival',
      isNew: true,
      inStock: stockQty > 0,
      stockQty: stockQty,
      primaryImage: imageUrl,
      gallery: [imageUrl],
      description,
      features: ['High quality solid craftsmanship', 'Zambian dealer certified warranty']
    };

    state.products.unshift(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));

    e.target.reset();
    showToast(`Added "${name}" to dealer catalog!`);
    this.activeTab = 'inventory';
    document.querySelectorAll('.admin-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === 'inventory');
    });
    this.updateStats();
    this.renderCurrentTab();
    renderProducts();
  },

  resetDefaults() {
    if (!confirm("Reset all products back to official Faith's Furniture default catalog?")) return;
    state.products = [...initialProducts];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    this.updateStats();
    this.renderCurrentTab();
    renderProducts();
    showToast('Catalog restored to default');
  }
};

// Initialize Dealer Admin
document.addEventListener('DOMContentLoaded', () => DealerAdmin.init());
