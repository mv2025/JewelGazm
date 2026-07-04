import { Variants } from 'framer-motion';

/**
 * Image hover scale preset
 */
export const hoverZoom = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Text link underline slide reveal on hover
 */
export const hoverLine: Variants = {
  initial: { width: 0 },
  hover: {
    width: '100%',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Subtle hover lift preset
 */
export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
export default hoverZoom;
