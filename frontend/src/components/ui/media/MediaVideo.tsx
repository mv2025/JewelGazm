import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface MediaVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'video' | 'auto';
  className?: string;
  wrapperClassName?: string;
}

/**
 * Premium MediaVideo Component
 * Houses video tags for silent background loops and showcase media,
 * supporting intersections lazy-playing and smooth skeleton transitions.
 */
export const MediaVideo: React.FC<MediaVideoProps> = ({
  src,
  poster,
  aspectRatio = 'wide',
  className,
  wrapperClassName,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Lazy play when visible in viewport
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(videoEl);
    return () => {
      observer.unobserve(videoEl);
    };
  }, []);

  // Control playback based on intersection
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isIntersecting && autoPlay) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isIntersecting, autoPlay]);

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
        'relative overflow-hidden w-full bg-neutral-950',
        aspectClasses[aspectRatio],
        wrapperClassName
      )}
    >
      {/* Loading Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] pointer-events-none z-10" />
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onLoadedData={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-1000 ease-out z-0',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default MediaVideo;
