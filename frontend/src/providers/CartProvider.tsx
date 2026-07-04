import React, { createContext, useContext, useState, useEffect } from 'react';
import { shopify, Cart } from '@/lib/shopify';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (merchandiseId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);

  // Initialize Cart from storage or create a new one
  useEffect(() => {
    const initCart = async () => {
      setLoading(true);
      try {
        const cartId = localStorage.getItem('aura_shopify_cart_id');
        let activeCart: Cart | null = null;
        
        if (cartId) {
          activeCart = await shopify.getCart(cartId);
        }
        
        if (!activeCart) {
          activeCart = await shopify.createCart();
          localStorage.setItem('aura_shopify_cart_id', activeCart.id);
        }
        setCart(activeCart);
      } catch (err) {
        console.error('Failed to initialize cart:', err);
      } finally {
        setLoading(false);
      }
    };
    initCart();
  }, []);

  const refreshCart = async () => {
    if (!cart?.id) return;
    try {
      const refreshed = await shopify.getCart(cart.id);
      if (refreshed) setCart(refreshed);
    } catch (err) {
      console.error('Failed to refresh cart:', err);
    }
  };

  const addToCart = async (merchandiseId: string, quantity: number) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updatedCart = await shopify.addToCart(cart.id, [{ merchandiseId, quantity }]);
      setCart(updatedCart);
      // Auto open cart drawer when item is added for interactive UX
      setCartOpen(true);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updatedCart = await shopify.updateCartLines(cart.id, [{ id: lineId, quantity }]);
      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to update quantity:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updatedCart = await shopify.removeFromCart(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to remove item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        isCartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
