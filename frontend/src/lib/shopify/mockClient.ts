import { Product, Collection, Cart, CartLine, StoreSettings, Review, Money, ProductVariant } from './types';

// ==========================================
// MOCK HIGH-FIDELITY IMAGES FROM UNSPLASH
// ==========================================
const IMAGES = {
  rings: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80', // Alt image for rings
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80', // Fixed broken image
  ],
  necklaces: [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop&q=80',
  ],
  earrings: [
    'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
  ],
  bracelets: [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=80',
  ],
  banners: {
    hero1: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&auto=format&fit=crop&q=80',
    hero2: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&auto=format&fit=crop&q=80',
    hero3: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&auto=format&fit=crop&q=80',
    collection: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&auto=format&fit=crop&q=80',
    story: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=1200&auto=format&fit=crop&q=80',
  }
};

// ==========================================
// MOCK PRODUCT DATA (GraphQL Compliant Schema)
// ==========================================
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'celeste-diamond-solitaire-ring',
    title: 'Celeste Diamond Solitaire Ring',
    description: 'A breathtaking round brilliant-cut solitaire diamond held elegantly in place by six minimal prongs. This classic silhouette maximises light capture to reflect an incomparable scintillation. Perfect for weddings, engagements, or timeless luxury statements.',
    descriptionHtml: '<p>A breathtaking round brilliant-cut solitaire diamond held elegantly in place by six minimal prongs. This classic silhouette maximises light capture to reflect an incomparable scintillation. Perfect for weddings, engagements, or timeless luxury statements.</p>',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '1250.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '1850.00', currencyCode: 'USD' }
    },
    images: {
      edges: [
        { node: { url: IMAGES.rings[0], altText: 'Celeste Diamond Solitaire Ring - Front view' } },
        { node: { url: IMAGES.rings[1], altText: 'Celeste Diamond Solitaire Ring - Side detail' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/101',
            title: '18K White Gold / 5',
            price: { amount: '1250.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '1500.00', currencyCode: 'USD' },
            sku: 'RNG-CEL-WG-05',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K White Gold' },
              { name: 'Ring Size', value: '5' }
            ],
            image: { url: IMAGES.rings[0], altText: 'Celeste Diamond Solitaire Ring - White Gold' }
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/102',
            title: '18K Yellow Gold / 6',
            price: { amount: '1350.00', currencyCode: 'USD' },
            compareAtPrice: null,
            sku: 'RNG-CEL-YG-06',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K Yellow Gold' },
              { name: 'Ring Size', value: '6' }
            ],
            image: { url: IMAGES.rings[1], altText: 'Celeste Diamond Solitaire Ring - Yellow Gold' }
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/103',
            title: '18K Rose Gold / 7',
            price: { amount: '1450.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '1650.00', currencyCode: 'USD' },
            sku: 'RNG-CEL-RG-07',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K Rose Gold' },
              { name: 'Ring Size', value: '7' }
            ],
            image: { url: IMAGES.rings[0], altText: 'Celeste Diamond Solitaire Ring - Rose Gold' }
          }
        }
      ]
    },
    options: [
      { name: 'Metal', values: ['18K White Gold', '18K Yellow Gold', '18K Rose Gold'] },
      { name: 'Ring Size', values: ['5', '6', '7', '8'] }
    ],
    metafields: [
      { namespace: 'custom', key: 'gemstone', value: 'Diamond' },
      { namespace: 'custom', key: 'metal', value: '18K Gold' },
      { namespace: 'custom', key: 'certification', value: 'GIA Certified Conflict-Free' },
      { namespace: 'custom', key: 'carat_weight', value: '1.2 Carats' }
    ],
    tags: ['Ring', 'Diamond', '18K Gold', 'Trending', 'Best Seller', 'Engagement'],
    vendor: 'AURA Atelier',
    productType: 'Ring'
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'siren-emerald-eternity-band',
    title: 'Siren Emerald Eternity Band',
    description: 'An unbroken circle of deep, verdant cushion-cut Colombian emeralds totaling 3.5 carats. Each emerald is hand-selected and prong-set in highly polished 18k yellow gold to highlight its natural forest tones.',
    descriptionHtml: '<p>An unbroken circle of deep, verdant cushion-cut Colombian emeralds totaling 3.5 carats. Each emerald is hand-selected and prong-set in highly polished 18k yellow gold to highlight its natural forest tones.</p>',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '2200.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '2600.00', currencyCode: 'USD' }
    },
    images: {
      edges: [
        { node: { url: IMAGES.rings[3], altText: 'Siren Emerald Eternity Band' } },
        { node: { url: IMAGES.rings[1], altText: 'Siren Emerald Eternity Band detail' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/201',
            title: '18K Yellow Gold / 6',
            price: { amount: '2200.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '2500.00', currencyCode: 'USD' },
            sku: 'RNG-SIR-YG-06',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K Yellow Gold' },
              { name: 'Ring Size', value: '6' }
            ],
            image: { url: IMAGES.rings[3], altText: 'Siren Emerald Eternity Band' }
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/202',
            title: '18K White Gold / 7',
            price: { amount: '2400.00', currencyCode: 'USD' },
            compareAtPrice: null,
            sku: 'RNG-SIR-WG-07',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K White Gold' },
              { name: 'Ring Size', value: '7' }
            ],
            image: { url: IMAGES.rings[3], altText: 'Siren Emerald Eternity Band White Gold' }
          }
        }
      ]
    },
    options: [
      { name: 'Metal', values: ['18K Yellow Gold', '18K White Gold'] },
      { name: 'Ring Size', values: ['6', '7', '8'] }
    ],
    metafields: [
      { namespace: 'custom', key: 'gemstone', value: 'Emerald' },
      { namespace: 'custom', key: 'metal', value: '18K Yellow Gold' },
      { namespace: 'custom', key: 'certification', value: 'Swiss Gemmological Institute (SSEF)' }
    ],
    tags: ['Ring', 'Emerald', '18K Gold', 'New Arrivals', 'Eternity'],
    vendor: 'AURA Atelier',
    productType: 'Ring'
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'aura-solitaire-diamond-necklace',
    title: 'Aura Solitaire Diamond Necklace',
    description: 'A brilliant 0.8-carat GIA certified diamond floating effortlessly on a delicate 18-karat solid white gold chain. Features an adjustable link system to style at various neck drop heights.',
    descriptionHtml: '<p>A brilliant 0.8-carat GIA certified diamond floating effortlessly on a delicate 18-karat solid white gold chain.</p>',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '950.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '950.00', currencyCode: 'USD' }
    },
    images: {
      edges: [
        { node: { url: IMAGES.necklaces[0], altText: 'Aura Solitaire Diamond Necklace' } },
        { node: { url: IMAGES.necklaces[1], altText: 'Aura Solitaire Diamond Necklace Model' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/301',
            title: '18K White Gold / O/S',
            price: { amount: '950.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '1200.00', currencyCode: 'USD' },
            sku: 'NCK-AUR-WG-OS',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K White Gold' },
              { name: 'Length', value: '18 Inches' }
            ],
            image: { url: IMAGES.necklaces[0], altText: 'Aura Solitaire Diamond Necklace' }
          }
        }
      ]
    },
    options: [
      { name: 'Metal', values: ['18K White Gold'] },
      { name: 'Length', values: ['18 Inches'] }
    ],
    metafields: [
      { namespace: 'custom', key: 'gemstone', value: 'Diamond' },
      { namespace: 'custom', key: 'metal', value: '18K White Gold' }
    ],
    tags: ['Necklace', 'Diamond', '18K Gold', 'Best Seller', 'Pendant'],
    vendor: 'AURA Atelier',
    productType: 'Necklace'
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'lumina-diamond-studs',
    title: 'Lumina Diamond Studs',
    description: 'Perfect round-cut matching diamonds set in premium, skin-safe 18k white gold. Secured with standard heavy scroll push-backs to sit flat on the ear lobe.',
    descriptionHtml: '<p>Perfect round-cut matching diamonds set in premium, skin-safe 18k white gold.</p>',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '680.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '880.00', currencyCode: 'USD' }
    },
    images: {
      edges: [
        { node: { url: IMAGES.earrings[0], altText: 'Lumina Diamond Studs' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/401',
            title: '0.5 ctw / 18K White Gold',
            price: { amount: '680.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '780.00', currencyCode: 'USD' },
            sku: 'EAR-LUM-WG-05',
            availableForSale: true,
            selectedOptions: [
              { name: 'Carat Weight', value: '0.5 ctw' },
              { name: 'Metal', value: '18K White Gold' }
            ],
            image: null
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/402',
            title: '1.0 ctw / 18K White Gold',
            price: { amount: '880.00', currencyCode: 'USD' },
            compareAtPrice: null,
            sku: 'EAR-LUM-WG-10',
            availableForSale: true,
            selectedOptions: [
              { name: 'Carat Weight', value: '1.0 ctw' },
              { name: 'Metal', value: '18K White Gold' }
            ],
            image: null
          }
        }
      ]
    },
    options: [
      { name: 'Carat Weight', values: ['0.5 ctw', '1.0 ctw'] },
      { name: 'Metal', values: ['18K White Gold'] }
    ],
    metafields: [
      { namespace: 'custom', key: 'gemstone', value: 'Diamond' },
      { namespace: 'custom', key: 'metal', value: '18K White Gold' }
    ],
    tags: ['Earring', 'Diamond', '18K Gold', 'Classic', 'Best Seller'],
    vendor: 'AURA Atelier',
    productType: 'Earring'
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'aether-diamond-tennis-bracelet',
    title: 'Aether Diamond Tennis Bracelet',
    description: 'An elegant strand of individually set round brilliant-cut diamonds wrapping the wrist in continuous light. Includes double-security box clasps.',
    descriptionHtml: '<p>An elegant strand of individually set round brilliant-cut diamonds wrapping the wrist.</p>',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '3400.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '3400.00', currencyCode: 'USD' }
    },
    images: {
      edges: [
        { node: { url: IMAGES.bracelets[0], altText: 'Aether Diamond Tennis Bracelet' } },
        { node: { url: IMAGES.bracelets[1], altText: 'Aether Diamond Tennis Bracelet Detail' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/501',
            title: '18K White Gold / 7 Inches',
            price: { amount: '3400.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '4000.00', currencyCode: 'USD' },
            sku: 'BRC-AET-WG-07',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K White Gold' },
              { name: 'Length', value: '7 Inches' }
            ],
            image: null
          }
        }
      ]
    },
    options: [
      { name: 'Metal', values: ['18K White Gold'] },
      { name: 'Length', values: ['7 Inches', '8 Inches'] }
    ],
    metafields: [
      { namespace: 'custom', key: 'gemstone', value: 'Diamond' },
      { namespace: 'custom', key: 'metal', value: '18K White Gold' }
    ],
    tags: ['Bracelet', 'Diamond', '18K Gold', 'Trending', 'Eternity'],
    vendor: 'AURA Atelier',
    productType: 'Bracelet'
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'tessera-sapphire-drop-earrings',
    title: 'Tessera Sapphire Drop Earrings',
    description: 'Deep royal blue cushion-cut sapphires hanging gracefully from a diamond encrusted geometrical link. Stunning vintage styling for evening wear.',
    descriptionHtml: '<p>Deep royal blue cushion-cut sapphires hanging gracefully from a diamond encrusted geometrical link.</p>',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '1800.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '1800.00', currencyCode: 'USD' }
    },
    images: {
      edges: [
        { node: { url: IMAGES.earrings[1], altText: 'Tessera Sapphire Drop Earrings' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/601',
            title: '18K Yellow Gold',
            price: { amount: '1800.00', currencyCode: 'USD' },
            compareAtPrice: { amount: '2100.00', currencyCode: 'USD' },
            sku: 'EAR-TES-YG',
            availableForSale: true,
            selectedOptions: [
              { name: 'Metal', value: '18K Yellow Gold' }
            ],
            image: null
          }
        }
      ]
    },
    options: [
      { name: 'Metal', values: ['18K Yellow Gold'] }
    ],
    metafields: [
      { namespace: 'custom', key: 'gemstone', value: 'Sapphire' },
      { namespace: 'custom', key: 'metal', value: '18K Yellow Gold' }
    ],
    tags: ['Earring', 'Sapphire', '18K Gold', 'New Arrivals', 'Vintage'],
    vendor: 'AURA Atelier',
    productType: 'Earring'
  }
];

// ==========================================
// MOCK COLLECTIONS DATA
// ==========================================
const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'gid://shopify/Collection/10',
    handle: 'all-jewellery',
    title: 'All Fine Jewellery',
    description: 'Explore our complete treasury of signature diamond rings, emerald pendants, drop studs and master-crafted bracelets.',
    image: { url: IMAGES.banners.collection, altText: 'All Fine Jewellery Banner' },
    products: {
      edges: MOCK_PRODUCTS.map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '6' }
    }
  },
  {
    id: 'gid://shopify/Collection/20',
    handle: 'rings',
    title: 'Rings',
    description: 'Impeccable gold engagement, wedding and cocktail rings featuring solitaire diamonds and vibrant gemstones.',
    image: { url: IMAGES.rings[0], altText: 'Luxury rings collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Ring').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '2' }
    }
  },
  {
    id: 'gid://shopify/Collection/30',
    handle: 'necklaces',
    title: 'Necklaces & Pendants',
    description: 'Floating solitaire diamond necklaces, statement luxury chokers and modern everyday gold chains.',
    image: { url: IMAGES.necklaces[0], altText: 'Luxury necklaces collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Necklace').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '1' }
    }
  },
  {
    id: 'gid://shopify/Collection/40',
    handle: 'earrings',
    title: 'Earrings',
    description: 'Classic round-cut diamond studs, vintage geometric drop sapphire hoops and modern pearl drops.',
    image: { url: IMAGES.earrings[0], altText: 'Luxury earrings collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Earring').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '2' }
    }
  },
  {
    id: 'gid://shopify/Collection/50',
    handle: 'bracelets',
    title: 'Bracelets',
    description: 'Master-crafted diamond tennis strands and heavy luxury solid gold bangles.',
    image: { url: IMAGES.bracelets[0], altText: 'Luxury bracelets collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Bracelet').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '1' }
    }
  }
];

// ==========================================
// MOCK REVIEWS STORE (Stored in Memory)
// ==========================================
const MOCK_REVIEWS: Record<string, Review[]> = {
  'gid://shopify/Product/1': [
    {
      id: 'rev_1',
      author: 'Sophia Sterling',
      rating: 5,
      title: 'Absolutely Breathtaking Scintillation',
      body: 'I was hesitant to buy a diamond solitaire online, but the Celeste ring exceeded every expectation. The diamond is exceptionally bright and clarity is perfect. A true masterpiece.',
      createdAt: '2026-05-12T10:00:00Z'
    },
    {
      id: 'rev_2',
      author: 'David Vance',
      rating: 5,
      title: 'A Perfect Engagement Ring',
      body: 'She said yes! The white gold setting sits very neatly on her finger and allows the diamond to stand out and capture light brilliantly. Shipping was secured and prompt.',
      createdAt: '2026-06-02T14:30:00Z'
    }
  ],
  'gid://shopify/Product/2': [
    {
      id: 'rev_3',
      author: 'Eleanor P.',
      rating: 5,
      title: 'Royal Green Beauty',
      body: 'The cushion-cut emeralds have an incredible glow to them. Under sun rays, the forest green tone is vibrant. High quality construction and sizing matches standard jewelry store sizing perfectly.',
      createdAt: '2026-06-15T09:15:00Z'
    }
  ]
};

// ==========================================
// SIMULATED CART DATABASE (LOCAL STORAGE)
// ==========================================
const CART_STORAGE_KEY = 'aura_shopify_cart';

function getStoredCart(): Cart | null {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function saveCart(cart: Cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function calculateCartTotals(lines: CartLine[]): { totalAmount: Money; subtotalAmount: Money; totalQuantity: number } {
  let subtotal = 0;
  let qty = 0;
  lines.forEach(l => {
    subtotal += parseFloat(l.merchandise.price.amount) * l.quantity;
    qty += l.quantity;
  });

  return {
    totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
    totalQuantity: qty
  };
}

// ==========================================
// MOCK CLIENT EXPORT OBJECT
// ==========================================
export const shopifyMockClient = {
  // Get all products
  async getProducts(options?: { first?: number; sortKey?: string; query?: string }): Promise<Product[]> {
    await new Promise(r => setTimeout(r, 400)); // Simulating network latency
    let products = [...MOCK_PRODUCTS];

    if (options?.query) {
      const q = options.query.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (options?.sortKey) {
      if (options.sortKey === 'PRICE_ASC') {
        products.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
      } else if (options.sortKey === 'PRICE_DESC') {
        products.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
      } else if (options.sortKey === 'TITLE') {
        products.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    if (options?.first) {
      products = products.slice(0, options.first);
    }

    return products;
  },

  // Get product detail by handle
  async getProductByHandle(handle: string): Promise<Product | null> {
    await new Promise(r => setTimeout(r, 300));
    const p = MOCK_PRODUCTS.find(prod => prod.handle === handle);
    return p ? JSON.parse(JSON.stringify(p)) : null;
  },

  // Get list of collections
  async getCollections(): Promise<Collection[]> {
    await new Promise(r => setTimeout(r, 300));
    return JSON.parse(JSON.stringify(MOCK_COLLECTIONS));
  },

  // Get collection details with filters and sorting
  async getCollectionByHandle(
    handle: string,
    filters?: { metal?: string; gemstone?: string; minPrice?: number; maxPrice?: number },
    sortKey?: string
  ): Promise<Collection | null> {
    await new Promise(r => setTimeout(r, 500));
    const col = MOCK_COLLECTIONS.find(c => c.handle === handle);
    if (!col) return null;

    // Filter products within collection
    let filteredProducts = MOCK_PRODUCTS.filter(p => {
      // Check collection mapping
      if (handle !== 'all-jewellery') {
        const typeMatch = p.productType.toLowerCase() === handle.slice(0, -1); // 'rings' -> 'ring'
        if (handle === 'earrings') {
          if (p.productType !== 'Earring') return false;
        } else if (handle === 'necklaces') {
          if (p.productType !== 'Necklace') return false;
        } else if (!typeMatch) {
          return false;
        }
      }

      // Check metal filter
      if (filters?.metal) {
        const metalMeta = p.metafields.find(m => m.key === 'metal')?.value || '';
        if (!metalMeta.toLowerCase().includes(filters.metal.toLowerCase()) && !p.tags.some(t => t.toLowerCase() === filters.metal?.toLowerCase())) {
          return false;
        }
      }

      // Check gemstone filter
      if (filters?.gemstone) {
        const gemMeta = p.metafields.find(m => m.key === 'gemstone')?.value || '';
        if (gemMeta.toLowerCase() !== filters.gemstone.toLowerCase()) {
          return false;
        }
      }

      // Check price range
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      if (filters?.minPrice !== undefined && price < filters.minPrice) return false;
      if (filters?.maxPrice !== undefined && price > filters.maxPrice) return false;

      return true;
    });

    // Apply sorting
    if (sortKey === 'PRICE_ASC') {
      filteredProducts.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sortKey === 'PRICE_DESC') {
      filteredProducts.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    } else if (sortKey === 'TITLE') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === 'BEST_SELLING') {
      filteredProducts = filteredProducts.filter(p => p.tags.includes('Best Seller')).concat(
        filteredProducts.filter(p => !p.tags.includes('Best Seller'))
      );
    }

    const responseCollection = { ...col };
    responseCollection.products = {
      edges: filteredProducts.map(p => ({ node: p })),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null
      }
    };

    return JSON.parse(JSON.stringify(responseCollection));
  },

  // Get product recommendations
  async getRecommendations(productId: string): Promise<Product[]> {
    await new Promise(r => setTimeout(r, 450));
    // Return products excluding current product
    return MOCK_PRODUCTS.filter(p => p.id !== productId).slice(0, 4);
  },

  // Predictive search
  async predictiveSearch(query: string): Promise<{ products: Product[]; collections: Collection[] }> {
    await new Promise(r => setTimeout(r, 200));
    const q = query.toLowerCase();
    if (!q) return { products: [], collections: [] };

    const products = MOCK_PRODUCTS.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.productType.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);

    const collections = MOCK_COLLECTIONS.filter(
      c => c.title.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q)
    ).slice(0, 3);

    return { products, collections };
  },

  // Get product reviews
  async getReviews(productId: string): Promise<Review[]> {
    await new Promise(r => setTimeout(r, 150));
    return MOCK_REVIEWS[productId] ? [...MOCK_REVIEWS[productId]] : [];
  },

  // Add review
  async addReview(productId: string, review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    await new Promise(r => setTimeout(r, 300));
    const newReview: Review = {
      ...review,
      id: `rev_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    if (!MOCK_REVIEWS[productId]) {
      MOCK_REVIEWS[productId] = [];
    }
    MOCK_REVIEWS[productId].unshift(newReview);

    return newReview;
  },

  // Get store configuration
  async getStoreSettings(): Promise<StoreSettings> {
    return {
      name: 'AURA',
      description: 'Premium Fine Jewellery',
      logo: 'AURA'
    };
  },

  // ==========================================
  // SHOPPING CART MANAGEMENT
  // ==========================================
  async createCart(): Promise<Cart> {
    const newCart: Cart = {
      id: `cart_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lines: { edges: [] },
      cost: {
        totalAmount: { amount: '0.00', currencyCode: 'USD' },
        subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
        totalTaxAmount: null
      },
      totalQuantity: 0
    };
    saveCart(newCart);
    return newCart;
  },

  async getCart(cartId: string): Promise<Cart | null> {
    const stored = getStoredCart();
    if (stored && stored.id === cartId) {
      return stored;
    }
    return null;
  },

  async addToCart(cartId: string, linesToAdd: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
    let cart = getStoredCart();
    if (!cart || cart.id !== cartId) {
      cart = await this.createCart();
    }

    const currentLines = [...cart.lines.edges];

    for (const item of linesToAdd) {
      // Find variant details in MOCK_PRODUCTS
      let matchedVariant: ProductVariant | null = null;
      let matchedProduct: Product | null = null;

      for (const p of MOCK_PRODUCTS) {
        const variant = p.variants.edges.find(v => v.node.id === item.merchandiseId);
        if (variant) {
          matchedVariant = variant.node;
          matchedProduct = p;
          break;
        }
      }

      if (!matchedVariant || !matchedProduct) continue;

      // Check if variant already exists in cart
      const existingLineIndex = currentLines.findIndex(
        l => l.node.merchandise.id === item.merchandiseId
      );

      if (existingLineIndex > -1) {
        currentLines[existingLineIndex].node.quantity += item.quantity;
        const linePrice = parseFloat(matchedVariant.price.amount);
        currentLines[existingLineIndex].node.cost.totalAmount.amount = (
          linePrice * currentLines[existingLineIndex].node.quantity
        ).toFixed(2);
      } else {
        const linePrice = parseFloat(matchedVariant.price.amount);
        const newLine: CartLine = {
          id: `line_${Math.random().toString(36).substring(2, 10)}`,
          quantity: item.quantity,
          merchandise: {
            ...matchedVariant,
            product: {
              id: matchedProduct.id,
              title: matchedProduct.title,
              handle: matchedProduct.handle,
              images: matchedProduct.images
            }
          },
          cost: {
            totalAmount: {
              amount: (linePrice * item.quantity).toFixed(2),
              currencyCode: matchedVariant.price.currencyCode
            }
          }
        };
        currentLines.push({ node: newLine });
      }
    }

    cart.lines.edges = currentLines;
    cart.updatedAt = new Date().toISOString();
    
    // Recalculate totals
    const totals = calculateCartTotals(currentLines.map(cl => cl.node));
    cart.cost.totalAmount = totals.totalAmount;
    cart.cost.subtotalAmount = totals.subtotalAmount;
    cart.totalQuantity = totals.totalQuantity;

    saveCart(cart);
    return JSON.parse(JSON.stringify(cart));
  },

  async updateCartLines(cartId: string, linesToUpdate: { id: string; quantity: number }[]): Promise<Cart> {
    const cart = getStoredCart();
    if (!cart || cart.id !== cartId) throw new Error('Cart not found');

    const currentLines = [...cart.lines.edges];

    for (const item of linesToUpdate) {
      const idx = currentLines.findIndex(l => l.node.id === item.id);
      if (idx > -1) {
        if (item.quantity <= 0) {
          // Remove if quantity is 0 or negative
          currentLines.splice(idx, 1);
        } else {
          currentLines[idx].node.quantity = item.quantity;
          const unitPrice = parseFloat(currentLines[idx].node.merchandise.price.amount);
          currentLines[idx].node.cost.totalAmount.amount = (unitPrice * item.quantity).toFixed(2);
        }
      }
    }

    cart.lines.edges = currentLines;
    cart.updatedAt = new Date().toISOString();

    const totals = calculateCartTotals(currentLines.map(cl => cl.node));
    cart.cost.totalAmount = totals.totalAmount;
    cart.cost.subtotalAmount = totals.subtotalAmount;
    cart.totalQuantity = totals.totalQuantity;

    saveCart(cart);
    return JSON.parse(JSON.stringify(cart));
  },

  async removeFromCart(cartId: string, lineIdsToRemove: string[]): Promise<Cart> {
    const cart = getStoredCart();
    if (!cart || cart.id !== cartId) throw new Error('Cart not found');

    let currentLines = [...cart.lines.edges];
    currentLines = currentLines.filter(l => !lineIdsToRemove.includes(l.node.id));

    cart.lines.edges = currentLines;
    cart.updatedAt = new Date().toISOString();

    const totals = calculateCartTotals(currentLines.map(cl => cl.node));
    cart.cost.totalAmount = totals.totalAmount;
    cart.cost.subtotalAmount = totals.subtotalAmount;
    cart.totalQuantity = totals.totalQuantity;

    saveCart(cart);
    return JSON.parse(JSON.stringify(cart));
  }
};
export type ShopifyClient = typeof shopifyMockClient;
