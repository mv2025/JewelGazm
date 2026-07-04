import { CaseStudy, PortfolioCategory } from './types';

// Unsplash photography references
const IMAGES = {
  product: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80',
  ],
  commercial: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
  ],
  rental: [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
  ],
  food: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop&q=80',
  ],
  cosmetics: [
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80',
  ],
  luxury: [
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&auto=format&fit=crop&q=80',
  ]
};

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    name: 'Product Photography',
    handle: 'product',
    description: 'Macro detail capture showcasing gemstone fire, metal contours, and premium styling.',
    image: IMAGES.product[0]
  },
  {
    name: 'Fashion & Editorial',
    handle: 'fashion',
    description: 'Creative set design, high-end styling, and dynamic lighting layouts for editorial campaigns.',
    image: IMAGES.fashion[0]
  },
  {
    name: 'Commercial & Brand',
    handle: 'commercial',
    description: 'Crisp catalog imagery and visual assets optimized for digital storefronts and campaigns.',
    image: IMAGES.commercial[0]
  },
  {
    name: 'Lifestyle & Interiors',
    handle: 'lifestyle',
    description: 'Atmospheric home decor, lifestyle storytelling, and structured interior spaces.',
    image: IMAGES.lifestyle[0]
  },
  {
    name: 'Premium Studio Rental',
    handle: 'rental',
    description: 'Explore our state-of-the-art photography production bays and cyclorama walls.',
    image: IMAGES.rental[0]
  },
  {
    name: 'Culinary & Food',
    handle: 'food',
    description: 'Vibrant, styled food photography invoking rich sensory culinary experiences.',
    image: IMAGES.food[0]
  },
  {
    name: 'Cosmetics & Beauty',
    handle: 'cosmetics',
    description: 'Viscosity shots, water splashes, and texture details showcasing high-end cosmetic lines.',
    image: IMAGES.cosmetics[0]
  },
  {
    name: 'Luxury Products',
    handle: 'luxury',
    description: 'Premium reflection control and precise lighting for high-value timepieces and goods.',
    image: IMAGES.luxury[0]
  }
];

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs_1',
    title: 'The Aurum Crystalline Campaign',
    handle: 'aurum-product-campaign',
    client: 'Aurum Fine Products',
    category: 'Product',
    year: '2026',
    featured: true,
    heroImage: IMAGES.product[0],
    moodboardImages: [IMAGES.product[1], IMAGES.product[2]],
    galleryImages: [IMAGES.product[0], IMAGES.product[1], IMAGES.product[2]],
    tags: ['Macro', 'Reflections', 'Focus Stacking', 'Strobes'],
    challenge: 'The primary challenge lay in capturing the complex refraction of a 3-carat diamond solitaire ring alongside polished 18K white gold bands. High metallic reflectivity created harsh specular blowouts, while the diamond facets required extreme sharpness without losing internal light depth.',
    process: 'We engineered a dark-field lighting solution utilizing micro-mirrors and translucent white diffuser cones around the jewelry rig. Focus stacking technique was used, capturing 25 individual exposure slices at different focal depths, which were then blended in post-production to ensure edge-to-edge razor sharpness.',
    equipmentUsed: ['Hasselblad H6D-100c', '120mm Macro Lens', 'Profoto D2 1000 AirTTL Strobes', 'Custom Acrylic Rigs'],
    lightingSetup: 'Key lighting was achieved using a top-mounted Profoto strobe through a double-diffused grid box. Specs and gold sweeps were carved out using hand-held silver reflective cards placed 5 inches from the ring shank.',
    deliverables: [
      '15 Ultra-High Resolution Print-Ready Hero Visuals',
      '3 Behind-the-Scenes Social Video Edits',
      'Interactive 360-Degree Macro View for Web Storefront'
    ],
    results: 'The assets directly powered Aurum\'s digital billboard launch, resulting in a 42% increase in ring reservations within the first month. The focus-stacked print assets were displayed at 300 DPI without loss of diamond fire.',
    clientReview: {
      author: 'Sophia Sterling',
      role: 'Creative Director at Aurum',
      quote: 'FRT Studios understands how to photograph light. They captured the absolute fire of our solitaire diamonds with a technical precision we had never seen before.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'cs_2',
    title: 'Autumnal Fluidity Campaign',
    handle: 'vogue-autumn-editorial',
    client: 'Vogue India x Maison',
    category: 'Fashion',
    year: '2026',
    featured: true,
    heroImage: IMAGES.fashion[0],
    moodboardImages: [IMAGES.fashion[1], IMAGES.fashion[2]],
    galleryImages: [IMAGES.fashion[0], IMAGES.fashion[1], IMAGES.fashion[2]],
    tags: ['Editorial', 'High-Speed Sync', 'Motion Blur', 'Set Design'],
    challenge: 'Conveying the fluid movement of silk and linen fabrics against a cold, brutalist concrete studio wall. The goal was to freeze dynamic jumps and dress sweeps while keeping natural, soft falloff shadows in a single exposure.',
    process: 'We constructed a brutalist concrete plaster panel wall in Studio Bay A. We paired high-speed sync flash triggers with high-volume wind machines, capturing model movements at 1/4000th of a second with sub-millisecond flash duration pulses.',
    equipmentUsed: ['Sony A1', '24-70mm f/2.8 GM II', 'Profoto Pro-11 Generators', 'Industrial Wind Blower'],
    lightingSetup: 'Key lighting was a Profoto Pro-11 generator firing into a 5-foot giant reflector octabox positioned 45 degrees overhead. An Aputure 600d was placed outside the studio bay window to cast clean, diagonal faux-sun shadows across the backdrop.',
    deliverables: [
      '12 Editorial Layout Spreads',
      '4K Cinematic Runway Showreel',
      'Social Campaign Assets (Instagram carousel layout)'
    ],
    results: 'The editorial series was published in the October issue of Vogue India. The campaign was highly praised for its visual contrast between concrete geometry and fluid silk motion.',
    clientReview: {
      author: 'Aria Mukherjee',
      role: 'Fashion Editor at Vogue',
      quote: 'The energy at FRT Studios is unmatched. They turned a brutalist set idea into a moving canvas of light and silk.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'cs_3',
    title: 'Luminous Skin Serums Story',
    handle: 'aura-skincare-luminous',
    client: 'AURA Cosmetics',
    category: 'Cosmetics',
    year: '2025',
    featured: false,
    heroImage: IMAGES.cosmetics[0],
    moodboardImages: [IMAGES.cosmetics[1]],
    galleryImages: [IMAGES.cosmetics[0], IMAGES.cosmetics[1]],
    tags: ['Water Splash', 'High Speed', 'Cross Polarization', 'Macro'],
    challenge: 'Showcasing the translucent, hydrating properties of high-end skincare bottles with fluid splashes. Glossy packaging labels and round glass bottles are notorious for creating unsightly, distracting studio reflections.',
    process: 'We used a high-speed laser trigger to freeze splash action precisely as water collided with the bottle resting on a slab of slate. Cross-polarization filters on both the lens and the strobes cut out direct reflection, revealing the rich amber tint of the glass bottle.',
    equipmentUsed: ['Hasselblad H6D-100c', '90mm Medium Format Lens', 'Laser Splash Trigger', 'Profoto B10X Plus'],
    lightingSetup: 'Back-lit through a large diffusion frame to make the glass bottle glow from within, with small silver reflector cards framing the left and right sides.',
    deliverables: [
      '8 Styled Hero Product Images',
      'Micro-fluid Splash Video Clips (4K 120FPS)'
    ],
    results: 'The visuals formed the core assets for Aura\'s global digital storefront relaunch, yielding a double-digit increase in add-to-cart conversions on the serum landing page.',
    clientReview: {
      author: 'Marcus Vance',
      role: 'Brand Manager at AURA',
      quote: 'The splash images were so clean they looked CGI. FRT captured the sensory texture of our product perfectly.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'cs_4',
    title: 'Monochrome Footwear Campaign',
    handle: 'stride-monochrome-sneakers',
    client: 'Stride Athletic',
    category: 'Commercial',
    year: '2025',
    featured: true,
    heroImage: IMAGES.commercial[0],
    moodboardImages: [IMAGES.commercial[1], IMAGES.commercial[2]],
    galleryImages: [IMAGES.commercial[0], IMAGES.commercial[1], IMAGES.commercial[2]],
    tags: ['Product', 'Hard Light', 'Reflections', 'Commercial'],
    challenge: 'Highlighting the leather grain and complex rubber tread textures of an all-black luxury sneaker without creating flat, silhouette-like images.',
    process: 'Instead of soft boxes, we opted for direct, hard spotlights to carve deep micro-shadows along the leather grains, paired with mirrors to bounce pinpoint highlights onto the shoe logos.',
    equipmentUsed: ['Sony A7R V', '90mm Macro Lens', 'Profoto Pro-11 strobe with Zoom Reflector'],
    lightingSetup: 'Single Profoto Zoom Spot positioned at a steep 75-degree angle behind the shoe, reflecting off small mirrors onto the front details.',
    deliverables: [
      '10 Retouched Sneaker Hero Images',
      '6 E-commerce Catalog cutouts'
    ],
    results: 'The campaign went live across social media channels, leading to a complete sellout of the monochrome shoe line within 10 days of launch.',
    clientReview: {
      author: 'Liam Sterling',
      role: 'Design Director at Stride',
      quote: 'We wanted hard-edged, bold imagery that showed off the raw design. FRT delivered exactly that and more.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  }
];
