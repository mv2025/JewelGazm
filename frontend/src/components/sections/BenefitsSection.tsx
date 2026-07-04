import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Coins, ShieldCheck, RotateCcw } from 'lucide-react';

const BENEFITS = [
  { icon: MessageSquare, title: '24/7 Live Styling',      desc: 'Expert Consultation'  },
  { icon: Coins,         title: 'Assured Buyback',        desc: 'Lifetime Value'        },
  { icon: ShieldCheck,   title: '100% Certified Jewelry', desc: 'GIA & BIS Hallmarked' },
  { icon: RotateCcw,     title: 'Easy Return & Exchange', desc: 'Hassle-Free 30 Days'  },
];

const TRACK = [...BENEFITS, ...BENEFITS];

export const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Fade-in when section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-[#FAF8F5] py-8 border-y border-border select-none overflow-hidden
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {/* Marquee track — no hover pause */}
      <div className="flex items-center w-max gap-16 animate-[marquee-left_35s_linear_infinite]">
        {TRACK.map((item, i) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={i}>
              {/* Item — pop-up on hover, marquee never stops */}
              <div className="flex items-center gap-4 shrink-0 group cursor-default
                              transition-transform duration-300 ease-out
                              hover:-translate-y-2 hover:scale-105">
                <Icon className="w-9 h-9 text-[#4A0E17] stroke-[1.2] shrink-0
                                 transition-transform duration-300 group-hover:scale-110" />
                <div className="flex flex-col">
                  <span className="font-sans text-[13px] font-semibold tracking-wide text-[#4A0E17] leading-tight whitespace-nowrap
                                   group-hover:text-[#C9A96E] transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="font-sans text-[9px] font-medium tracking-[0.18em] uppercase text-[#4A0E17]/50 mt-0.5 whitespace-nowrap">
                    {item.desc}
                  </span>
                </div>
              </div>

              {/* Gold dot divider */}
              <div className="w-1 h-1 rounded-full bg-[#C9A96E]/60 shrink-0" />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default BenefitsSection;
