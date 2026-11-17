/**
 * Faith's Furniture General Dealers - Product Catalog Data
 * Premium Handcrafted Furniture, Executive Office & Living Solutions
 */

const DEFAULT_CURRENCY = 'ZMW';
const USD_RATE = 25.5; // 1 USD = 25.5 ZMW approximate conversion

const initialProducts = [
  {
    id: 'ff-001',
    name: "The Royal Chesterfield 3-Seater Velvet Sofa",
    category: 'living',
    categoryName: 'Living Room',
    priceZMW: 18500,
    oldPriceZMW: 21500,
    priceUSD: 725,
    rating: 4.9,
    reviewsCount: 64,
    material: 'Zambian Mukwa Frame & Royal Plush Velvet',
    woodType: 'Kiln-Dried Mukwa Hardwood',
    dimensions: '230cm (W) x 95cm (D) x 85cm (H)',
    warranty: '7 Years Frame Warranty',
    badge: 'Best Seller',
    isNew: false,
    inStock: true,
    stockQty: 5,
    colors: [
      { name: 'Royal Emerald', hex: '#0d5c3a' },
      { name: 'Cognac Gold', hex: '#99582a' },
      { name: 'Midnight Navy', hex: '#14213d' },
      { name: 'Charcoal Grey', hex: '#343a40' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Expertly handcrafted with deep button diamond-tufting, generous scrolled armrests, and premium high-density resilience foam. Built upon a solid Zambian Mukwa kiln-dried hardwood skeleton designed to endure generations of comfort.",
    features: [
      'Hand-tufted deep buttoned backrest',
      'Reinforced solid hardwood frame with corner blocks',
      'High-resilience foam core with pocket spring cushion support',
      'Stain-resistant luxury velvet upholstery',
      'Free showroom delivery in Lusaka & environs'
    ]
  },
  {
    id: 'ff-002',
    name: "Monarch 8-Seater Mukwa Dining Suite",
    category: 'dining',
    categoryName: 'Dining Room',
    priceZMW: 24500,
    oldPriceZMW: 27900,
    priceUSD: 960,
    rating: 5.0,
    reviewsCount: 42,
    material: '100% Solid Zambian Mukwa Hardwood',
    woodType: 'Natural Mukwa Hardwood',
    dimensions: '240cm (L) x 100cm (W) x 76cm (H)',
    warranty: '10 Years Structural Guarantee',
    badge: 'Masterpiece',
    isNew: true,
    inStock: true,
    stockQty: 3,
    colors: [
      { name: 'Natural Honey Gloss', hex: '#b07d38' },
      { name: 'Deep Walnut Stain', hex: '#4a2c11' },
      { name: 'Matte Raw Mukwa', hex: '#8a5a2b' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "The crown jewel of dining rooms. Crafted from seasoned solid Mukwa timber showcasing natural golden-brown grain ribbons. Includes 8 ergonomically contoured dining chairs with stain-shielded linen seats.",
    features: [
      'Includes 8 solid matching chairs with plush upholstery',
      'Heat & moisture resistant multi-coat lacquer finish',
      'Sleek beveled edge profile with mortise & tenon joinery',
      'Seats 8 to 10 guests comfortably'
    ]
  },
  {
    id: 'ff-003',
    name: "The Sovereign King Hydraulic Storage Bed",
    category: 'bedroom',
    categoryName: 'Bedroom',
    priceZMW: 19800,
    oldPriceZMW: 22000,
    priceUSD: 775,
    rating: 4.8,
    reviewsCount: 51,
    material: 'Upholstered Linen with Gas-Lift Storage Frame',
    woodType: 'Reinforced Mahogany & Pine Base',
    dimensions: 'King Size: 200cm x 190cm mattress size',
    warranty: '5 Years Hydraulic & Frame Warranty',
    badge: 'Popular',
    isNew: false,
    inStock: true,
    stockQty: 4,
    colors: [
      { name: 'Warm Oat Linen', hex: '#d9cdb8' },
      { name: 'Slate Anthracite', hex: '#484b50' },
      { name: 'Midnight Navy', hex: '#1d2a44' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Redefine your bedroom sanctuary with effortless under-bed storage. Smooth German gas-lift struts elevate the mattress platform effortlessly, revealing over 800 liters of dust-free storage space for extra linens, duvets, and luggage.",
    features: [
      'German engineered gas-lift hydraulic pistons',
      'Extra-thick padded wingback headboard for reading comfort',
      'Breathable slatted beechwood orthopedic base',
      'Integrated underbed dust cover base'
    ]
  },
  {
    id: 'ff-004',
    name: "Presidential Mahogany Executive Desk",
    category: 'office',
    categoryName: 'Executive Office',
    priceZMW: 16500,
    oldPriceZMW: 18500,
    priceUSD: 645,
    rating: 4.9,
    reviewsCount: 38,
    material: 'Zambian Mahogany & Genuine Inlaid Leather',
    woodType: 'Solid Zambian Mahogany Hardwood',
    dimensions: '180cm (W) x 90cm (D) x 76cm (H)',
    warranty: '10 Years Build Guarantee',
    badge: 'Executive',
    isNew: false,
    inStock: true,
    stockQty: 6,
    colors: [
      { name: 'Executive Dark Mahogany', hex: '#3d1c14' },
      { name: 'Warm Teak Stain', hex: '#6f391b' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Designed for corporate leaders, managing directors, and high-prestige offices. Features genuine Italian leather desktop inlay, concealed wire channels, heavy-duty soft-closing pedestals, and master lock security drawers.",
    features: [
      'Inlaid central leather writing pad with gold edge embossing',
      'Twin pedestals with 6 locking drawers including file hanging rails',
      'Concealed cable grommets & integrated power strip bay',
      'Polished brass hardware handles'
    ]
  },
  {
    id: 'ff-005',
    name: "ErgoPro Dynamic Mesh Executive Chair",
    category: 'office',
    categoryName: 'Executive Office',
    priceZMW: 4800,
    oldPriceZMW: 5600,
    priceUSD: 188,
    rating: 4.8,
    reviewsCount: 79,
    material: 'High-Tension Breathable Mesh & Aluminum Alloy',
    woodType: 'N/A (Aircraft Grade Aluminum Base)',
    dimensions: 'Adjustable Height: 115cm - 128cm',
    warranty: '3 Years Mechanical Guarantee',
    badge: 'Ergonomic',
    isNew: true,
    inStock: true,
    stockQty: 18,
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Titanium Grey', hex: '#6c757d' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "All-day orthopedic seating engineered for 12+ hours of comfort. Features adaptive self-adjusting lumbar support, 4D multidirectional armrests, synchronous tilt reclining up to 135 degrees, and silent nylon castors.",
    features: [
      'Adaptive dynamic lumbar cushion prevents lower back strain',
      'Korean high-tensile breathable cooling mesh',
      'Class 4 explosion-proof gas lift mechanism',
      'Smooth 360-degree silent polyurethane floor-safe wheels'
    ]
  },
  {
    id: 'ff-006',
    name: "Artisan Live-Edge Mukwa Coffee Table",
    category: 'living',
    categoryName: 'Living Room',
    priceZMW: 6200,
    oldPriceZMW: 7500,
    priceUSD: 240,
    rating: 4.9,
    reviewsCount: 35,
    material: 'Solid Single-Slab Zambian Mukwa & Matte Black Steel',
    woodType: 'Live-Edge Zambian Mukwa',
    dimensions: '130cm (L) x 70cm (W) x 45cm (H)',
    warranty: 'Lifetime Wood Guarantee',
    badge: 'Handcrafted',
    isNew: true,
    inStock: true,
    stockQty: 8,
    colors: [
      { name: 'Natural Grain Mukwa', hex: '#935823' },
      { name: 'Smoked Amber', hex: '#5c3818' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "No two tables are alike. Harvested from sustainable Zambian hardwood, preserving the natural organic edge contours. Hand-sanded across 7 grades of grit and sealed with food-safe botanical waxes and satin poly finish.",
    features: [
      'Natural authentic organic live-edge curves',
      'Heavy-gauge powder coated industrial steel spider base',
      'Resistant to hot coffee mugs, stains and water rings',
      'Includes certificate of authenticity for Zambian hardwood'
    ]
  },
  {
    id: 'ff-007',
    name: "Riviera 4-Piece All-Weather Patio Lounge Set",
    category: 'outdoor',
    categoryName: 'Outdoor & Patio',
    priceZMW: 15900,
    oldPriceZMW: 18200,
    priceUSD: 620,
    rating: 4.7,
    reviewsCount: 29,
    material: 'UV-Resistant Handwoven PE Wicker & Sunproof Fabric',
    woodType: 'Treated Hardwood Accents with Aluminum Substructure',
    dimensions: 'Loveseat: 145cm + 2 Armchairs + Tempered Glass Coffee Table',
    warranty: '3 Years Weatherproof Guarantee',
    badge: 'Outdoor Luxury',
    isNew: false,
    inStock: true,
    stockQty: 4,
    colors: [
      { name: 'Sandy Wicker / Linen White', hex: '#c5b59e' },
      { name: 'Dark Mocha / Charcoal Cushions', hex: '#3e342a' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Transform your veranda, poolside, or garden into a 5-star resort patio. Woven with heavy UV-stabilized synthetic rattan around rust-proof powder-coated aluminum framing with water-repellent cushions.",
    features: [
      'Full 4-piece suite: 1 double lounge sofa, 2 armchairs, 1 coffee table',
      '5mm shatter-proof tempered safety glass tabletop',
      'Waterproof, fade-resistant machine-washable cushion covers',
      'Rust-proof aluminum alloy frame built for African sunshine & rain'
    ]
  },
  {
    id: 'ff-008',
    name: "Mukwa Grand 4-Door Wardrobe with Vanity Mirror",
    category: 'bedroom',
    categoryName: 'Bedroom',
    priceZMW: 21500,
    oldPriceZMW: 24000,
    priceUSD: 840,
    rating: 4.9,
    reviewsCount: 27,
    material: 'Kiln-Dried Zambian Mukwa & Beveled Belgian Mirror',
    woodType: 'Solid Zambian Mukwa Hardwood',
    dimensions: '220cm (W) x 60cm (D) x 210cm (H)',
    warranty: '10 Years Timber Durability Guarantee',
    badge: 'Custom Classic',
    isNew: false,
    inStock: true,
    stockQty: 3,
    colors: [
      { name: 'Rich Mukwa Amber', hex: '#804b1e' },
      { name: 'Espresso Satin', hex: '#2c1809' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "A monumental master wardrobe with unmatched craftsmanship. Features two full-length beveled mirrors, double hanging rails for suits and dresses, velvet-lined jewelry drawers, and top storage cupboards for blankets.",
    features: [
      'Twin full-length dressing mirrors with beveled safety glass',
      'Velvet-lined lockable jewelry and valuables compartment',
      'Soft-close German concealed hinges and magnetic catches',
      'Built-in modular shelves and dual heavy-gauge hanging rods'
    ]
  },
  {
    id: 'ff-009',
    name: "Nordic Fluted Oak TV Console & Media Credenza",
    category: 'living',
    categoryName: 'Living Room',
    priceZMW: 7800,
    oldPriceZMW: 8900,
    priceUSD: 305,
    rating: 4.8,
    reviewsCount: 31,
    material: 'Natural White Oak & Brushed Brass Finishes',
    woodType: 'Solid White Oak & Veneer Core',
    dimensions: '190cm (W) x 42cm (D) x 52cm (H)',
    warranty: '5 Years Guarantee',
    badge: 'Trending',
    isNew: true,
    inStock: true,
    stockQty: 7,
    colors: [
      { name: 'Natural Oak', hex: '#c8a87b' },
      { name: 'Walnut Stain', hex: '#583e2e' },
      { name: 'Midnight Charcoal', hex: '#262626' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Warm architectural elegance for contemporary media setups. Supports televisions up to 85 inches. Features handcrafted vertical wood tambour slats, push-to-open doors, and integrated wire management ports.",
    features: [
      'Supports up to 85" Ultra HD flat screens without sagging',
      'Tambour fluted sliding doors conceal soundbars and consoles',
      'Ventilated backboard prevents overheating of electronics',
      'Solid tapered cylindrical brass-capped legs'
    ]
  },
  {
    id: 'ff-010',
    name: "Imperial 7-Zone Orthopedic Memory Mattress (King)",
    category: 'bedroom',
    categoryName: 'Bedroom',
    priceZMW: 8900,
    oldPriceZMW: 10500,
    priceUSD: 350,
    rating: 5.0,
    reviewsCount: 88,
    material: 'Pocket Springs, CoolGel Memory Foam & Aloe Vera Quilt',
    woodType: 'Reinforced Edge Support Core',
    dimensions: 'King: 183cm x 198cm x 30cm thickness',
    warranty: '15 Years Manufacturer Warranty',
    badge: 'Doctor Approved',
    isNew: false,
    inStock: true,
    stockQty: 12,
    colors: [
      { name: 'Pristine White / Grey Border', hex: '#f8f9fa' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Say goodbye to spinal discomfort and restless nights. 7 target contour zones relieve pressure from shoulders, lower spine, and hips. Zero-motion transfer technology ensures unperturbed sleep even when your partner turns.",
    features: [
      'Independently pocketed carbon steel coil system',
      'Infused with cooling memory gel to dissipate body heat',
      'Hypoallergenic Aloe Vera breathable fabric treatment',
      'Reinforced high-density foam encasement around perimeter'
    ]
  },
  {
    id: 'ff-011',
    name: "Milano Gold & Carrara Marble 6-Seater Dining Set",
    category: 'dining',
    categoryName: 'Dining Room',
    priceZMW: 22000,
    oldPriceZMW: 25500,
    priceUSD: 860,
    rating: 4.8,
    reviewsCount: 19,
    material: 'Engineered Italian Carrara Marble & Brushed Gold Brass',
    woodType: 'Reinforced Metal Subframe',
    dimensions: '200cm (L) x 100cm (W) x 76cm (H)',
    warranty: '5 Years Guarantee',
    badge: 'Ultra Luxury',
    isNew: true,
    inStock: true,
    stockQty: 2,
    colors: [
      { name: 'White Carrara / Gold Legs', hex: '#eaeaea' },
      { name: 'Black Marquina / Gold Legs', hex: '#212121' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "Contemporary glamour meets timeless durability. Authentic vein patterning with a polished diamond-gloss resin sealant that prevents wine or curry staining. Includes 6 sculptural curved dining chairs in bouclé upholstery.",
    features: [
      'Scratch, heat, and stain resistant engineered marble top',
      'Geometric double-arch pedestal base with electroplated gold finish',
      'Includes 6 plush bouclé accent dining chairs',
      'Floor protection adjustable levelling feet'
    ]
  },
  {
    id: 'ff-012',
    name: "Oxford Solid Hardwood 5-Tier Library Bookcase",
    category: 'office',
    categoryName: 'Executive Office',
    priceZMW: 9200,
    oldPriceZMW: 10800,
    priceUSD: 360,
    rating: 4.9,
    reviewsCount: 22,
    material: 'Solid Mukwa Timber & Antiqued Brass Handles',
    woodType: 'Solid Zambian Mukwa',
    dimensions: '110cm (W) x 40cm (D) x 205cm (H)',
    warranty: '10 Years Build Guarantee',
    badge: 'Classic Heritage',
    isNew: false,
    inStock: true,
    stockQty: 5,
    colors: [
      { name: 'Warm Mukwa', hex: '#7a421b' },
      { name: 'Antique Walnut', hex: '#40210f' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: "The ideal stately addition for legal offices, scholars, corporate suites, and home libraries. 5 generous tiers with heavy-duty weight support for legal binders and collectors' encyclopedias, plus a lower 2-door lockable cabinet.",
    features: [
      'Each shelf load tested up to 60kg without bowing',
      'Adjustable shelf height pins in solid brass',
      'Lower two-door cupboard with smooth lock mechanism',
      'Classical fluted side columns with carved crown moulding'
    ]
  }
];

// Room Hotspots Data for the Interactive Room Visualizer
const roomInspirationData = {
  title: "The Grand Living Pavilion",
  subtitle: "Explore our signature living room ensemble crafted for prestige & family warmth",
  backgroundImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  hotspots: [
    {
      id: 1,
      x: 32, // percentage from left
      y: 65, // percentage from top
      productId: 'ff-001',
      title: "Royal Chesterfield Sofa",
      priceZMW: 18500
    },
    {
      id: 2,
      x: 58,
      y: 78,
      productId: 'ff-006',
      title: "Live-Edge Mukwa Table",
      priceZMW: 6200
    },
    {
      id: 3,
      x: 82,
      y: 50,
      productId: 'ff-009',
      title: "Fluted Media Console",
      priceZMW: 7800
    }
  ]
};

// Testimonials Data
const customerReviews = [
  {
    name: "Eng. Mwila Chilufya",
    title: "Civil Engineer, Woodlands Lusaka",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    date: "2 weeks ago",
    comment: "Faith's Furniture exceeded my highest expectations. The 8-seater Mukwa dining suite is heavy, pure solid Zambian hardwood with no veneers. The delivery team was punctual and assembled everything right in our dining room.",
    purchasedItem: "Monarch 8-Seater Mukwa Dining Suite"
  },
  {
    name: "Dr. Natasha Phiri",
    title: "Consultant, Rhodes Park",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    date: "1 month ago",
    comment: "I ordered the Royal Chesterfield velvet sofa and a custom king bed with underbed storage. Dealing with Faith was seamless. Best furniture dealer in Zambia for both quality and transparent pricing!",
    purchasedItem: "Royal Chesterfield Sofa & Sovereign Bed"
  },
  {
    name: "Mr. Kelvin Banda",
    title: "Managing Director, Kitwe",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    date: "3 weeks ago",
    comment: "Furnished our entire corporate executive floor with their Mahogany presidential desks and ErgoPro mesh chairs. Professional invoices, swift dispatch along the Copperbelt route, and sturdy woodwork.",
    purchasedItem: "Presidential Desks & Executive Seating"
  }
];

// Custom Bespoke Pricing Matrix
const bespokePricingMatrix = {
  sofa: { basePrice: 6500, perMeterRate: 3500 },
  dining: { basePrice: 7000, perSeatRate: 1800 },
  bed: { basePrice: 8000, storageSurcharge: 2800 },
  wardrobe: { basePrice: 6000, perDoorRate: 3200 },
  desk: { basePrice: 5000, sizeMultiplier: 1.4 }
};
