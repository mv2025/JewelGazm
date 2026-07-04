import React from 'react';

/**
 * SkipToContent link for screen reader and keyboard user navigation
 */
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-gold focus:text-white focus:font-sans focus:font-medium focus:text-sm focus:shadow-lg focus:outline-none transition-luxury"
    >
      Skip to Main Content
    </a>
  );
};

export default SkipToContent;
