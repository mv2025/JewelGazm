import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  titleClassName?: string;
}

/**
 * Premium Collapsible Accordion component
 * Animates heights smoothly, supports multiple active states, and complies with W3C ARIA specifications.
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
  titleClassName,
}) => {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setActiveIds(prev => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter(item => item !== id);
      } else {
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map(item => {
        const isOpen = activeIds.includes(item.id);
        
        return (
          <div key={item.id} className="py-2.5">
            {/* Header trigger */}
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className={cn(
                'w-full flex items-center justify-between py-3 text-left font-serif font-medium uppercase tracking-widest text-primary text-xs focus-visible:ring-1 focus-visible:ring-gold focus-visible:outline-none transition-luxury',
                titleClassName
              )}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-primary/45 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen && 'transform rotate-180 text-gold'
                )}
              />
            </button>

            {/* Content panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: { height: { duration: 0.4 }, opacity: { duration: 0.25, delay: 0.05 } },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { height: { duration: 0.35 }, opacity: { duration: 0.15 } },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-1 text-sm font-sans leading-relaxed text-primary/70 font-light">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
