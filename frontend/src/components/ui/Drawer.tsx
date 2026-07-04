import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

/**
 * Reusable slide drawer panel (for Cart drawer, Mobile nav, Filters)
 * Locks body scroll and includes Esc key triggers + click outside listeners.
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Trap focus
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key triggers close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Framer Motion variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants = {
    hidden: { x: side === 'right' ? '100%' : '-100%' },
    visible: {
      x: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 220 },
    },
    exit: {
      x: side === 'right' ? '100%' : '-100%',
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          {/* Background Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"
          />

          {/* Sliding Panel */}
          <motion.div
            ref={drawerRef}
            tabIndex={-1}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
            className={cn(
              'relative z-10 w-full max-w-[440px] h-full bg-surface shadow-2xl flex flex-col focus:outline-none border-l border-border',
              side === 'left' ? 'mr-auto border-r border-l-0' : 'ml-auto',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              {title ? (
                <h2 id="drawer-title" className="text-base font-serif font-medium uppercase tracking-widest text-primary">
                  {title}
                </h2>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-surface-hover rounded-full transition-colors text-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 shrink-0" />
              </button>
            </div>

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
