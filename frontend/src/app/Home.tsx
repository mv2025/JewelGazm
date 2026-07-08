import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSectionComponent } from '@/components/sections/registry';
import homepageConfig from '@/content/homepage.json';
import { updateSEO } from '@/utils/seo';
import { cn } from '@/utils/cn';

interface SectionConfig {
  id: string;
  type: string;
  enabled: boolean;
  metal?: 'gold' | 'silver' | 'all';
  props?: Record<string, any>;
}

/**
 * Modular Homepage Component
 * Dynamically resolves layout sections from config JSON using registry mapping.
 */
export const Home: React.FC = () => {
  const [activeMetal, setActiveMetal] = useState<'gold' | 'silver'>('gold');

  // Update SEO Meta Tags
  useEffect(() => {
    updateSEO({
      title: 'Jewelgazm | Haute Joaillerie',
      description: 'Discover the world of Jewelgazm. Explore bespoke engagement rings, solitaire rings, necklaces, bracelets, and custom jewelry crafted to cherish forever.',
    });
  }, []);

  const allActiveSections = (homepageConfig.sections as SectionConfig[]).filter(s => s.enabled);
  
  // Hero section is usually the first section and should be shown regardless of metal (unless specified otherwise)
  const heroSection = allActiveSections.find(s => s.id === 'hero-video' || s.id === 'hero-slider');
  
  // Get all other sections that match the active metal or apply to 'all'
  const metalSections = allActiveSections.filter(s => 
    s.id !== heroSection?.id && (s.metal === activeMetal || s.metal === 'all' || !s.metal)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      /* overflow-visible to enable native CSS sticky pinning on scroll sections */
      className={cn(
        "flex flex-col w-full gap-0 space-y-0 items-stretch overflow-visible transition-colors duration-700",
        activeMetal === 'silver' ? 'theme-silver bg-[var(--theme-bg)]' : 'bg-[var(--theme-bg)]'
      )}
    >
      {/* 1. Render Hero Section */}
      {heroSection && (() => {
        const HeroComponent = getSectionComponent(heroSection.type);
        return HeroComponent ? (
          <HeroComponent
            key={heroSection.id}
            id={heroSection.id}
            {...(heroSection.props || {})}
          />
        ) : null;
      })()}

      {/* 2. Metal Toggle Switch */}
      <div className="w-full flex justify-center py-8 md:py-12 bg-white select-none">
        <div className="relative flex items-center p-1 bg-[var(--theme-bg-alt)] rounded-full border border-[#E8E0D5] shadow-sm overflow-hidden">
          {/* Animated Background Pill */}
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-light)] rounded-full shadow-md"
            initial={false}
            animate={{
              left: activeMetal === 'silver' ? '4px' : 'calc(50%)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          
          <button
            onClick={() => setActiveMetal('silver')}
            className={cn(
              "relative z-10 w-40 md:w-56 py-2.5 md:py-3 text-xs md:text-sm font-sans font-semibold tracking-wider uppercase transition-colors duration-300",
              activeMetal === 'silver' ? "text-white drop-shadow-sm" : "text-[#8A7969] hover:text-[var(--theme-primary)]"
            )}
          >
            Silver Jewellery
          </button>
          <button
            onClick={() => setActiveMetal('gold')}
            className={cn(
              "relative z-10 w-40 md:w-56 py-2.5 md:py-3 text-xs md:text-sm font-sans font-semibold tracking-wider uppercase transition-colors duration-300",
              activeMetal === 'gold' ? "text-white drop-shadow-sm" : "text-[#8A7969] hover:text-[var(--theme-primary)]"
            )}
          >
            Gold Jewellery
          </button>
        </div>
      </div>

      {/* 3. Render Metal-specific Sections with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMetal}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col w-full gap-0 space-y-0 items-stretch overflow-visible"
        >
          {metalSections.map((section) => {
            const Component = getSectionComponent(section.type);
            if (!Component) {
              console.warn(`Section type "${section.type}" was not found in Section Registry.`);
              return null;
            }

            return (
              <Component
                key={section.id}
                id={section.id}
                metal={section.metal || activeMetal}
                {...(section.props || {})}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;