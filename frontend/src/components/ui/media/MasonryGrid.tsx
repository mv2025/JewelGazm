import React from 'react';
import { cn } from '@/utils/cn';
import { MediaImage } from './MediaImage';

interface MasonryGridProps {
  images: string[];
  columns?: { mobile: number; tablet: number; desktop: number };
  gap?: 'sm' | 'md' | 'lg';
  aspectRatios?: ('square' | 'portrait' | 'landscape' | 'wide' | 'auto')[];
  className?: string;
}

/**
 * Editorial MasonryGrid Component
 * Arranges photography layouts dynamically using columns to prevent whitespace gaps.
 */
export const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  aspectRatios = ['portrait', 'landscape', 'square', 'wide'],
  className,
}) => {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-10',
  };

  // Helper to slice images array into visual columns
  const getColumnData = (colsCount: number) => {
    const columnsArr: string[][] = Array.from({ length: colsCount }, () => []);
    images.forEach((img, idx) => {
      columnsArr[idx % colsCount].push(img);
    });
    return columnsArr;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop View */}
      <div className={cn('hidden lg:flex w-full', gapClasses[gap])}>
        {getColumnData(columns.desktop).map((colImages, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-6">
            {colImages.map((img, imgIdx) => (
              <MediaImage
                key={imgIdx}
                src={img}
                aspectRatio={aspectRatios[(colIdx + imgIdx) % aspectRatios.length]}
                wrapperClassName="rounded-md border border-white/5 transition-transform hover:scale-[1.01] duration-500"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tablet View */}
      <div className={cn('hidden sm:flex lg:hidden w-full', gapClasses[gap])}>
        {getColumnData(columns.tablet).map((colImages, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-4">
            {colImages.map((img, imgIdx) => (
              <MediaImage
                key={imgIdx}
                src={img}
                aspectRatio={aspectRatios[(colIdx + imgIdx) % aspectRatios.length]}
                wrapperClassName="rounded-md border border-white/5"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className={cn('flex sm:hidden flex-col w-full', gapClasses[gap])}>
        {images.map((img, imgIdx) => (
          <MediaImage
            key={imgIdx}
            src={img}
            aspectRatio={aspectRatios[imgIdx % aspectRatios.length]}
            wrapperClassName="rounded-md border border-white/5"
          />
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
