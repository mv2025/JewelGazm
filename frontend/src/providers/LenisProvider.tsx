import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiating Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium smooth deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Attach to requestAnimationFrame
    let rafId: number;
    const rafCallback = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafCallback);
    };
    rafId = requestAnimationFrame(rafCallback);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenis = () => {
  return useContext(LenisContext);
};
export default LenisProvider;
