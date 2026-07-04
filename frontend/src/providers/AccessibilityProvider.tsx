import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  reducedMotion: boolean;
  highContrast: boolean;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    // Check user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('aura_high_contrast') === 'true';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('aura_high_contrast', String(highContrast));
  }, [highContrast]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        highContrast,
        toggleHighContrast,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
