/**
 * Feature Flags Configuration
 * Easily enable/disable layout blocks and functionality
 */
export const FEATURES = {
  wishlist: true,
  reviews: true,
  videoHero: true,
  instagram: true,
  storeLocator: true,
  predictiveSearch: true,
  promoBanner: true,
  newsletter: true,
  recentlyViewed: true,
} as const;

export type FeatureFlags = typeof FEATURES;
