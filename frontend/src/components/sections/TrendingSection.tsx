import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import gentsImg  from '@/assets/Accessories/Gents.webp';
import ladiesImg from '@/assets/Accessories/Ladies.webp';

const PANELS = [
  { href: '/collections/rings',     image: gentsImg,  imageAlt: 'Gents Accessories – Rose Gold Signet Ring'         },
  { href: '/collections/bracelets', image: ladiesImg, imageAlt: 'Ladies Accessories – Rose Gold Studded Bracelet'   },
];

export const TrendingSection: React.FC = () => {
  return (
    <section className="bg-[#4A0E17] py-12 md:py-16 select-none border-b border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col gap-8">

        {/* ── Centered heading above both panels ── */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-sans text-[10px] tracking-[0.35em] font-semibold uppercase text-[#C9A96E]">
            Jewelgasm
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-widest uppercase text-white">
            Collection
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-px w-12 bg-[#C9A96E]/50" />
            <div className="w-1 h-1 rounded-full bg-[#C9A96E]/60" />
            <div className="h-px w-12 bg-[#C9A96E]/50" />
          </div>
        </div>

        {/* ── Two image panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PANELS.map((panel) => (
            <div key={panel.href} className="flex flex-col items-center gap-4">

              {/* Image */}
              <div className="group/img w-full cursor-pointer flex justify-center">
                <img
                  src={panel.image}
                  alt={panel.imageAlt}
                  draggable={false}
                  className="w-full h-auto block object-contain scale-[1.15] md:scale-[1.25] transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.2] md:group-hover/img:scale-[1.3]"
                />
              </div>

              {/* Explore Now button — centred below each image */}
              <Link
                to={panel.href}
                className="group relative z-10 inline-flex items-center gap-2.5 border border-white/25 hover:border-[#C9A96E] px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-white/5"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] font-medium uppercase text-white/75 group-hover:text-[#C9A96E] transition-colors duration-300">
                  Explore Now
                </span>
                <ArrowRight className="w-3 h-3 text-white/75 group-hover:text-[#C9A96E] group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingSection;
