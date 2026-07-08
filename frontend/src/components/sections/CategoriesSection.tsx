import React from 'react';
import { Link } from 'react-router-dom';

// Gold Images
import goldGentsRing from '@/assets/Featured-Products/gold-siren-band.png';
import goldBracelet from '@/assets/Shop-By-Categories/Bracelets.webp';
import goldChains from '@/assets/Featured-Products/gold-aura-necklace.png';
import goldLadiesRing from '@/assets/Featured-Products/gold-celeste-ring.png';

// Silver Images
import silverGentsRingImg  from '@/assets/Shop-By-Categories/Silver-Gents-Ring.png';
import silverLadiesRingImg from '@/assets/Shop-By-Categories/Silver-Ladies-Ring.png';
import silverBraceletsImg  from '@/assets/Shop-By-Categories/Silver-Bracelet.png';
import silverChainsImg     from '@/assets/Shop-By-Categories/Silver-Chains.png';

interface CategoryItem {
  name: string;
  handle: string;
  goldImage: string;
  silverImage: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: 'Gents Rings',   handle: 'rings',     goldImage: goldGentsRing,  silverImage: silverGentsRingImg },
  { name: 'Bracelet',      handle: 'bracelets', goldImage: goldBracelet,   silverImage: silverBraceletsImg },
  { name: 'Chains',        handle: 'necklaces', goldImage: goldChains,     silverImage: silverChainsImg },
  { name: 'Ladies Rings',  handle: 'rings',     goldImage: goldLadiesRing, silverImage: silverLadiesRingImg },
];

interface CategoriesSectionProps {
  title?: string;
  metal?: 'gold' | 'silver' | 'all';
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ title = 'Shop By Category', metal = 'gold' }) => {
  return (
    /* FIXED: Added -mt-2 md:-mt-4 and relative z-10 to completely pull this section up and overlap any ghost gap behind it */
    <section className="relative z-10 -mt-2 md:-mt-4 pt-4 pb-16 bg-background select-none border-b border-border/40 block clear-both">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Adjusted padding top inside the heading layout so it doesn't look squished */}
        <h2 className="font-serif text-2xl md:text-3xl font-light text-center tracking-wide text-primary pt-10 md:pt-14 mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {CATEGORIES.map(cat => {
            const imageSrc = metal === 'silver' ? cat.silverImage : cat.goldImage;
            return (
              <Link
                key={cat.name}
                to={`/collections/${cat.handle}`}
                className="group flex flex-col items-center bg-white rounded-xl overflow-hidden border border-border/40 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-background">
                  <img
                    src={imageSrc}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>

                {/* Label */}
                <div className="w-full bg-background py-4 text-center border-t border-border/20">
                  <h3 className="font-serif text-[13px] font-medium tracking-wider uppercase text-primary group-hover:text-[var(--theme-primary)] transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;