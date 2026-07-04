import React from 'react';
import { motion } from 'framer-motion';
import logoBhatia from '@/assets/Marquee/Bhatia&Company.webp';
import logoDwarka from '@/assets/Marquee/DwarkaJewellers.webp';
import logoKC from '@/assets/Marquee/KC-Jewellers.webp';
import logoMaha from '@/assets/Marquee/Maha-Luxmi-Jewellers.webp';
import logoVK from '@/assets/Marquee/V.K.-Jewellers.webp';

// New Logos
import logoClassic from '@/assets/Marquee/Classic-Solitares.webp';
import logoMukesh from '@/assets/Marquee/Mukesh-Jewellers.webp';
import logoShiva from '@/assets/Marquee/Shiva-Gold.webp';
import logoSunita from '@/assets/Marquee/Sunita-Jewellers.webp';
import logoTC from '@/assets/Marquee/TC-Ornaments.webp';

interface MarqueeSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({
  title = "Brands That Trust Delhi's Leading Photo Studio",
  description = "FRT Studios is a trusted photo studio for jewellery houses, fashion labels and ecommerce sellers across Delhi NCR.",
  buttonText = "Let's Connect"
}) => {
  const logosRow1 = [
    logoClassic,
    logoMukesh,
    logoShiva,
    logoSunita,
    logoTC,
    logoClassic,
    logoMukesh,
    logoShiva,
    logoSunita,
    logoTC,
  ];

  const logosRow2 = [
    logoKC,
    logoMaha,
    logoVK,
    logoBhatia,
    logoDwarka,
    logoKC,
    logoMaha,
    logoVK,
    logoBhatia,
    logoDwarka,
  ];

  const handleConnectClick = () => {
    // Scroll to contact form or trigger action
    const contactSection = document.getElementById('newsletter');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0A0A0A] text-white overflow-hidden border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight mb-4 text-white"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-400 text-sm md:text-base max-w-xl font-sans font-light leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <button
              onClick={handleConnectClick}
              className="px-8 py-3.5 bg-[#FF0000] text-white font-sans font-medium text-sm rounded-full tracking-wider hover:bg-red-700 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(255,0,0,0.3)] hover:shadow-[0_6px_24px_rgba(255,0,0,0.5)] cursor-pointer"
            >
              {buttonText}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="w-full flex flex-col gap-6 relative">
        {/* Soft fading overlays on the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Left to Right */}
        <div className="flex w-[200%] md:w-[150%] overflow-hidden select-none">
          <div className="flex min-w-full animate-marquee-left py-4 items-center">
            {logosRow1.map((logo, index) => (
              <div 
                key={`row1-${index}`} 
                className="w-[clamp(8rem,15vw,14rem)] flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-105 px-3"
              >
                <img 
                  src={logo} 
                  alt="Client Partner Logo" 
                  className="h-[clamp(3.5rem,8vw,7.5rem)] w-auto max-w-[95%] object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex w-[200%] md:w-[150%] overflow-hidden select-none">
          <div className="flex min-w-full animate-marquee-right py-4 items-center">
            {logosRow2.map((logo, index) => (
              <div 
                key={`row2-${index}`} 
                className="w-[clamp(8rem,15vw,14rem)] flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-105 px-3"
              >
                <img 
                  src={logo} 
                  alt="Client Partner Logo" 
                  className="h-[clamp(3.5rem,8vw,7.5rem)] w-auto max-w-[95%] object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
