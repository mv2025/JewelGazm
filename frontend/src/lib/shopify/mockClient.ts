import { Product, Collection, Cart, CartLine, StoreSettings, Review, Money, ProductVariant } from './types';

import goldCelesteRing from '@/assets/Featured-Products/gold-celeste-ring.png';
import goldSirenBand from '@/assets/Featured-Products/gold-siren-band.png';
import goldAuraNecklace from '@/assets/Featured-Products/gold-aura-necklace.png';
import goldLuminaStuds from '@/assets/Featured-Products/gold-lumina-studs.png';
import silverAuraNecklace from '@/assets/Featured-Products/Silver-Aura-Necklace.png';
import silverCelesteRing from '@/assets/Featured-Products/Silver-Celeste-Ring.png';
import silverLuminaStuds from '@/assets/Featured-Products/Silver-Lumina-Studs.png';
import silverSirenBand from '@/assets/Featured-Products/Silver-Siren-Band.png';
import silverGentsRing from '@/assets/Featured-Products/silver-gents-ring.png';

// ==========================================
// MOCK HIGH-FIDELITY IMAGES FROM UNSPLASH
// ==========================================
const IMAGES = {
  rings: [
    goldCelesteRing,
    goldSirenBand,
    silverCelesteRing,
    silverSirenBand,
    silverGentsRing
  ],
  necklaces: [
    goldAuraNecklace,
    silverAuraNecklace
  ],
  earrings: [
    goldLuminaStuds,
    silverLuminaStuds
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

const gentsGoldRingsModules = import.meta.glob('@/assets/Creations/Gents-Gold-Rings/**/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

const generatedGentsRings: Product[] = [];
const ringsMap: Record<string, string[]> = {};

for (const path in gentsGoldRingsModules) {
  const match = path.match(/Ring-(\d+)/);
  if (match) {
    const ringId = match[1];
    if (!ringsMap[ringId]) ringsMap[ringId] = [];
    const mod = gentsGoldRingsModules[path] as string;
    if (mod) ringsMap[ringId].push(mod);
  }
}

Object.entries(ringsMap).forEach(([ringNum, images]) => {
  generatedGentsRings.push({
    id: `gid://shopify/Product/GENT-GLD-${ringNum}`,
    handle: `gents-gold-ring-${ringNum}`,
    title: `Aura Gents Gold Ring ${ringNum}`,
    description: `A masterfully crafted 18k gold gents ring. Featuring a substantial weight and exquisite finish.`,
    descriptionHtml: `<p>A masterfully crafted 18k gold gents ring.</p>`,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '45000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '45000.00', currencyCode: 'INR' } },
    images: { edges: images.map(img => ({ node: { url: img, altText: `Gents Gold Ring ${ringNum}` } })) },
    variants: { edges: [{ node: { id: `v-GENT-GLD-${ringNum}`, title: 'Default', price: { amount: '45000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `RNG-GENT-GLD-${ringNum}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gemstone', value: 'None' }],
    tags: ['Ring', 'Gold', 'Gents'],
    vendor: 'AURA',
    productType: 'Ring'
  });
});

const ladiesRingsModules = import.meta.glob('@/assets/Creations/Ladies-Rings/**/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });

const generatedLadiesRings: Product[] = [];
const ladiesRingsMap: Record<string, string[]> = {};
let genericLadiesRingId = 100;

for (const path in ladiesRingsModules) {
  const mod = ladiesRingsModules[path] as string;
  if (!mod) continue;
  
  const match = path.match(/Ring-(\d+)/i);
  if (match) {
    const ringId = match[1];
    if (!ladiesRingsMap[ringId]) ladiesRingsMap[ringId] = [];
    ladiesRingsMap[ringId].push(mod);
  } else {
    ladiesRingsMap[genericLadiesRingId.toString()] = [mod];
    genericLadiesRingId++;
  }
}

Object.entries(ladiesRingsMap).forEach(([ringNum, images]) => {
  generatedLadiesRings.push({
    id: `gid://shopify/Product/LADIES-RNG-${ringNum}`,
    handle: `ladies-ring-${ringNum}`,
    title: `Aura Ladies Ring ${ringNum}`,
    description: `An elegantly crafted ladies ring. Designed for a timeless statement of luxury.`,
    descriptionHtml: `<p>An elegantly crafted ladies ring.</p>`,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '65000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '65000.00', currencyCode: 'INR' } },
    images: { edges: images.map((img, i) => ({ node: { url: img, altText: `Ladies Ring ${ringNum} - ${i + 1}` } })) },
    variants: { edges: [{ node: { id: `v-LADIES-RNG-${ringNum}`, title: 'Default', price: { amount: '65000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `RNG-LDS-${ringNum}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Ring', 'Gold', 'Ladies', 'Diamond'],
    vendor: 'AURA',
    productType: 'Ring'
  });
});

const braceletsModules = import.meta.glob('@/assets/Creations/Bracelets/**/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

const generatedBracelets: Product[] = [];
const braceletsMap: Record<string, string[]> = {};

for (const path in braceletsModules) {
  const match = path.match(/Bracelet-(\d+)/);
  if (match) {
    const bId = match[1];
    if (!braceletsMap[bId]) braceletsMap[bId] = [];
    const mod = braceletsModules[path] as string;
    if (mod) braceletsMap[bId].push(mod);
  }
}

Object.entries(braceletsMap).forEach(([bNum, images]) => {
  generatedBracelets.push({
    id: `gid://shopify/Product/BRACELET-${bNum}`,
    handle: `bracelet-${bNum}`,
    title: `Aura Fine Bracelet ${bNum}`,
    description: `A masterfully crafted bracelet featuring exquisite detailing. Perfect for everyday elegance.`,
    descriptionHtml: `<p>A masterfully crafted bracelet featuring exquisite detailing.</p>`,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '55000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '55000.00', currencyCode: 'INR' } },
    images: { edges: images.map(img => ({ node: { url: img, altText: `Bracelet ${bNum}` } })) },
    variants: { edges: [{ node: { id: `v-BRACELET-${bNum}`, title: 'Default', price: { amount: '55000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `BRC-${bNum}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }],
    tags: ['Bracelet', 'Jewellery', 'Ladies', 'Gold'],
    vendor: 'AURA',
    productType: 'Bracelet'
  });
});

const pendantsModules = import.meta.glob('@/assets/Creations/Pandent/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const generatedPendants: Product[] = [];
let pIdCounter = 1;
for (const path in pendantsModules) {
  const mod = pendantsModules[path] as string;
  if (mod) {
    generatedPendants.push({
      id: `gid://shopify/Product/PENDANT-${pIdCounter}`,
      handle: `pendant-${pIdCounter}`,
      title: `Aura Fine Pendant ${pIdCounter}`,
      description: `A delicate and intricate pendant piece. Designed to radiate elegance.`,
      descriptionHtml: `<p>A delicate and intricate pendant piece.</p>`,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '22000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '22000.00', currencyCode: 'INR' } },
      images: { edges: [{ node: { url: mod, altText: `Pendant ${pIdCounter}` } }] },
      variants: { edges: [{ node: { id: `v-PENDANT-${pIdCounter}`, title: 'Default', price: { amount: '22000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `PND-${pIdCounter}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
      options: [{ name: 'Metal', values: ['18K Gold'] }],
      metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'style', value: 'Single Pendant' }],
      tags: ['Pendant', 'Jewellery', 'Ladies', 'Single Pendant', 'Gold'],
      vendor: 'AURA',
      productType: 'Pendant'
    });
    pIdCounter++;
  }
}

const pendantSetsModules = import.meta.glob('@/assets/Creations/Pandent/Pandents-Set/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const generatedPendantSets: Product[] = [];
let psIdCounter = 1;
for (const path in pendantSetsModules) {
  const mod = pendantSetsModules[path] as string;
  if (mod) {
    generatedPendantSets.push({
      id: `gid://shopify/Product/PENDANT-SET-${psIdCounter}`,
      handle: `pendant-set-${psIdCounter}`,
      title: `Aura Pendant Set ${psIdCounter}`,
      description: `A stunning complete pendant set, exquisitely matched for timeless elegance.`,
      descriptionHtml: `<p>A stunning complete pendant set, exquisitely matched for timeless elegance.</p>`,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '68000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '68000.00', currencyCode: 'INR' } },
      images: { edges: [{ node: { url: mod, altText: `Pendant Set ${psIdCounter}` } }] },
      variants: { edges: [{ node: { id: `v-PENDANT-SET-${psIdCounter}`, title: 'Default', price: { amount: '68000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `PNDS-${psIdCounter}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
      options: [{ name: 'Metal', values: ['18K Gold'] }],
      metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'style', value: 'Pendant Set' }],
      tags: ['Pendant', 'Pendant Set', 'Jewellery', 'Ladies', 'Gold'],
      vendor: 'AURA',
      productType: 'Pendant'
    });
    psIdCounter++;
  }
}

const earringsModules = import.meta.glob('@/assets/Creations/Earrings/**/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const generatedEarrings: Product[] = [];
const earringsMap: Record<string, string[]> = {};

for (const path in earringsModules) {
  const match = path.match(/Earring-(\d+)/);
  if (match) {
    const eId = match[1];
    if (!earringsMap[eId]) earringsMap[eId] = [];
    const mod = earringsModules[path] as string;
    if (mod) earringsMap[eId].push(mod);
  }
}

Object.entries(earringsMap).forEach(([eNum, images]) => {
  generatedEarrings.push({
    id: `gid://shopify/Product/EARRING-${eNum}`,
    handle: `earring-${eNum}`,
    title: `Aura Fine Earring ${eNum}`,
    description: `A masterfully crafted pair of earrings featuring exquisite detailing. Perfect for everyday elegance.`,
    descriptionHtml: `<p>A masterfully crafted pair of earrings featuring exquisite detailing.</p>`,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '35000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '35000.00', currencyCode: 'INR' } },
    images: { edges: images.map(img => ({ node: { url: img, altText: `Earring ${eNum}` } })) },
    variants: { edges: [{ node: { id: `v-EARRING-${eNum}`, title: 'Default', price: { amount: '35000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `EAR-${eNum}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }],
    tags: ['Earring', 'Jewellery', 'Ladies', 'Gold'],
    vendor: 'AURA',
    productType: 'Earring'
  });
});

const menKadaModules = import.meta.glob('@/assets/Creations/Kada/Men/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const womenKadaModules = import.meta.glob('@/assets/Creations/Kada/Women/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const generatedKadas: Product[] = [];
let kId = 1;

for (const path in menKadaModules) {
  const mod = menKadaModules[path] as string;
  if (mod) {
    generatedKadas.push({
      id: `gid://shopify/Product/KADA-${kId}`,
      handle: `kada-men-${kId}`,
      title: `Aura Men's Kada ${kId}`,
      description: `A bold and sophisticated solid gold kada designed for men.`,
      descriptionHtml: `<p>A bold and sophisticated solid gold kada designed for men.</p>`,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '120000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '120000.00', currencyCode: 'INR' } },
      images: { edges: [{ node: { url: mod, altText: `Men's Kada ${kId}` } }] },
      variants: { edges: [{ node: { id: `v-KADA-${kId}`, title: 'Default', price: { amount: '120000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `KAD-M-${kId}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
      options: [{ name: 'Metal', values: ['18K Gold'] }],
      metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gender', value: 'Men' }],
      tags: ['Kada', 'Jewellery', 'Men', 'Gents', 'Gold'],
      vendor: 'AURA',
      productType: 'Kada'
    });
    kId++;
  }
}

for (const path in womenKadaModules) {
  const mod = womenKadaModules[path] as string;
  if (mod) {
    generatedKadas.push({
      id: `gid://shopify/Product/KADA-${kId}`,
      handle: `kada-women-${kId}`,
      title: `Aura Women's Kada ${kId}`,
      description: `An elegant and beautifully crafted solid gold kada designed for women.`,
      descriptionHtml: `<p>An elegant and beautifully crafted solid gold kada designed for women.</p>`,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '95000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '95000.00', currencyCode: 'INR' } },
      images: { edges: [{ node: { url: mod, altText: `Women's Kada ${kId}` } }] },
      variants: { edges: [{ node: { id: `v-KADA-${kId}`, title: 'Default', price: { amount: '95000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `KAD-W-${kId}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
      options: [{ name: 'Metal', values: ['18K Gold'] }],
      metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gender', value: 'Women' }],
      tags: ['Kada', 'Jewellery', 'Women', 'Ladies', 'Gold'],
      vendor: 'AURA',
      productType: 'Kada'
    });
    kId++;
  }
}

const goldNecklaceModules = import.meta.glob('@/assets/Creations/Neckless/Gold/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const silverNecklaceModules = import.meta.glob('@/assets/Creations/Neckless/Silver/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' });
const generatedNecklaces: Product[] = [];
let nId = 1;

for (const path in goldNecklaceModules) {
  const mod = goldNecklaceModules[path] as string;
  if (mod) {
    generatedNecklaces.push({
      id: `gid://shopify/Product/NECKLACE-${nId}`,
      handle: `necklace-gold-${nId}`,
      title: `Aura Gold Necklace ${nId}`,
      description: `A stunning and intricately designed solid gold necklace.`,
      descriptionHtml: `<p>A stunning and intricately designed solid gold necklace.</p>`,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '185000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '185000.00', currencyCode: 'INR' } },
      images: { edges: [{ node: { url: mod, altText: `Gold Necklace ${nId}` } }] },
      variants: { edges: [{ node: { id: `v-NECKLACE-${nId}`, title: 'Default', price: { amount: '185000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `NCK-GLD-${nId}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
      options: [{ name: 'Metal', values: ['18K Gold'] }],
      metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }],
      tags: ['Necklace', 'Jewellery', 'Gold', 'Ladies'],
      vendor: 'AURA',
      productType: 'Necklace'
    });
    nId++;
  }
}

for (const path in silverNecklaceModules) {
  const mod = silverNecklaceModules[path] as string;
  if (mod) {
    generatedNecklaces.push({
      id: `gid://shopify/Product/NECKLACE-${nId}`,
      handle: `necklace-silver-${nId}`,
      title: `Aura Silver Necklace ${nId}`,
      description: `An elegant and beautiful sterling silver necklace.`,
      descriptionHtml: `<p>An elegant and beautiful sterling silver necklace.</p>`,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: '45000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '45000.00', currencyCode: 'INR' } },
      images: { edges: [{ node: { url: mod, altText: `Silver Necklace ${nId}` } }] },
      variants: { edges: [{ node: { id: `v-NECKLACE-${nId}`, title: 'Default', price: { amount: '45000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: `NCK-SLV-${nId}`, availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Silver' }], image: null } }] },
      options: [{ name: 'Metal', values: ['Silver'] }],
      metafields: [{ namespace: 'custom', key: 'metal', value: 'Silver' }],
      tags: ['Necklace', 'Jewellery', 'Silver', 'Ladies'],
      vendor: 'AURA',
      productType: 'Necklace'
    });
    nId++;
  }
}

// ==========================================
// MOCK PRODUCT DATA (GraphQL Compliant Schema)
// ==========================================
const BASE_MOCK_PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'celeste-diamond-solitaire-ring',
    title: 'Celeste Diamond Solitaire Ring',
    description: 'A breathtaking round brilliant-cut solitaire diamond held elegantly in place by six minimal prongs. This classic silhouette maximises light capture to reflect an incomparable scintillation. Perfect for weddings, engagements, or timeless luxury statements.',
    descriptionHtml: '<p>A breathtaking round brilliant-cut solitaire diamond held elegantly in place by six minimal prongs.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '125000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '125000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.rings[0], altText: 'Gold Celeste Ring' } }] },
    variants: { edges: [{ node: { id: 'v1', title: 'Default', price: { amount: '125000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'CEL-GLD', availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Ring', 'Gold', 'Diamond', 'Ladies'],
    vendor: 'AURA',
    productType: 'Ring'
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'siren-emerald-eternity-band',
    title: 'Siren Emerald Eternity Band',
    description: 'An unbroken circle of deep, verdant cushion-cut Colombian emeralds totaling 3.5 carats. Each emerald is hand-selected and prong-set in highly polished 18k yellow gold to highlight its natural forest tones.',
    descriptionHtml: '<p>An unbroken circle of deep, verdant cushion-cut Colombian emeralds totaling 3.5 carats.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '220000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '220000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.rings[1], altText: 'Gold Siren Band' } }] },
    variants: { edges: [{ node: { id: 'v2', title: 'Default', price: { amount: '220000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'SIR-GLD', availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gemstone', value: 'Emerald' }],
    tags: ['Ring', 'Gold', 'Emerald', 'Ladies'],
    vendor: 'AURA',
    productType: 'Ring'
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'aura-solitaire-diamond-necklace',
    title: 'Aura Solitaire Diamond Necklace',
    description: 'A brilliant 0.8-carat GIA certified diamond floating effortlessly on a delicate 18-karat solid gold chain.',
    descriptionHtml: '<p>A brilliant 0.8-carat GIA certified diamond floating effortlessly on a delicate chain.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '95000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '95000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.necklaces[0], altText: 'Gold Aura Necklace' } }] },
    variants: { edges: [{ node: { id: 'v3', title: 'Default', price: { amount: '95000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'AUR-GLD', availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Necklace', 'Gold', 'Diamond', 'Ladies'],
    vendor: 'AURA',
    productType: 'Necklace'
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'lumina-diamond-studs',
    title: 'Lumina Diamond Studs',
    description: 'Perfect round-cut matching diamonds set in premium 18k gold. Secured with standard heavy scroll push-backs to sit flat on the ear lobe.',
    descriptionHtml: '<p>Perfect round-cut matching diamonds set in premium 18k gold.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '68000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '68000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.earrings[0], altText: 'Gold Lumina Studs' } }] },
    variants: { edges: [{ node: { id: 'v4', title: 'Default', price: { amount: '68000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'LUM-GLD', availableForSale: true, selectedOptions: [{ name: 'Metal', value: '18K Gold' }], image: null } }] },
    options: [{ name: 'Metal', values: ['18K Gold'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: '18K Gold' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Earring', 'Gold', 'Diamond', 'Ladies'],
    vendor: 'AURA',
    productType: 'Earring'
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'celeste-silver-solitaire-ring',
    title: 'Celeste Silver Solitaire Ring',
    description: 'A breathtaking round brilliant-cut solitaire diamond held elegantly in place by six minimal prongs in sterling silver.',
    descriptionHtml: '<p>A breathtaking round brilliant-cut solitaire diamond held elegantly in place by six minimal prongs.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '35000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '35000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.rings[2], altText: 'Silver Celeste Ring' } }] },
    variants: { edges: [{ node: { id: 'v5', title: 'Default', price: { amount: '35000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'CEL-SLV', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Silver' }], image: null } }] },
    options: [{ name: 'Metal', values: ['Silver'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: 'Silver' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Ring', 'Silver', 'Diamond', 'Ladies'],
    vendor: 'AURA',
    productType: 'Ring'
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'siren-silver-eternity-band',
    title: 'Siren Silver Eternity Band',
    description: 'An unbroken circle of deep, verdant cushion-cut Colombian emeralds totaling 3.5 carats set in silver.',
    descriptionHtml: '<p>An unbroken circle of deep, verdant cushion-cut Colombian emeralds totaling 3.5 carats.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '45000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '45000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.rings[3], altText: 'Silver Siren Band' } }] },
    variants: { edges: [{ node: { id: 'v6', title: 'Default', price: { amount: '45000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'SIR-SLV', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Silver' }], image: null } }] },
    options: [{ name: 'Metal', values: ['Silver'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: 'Silver' }, { namespace: 'custom', key: 'gemstone', value: 'Emerald' }],
    tags: ['Ring', 'Silver', 'Emerald', 'Ladies'],
    vendor: 'AURA',
    productType: 'Ring'
  },
  {
    id: 'gid://shopify/Product/7',
    handle: 'aura-silver-diamond-necklace',
    title: 'Aura Silver Diamond Necklace',
    description: 'A brilliant 0.8-carat GIA certified diamond floating effortlessly on a delicate silver chain.',
    descriptionHtml: '<p>A brilliant 0.8-carat GIA certified diamond floating effortlessly on a delicate silver chain.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '42000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '42000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.necklaces[1], altText: 'Silver Aura Necklace' } }] },
    variants: { edges: [{ node: { id: 'v7', title: 'Default', price: { amount: '42000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'AUR-SLV', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Silver' }], image: null } }] },
    options: [{ name: 'Metal', values: ['Silver'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: 'Silver' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Necklace', 'Silver', 'Diamond', 'Ladies'],
    vendor: 'AURA',
    productType: 'Necklace'
  },
  {
    id: 'gid://shopify/Product/8',
    handle: 'lumina-silver-studs',
    title: 'Lumina Silver Studs',
    description: 'Perfect round-cut matching diamonds set in premium silver. Secured with standard heavy scroll push-backs to sit flat on the ear lobe.',
    descriptionHtml: '<p>Perfect round-cut matching diamonds set in premium silver.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '28000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '28000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.earrings[1], altText: 'Silver Lumina Studs' } }] },
    variants: { edges: [{ node: { id: 'v8', title: 'Default', price: { amount: '28000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'LUM-SLV', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Silver' }], image: null } }] },
    options: [{ name: 'Metal', values: ['Silver'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: 'Silver' }, { namespace: 'custom', key: 'gemstone', value: 'Diamond' }],
    tags: ['Earring', 'Silver', 'Diamond', 'Ladies'],
    vendor: 'AURA',
    productType: 'Earring'
  },
  {
    id: 'gid://shopify/Product/9',
    handle: 'aura-mens-classic-silver-band',
    title: 'Aura Men\'s Classic Silver Band',
    description: 'A substantial, perfectly weighted sterling silver band with a brushed matte finish and polished beveled edges. Designed for everyday comfort and understated luxury.',
    descriptionHtml: '<p>A substantial, perfectly weighted sterling silver band with a brushed matte finish.</p>',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '12000.00', currencyCode: 'INR' }, maxVariantPrice: { amount: '12000.00', currencyCode: 'INR' } },
    images: { edges: [{ node: { url: IMAGES.rings[4], altText: 'Gents Silver Band' } }] },
    variants: { edges: [{ node: { id: 'v9', title: 'Default', price: { amount: '12000.00', currencyCode: 'INR' }, compareAtPrice: null, sku: 'MNS-SLV', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Silver' }], image: null } }] },
    options: [{ name: 'Metal', values: ['Silver'] }],
    metafields: [{ namespace: 'custom', key: 'metal', value: 'Silver' }, { namespace: 'custom', key: 'gemstone', value: 'None' }],
    tags: ['Ring', 'Silver', 'Gents'],
    vendor: 'AURA',
    productType: 'Ring'
  }
];

const MOCK_PRODUCTS: Product[] = [...BASE_MOCK_PRODUCTS, ...generatedGentsRings, ...generatedLadiesRings, ...generatedBracelets, ...generatedPendants, ...generatedPendantSets, ...generatedEarrings, ...generatedKadas, ...generatedNecklaces];

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
    title: 'Necklaces',
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
  },
  {
    id: 'gid://shopify/Collection/100',
    handle: 'gents-rings',
    title: 'Gents Rings',
    description: 'Bold and sophisticated men\'s rings featuring solid gold construction and striking diamond accents.',
    image: { url: IMAGES.rings[0], altText: 'Gents rings collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Ring').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '2' }
    }
  },
  {
    id: 'gid://shopify/Collection/101',
    handle: 'ladies-rings',
    title: 'Ladies Rings',
    description: 'Impeccable gold engagement, wedding and cocktail rings featuring solitaire diamonds and vibrant gemstones.',
    image: { url: IMAGES.rings[1], altText: 'Ladies rings collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Ring').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '2' }
    }
  },

  {
    id: 'gid://shopify/Collection/103',
    handle: 'kada',
    title: 'Kada',
    description: 'Traditional and contemporary kada bracelets crafted in premium metals.',
    image: { url: IMAGES.bracelets[0], altText: 'Kada collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Kada').map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '1' }
    }
  },
  {
    id: 'gid://shopify/Collection/104',
    handle: 'gold',
    title: 'Gold Collection',
    description: 'Our signature collection of 18K solid gold fine jewellery creations.',
    image: { url: IMAGES.banners.collection, altText: 'Gold collection' },
    products: {
      edges: MOCK_PRODUCTS.map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '6' }
    }
  },
  {
    id: 'gid://shopify/Collection/105',
    handle: 'silver',
    title: 'Silver Collection',
    description: 'Elegant and timeless sterling silver creations.',
    image: { url: IMAGES.banners.collection, altText: 'Silver collection' },
    products: {
      edges: MOCK_PRODUCTS.map(p => ({ node: p })),
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '1', endCursor: '6' }
    }
  },
  {
    id: 'gid://shopify/Collection/106',
    handle: 'pendants',
    title: 'Pendants & Sets',
    description: 'Explore our master-crafted individual pendants and beautifully matched pendant sets.',
    image: { url: IMAGES.necklaces[0], altText: 'Pendants collection' },
    products: {
      edges: MOCK_PRODUCTS.filter(p => p.productType === 'Pendant').map(p => ({ node: p })),
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
// SIMULATED INVENTORY DATABASE (LOCAL STORAGE)
// ==========================================
const INVENTORY_STORAGE_KEY = 'aura_shopify_inventory_v13';

function getStoredProducts(): Product[] {
  const data = localStorage.getItem(INVENTORY_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
    return MOCK_PRODUCTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_PRODUCTS;
  }
}

export function updateMockProduct(updatedProduct: Product) {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(products));
  }
}

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
    totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'INR' },
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'INR' },
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
    let products = [...getStoredProducts()];

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
    const p = getStoredProducts().find(prod => prod.handle === handle);
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
    let filteredProducts = getStoredProducts().filter(p => {
      // Check collection mapping
      if (handle !== 'all-jewellery' && handle !== 'gold' && handle !== 'silver') {
        if (handle === 'gents-rings') {
          if (!p.tags.includes('Gents')) return false;
        } else if (handle === 'ladies-rings') {
          if (!p.tags.includes('Ladies')) return false;
        } else if (handle === 'kada') {
          if (p.productType !== 'Kada') return false;
        } else {
          const typeMatch = p.productType.toLowerCase() === handle.slice(0, -1); // 'rings' -> 'ring'
          if (handle === 'earrings') {
            if (p.productType !== 'Earring') return false;
          } else if (handle === 'necklaces') {
            if (p.productType !== 'Necklace') return false;
          } else if (!typeMatch) {
            return false;
          }
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

      // Check style filter (for Pendants & Sets)
      if ((filters as any)?.style) {
        const styleMeta = p.metafields.find(m => m.key === 'style')?.value || '';
        if (styleMeta.toLowerCase() !== (filters as any).style.toLowerCase()) {
          return false;
        }
      }

      // Check gender filter (for Kada)
      if ((filters as any)?.gender) {
        const genderMeta = p.metafields.find(m => m.key === 'gender')?.value || '';
        if (genderMeta.toLowerCase() !== (filters as any).gender.toLowerCase()) {
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
      if (handle === 'all-jewellery') {
        for (let i = filteredProducts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
        }
      } else {
        filteredProducts = filteredProducts.filter(p => p.tags.includes('Best Seller')).concat(
          filteredProducts.filter(p => !p.tags.includes('Best Seller'))
        );
      }
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
    return getStoredProducts().filter(p => p.id !== productId).slice(0, 4);
  },

  // Predictive search
  async predictiveSearch(query: string): Promise<{ products: Product[]; collections: Collection[] }> {
    await new Promise(r => setTimeout(r, 200));
    const q = query.toLowerCase();
    if (!q) return { products: [], collections: [] };

    const products = getStoredProducts().filter(
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
        totalAmount: { amount: '0.00', currencyCode: 'INR' },
        subtotalAmount: { amount: '0.00', currencyCode: 'INR' },
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
