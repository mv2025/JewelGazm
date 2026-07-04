/**
 * Production Shopify Client Services Template
 * 
 * In production, copy the contents of "frontend/src/lib/shopify/client.ts" here.
 * This class handles POST requests to your Shopify Storefront API GraphQL endpoint.
 */
export const shopifyService = {
  // Production wrapper placeholder
  async executeGraphQL(query: string, variables = {}) {
    const domain = process.env.SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

    const res = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token!,
      },
      body: JSON.stringify({ query, variables }),
    });
    return res.json();
  }
};
