import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/providers/ToastProvider';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterInput = z.infer<typeof schema>;

interface NewsletterSectionProps {
  title?: string;
  placeholder?: string;
}

/**
 * Premium Dedicated Homepage Newsletter Subscription Card Section
 */
export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  title = "Join the Circle of Light",
  placeholder = "Enter your email"
}) => {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    // Simulate API request delay
    await new Promise(r => setTimeout(r, 1000));
    console.log('Newsletter subscribe:', data.email);
    addToast('Thank you for subscribing! You\'ll be the first to discover new collections and exclusive Jewelgazm offers.', 'success');
    reset();
  };

  return (
    <section className="py-32 md:py-40 bg-[#FAF8F5] select-none relative overflow-hidden text-center border-b border-[#E8E0D5]/50">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--theme-accent-light)]/10 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Faint Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[15rem] font-bold text-[var(--theme-accent-light)]/[0.07] pointer-events-none z-0 tracking-widest whitespace-nowrap select-none">
        Jewelgazm
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-2xl flex flex-col items-center gap-8 relative z-10">
        
        <span className="font-sans text-[11px] tracking-[0.4em] font-semibold uppercase text-[var(--theme-accent-light)]">
          Exclusive Access
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[var(--theme-primary)] leading-tight tracking-wide">
          {title}
        </h2>
        
        <p className="font-sans text-sm md:text-[15px] font-light leading-relaxed text-[#6B5B4E] max-w-lg mb-4">
          Be the first to discover new collections, bespoke creations, and exclusive Jewelgazm offers delivered straight to your inbox.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 max-w-lg">
          <div className="flex flex-col sm:flex-row gap-0 w-full relative group">
            <input
              type="email"
              placeholder={placeholder}
              className="flex-grow bg-transparent border-b border-[#E8E0D5] focus:border-[var(--theme-accent-light)] px-2 py-4 font-sans font-light text-[15px] text-[var(--theme-primary)] placeholder:text-[#9E8E82] focus:outline-none transition-all duration-300"
              disabled={isSubmitting}
              {...register('email')}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:shrink-0 sm:absolute sm:right-0 sm:bottom-0 sm:top-0 px-4 flex items-center justify-center font-sans text-[11px] font-semibold tracking-widest uppercase text-[var(--theme-accent-light)] hover:text-[var(--theme-primary)] transition-colors disabled:opacity-50 mt-4 sm:mt-0"
            >
              {isSubmitting ? 'Joining...' : 'Subscribe'}
            </button>
          </div>
          
          {errors.email && (
            <span className="text-[11px] text-red-500 font-sans text-left mt-1 px-2">
              {errors.email.message}
            </span>
          )}
        </form>

      </div>
    </section>
  );
};

export default NewsletterSection;
