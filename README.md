# Faith's Furniture General Dealers — Web Application

> **A high-end, responsive, conversion-focused web application crafted for Faith's Furniture General Dealers Ltd.**  
> Featuring authentic African Hardwood (Mukwa, Mahogany) & Modern Luxury Scandinavian aesthetics, real-time catalog search & filters, interactive 3D room hotspot preview, bespoke custom furniture quotation builder, slide-over cart drawer, and a dedicated Dealer Staff Admin Portal.

---

## 🌟 Key Features & Highlights

### 1. Luxury UI/UX Design System
- **Prestige Color Palette**: Deep African Walnut (`#1A120B`), Rich Cognac Honey (`#84563C`), Warm Artisan Gold (`#C59B27`), Ivory Surface (`#FAF7F2`), and WhatsApp Emerald (`#25D366`).
- **Typography Hierarchy**: Editorial serif headings with *Playfair Display* paired with clean, accessible interface typography with *Plus Jakarta Sans*.
- **Lucide Icons**: Ultra-crisp vector iconography for all controls and navigational elements.
- **Glassmorphism & Micro-Interactions**: Floating announcement bar, backdrop blurs on headers and modals, smooth hover lift on product cards, and toast notification alerts.

### 2. Multi-Currency Engine
- Instant toggle between **Zambian Kwacha (`ZMW / K`)** and **US Dollars (`USD / $`)** across all catalog items, the bespoke calculator, and cart checkout.
- Retains user choice across sessions via `localStorage`.

### 3. Smart Search & Filter Toolbar
- **Real-Time Live Search**: Instantly filters products by name, timber type, category, or description with an easy clear button.
- **Category Filter Pills**: Living Room, Dining & Kitchen, Bedroom Suites, Executive Office, Outdoor & Patio, and All Items.
- **Dynamic Price Range Slider**: Real-time slider with instant budget preview and card updates.
- **In-Stock Toggle**: Filter for immediately available showroom inventory vs made-to-order pieces.
- **Sort Options**: Featured collection, Price (Low to High), Price (High to Low), Highest Customer Rating, and New Arrivals.

### 4. Interactive Product Detail & Quick-View Modal
- Multi-angle gallery with clickable thumbnail selector.
- Detailed timber specifications, dimensions (cm/inches), and warranty duration.
- Quantity counter (`+` / `-`).
- Dual action buttons: **Add to Cart** and **Instant WhatsApp Inquiry / Buy** with pre-filled product details.

### 5. Interactive Room Visualizer ("The Grand Living Pavilion")
- High-resolution luxury room visualizer with animated pulsing hotspot pins.
- Clicking pins opens an interactive popover showing the product name, price, and a direct link to view specifications.

### 6. Bespoke / Custom Furniture Quotation Builder
- **Dynamic Step-by-Step Specifier**:
  1. Furniture Type (Custom Sofa, Dining Suite, Bed, Fitted Wardrobe, Executive Desk)
  2. Dimensions & Scale (Standard, Large 8-10 seater, XL Corporate)
  3. Timber Type (Solid Zambian Mukwa, African Mahogany, White Oak, Treated Pine)
  4. Upholstery & Fabric (Plush Velvet, Genuine Leather, Heavy Linen, Bouclé, None)
  5. Finish & Staining (Natural Satin, Deep Walnut, High-Gloss Mirror Lacquer, Matte Botanical Wax)
- **Live Estimation Engine**: Calculates real-time cost preview.
- **One-Click WhatsApp Quotation**: Formats all selected specifications and opens WhatsApp directly to send to the workshop head carpenter.

### 7. Slide-Over Cart Drawer & Promotion Engine
- Off-canvas slide-out cart with backdrop blur.
- Live item quantity stepper and remove button.
- **Free Showroom Delivery Tracker**: Dynamic progress bar incentivizing orders above K15,000.
- **Promo Voucher Codes**:
  - `FAITH10` (10% Discount)
  - `WELCOME5` (5% Discount)
  - `SHOWROOM15` (15% Discount)

### 8. Direct Dealer Checkout & WhatsApp Order Generator
- Fast multi-step checkout modal:
  - Customer contact information and nationwide delivery location (Lusaka, Ndola, Kitwe, Livingstone, Solwezi, etc.).
  - Payment method selection: **Mobile Money (MTN MoMo, Airtel Money, Zamtel)**, **Cash on Showroom Pickup**, **Bank Wire EFT**, or **Card**.
- Automatically generates a unique Order ID (`#FF-XXXXXX`), records it into the local database, and constructs a pre-formatted WhatsApp order receipt for one-tap transmission.

### 9. Dealer Admin Management Portal
- Built-in portal accessible via the header **Dealer Portal** button:
  - **Showroom Dashboard Metrics**: Total Catalog Products, Total Asset Value, Low Stock Alerts, Total Orders Processed.
  - **Live Inventory Table**: Real-time stock quantity adjustment (`+` / `-`), availability status, and item removal.
  - **Add New Furniture Form**: Instantly publish new pieces with title, category, price, stock, image URL, and timber description.
  - **Customer Orders Log**: Review customer orders, phone numbers, delivery addresses, and payment modes.
  - **Reset Catalog**: One-click restore back to default factory catalog.

### 10. Mobile-First Optimization
- Sticky mobile bottom bar with quick shortcuts to **Catalog**, **Bespoke**, **Direct WhatsApp Call**, and **Cart Badge**.
- Floating round WhatsApp hotline button with pulse animation.

---

## 📁 Project Structure

```
furniture web app/
├── index.html          # Semantic HTML5 markup, responsive layouts, modals & drawers
├── package.json        # NPM project scripts for instant serving
├── README.md           # Documentation & guides
├── css/
│   └── style.css       # Complete luxury design system, CSS variables & animations
└── js/
    ├── products.js     # Curated initial catalog items, specifications & images
    ├── app.js          # Reactive application state, filtering, cart, checkout & WhatsApp logic
    └── admin.js        # Dealer staff portal, inventory CRUD, and order audit trail
```

---

## 🚀 How to Run the Web App

### Option 1: Direct Browser Launch (No Install Required)
Simply double-click `index.html` or right-click `index.html` and choose **Open With > Google Chrome** (or Edge/Firefox/Safari).

### Option 2: Run via Node.js
From the `furniture web app` directory in your terminal:
```bash
npx serve -l 3000 .
```
Then navigate to `http://localhost:3000` in your browser.

---

## 🛠️ Customization Guide

1. **Change WhatsApp Phone Number**:
   - In `js/app.js` and `index.html`, replace `260977000000` with Faith's actual Zambian WhatsApp number (e.g., `26097xxxxxxx`).

2. **Add Products**:
   - Open the web app and click **Dealer Portal** in the top navigation, navigate to **+ Add New Furniture**, fill out the details and click Publish!
   - Alternatively, add items directly to the `initialProducts` array in `js/products.js`.

3. **Adjust Delivery Threshold or Currency Rate**:
   - Open `js/app.js` and modify `freeThresholdZMW` (currently `15000`) or `USD_RATE` in `js/products.js`.
