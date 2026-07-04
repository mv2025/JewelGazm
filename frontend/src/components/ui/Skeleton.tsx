import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

/**
 * Atomic shimmering skeleton loader
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'bg-border/40 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-surface-hover via-border/30 to-surface-hover bg-[length:200%_100%] rounded-sm',
        className
      )}
    />
  );
};

/**
 * Composite Product Card Shimmer
 */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Skeleton className="w-full aspect-[4/5]" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/4 mt-1" />
      </div>
    </div>
  );
};

/**
 * Composite Homepage Hero Slide Shimmer
 */
export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-surface-hover overflow-hidden flex items-center">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-4 max-w-lg">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-11 w-1/3 mt-4" />
      </div>
    </div>
  );
};

/**
 * Composite Collection Page Catalog Grid Shimmer
 */
export const CollectionSkeleton: React.FC = () => {
  return (
    <div className="w-full py-12 flex flex-col gap-8">
      {/* Banner Skeleton */}
      <Skeleton className="w-full h-64 md:h-80" />
      
      {/* Catalog Structure */}
      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        {/* Products Grid */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
