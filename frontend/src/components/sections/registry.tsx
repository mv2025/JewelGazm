import React from 'react';
import { HeroSliderSection } from './HeroSliderSection';
import { BenefitsSection } from './BenefitsSection';
import { CategoriesSection } from './CategoriesSection';
import { TrendingSection } from './TrendingSection';
import { AccessoriesSection } from './AccessoriesSection';
import { ScrollStorySection } from './ScrollStorySection';
import { FeaturedProductsSection } from './FeaturedProductsSection';
import { FeaturedBannerSection } from './FeaturedBannerSection';
import { CraftStorySection } from './CraftStorySection';
import { VideoSection } from './VideoSection';
import { CustomerReviewsSection } from './CustomerReviewsSection';
import { InstagramSection } from './InstagramSection';
import { NewsletterSection } from './NewsletterSection';
import { ExchangeFestSection } from './ExchangeFestSection';

// Map identifier tags to components
const REGISTRY: Record<string, React.FC<any>> = {
  HeroSliderSection,
  BenefitsSection,
  CategoriesSection,
  TrendingSection,
  AccessoriesSection,
  ScrollStorySection,
  FeaturedProductsSection,
  FeaturedBannerSection,
  CraftStorySection,
  VideoSection,
  CustomerReviewsSection,
  InstagramSection,
  NewsletterSection,
  ExchangeFestSection,
};


/**
 * Returns the matching React section component for a given key.
 */
export function getSectionComponent(type: string): React.FC<any> | null {
  return REGISTRY[type] || null;
}

