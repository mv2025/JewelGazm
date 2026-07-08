import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Testimonial {
  id: number;
  author: string;
  rating: number;
  body: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: "Neha P.",
    rating: 5,
    body: "Exquisite craftsmanship and elegant design. Worth every rupee!",
    date: "June 14, 2026"
  },
  {
    id: 2,
    author: "Kavya R.",
    rating: 5,
    body: "The earrings are gorgeous! Exactly as shown in the pictures.",
    date: "June 10, 2026"
  },
  {
    id: 3,
    author: "Ayesha M.",
    rating: 5,
    body: "The ring is absolutely stunning! The quality is beyond my expectations.",
    date: "May 28, 2026"
  },
  {
    id: 4,
    author: "Priya S.",
    rating: 5,
    body: "Beautiful packaging and fast delivery. I will definitely shop again!",
    date: "May 15, 2026"
  },
  {
    id: 5,
    author: "Rahul K.",
    rating: 5,
    body: "I gifted a necklace to my wife, she loved it so much.",
    date: "May 03, 2026"
  },
  {
    id: 6,
    author: "Arjun M.",
    rating: 5,
    body: "Premium quality and excellent customer service. Highly recommended!",
    date: "April 22, 2026"
  }
];

interface CustomerReviewsSectionProps {
  title?: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  title = "What Our Customers Say"
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Get 3 visible items based on startIndex, wrapping around if needed
  const visibleTestimonials = [
    TESTIMONIALS[startIndex],
    TESTIMONIALS[(startIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAF8F5] select-none border-b border-[#E8E0D5]/50 overflow-hidden relative">
      {/* Background elegant accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E8E0D5]/40 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 mb-16 md:mb-24"
        >
          <span className="font-sans text-[10px] tracking-[0.35em] font-semibold uppercase text-[var(--theme-accent-light)]">
            Client Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-center tracking-wide text-[var(--theme-primary)]">
            {title}
          </h2>
          <div className="h-px w-16 bg-[var(--theme-accent-light)]/50 mt-4" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev} 
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full text-[var(--theme-primary)] hover:scale-110 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 focus:outline-none"
            aria-label="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
          </button>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full overflow-visible px-4 md:px-0 min-h-[280px]">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((item, index) => {
                const isHovered = hoveredId === item.id;
                const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

                return (
                  <motion.div
                    key={`${item.id}-${startIndex}`} // Ensure animation triggers on scroll
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                      "relative bg-white border border-[#E8E0D5]/60 rounded-2xl p-8 lg:p-10 flex flex-col h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      // Spotlight effect handling
                      isHovered ? "scale-[1.03] shadow-2xl border-[var(--theme-primary)]/20 z-20" : "shadow-sm",
                      isOtherHovered ? "scale-[0.97] opacity-40 blur-[1px] z-10" : "",
                      // Stagger the vertical placement slightly for an organic look on desktop
                      index === 1 ? "md:translate-y-8" : ""
                    )}
                  >
                    {/* Decorative Quote Icon */}
                    <div className="absolute top-8 right-8 text-[#E8E0D5]/50 transition-colors duration-500">
                      <Quote className={cn("w-10 h-10 rotate-180", isHovered ? "text-[var(--theme-accent-light)]/20" : "")} />
                    </div>

                    {/* Stars Row */}
                    <div className="flex gap-1.5 mb-8 relative z-10">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4 md:w-5 md:h-5 fill-[var(--theme-accent-light)] text-[var(--theme-accent-light)] transition-all duration-500",
                            isHovered ? "drop-shadow-sm scale-110" : ""
                          )} 
                          style={{ transitionDelay: isHovered ? `${i * 50}ms` : '0ms' }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 relative z-10 flex items-start w-full">
                      <p className="font-sans text-[15px] md:text-[16px] font-light leading-relaxed text-[#6B5B4E] italic">
                        {item.body}
                      </p>
                    </div>

                    {/* Author & Timestamp */}
                    <div className="mt-8 pt-6 w-full flex items-center justify-between relative z-10 border-t border-[#E8E0D5]/50">
                      <div>
                        <span className="text-[10px] tracking-widest font-sans font-semibold uppercase text-[var(--theme-primary)] block text-left">
                          {item.author}
                        </span>
                        <span className="text-[9px] font-sans font-light text-[#9E8E82] block mt-1 text-left">
                          Verified Client
                        </span>
                      </div>
                      <span className="text-[10px] font-sans font-light text-[#9E8E82] tracking-wider">
                        {item.date}
                      </span>
                    </div>
                    
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext} 
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full text-[var(--theme-primary)] hover:scale-110 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 focus:outline-none"
            aria-label="Next Reviews"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
