import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSectionComponent } from '@/components/sections/registry';
import homepageConfig from '@/content/homepage.json';
import { updateSEO } from '@/utils/seo';

interface SectionConfig {
  id: string;
  type: string;
  enabled: boolean;
  props?: Record<string, any>;
}

/**
 * Modular Homepage Component
 * Dynamically resolves layout sections from config JSON using registry mapping.
 */
export const Home: React.FC = () => {
  // Update SEO Meta Tags
  useEffect(() => {
    updateSEO({
      title: 'Jewelgasm | Haute Joaillerie & Custom Fine Jewelry',
      description: 'Discover the world of Jewelgasm. Explore bespoke engagement rings, solitaire rings, necklaces, bracelets, and custom jewelry crafted to cherish forever.',
    });
  }, []);

  const activeSections = (homepageConfig.sections as SectionConfig[]).filter(s => s.enabled);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      /* FIXED: Changed to overflow-visible to enable native CSS sticky pinning on scroll sections */
      className="flex flex-col w-full gap-0 space-y-0 items-stretch overflow-visible"
    >
      {activeSections.map((section) => {
        const Component = getSectionComponent(section.type);
        if (!Component) {
          console.warn(`Section type "${section.type}" was not found in Section Registry.`);
          return null;
        }

        return (
          <Component
            key={section.id}
            id={section.id}
            {...(section.props || {})}
          />
        );
      })}
    </motion.div>
  );
};

export default Home;