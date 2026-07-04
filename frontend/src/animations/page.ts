import { Variants } from 'framer-motion';

/**
 * Premium Luxury Page transitions
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
