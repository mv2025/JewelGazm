import { Variants } from 'framer-motion';

/**
 * Grid/List Stagger Container Variant
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerVal: number = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerVal,
    },
  }),
};

/**
 * Card / Grid Item Entry Variant
 */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
