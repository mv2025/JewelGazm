import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'video' | 'auto';
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
}

/**
 * Agency-grade MediaImage Component
 * Prevents Cumulative Layout Shift (CLS) with fixed aspect ratio box wrappers,
 * renders shimmering skeletons, and applies smooth GPU-accelerated blur-reveals.
 */
export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt = 'Jewelgazm Creation',
  aspectRatio = 'auto',
  className,
  wrapperClassName,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Trigger load state immediately if image is cached
  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      if (img.complete) {
        setIsLoaded(true);
      }
    }
  }, [src]);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[3/2]',
    wide: 'aspect-[16/9]',
    video: 'aspect-[21/9]',
    auto: 'aspect-auto',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full bg-neutral-900',
        aspectClasses[aspectRatio],
        wrapperClassName
      )}
    >
      {/* Shimmer Skeleton Placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600">
          <svg className="w-8 h-8 stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
          </svg>
        </div>
      )}

      {src && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          className={cn(
            'w-full h-full object-cover transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) will-change-transform',
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-[12px]',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default MediaImage;
