import React, { useRef, useEffect, useState } from 'react';
import page1Bg from '@/assets/Special-Img-Bg/Page-1.png';
import page2Bg from '@/assets/Special-Img-Bg/Page-2.png';

export const ScrollingNarrativeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [overallOpacity, setOverallOpacity] = useState<number>(1);
  const [scrollYProgress1, setScrollYProgress1] = useState<number>(0);
  const [scrollYProgress2, setScrollYProgress2] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Section total height and boundaries
      const start = rect.top + window.scrollY;
      const end = rect.bottom + window.scrollY;
      const currentScroll = window.scrollY;

      // Calculate progress of section in viewport
      const totalScrollableDistance = rect.height - viewportHeight;
      const scrolledInContainer = currentScroll - start;
      const progress = Math.min(Math.max(scrolledInContainer / totalScrollableDistance, 0), 1);

      // Page 1 Active in the first half of container scroll, Page 2 Active in the second half
      if (progress < 0.5) {
        setActivePageIndex(0);
      } else {
        setActivePageIndex(1);
      }

      // Calculate fine-grained vertical progress of content cards moving inside viewport for each page
      // Page 1 scroll progress [0, 0.45]
      const p1 = Math.min(Math.max(progress / 0.45, 0), 1);
      setScrollYProgress1(p1);

      // Page 2 scroll progress [0.5, 0.95]
      const p2 = Math.min(Math.max((progress - 0.5) / 0.45, 0), 1);
      setScrollYProgress2(p2);

      // Fade out the entire section when the next section starts entering the viewport (when bottom of section is close)
      // When the bottom is at viewportHeight down to viewportHeight/2 (50% in view)
      if (rect.bottom < viewportHeight) {
        const fadeProgress = Math.max(0, rect.bottom / (viewportHeight / 2) - 1); // fades out when rect.bottom goes below viewportHeight down to 50%
        setOverallOpacity(Math.min(fadeProgress, 1));
      } else {
        setOverallOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to initialize correct positioning
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ opacity: overallOpacity }}
      className="relative w-full h-[300vh] bg-black select-none transition-opacity duration-300 pointer-events-none lg:pointer-events-auto"
    >
      {/* Sticky full-screen image and content viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Images Layer */}
        <div className="absolute inset-0 w-full h-full">
          {/* Page 1 BG Image */}
          <div
            style={{
              backgroundImage: `url(${page1Bg})`,
              opacity: activePageIndex === 0 ? 1 : 0,
            }}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1.2s] ease-in-out"
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Page 2 BG Image */}
          <div
            style={{
              backgroundImage: `url(${page2Bg})`,
              opacity: activePageIndex === 1 ? 1 : 0,
            }}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1.2s] ease-in-out"
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Content Layer with dynamic scroll-driven translate transitions */}
        <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 text-center text-white pointer-events-none">
          {activePageIndex === 0 ? (
            <div
              style={{
                transform: `translateY(calc(8vh - ${scrollYProgress1 * 16}vh))`,
                opacity: scrollYProgress1 > 0.05 && scrollYProgress1 < 0.95 ? 1 : 0,
              }}
              className="transition-all duration-300 ease-out flex flex-col items-center gap-4 md:gap-6"
            >
              <span className="font-sans text-[clamp(9px,1.2vw,11px)] font-bold tracking-[0.4em] uppercase text-[#C9A96E]">
                Timeless Heritage
              </span>
              <h2 className="font-serif text-[clamp(1.75rem,5vw,3.5rem)] font-light tracking-wide max-w-2xl leading-tight">
                Crafted For Golden Moments
              </h2>
              <div className="h-px w-24 bg-[#C9A96E]/50 my-2" />
              <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] text-white/80 max-w-lg leading-relaxed">
                Handcrafted masterpieces meticulously brought to life by master artisans, preserving legacy in every single detail.
              </p>
            </div>
          ) : (
            <div
              style={{
                transform: `translateY(calc(8vh - ${scrollYProgress2 * 16}vh))`,
                opacity: scrollYProgress2 > 0.05 && scrollYProgress2 < 0.95 ? 1 : 0,
              }}
              className="transition-all duration-300 ease-out flex flex-col items-center gap-4 md:gap-6"
            >
              <span className="font-sans text-[clamp(9px,1.2vw,11px)] font-bold tracking-[0.4em] uppercase text-[#C9A96E]">
                Bespoke Selection
              </span>
              <h2 className="font-serif text-[clamp(1.75rem,5vw,3.5rem)] font-light tracking-wide max-w-2xl leading-tight">
                Refine Your Signature Luxury
              </h2>
              <div className="h-px w-24 bg-[#C9A96E]/50 my-2" />
              <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] text-white/80 max-w-lg leading-relaxed">
                Exquisite cuts and premium gold styles curated to reflect your unique character and transition effortlessly from everyday wear to royal luxury.
              </p>
            </div>
          )}
        </div>

        {/* Ambient Page Indicators on Left Side */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          {[0, 1].map((index) => (
            <div
              key={index}
              className={`w-1.5 h-12 rounded-full transition-all duration-700 ${
                activePageIndex === index ? 'bg-[#C9A96E] scale-x-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ScrollingNarrativeSection;
