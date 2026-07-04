import React, { useState, useEffect, useRef } from 'react';
import { Gem, HeartHandshake, ShieldCheck, Truck, RotateCcw, Gift } from 'lucide-react';

// Explicitly mapping your premium asset image paths
import storyBg1 from '@/assets/Special-Img-Bg/Page-1.png';
import storyBg2 from '@/assets/Special-Img-Bg/Page-2.png';

interface StoryPage {
  id: number;
  image: string;
  tagline: string;
  title: string;
  description: string;
  showButton?: boolean;
}

const STORY_PAGES: StoryPage[] = [
  {
    id: 1,
    image: storyBg1,
    tagline: 'Timeless Beauty',
    title: 'Crafted to Cherish Forever',
    description: 'Exquisite jewelry designed to celebrate life’s beautiful moments.',
    showButton: false,
  },
  {
    id: 2,
    image: storyBg2,
    tagline: 'Exquisite Artistry',
    title: 'Luxury That Lasts Forever',
    description: 'Timeless designs for every special moment.',
    showButton: true,
  }
];

export const ScrollStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;
      const currentScrollPosition = -rect.top;
      let progress = currentScrollPosition / totalScrollableHeight;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Crossfade backgrounds tightly around the 50% scroll mark
  const img1Opacity = scrollProgress < 0.4 ? 1 : scrollProgress > 0.6 ? 0 : 1 - (scrollProgress - 0.4) / 0.2;
  const img2Opacity = scrollProgress < 0.4 ? 0 : scrollProgress > 0.6 ? 1 : (scrollProgress - 0.4) / 0.2;

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-black">
      
      {/* BACKGROUND LAYER: Crossfading Sticky Images */}
      <div className="sticky top-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        {/* Image 1 */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-75"
          style={{ opacity: img1Opacity }}
        >
          <img 
            src={STORY_PAGES[0].image} 
            alt="Jewelry Concept"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/[0.02]" />
        </div>
        
        {/* Image 2 */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-75"
          style={{ opacity: img2Opacity }}
        >
          <img 
            src={STORY_PAGES[1].image} 
            alt="Luxury Concept"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>

      {/* FOREGROUND LAYER: Naturally Scrolling Content */}
      <div className="absolute top-0 left-0 w-full h-[500vh] z-10 pointer-events-none flex flex-col">
        
        {/* PAGE 1 CONTENT */}
        <div className="w-full h-[250vh] flex items-center justify-center">
          <div className="w-full pointer-events-auto container mx-auto px-6 md:px-16 max-w-7xl">
            <div className="flex flex-col items-start text-left max-w-2xl">
              {/* Tagline block */}
              <div className="flex flex-col items-center gap-1.5 self-start">
                <span className="text-[12px] font-sans font-light tracking-[0.35em] text-[#4A0E17] uppercase">
                  {STORY_PAGES[0].tagline}
                </span>
                <div className="flex items-center gap-3 w-40">
                  <div className="h-[0.5px] bg-[#C9A96E]/80 flex-grow" />
                  <span className="text-[9px] text-[#C9A96E]">✦</span>
                  <div className="h-[0.5px] bg-[#C9A96E]/80 flex-grow" />
                </div>
              </div>

              <h2 className="text-[clamp(1.75rem,5.5vw,4rem)] font-serif font-semibold text-[#4A0E17] tracking-normal leading-[1.05] mt-4 mb-2 max-w-xl">
                Crafted to Cherish <br /> Forever
              </h2>

              <div className="flex items-center gap-2.5 w-36 my-2">
                <div className="h-[0.5px] bg-[#C9A96E]/60 flex-grow" />
                <span className="text-[6px] text-[#C9A96E]/80">✦</span>
                <div className="h-[0.5px] bg-[#C9A96E]/60 flex-grow" />
              </div>

              <p className="text-[clamp(0.85rem,1.2vw,1rem)] font-sans text-[#4A0E17]/75 max-w-md leading-relaxed mb-3 font-normal">
                {STORY_PAGES[0].description}
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 md:gap-x-8 lg:gap-x-12 mt-2 border-t border-[#4A0E17]/10 pt-4 w-full">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="p-2 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-[#4A0E17]">
                    <Gem className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#4A0E17]">
                    Premium Quality
                  </span>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="p-2 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-[#4A0E17]">
                    <HeartHandshake className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#4A0E17]">
                    Crafted With Care
                  </span>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="p-2 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-[#4A0E17]">
                    <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#4A0E17]">
                    Timeless Design
                  </span>
                </div>
                {/* Feature 4 (Free Shipping) */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="p-2 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-[#4A0E17]">
                    <Truck className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#4A0E17] leading-none">
                      Free Shipping
                    </span>
                    <span className="text-[7.5px] font-sans tracking-[0.05em] text-[#4A0E17]/60 uppercase mt-0.5 leading-none">
                      On all orders
                    </span>
                  </div>
                </div>
                {/* Feature 5 (Easy Returns) */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="p-2 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-[#4A0E17]">
                    <RotateCcw className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#4A0E17] leading-none">
                      Easy Returns
                    </span>
                    <span className="text-[7.5px] font-sans tracking-[0.05em] text-[#4A0E17]/60 uppercase mt-0.5 leading-none">
                      Hassle-free
                    </span>
                  </div>
                </div>
                {/* Feature 6 (Luxury Packaging) */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="p-2 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-[#4A0E17]">
                    <Gift className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#4A0E17] leading-none">
                      Luxury Packaging
                    </span>
                    <span className="text-[7.5px] font-sans tracking-[0.05em] text-[#4A0E17]/60 uppercase mt-0.5 leading-none">
                      Keepsake box
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 CONTENT */}
        <div className="w-full h-[250vh] flex items-center justify-center">
          <div className="w-full pointer-events-auto container mx-auto px-6 md:px-16 max-w-7xl">
            <div className="flex flex-col items-start text-left max-w-xl">
              <h2 className="text-[clamp(2.25rem,6.5vw,5rem)] font-serif font-semibold text-white tracking-normal leading-[1.05] mb-4 max-w-3xl">
                Luxury That <br /> 
                <span className="whitespace-nowrap">Lasts Forever</span>
              </h2>
              
              <p className="text-[clamp(0.95rem,1.5vw,1.35rem)] font-sans text-white/95 leading-relaxed mb-6 font-normal max-w-2xl">
                {STORY_PAGES[1].description}
              </p>

              {STORY_PAGES[1].showButton && (
                <button className="px-8 md:px-10 py-3 md:py-4 border border-white/35 hover:border-white hover:bg-white/10 text-white font-sans text-[clamp(9px,1.2vw,11px)] font-semibold tracking-[0.3em] uppercase rounded-full shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer">
                  EXPLORE NOW <span className="text-base leading-none">→</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScrollStorySection;
