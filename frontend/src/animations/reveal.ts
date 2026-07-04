import { Variants } from 'framer-motion';

/**
 * Text reveal clipping container variant
 * Works together with a parent motion container
 */
export const clipTextContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Text element slide up reveal (sliding from clip mask)
 */
export const clipTextItem: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Image container slide reveal (using CSS clip-path or scale)
 */
export const imageClipReveal: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    scale: 1.1,
  },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
