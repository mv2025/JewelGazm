import React from 'react';
import { AccessibilityProvider } from './AccessibilityProvider';
import { ThemeProvider } from './ThemeProvider';
import { LenisProvider } from './LenisProvider';
import { ToastProvider } from './ToastProvider';
import { CartProvider } from './CartProvider';
import { WishlistProvider } from './WishlistProvider';
import { SearchProvider } from './SearchProvider';
import { AuthProvider } from './AuthProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Global App Provider orchestrator
 * Combines theme, accessibility, smooth scroll, cart, wishlist and search states
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AccessibilityProvider>
      <ThemeProvider>
        <LenisProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <SearchProvider>
                  <AuthProvider>
                    {children}
                  </AuthProvider>
                </SearchProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </LenisProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  );
};

export default AppProvider;
