/**
 * Dynamically updates document metadata for SEO compliance
 */
export function updateSEO({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}) {
  // Update document title
  document.title = `${title} | AURA Luxury`;

  // Update Meta Description
  updateMetaTag('description', description);

  // Update Open Graph tags
  updateMetaTag('og:title', `${title} | AURA Luxury`, 'property');
  updateMetaTag('og:description', description, 'property');
  if (image) updateMetaTag('og:image', image, 'property');
  if (url) updateMetaTag('og:url', url, 'property');

  // Update Twitter Cards
  updateMetaTag('twitter:title', `${title} | AURA Luxury`);
  updateMetaTag('twitter:description', description);
  if (image) updateMetaTag('twitter:image', image);
}

/**
 * Helper to create/update meta tags in document header
 */
function updateMetaTag(name: string, content: string, type: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${type}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(type, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Injects structured schema markup (JSON-LD) for SEO rich snippets
 */
export function injectJSONLD(schemaObject: Record<string, unknown>, id = 'aura-jsonld') {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(schemaObject);
}

/**
 * Generates Product rich snippets for search engines
 */
export function getProductSchema(product: {
  title: string;
  description: string;
  price: string;
  currency: string;
  imageUrl: string;
  url: string;
  sku: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.imageUrl,
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  };
}
