import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCart, getCart, Cart } from '../shopify/cart';

interface CartContextType {
  cartId: string | null;
  cart: Cart | null;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartId, setCartId] = useState<string | null>(localStorage.getItem('shopify_cart_id'));
  const queryClient = useQueryClient();

  // Fetch the cart using TanStack Query, ONLY if cartId exists
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId,
  });

  // Mutation to create a new cart if one doesn't exist
  const createCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: (newCart) => {
      setCartId(newCart.id);
      localStorage.setItem('shopify_cart_id', newCart.id);
      queryClient.setQueryData(['cart', newCart.id], newCart);
    },
  });

  // Automatically create a cart if we don't have an ID saved
  useEffect(() => {
    if (!cartId && !createCartMutation.isPending) {
      createCartMutation.mutate();
    }
  }, [cartId, createCartMutation]);

  return (
    <CartContext.Provider value={{ cartId, cart: cart || null, isLoading: isLoading || createCartMutation.isPending }}>
      {children}
    </CartContext.Provider>
  );
};

export const useShopifyCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useShopifyCart must be used within a CartProvider');
  }
  return context;
};
