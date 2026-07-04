import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/shopify';

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('aura_wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse wishlist:', err);
      }
    }
  }, []);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      let updated: Product[];

      if (exists) {
        updated = prev.filter(item => item.id !== product.id);
      } else {
        updated = [...prev, product];
      }

      localStorage.setItem('aura_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('aura_wishlist');
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
