import { SHOPIFY_DOMAIN } from './client';

/**
 * Modern Shopify Customer Accounts API (Headless)
 * Handles the OAuth login flow to redirect users to Shopify's Hosted Login.
 */

// If your store has a specific Customer Account API Client ID for headless OAuth, it goes here.
const CUSTOMER_ACCOUNT_CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_ID || '';
// The redirect URI must be registered in your Shopify App settings
const REDIRECT_URI = window.location.origin + '/auth/callback';

export const loginToShopify = () => {
  if (!CUSTOMER_ACCOUNT_CLIENT_ID) {
    console.warn('Customer Account API Client ID is not set. Assuming standard Storefront API login or missing env variable.');
    // Fallback: This URL structure depends on how Shopify is configured.
    // For standard Shopify Plus multipass or standard stores, the hosted login URL usually lives here:
    window.location.href = `https://${SHOPIFY_DOMAIN}/account/login?return_url=${encodeURIComponent(window.location.origin)}`;
    return;
  }

  // Modern Customer Account API (OAuth Authorization Code Flow with PKCE)
  // 1. Generate State and Code Verifier (in a real implementation, you'd store verifier in sessionStorage)
  const state = Math.random().toString(36).substring(7);
  sessionStorage.setItem('shopify_auth_state', state);

  // 2. Redirect to Shopify's Hosted Authorization endpoint
  const authUrl = new URL(`https://shopify.com/${SHOPIFY_DOMAIN}/auth/oauth/authorize`);
  authUrl.searchParams.append('client_id', CUSTOMER_ACCOUNT_CLIENT_ID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('scope', 'openid email profile https://api.customers.com/auth/customer.graphql');
  authUrl.searchParams.append('state', state);

  window.location.href = authUrl.toString();
};

export const logoutFromShopify = () => {
  // Clear any local React state indicating login
  // Redirect to Shopify logout to clear the session cookie
  window.location.href = `https://${SHOPIFY_DOMAIN}/account/logout?return_url=${encodeURIComponent(window.location.origin)}`;
};

/**
 * Checks if the user is authenticated based on Shopify's session.
 * For true Headless Customer Accounts API, this involves querying the customer endpoint using the obtained token.
 */
export const checkAuthStatus = async () => {
  // Implementation will vary based on whether you are relying on the new Customer API token
  // or simply checking if a secure session cookie exists.
  return { isAuthenticated: false, customer: null };
};
