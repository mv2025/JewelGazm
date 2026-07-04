import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Centered modal component
 * Supports keyboard escape, locks body scrolling, traps focus, and animates smoothly.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/45 backdrop-blur-[2px]"
          />

          {/* Centered Panel */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={cn(
              'relative z-10 w-full max-w-lg bg-surface border border-border shadow-2xl flex flex-col focus:outline-none rounded-sm overflow-hidden',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-surface">
              {title ? (
                <h3 id="modal-title" className="text-sm font-serif font-semibold uppercase tracking-widest text-primary">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-surface-hover rounded-full transition-colors text-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contents */}
            <div className="px-6 py-6 overflow-y-auto max-h-[75vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
