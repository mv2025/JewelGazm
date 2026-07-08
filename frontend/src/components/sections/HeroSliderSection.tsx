import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import banner1 from '@/assets/Banners/Banner-1.webp';
import banner2 from '@/assets/Banners/Banner-2.webp';
import banner3 from '@/assets/Banners/Banner-3.webp';

interface Slide {
  id: number;
  image: string;
  alt: string;
  link: string;
  aspect: string;
}

const HERO_SLIDES: Slide[] = [
  { id: 1, image: banner1, alt: 'Rings that speak from the heart — New Collection', link: '/collections/rings', aspect: '2000/666' },
  { id: 2, image: banner2, alt: 'Shine Every Moment — Fine Jewellery Collection', link: '/collections/rings', aspect: '1831/859' },
  { id: 3, image: banner3, alt: 'Bold in Design, Timeless in Shine — Discover Now', link: '/collections/rings', aspect: '2000/667' },
];

export const HeroSliderSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const goTo = (idx: number) => {
    setCurrentIdx(idx);
    startAutoplay();
  };

  const currentSlide = HERO_SLIDES[currentIdx];

  return (
    <section className="relative w-full h-[calc(100vh-120px)] lg:h-[calc(100vh-160px)] bg-white block overflow-hidden p-0 m-0 border-none leading-none select-none group/slider">
      
      <div className="block w-full h-full m-0 p-0 pointer-events-none">
        <img
          src={currentSlide.image}
          alt={currentSlide.alt}
          draggable={false}
          className="w-full h-full block m-0 p-0 object-cover object-bottom align-bottom"
        />
      </div>

      {/* ── LEFT & RIGHT SIDE NAV ARROWS ── */}
      {/* CHANGED: Moved previous arrow to the vertical center of the left edge */}
      <button
        onClick={() => goTo((currentIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 border border-[var(--theme-primary)]/20 rounded-full text-[var(--theme-primary)] bg-white/70 backdrop-blur-sm shadow-sm hover:bg-[var(--theme-primary)] hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* CHANGED: Moved next arrow to the vertical center of the right edge */}
      <button
        onClick={() => goTo((currentIdx + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 border border-[var(--theme-primary)]/20 rounded-full text-[var(--theme-primary)] bg-white/70 backdrop-blur-sm shadow-sm hover:bg-[var(--theme-primary)] hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* ── BOTTOM CENTER NAVIGATION DOTS ── */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto items-center">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                idx === currentIdx ? 'w-10 bg-[var(--theme-primary)]' : 'w-5 bg-[var(--theme-primary)]/30 hover:bg-[var(--theme-primary)]/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroSliderSection;