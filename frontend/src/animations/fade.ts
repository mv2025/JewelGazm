import { Variants } from 'framer-motion';

/**
 * Standard Fade In Animation Variant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1], // Custom luxury cubic-bezier
    },
  }),
};

/**
 * Fade Up Animation Variant (y direction)
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * Fade Down Animation Variant (y direction)
 */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
