import React from 'react';
import { Link } from 'react-router-dom';
import limitedTimeBanner from '@/assets/Banners/Limited-Time-Banner.png';
import logoFooter from '@/assets/frt-logo.webp';

/**
 * Exchange Fest promotional banner section
 * Renders the limited time event banner image with text overlay on the left
 */
export const ExchangeFestSection: React.FC = () => {
  return (
    <section className="relative w-full select-none overflow-hidden border-b border-border/40 min-h-[400px] md:min-h-[500px] flex items-center">
      {/* Background Image */}
      <img 
        src={limitedTimeBanner} 
        alt="Exchange Fest Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Optional gradient for text readability if the image gets too bright on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-screen-xl">
        <div className="flex flex-col items-center text-center gap-4 max-w-md py-12 md:py-16">
          {/* Logo */}
          <img
            src={logoFooter}
            alt="Jewelgasm Logo"
            className="h-20 md:h-28 w-auto object-contain filter brightness-0 invert opacity-95 mb-2"
          />

          <span className="font-sans text-[10px] tracking-[0.35em] font-medium uppercase text-yellow-500">
            Limited Time Event
          </span>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-white tracking-wide leading-tight">
            Exchange Fest Is Back
          </h2>

          <p className="font-sans text-xs md:text-sm tracking-[0.1em] font-light text-white/80 leading-relaxed px-4">
            Upgrade your old jewelry for stunning new pieces. Exchange, refund, or redesign — your legacy jewels deserve a fresh brilliance.
          </p>

          {/* Divider ornament */}
          <div className="flex items-center gap-3 my-2 opacity-60">
            <div className="h-px w-12 bg-yellow-500" />
            <div className="w-1 h-1 rounded-full bg-yellow-500" />
            <div className="h-px w-12 bg-yellow-500" />
          </div>

          <Link to="/collections/all-jewellery" className="mt-2">
            <button className="border border-white/40 hover:border-yellow-500 hover:bg-white/5 text-white font-sans text-[10px] font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer">
              Explore Exchange Offers
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExchangeFestSection;
