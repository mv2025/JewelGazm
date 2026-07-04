import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto';
  className?: string;
}

/**
 * Premium Before-After Photo Slider Component
 * Allows users to drag a slider to compare raw vs retouched images.
 */
export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Raw',
  afterLabel = 'Retouched',
  aspectRatio = 'landscape',
  className,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const relativeX = clientX - left;
    const percentage = Math.max(0, Math.min(100, (relativeX / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[3/2]',
    wide: 'aspect-[16/9]',
    auto: 'aspect-auto',
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
      className={cn(
        'relative overflow-hidden w-full select-none cursor-ew-resize rounded-lg border border-white/10 shadow-lg',
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* After (Final/Retouched) Image - Full width underlayer */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[9px] tracking-widest text-white uppercase rounded-full pointer-events-none border border-white/5">
        {afterLabel}
      </div>

      {/* Before (Raw/Original) Image - Overlay cropped width */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw' }}
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[9px] tracking-widest text-white uppercase rounded-full pointer-events-none border border-white/5">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line Divider */}
      <div
        className="absolute inset-y-0 w-[1.5px] bg-white pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle Button */}
        <button
          onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
          onTouchStart={() => setIsDragging(true)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_12px_rgba(0,0,0,0.35)] transition-transform duration-200 border border-white focus:outline-none pointer-events-auto',
            isDragging ? 'scale-110' : 'scale-100'
          )}
          aria-label="Drag to compare before and after photos"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BeforeAfter;
