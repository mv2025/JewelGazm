/**
 * Base Shopify Storefront API Client
 * Used across all other Shopify services (auth, products, cart)
 */

export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
export const STOREFRONT_TOKEN = import.meta.env.VITE_STOREFRONT_TOKEN || import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
export const API_VERSION = import.meta.env.VITE_API_VERSION || '2024-04';

export const shopifyFetch = async <T>(query: string, variables = {}): Promise<{ data: T; errors?: any[] }> => {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error('Shopify API credentials are not configured in environment variables.');
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
};
