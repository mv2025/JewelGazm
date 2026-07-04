import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * Editorial dual-panel campaign split banner section
 */
export const FeaturedBannerSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-20 select-none bg-background border-b border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-lg">
          
          {/* Left Panel: Cream Heritage Story */}
          <div className="bg-[#FAF8F5] p-8 md:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-border/40">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
                Heritage & Craft
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-primary leading-tight">
                Crafted to<br />Cherish Forever
              </h2>
              <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-primary/75 max-w-md mt-2">
                Our designer masterworks are hand-finished by generational craftsmen, balancing classic geometry with modern fire to highlight the natural fire of conflict-free diamonds.
              </p>
            </div>

            {/* Micro badges list */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <span className="text-[9px] font-sans font-medium uppercase text-primary/60 tracking-wider">
                  100% Certified
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Award className="w-5 h-5 text-gold" />
                <span className="text-[9px] font-sans font-medium uppercase text-primary/60 tracking-wider">
                  Insured Transit
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-[9px] font-sans font-medium uppercase text-primary/60 tracking-wider">
                  Lifetime Value
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Burgundy Campaign Promotion */}
          <div className="relative bg-[#4A0E17] p-8 md:p-12 overflow-hidden flex flex-col justify-center min-h-[350px] lg:min-h-[450px]">
            {/* Background image overlay */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
                alt="Jewelgazm Serpent Bracelet"
                className="w-full h-full object-cover opacity-35 object-center scale-105 hover:scale-100 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A0E17]/95 via-[#4A0E17]/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md text-white flex flex-col items-start gap-4">
              <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
                Exclusive Campaign
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight tracking-wide">
                Luxury That<br />Lasts Forever
              </h2>
              <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-white/80 max-w-sm mt-1">
                Discover masterfully cast bracelets and bands designed for every precious moment.
              </p>
              
              <Link 
                to="/collections/bracelets" 
                className="group inline-flex items-center gap-2.5 border border-white/25 hover:border-[#C9A96E] px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-white/5 mt-4"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] font-medium uppercase text-white/75 group-hover:text-[#C9A96E] transition-colors duration-300">
                  Explore Now
                </span>
                <ArrowRight className="w-3 h-3 text-white/75 group-hover:text-[#C9A96E] group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedBannerSection;
