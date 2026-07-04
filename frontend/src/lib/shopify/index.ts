import { shopifyClient } from './client';
import { shopifyMockClient } from './mockClient';

// Switch clients dynamically based on env keys
const hasCredentials = Boolean(
  import.meta.env.VITE_SHOPIFY_DOMAIN &&
  import.meta.env.VITE_STOREFRONT_TOKEN
);

/**
 * Shopify Client consolidated export
 * Automatically falls back to mockClient if no .env credentials are provided.
 */
export const shopify = hasCredentials ? shopifyClient : shopifyMockClient;

export * from './types';
export * from './mockClient';
export * from './client';
