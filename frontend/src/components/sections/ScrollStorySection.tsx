import React, { useState, useEffect, useRef } from 'react';
import { Gem, HeartHandshake, ShieldCheck, Truck, RotateCcw, Gift } from 'lucide-react';

// Explicitly mapping your premium asset image paths
import storyBg1 from '@/assets/Special-Img-Bg/Page-1.png';
import storyBg2 from '@/assets/Special-Img-Bg/Page-2.png';
import page1Img1 from '@/assets/Special-Img-Bg/Page-1.1.png';
import page1Img2 from '@/assets/Special-Img-Bg/Page-1.2.png';
import page2Img1 from '@/assets/Special-Img-Bg/Page-2.1.png';

// Silver premium asset image paths
import silverStoryBg1 from '@/assets/Special-Img-Bg/S-Page-1.png';
import silverStoryBg2 from '@/assets/Special-Img-Bg/S-Page-2.png';
import silverPage1Img1 from '@/assets/Special-Img-Bg/S-Page-1.1.png';
import silverPage1Img2 from '@/assets/Special-Img-Bg/S-Page-1.2.png';
import silverPage2Img1 from '@/assets/Special-Img-Bg/S-Page-2.1.png';

interface StoryPage {
  id: number;
  image: string;
  tagline: string;
  title: string;
  description: string;
  showButton?: boolean;
}

interface ScrollStorySectionProps {
  id?: string;
  metal?: 'gold' | 'silver' | 'all';
}

export const ScrollStorySection: React.FC<ScrollStorySectionProps> = ({ metal = 'gold' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isSilver = metal === 'silver';
  
  const bg1 = isSilver ? silverStoryBg1 : storyBg1;
  const bg2 = isSilver ? silverStoryBg2 : storyBg2;
  const currentImg1_1 = isSilver ? silverPage1Img1 : page1Img1;
  const currentImg1_2 = isSilver ? silverPage1Img2 : page1Img2;
  const currentImg2_1 = isSilver ? silverPage2Img1 : page2Img1;

  const STORY_PAGES: StoryPage[] = [
    {
      id: 1,
      image: bg1,
      tagline: 'Timeless Beauty',
      title: 'Crafted to Cherish Forever',
      description: 'Exquisite jewelry designed to celebrate life’s beautiful moments.',
      showButton: false,
    },
    {
      id: 2,
      image: bg2,
      tagline: 'Exquisite Artistry',
      title: 'Luxury That Lasts Forever',
      description: 'Timeless designs for every special moment.',
      showButton: true,
    }
  ];

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
    <div ref={containerRef} className="relative w-full h-[500vh] bg-black select-none">
      
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
          <div className={`absolute inset-0 ${isSilver ? 'bg-black/[0.40]' : 'bg-black/[0.08]'}`} />
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
        <div className="w-full h-[250vh] flex items-center justify-center relative">
          <div className="w-full pointer-events-auto container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative">
            <div className={`flex flex-col items-start text-left w-full md:w-[50%] lg:w-[55%] max-w-2xl ${isSilver ? 'text-slate-100' : 'text-[#FAF8F5]'}`}>
              {/* Tagline block */}
              <div className="flex flex-col items-center gap-1.5 self-start">
                <span className={`text-[12px] font-sans font-light tracking-[0.35em] uppercase ${isSilver ? 'text-slate-200' : 'text-[#FAF8F5]/90'} drop-shadow-md`}>
                  {STORY_PAGES[0].tagline}
                </span>
                <div className="flex items-center gap-3 w-40">
                  <div className={`h-[0.5px] flex-grow ${isSilver ? 'bg-slate-300/60' : 'bg-white/40'} drop-shadow-md`} />
                  <span className={`text-[9px] ${isSilver ? 'text-slate-300/80' : 'text-white/60'}`}>✦</span>
                  <div className={`h-[0.5px] flex-grow ${isSilver ? 'bg-slate-300/60' : 'bg-white/40'} drop-shadow-md`} />
                </div>
              </div>

              <h2 className={`text-[clamp(1.75rem,5.5vw,4rem)] font-serif font-semibold tracking-normal leading-[1.05] mt-4 mb-2 max-w-xl ${isSilver ? 'text-slate-50' : 'text-white'} drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]`}>
                Crafted to Cherish <br /> Forever
              </h2>

              <div className="flex items-center gap-2.5 w-36 my-2">
                <div className={`h-[0.5px] flex-grow ${isSilver ? 'bg-slate-300/40' : 'bg-white/30'}`} />
                <span className={`text-[6px] ${isSilver ? 'text-slate-300/60' : 'text-white/50'}`}>✦</span>
                <div className={`h-[0.5px] flex-grow ${isSilver ? 'bg-slate-300/40' : 'bg-white/30'}`} />
              </div>

              <p className={`text-[clamp(0.85rem,1.2vw,1rem)] font-sans max-w-md leading-relaxed mb-3 font-normal ${isSilver ? 'text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]' : 'text-white/80 drop-shadow-sm'}`}>
                {STORY_PAGES[0].description}
              </p>

              {/* Benefits Grid */}
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 md:gap-x-8 lg:gap-x-12 mt-2 border-t pt-4 w-full ${isSilver ? 'border-slate-400/20' : 'border-white/15'}`}>
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className={`p-2 rounded-full border ${isSilver ? 'bg-slate-800/40 backdrop-blur-sm border-slate-400/30 text-slate-200' : 'bg-black/20 backdrop-blur-sm border-white/20 text-white'}`}>
                    <Gem className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase ${isSilver ? 'text-slate-100 drop-shadow-sm' : 'text-white drop-shadow-sm'}`}>
                    Premium Quality
                  </span>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className={`p-2 rounded-full border ${isSilver ? 'bg-slate-800/40 backdrop-blur-sm border-slate-400/30 text-slate-200' : 'bg-black/20 backdrop-blur-sm border-white/20 text-white'}`}>
                    <HeartHandshake className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase ${isSilver ? 'text-slate-100 drop-shadow-sm' : 'text-white drop-shadow-sm'}`}>
                    Crafted With Care
                  </span>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className={`p-2 rounded-full border ${isSilver ? 'bg-slate-800/40 backdrop-blur-sm border-slate-400/30 text-slate-200' : 'bg-black/20 backdrop-blur-sm border-white/20 text-white'}`}>
                    <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase ${isSilver ? 'text-slate-100 drop-shadow-sm' : 'text-white drop-shadow-sm'}`}>
                    Timeless Design
                  </span>
                </div>
                {/* Feature 4 (Free Shipping) */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className={`p-2 rounded-full border ${isSilver ? 'bg-slate-800/40 backdrop-blur-sm border-slate-400/30 text-slate-200' : 'bg-black/20 backdrop-blur-sm border-white/20 text-white'}`}>
                    <Truck className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase leading-none ${isSilver ? 'text-slate-100 drop-shadow-sm' : 'text-white drop-shadow-sm'}`}>
                      Free Shipping
                    </span>
                    <span className={`text-[7.5px] font-sans tracking-[0.05em] uppercase mt-0.5 leading-none ${isSilver ? 'text-slate-300 drop-shadow-sm' : 'text-white/70 drop-shadow-sm'}`}>
                      On all orders
                    </span>
                  </div>
                </div>
                {/* Feature 5 (Easy Returns) */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className={`p-2 rounded-full border ${isSilver ? 'bg-slate-800/40 backdrop-blur-sm border-slate-400/30 text-slate-200' : 'bg-black/20 backdrop-blur-sm border-white/20 text-white'}`}>
                    <RotateCcw className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase leading-none ${isSilver ? 'text-slate-100 drop-shadow-sm' : 'text-white drop-shadow-sm'}`}>
                      Easy Returns
                    </span>
                    <span className={`text-[7.5px] font-sans tracking-[0.05em] uppercase mt-0.5 leading-none ${isSilver ? 'text-slate-300 drop-shadow-sm' : 'text-white/70 drop-shadow-sm'}`}>
                      Hassle-free
                    </span>
                  </div>
                </div>
                {/* Feature 6 (Luxury Packaging) */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className={`p-2 rounded-full border ${isSilver ? 'bg-slate-800/40 backdrop-blur-sm border-slate-400/30 text-slate-200' : 'bg-black/20 backdrop-blur-sm border-white/20 text-white'}`}>
                    <Gift className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase leading-none ${isSilver ? 'text-slate-100 drop-shadow-sm' : 'text-white drop-shadow-sm'}`}>
                      Luxury Packaging
                    </span>
                    <span className={`text-[7.5px] font-sans tracking-[0.05em] uppercase mt-0.5 leading-none ${isSilver ? 'text-slate-300 drop-shadow-sm' : 'text-white/70 drop-shadow-sm'}`}>
                      Keepsake box
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Images for Page 1 */}
            <div className="hidden md:block absolute right-[-5%] lg:right-0 top-[40%] -translate-y-1/2 w-[70%] max-w-[900px] h-[750px] pointer-events-none">
              <img 
                src={currentImg1_1} 
                className={`absolute object-cover mix-blend-multiply drop-shadow-lg ${isSilver ? 'w-[55%] lg:w-[60%] top-[15%] lg:top-[20%] right-[15%] lg:right-[20%]' : '-top-16 -right-12 w-[105%]'}`} 
                alt="Jewelry Detail 1" 
              />
              <img 
                src={currentImg1_2} 
                className={`absolute object-cover mix-blend-multiply drop-shadow-lg ${isSilver ? 'w-[45%] lg:w-[50%] bottom-[10%] lg:bottom-[5%] right-[10%]' : 'w-[60%] bottom-[10%] right-[5%]'}`} 
                alt="Jewelry Detail 2" 
              />
            </div>
            
          </div>
        </div>

        {/* PAGE 2 CONTENT */}
        <div className="w-full h-[250vh] flex items-center justify-center relative">
          <div className="w-full pointer-events-auto container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 -mt-16 lg:-mt-32">
            
            {/* Text on Left */}
            <div className="flex flex-col items-start text-left w-full md:w-[45%] lg:w-1/2 flex-shrink-0 max-w-2xl relative z-10">
              <h2 className="text-[clamp(2.25rem,6.5vw,5rem)] font-serif font-semibold text-white tracking-normal leading-[1.05] mb-4 drop-shadow-lg">
                Luxury That <br /> 
                <span className="whitespace-nowrap">Lasts Forever</span>
              </h2>
              
              <p className="text-[clamp(0.95rem,1.5vw,1.35rem)] font-sans text-white/95 leading-relaxed mb-8 font-normal max-w-xl drop-shadow-md">
                {STORY_PAGES[1].description}
              </p>

              {STORY_PAGES[1].showButton && (
                <button className="px-8 md:px-10 py-3 md:py-4 border border-white/35 hover:border-white hover:bg-white/10 text-white font-sans text-[clamp(9px,1.2vw,11px)] font-semibold tracking-[0.3em] uppercase rounded-full shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer">
                  EXPLORE NOW <span className="text-base leading-none">→</span>
                </button>
              )}
            </div>

            {/* Image on Right */}
            <div className="w-full md:w-[50%] lg:w-[45%] flex justify-start lg:justify-center mt-12 md:mt-0 pointer-events-none z-0">
              <img 
                src={currentImg2_1} 
                alt="Luxury Collection"
                className="w-full max-w-[750px] h-auto object-cover drop-shadow-2xl -ml-24 lg:-ml-48 scale-125 lg:scale-150 origin-center"
              />
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScrollStorySection;
