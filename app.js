/**
 * Faith's Furniture General Dealers - Web Application Logic
 * Comprehensive UI/UX, State Management, Cart, Wishlist & Order Engine
 */

// Application State
const state = {
  products: [],
  cart: [],
  wishlist: [],
  currency: 'ZMW', // 'ZMW' or 'USD'
  exchangeRate: 25.5,
  currentCategory: 'all',
  searchQuery: '',
  maxPrice: 30000,
  inStockOnly: false,
  sortBy: 'featured',
  activeVoucher: null,
  discountPercentage: 0,
  activeQuickViewProduct: null
};

// Storage Keys
const STORAGE_KEYS = {
  CART: 'faiths_furniture_cart_v1',
  WISHLIST: 'faiths_furniture_wishlist_v1',
  PRODUCTS: 'faiths_furniture_products_v1',
  CURRENCY: 'faiths_furniture_currency_v1',
  ORDERS: 'faiths_furniture_orders_v1',
  QUOTES: 'faiths_furniture_quotes_v1'
};

// Available Promo Codes
const VALID_PROMOS = {
  'FAITH10': 0.10,   // 10% discount
  'WELCOME5': 0.05,  // 5% discount
  'SHOWROOM15': 0.15 // 15% discount
};

// DOM Elements Cache
const DOM = {
  productsGrid: document.getElementById('productsGrid'),
  resultsCount: document.getElementById('resultsCount'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  categoryTabs: document.getElementById('categoryTabs'),
  priceRange: document.getElementById('priceRange'),
  priceRangeVal: document.getElementById('priceRangeVal'),
  inStockToggle: document.getElementById('inStockToggle'),
  sortSelect: document.getElementById('sortSelect'),
  currencySelect: document.getElementById('currencySelect'),
  
  // Cart & Wishlist counters
  cartBadge: document.getElementById('cartBadge'),
  wishlistBadge: document.getElementById('wishlistBadge'),
  mobileCartBadge: document.getElementById('mobileCartBadge'),
  mobileWishlistBadge: document.getElementById('mobileWishlistBadge'),
  
  // Cart Drawer
  cartDrawerOverlay: document.getElementById('cartDrawerOverlay'),
  cartItemsList: document.getElementById('cartItemsList'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartDiscount: document.getElementById('cartDiscount'),
  cartDelivery: document.getElementById('cartDelivery'),
  cartTotal: document.getElementById('cartTotal'),
  deliveryProgressFill: document.getElementById('deliveryProgressFill'),
  deliveryProgressText: document.getElementById('deliveryProgressText'),
  voucherInput: document.getElementById('voucherInput'),
  btnApplyVoucher: document.getElementById('btnApplyVoucher'),
  
  // Modals
  quickViewModal: document.getElementById('quickViewModal'),
  quickViewContainer: document.getElementById('quickViewContainer'),
  checkoutModal: document.getElementById('checkoutModal'),
  checkoutSummary: document.getElementById('checkoutSummary'),
  
  // Bespoke Calculator
  bespokeType: document.getElementById('bespokeType'),
  bespokeDimensions: document.getElementById('bespokeDimensions'),
  bespokeWood: document.getElementById('bespokeWood'),
  bespokeFabric: document.getElementById('bespokeFabric'),
  bespokeFinish: document.getElementById('bespokeFinish'),
  bespokeEstPrice: document.getElementById('bespokeEstPrice'),
  btnBespokeWhatsApp: document.getElementById('btnBespokeWhatsApp')
};

// ==========================================================================
// Initialization
// ==========================================================================
function initApp() {
  loadStoredData();
  setupEventListeners();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  calculateBespokeQuote();
  renderHotspots();
  renderTestimonials();
  lucide.createIcons();
}

// Load data from LocalStorage or fall back to defaults
function loadStoredData() {
  const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (savedProducts) {
    try {
      state.products = JSON.parse(savedProducts);
    } catch (e) {
      state.products = [...initialProducts];
    }
  } else {
    state.products = [...initialProducts];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
  }

  const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
  if (savedCart) {
    try { state.cart = JSON.parse(savedCart); } catch (e) { state.cart = []; }
  }

  const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  if (savedWishlist) {
    try { state.wishlist = JSON.parse(savedWishlist); } catch (e) { state.wishlist = []; }
  }

  const savedCurrency = localStorage.getItem(STORAGE_KEYS.CURRENCY);
  if (savedCurrency && (savedCurrency === 'ZMW' || savedCurrency === 'USD')) {
    state.currency = savedCurrency;
    if (DOM.currencySelect) DOM.currencySelect.value = savedCurrency;
  }
}

// Save states to LocalStorage
function persistCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
}

function persistWishlist() {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist));
}

// ==========================================================================
// Currency Formatting Helper
// ==========================================================================
function formatPrice(amountZMW) {
  if (state.currency === 'USD') {
    const usd = Math.round(amountZMW / state.exchangeRate);
    return `$${usd.toLocaleString()}`;
  }
  return `K ${Number(amountZMW).toLocaleString()}`;
}

// ==========================================================================
// Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
  // Category tabs
  if (DOM.categoryTabs) {
    DOM.categoryTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-tab-btn');
      if (!btn) return;
      DOM.categoryTabs.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      renderProducts();
    });
  }

  // Live search
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (DOM.searchClearBtn) {
        DOM.searchClearBtn.classList.toggle('active', state.searchQuery.length > 0);
      }
      renderProducts();
    });
  }

  if (DOM.searchClearBtn) {
    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      DOM.searchClearBtn.classList.remove('active');
      renderProducts();
    });
  }

  // Price range slider
  if (DOM.priceRange) {
    DOM.priceRange.addEventListener('input', (e) => {
      state.maxPrice = Number(e.target.value);
      if (DOM.priceRangeVal) {
        DOM.priceRangeVal.textContent = formatPrice(state.maxPrice);
      }
      renderProducts();
    });
  }

  // In Stock Toggle
  if (DOM.inStockToggle) {
    DOM.inStockToggle.addEventListener('change', (e) => {
      state.inStockOnly = e.target.checked;
      renderProducts();
    });
  }

  // Sort By
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Currency Selector
  if (DOM.currencySelect) {
    DOM.currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      localStorage.setItem(STORAGE_KEYS.CURRENCY, state.currency);
      if (DOM.priceRangeVal) {
        DOM.priceRangeVal.textContent = formatPrice(state.maxPrice);
      }
      renderProducts();
      updateCartUI();
      calculateBespokeQuote();
      showToast(`Currency changed to ${state.currency}`);
    });
  }

  // Cart Drawer Toggles
  document.querySelectorAll('.open-cart-btn').forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });

  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);

  if (DOM.cartDrawerOverlay) {
    DOM.cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.cartDrawerOverlay) closeCartDrawer();
    });
  }

  // Apply Voucher
  if (DOM.btnApplyVoucher) {
    DOM.btnApplyVoucher.addEventListener('click', applyVoucher);
  }

  // Bespoke Calculator Live Inputs
  const bespokeInputs = [DOM.bespokeType, DOM.bespokeDimensions, DOM.bespokeWood, DOM.bespokeFabric, DOM.bespokeFinish];
  bespokeInputs.forEach(input => {
    if (input) input.addEventListener('change', calculateBespokeQuote);
  });

  if (DOM.btnBespokeWhatsApp) {
    DOM.btnBespokeWhatsApp.addEventListener('click', sendBespokeWhatsAppInquiry);
  }

  // Checkout modal form submit
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }

  // Close modals when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.remove('open');
    });
  });
}

// ==========================================================================
// Product Filtering & Rendering
// ==========================================================================
function filterProducts() {
  return state.products.filter(product => {
    // Category match
    const categoryMatch = (state.currentCategory === 'all') || (product.category === state.currentCategory);
    
    // Search query match
    const searchMatch = !state.searchQuery || 
      product.name.toLowerCase().includes(state.searchQuery) ||
      product.categoryName.toLowerCase().includes(state.searchQuery) ||
      product.material.toLowerCase().includes(state.searchQuery) ||
      product.description.toLowerCase().includes(state.searchQuery);

    // Price match
    const priceMatch = product.priceZMW <= state.maxPrice;

    // In stock match
    const stockMatch = !state.inStockOnly || (product.inStock && product.stockQty > 0);

    return categoryMatch && searchMatch && priceMatch && stockMatch;
  });
}

function sortProducts(items) {
  const sorted = [...items];
  switch (state.sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.priceZMW - b.priceZMW);
    case 'price-high':
      return sorted.sort((a, b) => b.priceZMW - a.priceZMW);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'featured':
    default:
      return sorted;
  }
}

function renderProducts() {
  if (!DOM.productsGrid) return;

  const filtered = filterProducts();
  const sorted = sortProducts(filtered);

  if (DOM.resultsCount) {
    DOM.resultsCount.textContent = `Showing ${sorted.length} item${sorted.length === 1 ? '' : 's'}`;
  }

  if (sorted.length === 0) {
    DOM.productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i data-lucide="package-search" style="width: 48px; height: 48px; color: var(--gold-600); margin: 0 auto 1rem;"></i>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No furniture found</h3>
        <p style="color: var(--text-muted); max-width: 420px; margin: 0 auto 1.5rem;">
          We couldn't find any products matching your active filters. Try clearing your search or adjusting price limit.
        </p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  DOM.productsGrid.innerHTML = sorted.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const badgeHtml = product.badge 
      ? `<span class="product-badge">${product.badge}</span>` 
      : (product.isNew ? `<span class="product-badge">New Arrival</span>` : '');

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image-box">
          <img src="${product.primaryImage}" alt="${product.name}" loading="lazy">
          ${badgeHtml}
          
          <div class="product-card-actions">
            <button class="card-action-btn ${isWishlisted ? 'wishlisted' : ''}" 
                    title="Add to Wishlist" 
                    onclick="toggleWishlist('${product.id}')">
              <i data-lucide="heart" style="${isWishlisted ? 'fill: currentColor;' : ''}"></i>
            </button>
          </div>

          <div class="quick-view-trigger-bar" onclick="openQuickView('${product.id}')" role="button">
            <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
            <span>Quick View & Details</span>
          </div>
        </div>

        <div class="product-content">
          <span class="product-category-sub">${product.categoryName}</span>
          <h3 class="product-title" onclick="openQuickView('${product.id}')" style="cursor: pointer;">
            ${product.name}
          </h3>

          <div class="product-rating">
            <span class="stars">★ ★ ★ ★ ★</span>
            <span class="reviews-count">(${product.rating.toFixed(1)} / ${product.reviewsCount})</span>
          </div>

          <span class="product-material-pill" title="${product.material}">
            <i data-lucide="layers" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>
            ${product.woodType || product.material}
          </span>

          <div class="product-bottom-row">
            <div class="product-price-box">
              <span class="current-price">${formatPrice(product.priceZMW)}</span>
              ${product.oldPriceZMW ? `<span class="old-price">${formatPrice(product.oldPriceZMW)}</span>` : ''}
            </div>

            <button class="btn-card-add" title="Add to Cart" onclick="addToCart('${product.id}')">
              <i data-lucide="shopping-bag" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  lucide.createIcons();
}

function resetFilters() {
  state.currentCategory = 'all';
  state.searchQuery = '';
  state.maxPrice = 30000;
  state.inStockOnly = false;
  state.sortBy = 'featured';

  if (DOM.searchInput) DOM.searchInput.value = '';
  if (DOM.searchClearBtn) DOM.searchClearBtn.classList.remove('active');
  if (DOM.priceRange) DOM.priceRange.value = 30000;
  if (DOM.priceRangeVal) DOM.priceRangeVal.textContent = formatPrice(30000);
  if (DOM.inStockToggle) DOM.inStockToggle.checked = false;
  if (DOM.sortSelect) DOM.sortSelect.value = 'featured';

  if (DOM.categoryTabs) {
    DOM.categoryTabs.querySelectorAll('.category-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'all');
    });
  }

  renderProducts();
  showToast('Filters cleared');
}

// ==========================================================================
// Quick View Modal
// ==========================================================================
function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product || !DOM.quickViewContainer || !DOM.quickViewModal) return;

  state.activeQuickViewProduct = product;
  const isWishlisted = state.wishlist.includes(product.id);
  const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.primaryImage];

  DOM.quickViewContainer.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-gallery">
        <img id="quickViewMainImg" class="quick-view-main-img" src="${galleryImages[0]}" alt="${product.name}">
        <div class="quick-view-thumbs">
          ${galleryImages.map((img, idx) => `
            <img class="quick-thumb ${idx === 0 ? 'active' : ''}" 
                 src="${img}" 
                 alt="${product.name} thumb ${idx+1}" 
                 onclick="switchQuickViewImage('${img}', this)">
          `).join('')}
        </div>
      </div>

      <div class="quick-view-info">
        <span class="product-category-sub">${product.categoryName}</span>
        <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--wood-900); margin-bottom: 0.5rem; line-height: 1.25;">
          ${product.name}
        </h2>

        <div class="product-rating" style="margin-bottom: 1rem;">
          <span class="stars" style="color: #f59e0b;">★ ★ ★ ★ ★</span>
          <span style="font-weight: 700; color: var(--wood-900);">${product.rating.toFixed(1)}</span>
          <span class="reviews-count">(${product.reviewsCount} customer reviews)</span>
        </div>

        <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem;">
          <span style="font-size: 1.75rem; font-weight: 800; color: var(--wood-900);">
            ${formatPrice(product.priceZMW)}
          </span>
          ${product.oldPriceZMW ? `<span style="font-size: 1.1rem; text-decoration: line-through; color: var(--text-muted);">${formatPrice(product.oldPriceZMW)}</span>` : ''}
          <span style="background: var(--gold-100); color: var(--gold-600); font-weight: 700; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px;">
            ${product.inStock ? 'In Stock (Showroom Ready)' : 'Made to Order'}
          </span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
          ${product.description}
        </p>

        <div style="background: var(--cream-100); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="color: var(--wood-900);">Dimensions:</strong>
            <span style="color: var(--text-secondary);">${product.dimensions || 'Standard Specification'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="color: var(--wood-900);">Material:</strong>
            <span style="color: var(--text-secondary);">${product.material}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <strong style="color: var(--wood-900);">Guarantee:</strong>
            <span style="color: var(--text-secondary);">${product.warranty || '5-Year Structural Guarantee'}</span>
          </div>
        </div>

        <!-- Quantity & Add to Cart Action -->
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem;">
          <div class="qty-stepper" style="padding: 0.25rem;">
            <button class="qty-btn" onclick="adjustQuickViewQty(-1)">-</button>
            <span id="quickViewQtyVal" class="qty-display">1</span>
            <button class="qty-btn" onclick="adjustQuickViewQty(1)">+</button>
          </div>

          <button class="btn-primary" style="flex: 1;" onclick="addQuickViewToCart()">
            <i data-lucide="shopping-bag" style="width: 18px; height: 18px;"></i>
            <span>Add to Cart</span>
          </button>
        </div>

        <!-- Order on WhatsApp Fast Button -->
        <button class="btn-whatsapp" onclick="orderProductOnWhatsApp('${product.id}')" style="width: 100%; justify-content: center;">
          <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i>
          <span>Instant Inquiry / Buy via WhatsApp</span>
        </button>
      </div>
    </div>
  `;

  DOM.quickViewModal.classList.add('open');
  lucide.createIcons();
}

function switchQuickViewImage(imgSrc, thumbEl) {
  const mainImg = document.getElementById('quickViewMainImg');
  if (mainImg) mainImg.src = imgSrc;
  document.querySelectorAll('.quick-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

let quickViewQty = 1;
function adjustQuickViewQty(delta) {
  quickViewQty = Math.max(1, quickViewQty + delta);
  const qtyEl = document.getElementById('quickViewQtyVal');
  if (qtyEl) qtyEl.textContent = quickViewQty;
}

function addQuickViewToCart() {
  if (!state.activeQuickViewProduct) return;
  addToCart(state.activeQuickViewProduct.id, quickViewQty);
  if (DOM.quickViewModal) DOM.quickViewModal.classList.remove('open');
  quickViewQty = 1;
}

// ==========================================================================
// Cart Management
// ==========================================================================
function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      priceZMW: product.priceZMW,
      primaryImage: product.primaryImage,
      categoryName: product.categoryName,
      quantity: quantity
    });
  }

  persistCart();
  updateCartUI();
  showToast(`Added "${product.name}" to cart`);
  openCartDrawer();
}

function updateCartItemQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }

  persistCart();
  updateCartUI();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  persistCart();
  updateCartUI();
  showToast('Item removed from cart');
}

function openCartDrawer() {
  if (DOM.cartDrawerOverlay) {
    DOM.cartDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  if (DOM.cartDrawerOverlay) {
    DOM.cartDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update Badges
  if (DOM.cartBadge) DOM.cartBadge.textContent = totalItems;
  if (DOM.mobileCartBadge) DOM.mobileCartBadge.textContent = totalItems;

  if (!DOM.cartItemsList) return;

  if (state.cart.length === 0) {
    DOM.cartItemsList.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <i data-lucide="shopping-bag" style="width: 48px; height: 48px; color: var(--wood-400); margin: 0 auto 1rem;"></i>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.5rem;">Your Cart is Empty</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">
          Explore our handcrafted living, dining, bedroom and executive suites to add items.
        </p>
        <button class="btn-primary" onclick="closeCartDrawer()">Start Shopping</button>
      </div>
    `;
    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPrice(0);
    if (DOM.cartDiscount) DOM.cartDiscount.textContent = formatPrice(0);
    if (DOM.cartDelivery) DOM.cartDelivery.textContent = 'Free';
    if (DOM.cartTotal) DOM.cartTotal.textContent = formatPrice(0);
    if (DOM.deliveryProgressFill) DOM.deliveryProgressFill.style.width = '0%';
    lucide.createIcons();
    return;
  }

  // Render items
  DOM.cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.primaryImage}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">${formatPrice(item.priceZMW)}</span>
        <div class="cart-item-controls">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Calculations
  const subtotalZMW = state.cart.reduce((sum, item) => sum + (item.priceZMW * item.quantity), 0);
  const discountZMW = subtotalZMW * state.discountPercentage;
  
  // Free delivery threshold: K15,000 (~$600)
  const freeThresholdZMW = 15000;
  const isFreeDelivery = subtotalZMW >= freeThresholdZMW;
  const deliveryZMW = isFreeDelivery || subtotalZMW === 0 ? 0 : 500;
  const totalZMW = subtotalZMW - discountZMW + deliveryZMW;

  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPrice(subtotalZMW);
  if (DOM.cartDiscount) DOM.cartDiscount.textContent = discountZMW > 0 ? `-${formatPrice(discountZMW)}` : formatPrice(0);
  if (DOM.cartDelivery) DOM.cartDelivery.textContent = isFreeDelivery ? 'FREE' : formatPrice(deliveryZMW);
  if (DOM.cartTotal) DOM.cartTotal.textContent = formatPrice(totalZMW);

  // Delivery Progress Bar
  const progressPercent = Math.min(100, Math.round((subtotalZMW / freeThresholdZMW) * 100));
  if (DOM.deliveryProgressFill) DOM.deliveryProgressFill.style.width = `${progressPercent}%`;
  if (DOM.deliveryProgressText) {
    if (isFreeDelivery) {
      DOM.deliveryProgressText.innerHTML = `🎉 <strong>Congratulations!</strong> You have unlocked FREE Showroom Delivery!`;
    } else {
      const remaining = freeThresholdZMW - subtotalZMW;
      DOM.deliveryProgressText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to qualify for <strong>FREE Showroom Delivery</strong>!`;
    }
  }

  lucide.createIcons();
}

function applyVoucher() {
  if (!DOM.voucherInput) return;
  const code = DOM.voucherInput.value.trim().toUpperCase();

  if (VALID_PROMOS[code]) {
    state.activeVoucher = code;
    state.discountPercentage = VALID_PROMOS[code];
    updateCartUI();
    showToast(`Voucher "${code}" applied! (${state.discountPercentage * 100}% OFF)`);
  } else {
    showToast('Invalid voucher code. Try "FAITH10" or "WELCOME5"');
  }
}

// ==========================================================================
// Wishlist Management
// ==========================================================================
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Added to wishlist');
  }

  persistWishlist();
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const count = state.wishlist.length;
  if (DOM.wishlistBadge) DOM.wishlistBadge.textContent = count;
  if (DOM.mobileWishlistBadge) DOM.mobileWishlistBadge.textContent = count;
}

// ==========================================================================
// Bespoke Custom Furniture Calculator
// ==========================================================================
function calculateBespokeQuote() {
  if (!DOM.bespokeType || !DOM.bespokeEstPrice) return;

  const type = DOM.bespokeType.value;
  const dimensions = DOM.bespokeDimensions ? DOM.bespokeDimensions.value : 'standard';
  const wood = DOM.bespokeWood ? DOM.bespokeWood.value : 'mukwa';
  const fabric = DOM.bespokeFabric ? DOM.bespokeFabric.value : 'velvet';

  const matrix = bespokePricingMatrix[type] || { basePrice: 6000 };
  let estimatedPrice = matrix.basePrice;

  // Dimension modifier
  if (dimensions === 'large') estimatedPrice *= 1.35;
  if (dimensions === 'xl') estimatedPrice *= 1.65;

  // Wood modifier
  if (wood === 'mukwa') estimatedPrice *= 1.25;
  if (wood === 'mahogany') estimatedPrice *= 1.20;
  if (wood === 'oak') estimatedPrice *= 1.15;

  // Fabric modifier
  if (fabric === 'leather') estimatedPrice += 3500;
  if (fabric === 'velvet') estimatedPrice += 1500;

  DOM.bespokeEstPrice.textContent = formatPrice(Math.round(estimatedPrice));
  return Math.round(estimatedPrice);
}

function sendBespokeWhatsAppInquiry() {
  const type = DOM.bespokeType ? DOM.bespokeType.options[DOM.bespokeType.selectedIndex].text : 'Custom Furniture';
  const dimensions = DOM.bespokeDimensions ? DOM.bespokeDimensions.options[DOM.bespokeDimensions.selectedIndex].text : 'Standard';
  const wood = DOM.bespokeWood ? DOM.bespokeWood.options[DOM.bespokeWood.selectedIndex].text : 'Solid Hardwood';
  const fabric = DOM.bespokeFabric ? DOM.bespokeFabric.options[DOM.bespokeFabric.selectedIndex].text : 'None';
  const finish = DOM.bespokeFinish ? DOM.bespokeFinish.options[DOM.bespokeFinish.selectedIndex].text : 'Natural Satin';
  const priceEst = DOM.bespokeEstPrice ? DOM.bespokeEstPrice.textContent : '';

  const message = `Hello Faith's Furniture General Dealers! I would like to request a formal quotation for custom bespoke furniture:
- Item Type: ${type}
- Size/Dimensions: ${dimensions}
- Timber Material: ${wood}
- Fabric/Upholstery: ${fabric}
- Finish: ${finish}
- Online Calculated Estimate: ${priceEst}

Kindly advise on turnaround time, workshop availability, and showroom consultation. Thank you!`;

  const encoded = encodeURIComponent(message);
  // Default WhatsApp dealer number (customizable in admin or settings)
  const phone = '260977000000';
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

// Order Single Product via WhatsApp
function orderProductOnWhatsApp(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const message = `Hello Faith's Furniture General Dealers! I am interested in purchasing:
- Product: ${product.name} (Code: ${product.id})
- Price: ${formatPrice(product.priceZMW)}
- Wood/Material: ${product.material}
- Warranty: ${product.warranty}

Is this currently available for showroom pickup or Lusaka/national delivery? Thank you!`;

  const phone = '260977000000';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// ==========================================================================
// Checkout Flow & WhatsApp Confirmation
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  closeCartDrawer();

  if (DOM.checkoutSummary) {
    const subtotalZMW = state.cart.reduce((sum, item) => sum + (item.priceZMW * item.quantity), 0);
    const discountZMW = subtotalZMW * state.discountPercentage;
    const isFreeDelivery = subtotalZMW >= 15000;
    const deliveryZMW = isFreeDelivery ? 0 : 500;
    const totalZMW = subtotalZMW - discountZMW + deliveryZMW;

    DOM.checkoutSummary.innerHTML = `
      <div style="background: var(--cream-100); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--wood-900); margin-bottom: 0.75rem;">Order Summary (${state.cart.length} unique items)</h4>
        <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; max-height: 140px; overflow-y: auto; padding-right: 4px;">
          ${state.cart.map(i => `
            <div style="display: flex; justify-content: space-between;">
              <span>${i.name} × ${i.quantity}</span>
              <strong>${formatPrice(i.priceZMW * i.quantity)}</strong>
            </div>
          `).join('')}
        </div>
        <div style="border-top: 1px solid var(--border-light); margin-top: 0.75rem; padding-top: 0.75rem; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem; color: var(--wood-900);">
          <span>Total Payable:</span>
          <span style="color: var(--gold-600);">${formatPrice(totalZMW)}</span>
        </div>
      </div>
    `;
  }

  if (DOM.checkoutModal) DOM.checkoutModal.classList.add('open');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('checkoutName').value;
  const phone = document.getElementById('checkoutPhone').value;
  const address = document.getElementById('checkoutAddress').value;
  const city = document.getElementById('checkoutCity').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

  const orderId = 'FF-' + Math.floor(100000 + Math.random() * 900000);
  const subtotalZMW = state.cart.reduce((sum, item) => sum + (item.priceZMW * item.quantity), 0);
  const discountZMW = subtotalZMW * state.discountPercentage;
  const deliveryZMW = subtotalZMW >= 15000 ? 0 : 500;
  const totalZMW = subtotalZMW - discountZMW + deliveryZMW;

  const orderRecord = {
    orderId,
    date: new Date().toLocaleDateString('en-GB'),
    customer: { name, phone, address, city },
    items: [...state.cart],
    totalZMW,
    paymentMethod,
    status: 'Pending Showroom Confirmation'
  };

  // Persist Order to local orders database for dealer admin
  const savedOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
  savedOrders.unshift(orderRecord);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(savedOrders));

  // WhatsApp Order payload
  const itemsText = state.cart.map(i => `• ${i.name} (Qty: ${i.quantity}) - ${formatPrice(i.priceZMW * i.quantity)}`).join('\n');
  const message = `*NEW ORDER - FAITH'S FURNITURE GENERAL DEALERS*
Order ID: #${orderId}
Customer: ${name}
Phone/WhatsApp: ${phone}
Delivery Address: ${address}, ${city}
Payment Mode: ${paymentMethod}

*Items Ordered:*
${itemsText}

Subtotal: ${formatPrice(subtotalZMW)}
Discount: -${formatPrice(discountZMW)}
Delivery: ${deliveryZMW === 0 ? 'FREE' : formatPrice(deliveryZMW)}
*Total Amount: ${formatPrice(totalZMW)}*

Please confirm showroom stock dispatch and bank/mobile money payment details!`;

  // Clear Cart
  state.cart = [];
  persistCart();
  updateCartUI();

  if (DOM.checkoutModal) DOM.checkoutModal.classList.remove('open');
  showToast(`Order #${orderId} submitted! Opening WhatsApp confirmation...`);

  const dealerPhone = '260977000000';
  setTimeout(() => {
    window.open(`https://wa.me/${dealerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  }, 1000);
}

// ==========================================================================
// Interactive Room Hotspots & Testimonials
// ==========================================================================
function renderHotspots() {
  const container = document.getElementById('roomHotspotContainer');
  if (!container || !roomInspirationData) return;

  container.innerHTML = `
    <img src="${roomInspirationData.backgroundImage}" alt="${roomInspirationData.title}">
    ${roomInspirationData.hotspots.map(spot => `
      <div class="hotspot-pin" style="left: ${spot.x}%; top: ${spot.y}%;" 
           onclick="toggleHotspotPopover(${spot.id}, event)" title="${spot.title}">
        +
      </div>
      <div id="hotspot-popover-${spot.id}" class="hotspot-popover" style="left: ${spot.x}%; top: ${spot.y}%;">
        <h5>${spot.title}</h5>
        <div class="price">${formatPrice(spot.priceZMW)}</div>
        <button class="btn-mini-view" onclick="openQuickView('${spot.productId}')">View Specifications</button>
      </div>
    `).join('')}
  `;
}

function toggleHotspotPopover(id, e) {
  e.stopPropagation();
  document.querySelectorAll('.hotspot-popover').forEach(pop => {
    if (pop.id !== `hotspot-popover-${id}`) pop.classList.remove('active');
  });
  const target = document.getElementById(`hotspot-popover-${id}`);
  if (target) target.classList.toggle('active');
}

// Close popovers on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.hotspot-popover').forEach(pop => pop.classList.remove('active'));
});

function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container || !customerReviews) return;

  container.innerHTML = customerReviews.map(rev => `
    <div class="review-card">
      <div class="review-stars">★ ★ ★ ★ ★</div>
      <p class="review-text">"${rev.comment}"</p>
      <div class="review-author">
        <img src="${rev.avatar}" alt="${rev.name}" class="review-avatar">
        <div>
          <h4>${rev.name}</h4>
          <p>${rev.title}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// Toast Notification
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="width: 18px; height: 18px; color: var(--gold-400);"></i> <span>${message}</span>`;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
