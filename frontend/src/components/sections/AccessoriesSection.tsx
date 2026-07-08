import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import goldRingImg from '@/assets/Shop-By-Categories/Gold-Rings.png';
import braceletsImg from '@/assets/Shop-By-Categories/Bracelets.webp';
import goldNecklaceImg from '@/assets/Featured-Products/gold-aura-necklace.png';
import silverCelesteRing from '@/assets/Featured-Products/Silver-Celeste-Ring.png';
import silverSirenBand from '@/assets/Featured-Products/Silver-Siren-Band.png';
import silverAuraNecklace from '@/assets/Featured-Products/Silver-Aura-Necklace.png';
import silverPendantImg from '@/assets/Shop-By-Categories/Silver-Pendant.png';
import silverEarringsImg from '@/assets/Shop-By-Categories/Silver-Earrings.png';
import silverAnkletsImg from '@/assets/Shop-By-Categories/Silver-Anklets.png';
import goldPendantImg from '@/assets/Shop-By-Categories/Gold-Pendant.png';
import goldEarringsImg from '@/assets/Shop-By-Categories/Gold-Earrings.png';
import goldAnkletsImg from '@/assets/Shop-By-Categories/Gold-Anklets.png';

const ACCESSORY_CATEGORIES = [
  { id: 'rings', name: 'Rings', count: '124 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)]', goldImage: goldRingImg, silverImage: silverCelesteRing, href: '/collections/rings' },
  { id: 'bracelets', name: 'Bracelets', count: '86 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)]', goldImage: braceletsImg, silverImage: silverSirenBand, href: '/collections/bracelets' },
  { id: 'pendants', name: 'Pendants', count: '94 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)]', goldImage: goldPendantImg, silverImage: silverPendantImg, href: '/collections/bracelets' },
  { id: 'earrings', name: 'Earrings', count: '150 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)]', goldImage: goldEarringsImg, silverImage: silverEarringsImg, href: '/collections/rings' },
  { id: 'necklaces', name: 'Necklaces', count: '112 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)]', goldImage: goldNecklaceImg, silverImage: silverAuraNecklace, href: '/collections/necklaces' },
  { id: 'anklets', name: 'Anklets', count: '45 Items', sizeClass: 'w-[clamp(280px,26vw,360px)] h-[clamp(340px,32vw,440px)]', goldImage: goldAnkletsImg, silverImage: silverAnkletsImg, href: '/collections/rings' },
];

interface AccessoriesSectionProps {
  metal?: 'gold' | 'silver' | 'all';
}

export const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({ metal = 'gold' }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        setDragConstraints({ left: -scrollWidth + clientWidth, right: 0 });
      }
    };
    
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    // Give images a moment to load and affect scrollWidth
    setTimeout(updateConstraints, 500);

    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <section className="relative w-full bg-[#FAF8F5] select-none border-b border-[#E8E0D5]/50 py-16 md:py-24 overflow-hidden">
      {/* Header Container */}
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6 mb-10 md:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex-1">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[var(--theme-primary)]/60 uppercase block mb-2">
              Curated Essentials
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--theme-primary)] tracking-wide">
              Shop by Accessories
            </h2>
          </div>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div ref={carouselRef} className="w-full overflow-hidden px-4 md:px-6">
        <motion.div 
          drag="x"
          dragConstraints={dragConstraints}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 150)}
          className="flex gap-6 md:gap-8 items-center w-max cursor-grab active:cursor-grabbing"
        >
          {ACCESSORY_CATEGORIES.map((category) => {
            const isHovered = hoveredId === category.id;
            return (
              <Link
                key={category.id}
                to={category.href}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "relative bg-white border border-[#E8E0D5]/50 rounded-2xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-500 group/card flex-shrink-0 shadow-xs pointer-events-auto",
                  category.sizeClass,
                  isHovered && !isDragging ? "border-[var(--theme-primary)]/20 -translate-y-1" : ""
                )}
                draggable={false} // Prevent default image dragging
              >
                {/* Visual Background Accent on Hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/[0.02] to-transparent opacity-0 transition-opacity duration-500",
                  isHovered && !isDragging && "opacity-100"
                )} />

                {/* Top: Meta info */}
                <div className="flex items-start justify-between relative z-10 pointer-events-none">
                  <div>
                    <h3 className="font-serif text-xl text-[var(--theme-primary)] tracking-wide mb-1 transition-colors group-hover/card:text-[var(--theme-primary)]">
                      {category.name}
                    </h3>
                    <span className="text-[10px] font-sans font-medium tracking-wider text-[var(--theme-primary)]/40">
                      {category.count}
                    </span>
                  </div>
                  
                  {/* Floating Action Arrow */}
                  <div className={cn(
                    "p-2 rounded-full border border-[var(--theme-primary)]/10 text-[var(--theme-primary)] bg-white transition-all duration-300",
                    isHovered && !isDragging ? "bg-[var(--theme-primary)] text-white border-transparent rotate-45" : ""
                  )}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Center / Bottom: Image Showcase */}
                <div className="absolute right-0 bottom-0 w-[80%] h-[75%] overflow-hidden pointer-events-none rounded-tl-[2.5rem] border-t border-l border-[#E8E0D5]/30 shadow-2xl">
                  <div className="w-full h-full relative">
                    <img
                      src={metal === 'silver' ? category.silverImage : category.goldImage}
                      alt={category.name}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover object-left-top scale-115 pointer-events-none"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AccessoriesSection;
