import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto';
  className?: string;
  wrapperClassName?: string;
  showPlaceholder?: boolean;
}

/**
 * Premium Image Component
 * Prevents Cumulative Layout Shift (CLS) using preset aspect ratios,
 * shows a shimmering skeleton loader, and smooth-reveals when fully downloaded.
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt = 'Jewelgasm',
  aspectRatio = 'square',
  className,
  wrapperClassName,
  showPlaceholder = true,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[3/2]',
    wide: 'aspect-[16/9]',
    auto: 'aspect-auto',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full bg-surface-hover',
        aspectClasses[aspectRatio],
        wrapperClassName
      )}
    >
      {/* Shimmer Placeholder */}
      {showPlaceholder && !isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-surface-hover via-border/40 to-surface-hover bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}

      {/* Error Fallback Icon */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-hover text-primary/20">
          <svg
            className="w-8 h-8 stroke-[1.25]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      )}

      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          className={cn(
            'w-full h-full object-cover transition-[transform,filter] duration-1000 ease-out',
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-[8px]',
            className
          )}
          {...props}
        />
      ) : null}
    </div>
  );
};

export default Image;
