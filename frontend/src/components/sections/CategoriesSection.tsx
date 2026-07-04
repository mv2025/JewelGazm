import React from 'react';
import { Link } from 'react-router-dom';

import gentsRingImg  from '@/assets/Shop-By-Categories/Gents-Ring.webp';
import ladiesRingImg from '@/assets/Shop-By-Categories/Ladies-Ring.webp';
import braceletsImg  from '@/assets/Shop-By-Categories/Bracelets.webp';
import chainsImg     from '@/assets/Shop-By-Categories/Chains.webp';

interface CategoryItem {
  name: string;
  handle: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: 'Gents Rings',   handle: 'rings',     image: gentsRingImg  },
  { name: 'Bracelet',      handle: 'bracelets', image: braceletsImg  },
  { name: 'Chains',        handle: 'necklaces', image: chainsImg     },
  { name: 'Ladies Rings',  handle: 'rings',     image: ladiesRingImg },
];

interface CategoriesSectionProps {
  title?: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ title = 'Shop By Category' }) => {
  return (
    /* FIXED: Added -mt-2 md:-mt-4 and relative z-10 to completely pull this section up and overlap any ghost gap behind it */
    <section className="relative z-10 -mt-2 md:-mt-4 pt-4 pb-16 bg-[#FAF8F5] select-none border-b border-border/40 block clear-both">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Adjusted padding top inside the heading layout so it doesn't look squished */}
        <h2 className="font-serif text-2xl md:text-3xl font-light text-center tracking-wide text-primary pt-10 md:pt-14 mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.name}
              to={`/collections/${cat.handle}`}
              className="group flex flex-col items-center bg-white rounded-xl overflow-hidden border border-border/40 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#FAF8F5]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
              </div>

              {/* Label */}
              <div className="w-full bg-[#FAF8F5] py-4 text-center border-t border-border/20">
                <h3 className="font-serif text-[13px] font-medium tracking-wider uppercase text-primary group-hover:text-[#4A0E17] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;