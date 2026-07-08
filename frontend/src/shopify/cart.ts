import { shopifyFetch } from './client';

export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    product: {
      title: string;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{ node: CartLineItem }>;
  };
}

export const createCart = async (): Promise<Cart> => {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await shopifyFetch<{ cartCreate: { cart: Cart } }>(query);
  return response.data.cartCreate.cart;
};

export const getCart = async (cartId: string): Promise<Cart | null> => {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await shopifyFetch<{ cart: Cart }>(query, { cartId });
    return response.data.cart;
  } catch (e) {
    return null;
  }
};
