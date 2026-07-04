import React from 'react';
import { Image } from '@/components/ui/Image';

interface CraftStorySectionProps {
  title?: string;
  subtitle?: string;
}

/**
 * Editorial Craftsmanship and Brand Story section
 */
export const CraftStorySection: React.FC<CraftStorySectionProps> = ({
  title = "Honoring the Flame",
  subtitle = "Meticulous Craftsmanship"
}) => {
  return (
    <section className="py-24 bg-background border-b border-border/40 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Story Text */}
          <div className="flex flex-col gap-6 max-w-lg">
            <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
              {subtitle}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary leading-tight">
              {title}
            </h2>
            <div className="flex flex-col gap-4.5 text-xs font-sans font-light leading-relaxed text-primary/70 mt-2">
              <p>
                At AURA, each piece begins its journey with a hand-rendered graphite sketch. Our master designers balance historical proportions with contemporary geometries, designing frameworks that maximize light return.
              </p>
              <p>
                Our gold alloys are custom blended in-house, casting 18-karat gold with precise copper and silver ratios to produce our signature champagne gold tone—a metal color designed to flatter all skin undertones.
              </p>
              <p className="border-l-[1.5px] border-gold pl-4 font-serif italic text-primary/90 text-sm mt-2">
                "We do not simply set stones; we build architectural stages that let diamonds sing."
              </p>
            </div>
          </div>

          {/* Right Side: Image with reveal effects */}
          <div className="relative w-full">
            {/* Outline Decorative Frame */}
            <div className="absolute -inset-4 border border-gold/15 pointer-events-none translate-x-2 translate-y-2 rounded-sm" />
            <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-surface-hover shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800&auto=format&fit=crop&q=80"
                alt="Master jeweler sketching fine ring design outlines"
                aspectRatio="portrait"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CraftStorySection;
