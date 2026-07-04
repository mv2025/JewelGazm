import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';

import gentsRingImg from '@/assets/Shop-By-Categories/Gents-Ring.webp';
import braceletsImg from '@/assets/Shop-By-Categories/Bracelets.webp';
import chainsImg from '@/assets/Shop-By-Categories/Chains.webp';

// Premium high-resolution stock images for luxury jewelry categories
const ACCESSORY_CATEGORIES = [
  { id: 'rings', name: 'Rings', count: '124 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)] flex-shrink-0 snap-start', image: gentsRingImg, href: '/collections/rings' },
  { id: 'bracelets', name: 'Bracelets', count: '86 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)] flex-shrink-0 snap-start', image: braceletsImg, href: '/collections/bracelets' },
  { id: 'pendants', name: 'Pendants', count: '94 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)] flex-shrink-0 snap-start', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', href: '/collections/bracelets' },
  { id: 'earrings', name: 'Earrings', count: '150 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)] flex-shrink-0 snap-start', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', href: '/collections/rings' },
  { id: 'necklaces', name: 'Necklaces', count: '112 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)] flex-shrink-0 snap-start', image: chainsImg, href: '/collections/necklaces' },
  { id: 'anklets', name: 'Anklets', count: '45 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)] flex-shrink-0 snap-start', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80', href: '/collections/rings' },
];

export const AccessoriesSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [xRange, setXRange] = useState(0);

  // Detect responsive screen sizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track vertical scroll position of the parent pinning container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate horizontal translation bounds dynamically on window resize
  useEffect(() => {
    if (isMobile) return;
    
    const calculateRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setXRange(Math.max(0, trackWidth - viewportWidth));
      }
    };

    calculateRange();
    window.addEventListener('resize', calculateRange);

    // Initial timeout to ensure fonts, assets, and layouts are calculated
    const timer = setTimeout(calculateRange, 500);

    return () => {
      window.removeEventListener('resize', calculateRange);
      clearTimeout(timer);
    };
  }, [isMobile]);

  // Framer Motion transforms for scroll-linked gliding and parallax
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -xRange]);
  const imageX = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  // Fallback translation value for mobile
  const x = isMobile ? 0 : xTransform;

  const scrollToNextSection = () => {
    if (targetRef.current) {
      const bottomPos = targetRef.current.offsetTop + targetRef.current.offsetHeight;
      window.scrollTo({ top: bottomPos, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={targetRef} 
      className={cn(
        "relative w-full bg-[#FAF8F5] select-none border-b border-[#E8E0D5]/50",
        isMobile ? "h-auto py-16" : "h-[300vh]"
      )}
    >
      <div 
        className={cn(
          "w-full overflow-hidden flex flex-col",
          isMobile 
            ? "relative h-auto" 
            : "sticky top-0 h-screen justify-center gap-8 md:gap-12 py-12 md:py-16"
        )}
      >
        {/* Header Container */}
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#4A0E17]/60 uppercase block mb-2">
                Curated Essentials
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#4A0E17] tracking-wide">
                Shop by Accessories
              </h2>
            </div>
          </div>
        </div>

        {/* Scroll Track Canvas */}
        <div className="w-full overflow-hidden">
          <motion.div 
            ref={isMobile ? scrollContainerRef : trackRef}
            style={{ x }}
            className={cn(
              "flex gap-6 md:gap-8 items-center",
              isMobile 
                ? "overflow-x-auto snap-x snap-mandatory pb-6 px-4 md:px-6 scrollbar-none w-full scroll-smooth" 
                : "w-max px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] flex-nowrap"
            )}
          >
            {ACCESSORY_CATEGORIES.map((category) => {
              const isHovered = hoveredId === category.id;
              return (
                <Link
                  key={category.id}
                  to={category.href}
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "relative bg-white border border-[#E8E0D5]/50 rounded-2xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-500 group/card cursor-pointer flex-shrink-0 snap-start shadow-xs",
                    category.sizeClass,
                    isHovered ? "border-[#4A0E17]/20 -translate-y-1" : ""
                  )}
                >
                  {/* Visual Background Accent on Hover */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-tr from-[#4A0E17]/[0.02] to-transparent opacity-0 transition-opacity duration-500",
                    isHovered && "opacity-100"
                  )} />

                  {/* Top: Meta info */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <h3 className="font-serif text-xl text-[#4A0E17] tracking-wide mb-1 transition-colors group-hover/card:text-[#4A0E17]">
                        {category.name}
                      </h3>
                      <span className="text-[10px] font-sans font-medium tracking-wider text-[#4A0E17]/40">
                        {category.count}
                      </span>
                    </div>
                    
                    {/* Floating Action Arrow */}
                    <div className={cn(
                      "p-2 rounded-full border border-[#4A0E17]/10 text-[#4A0E17] bg-white transition-all duration-300",
                      isHovered ? "bg-[#4A0E17] text-white border-transparent rotate-45" : ""
                    )}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center / Bottom: Image Showcase with Parallax */}
                  <div className="absolute right-0 bottom-0 w-[80%] h-[75%] overflow-hidden pointer-events-none rounded-tl-[2.5rem] border-t border-l border-[#E8E0D5]/30 shadow-2xl">
                    <motion.div 
                      className="w-full h-full relative"
                      style={{ 
                        x: isMobile ? 0 : imageX 
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-left-top scale-115"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
                    </motion.div>
                  </div>

                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Next Section Button */}
        <div className="absolute bottom-12 right-8 md:right-12 z-50">
          <button
            onClick={scrollToNextSection}
            className="p-4 border border-[#E8E0D5] hover:border-[#4A0E17] hover:bg-[#4A0E17]/5 rounded-full text-[#4A0E17] bg-white transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center"
            aria-label="Scroll to next section"
          >
            <ArrowDown className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccessoriesSection;
