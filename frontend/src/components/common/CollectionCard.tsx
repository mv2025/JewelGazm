import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '@/lib/shopify';
import { cn } from '@/utils/cn';

interface CollectionCardProps {
  collection: Collection;
  className?: string;
}

/**
 * Premium Collection teaser card component
 * Includes hover zoom effect and thin overlay styling
 */
export const CollectionCard: React.FC<CollectionCardProps> = ({ collection, className }) => {
  return (
    <Link
      to={`/collections/${collection.handle}`}
      className={cn(
        'group relative block overflow-hidden bg-surface-hover aspect-[3/4] md:aspect-[4/5] border border-border/10',
        className
      )}
    >
      {/* Background Image with Zoom */}
      <div className="absolute inset-0 w-full h-full">
        {collection.image?.url ? (
          <img
            src={collection.image.url}
            alt={collection.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-surface-hover flex items-center justify-center text-primary/10">
            No Image
          </div>
        )}
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-primary/25 group-hover:bg-primary/30 transition-colors duration-500" />
      </div>

      {/* Details Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 text-white">
        <span className="text-[9px] tracking-[0.2em] font-sans font-light uppercase text-gold mb-1.5 opacity-90">
          Fine Collection
        </span>
        <h3 className="font-serif text-lg md:text-xl tracking-wide font-normal mb-2 leading-tight">
          {collection.title}
        </h3>
        
        {collection.description && (
          <p className="text-[11px] font-sans font-light leading-relaxed text-white/70 line-clamp-2 max-w-xs mb-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
            {collection.description}
          </p>
        )}

        <div className="inline-flex items-center gap-1.5 text-[9px] tracking-widest font-sans font-medium uppercase mt-2">
          <span className="border-b border-white/40 group-hover:border-gold pb-0.5 transition-colors">
            Shop Collection
          </span>
          <svg
            className="w-3 h-3 stroke-[2.5] transform translate-x-0 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
