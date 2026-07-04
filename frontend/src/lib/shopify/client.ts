import { Product, Collection, Cart, Review, StoreSettings } from './types';

// Read variables from environmental configuration
const domain = import.meta.env.VITE_SHOPIFY_DOMAIN || '';
const storefrontAccessToken = import.meta.env.VITE_STOREFRONT_TOKEN || '';
const apiVersion = import.meta.env.VITE_API_VERSION || '2024-04';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

/**
 * Execute standard shopify storefront GraphQL calls
 */
async function shopifyFetch<T>({ query, variables = {} }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  if (!domain || !storefrontAccessToken) {
    throw new Error('Shopify credentials missing. Add VITE_SHOPIFY_DOMAIN and VITE_STOREFRONT_TOKEN to your .env file.');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();
  if (body.errors) {
    throw new Error(body.errors.map((e: { message: string }) => e.message).join('\n'));
  }

  return body.data as T;
}

// ==========================================
// PRODUCTION GRAPHQL QUERIES & CLIENT
// ==========================================
export const shopifyClient = {
  // Get products lists
  async getProducts(options?: { first?: number; sortKey?: string; query?: string }): Promise<Product[]> {
    const query = `
      query GetProducts($first: Int, $sortKey: ProductSortKeys, $query: String) {
        products(first: $first, sortKey: $sortKey, query: $query) {
          edges {
            node {
              id
              handle
              title
              description
              descriptionHtml
              availableForSale
              priceRange {
                minVariantPrice { amount currencyCode }
                maxVariantPrice { amount currencyCode }
              }
              images(first: 5) {
                edges {
                  node { url altText }
                }
              }
              variants(first: 20) {
                edges {
                  node {
                    id
                    title
                    price { amount currencyCode }
                    compareAtPrice { amount currencyCode }
                    sku
                    availableForSale
                    selectedOptions { name value }
                  }
                }
              }
              options { name values }
              tags
              vendor
              productType
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      products: {
        edges: { node: Product }[];
      };
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: {
        first: options?.first || 20,
        sortKey: options?.sortKey,
        query: options?.query,
      },
    });

    return data.products.edges.map(e => e.node);
  },

  // Get single product
  async getProductByHandle(handle: string): Promise<Product | null> {
    const query = `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          images(first: 10) {
            edges {
              node { url altText }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                sku
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
          tags
          vendor
          productType
        }
      }
    `;

    interface GraphQLResponse {
      product: Product | null;
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { handle },
    });

    return data.product;
  },

  // Get collections list
  async getCollections(): Promise<Collection[]> {
    const query = `
      query GetCollections {
        collections(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              image { url altText }
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      collections: {
        edges: { node: Collection }[];
      };
    }

    const data = await shopifyFetch<GraphQLResponse>({ query });
    return data.collections.edges.map(e => e.node);
  },

  // Get collection with its products
  async getCollectionByHandle(
    handle: string,
    filters?: { metal?: string; gemstone?: string; minPrice?: number; maxPrice?: number },
    sortKey?: string
  ): Promise<Collection | null> {
    // Custom filter query builder
    let searchQuery = '';
    if (filters?.metal) searchQuery += `tag:${filters.metal} `;
    if (filters?.gemstone) searchQuery += `tag:${filters.gemstone} `;
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      const min = filters.minPrice !== undefined ? filters.minPrice : '*';
      const max = filters.maxPrice !== undefined ? filters.maxPrice : '*';
      searchQuery += `price:>=${min} price:<=${max} `;
    }

    const query = `
      query GetCollection($handle: String!, $sortKey: ProductCollectionSortKeys, $searchQuery: String) {
        collection(handle: $handle) {
          id
          handle
          title
          description
          image { url altText }
          products(first: 30, sortKey: $sortKey, query: $searchQuery) {
            edges {
              node {
                id
                handle
                title
                availableForSale
                priceRange {
                  minVariantPrice { amount currencyCode }
                }
                images(first: 2) {
                  edges {
                    node { url altText }
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price { amount currencyCode }
                      compareAtPrice { amount currencyCode }
                      selectedOptions { name value }
                    }
                  }
                }
                options { name values }
                tags
                productType
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      collection: Collection | null;
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: {
        handle,
        sortKey: sortKey || 'BEST_SELLING',
        searchQuery: searchQuery || undefined,
      },
    });

    return data.collection;
  },

  // Get recommendations
  async getRecommendations(productId: string): Promise<Product[]> {
    const query = `
      query GetRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
          id
          handle
          title
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 2) {
            edges {
              node { url altText }
            }
          }
          productType
        }
      }
    `;

    interface GraphQLResponse {
      productRecommendations: Product[];
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { productId },
    });

    return data.productRecommendations;
  },

  // Predictive search
  async predictiveSearch(searchQuery: string): Promise<{ products: Product[]; collections: Collection[] }> {
    // Under storefront API, predictive search query can be made using the predictiveSearch endpoint or general search
    const query = `
      query Search($query: String!) {
        products(first: 5, query: $query) {
          edges {
            node {
              id
              handle
              title
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 1) {
                edges {
                  node { url altText }
                }
              }
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      products: {
        edges: { node: Product }[];
      };
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { query: searchQuery },
    });

    return {
      products: data.products.edges.map(e => e.node),
      collections: [], // Mocking empty collections in this query type
    };
  },

  // Reviews (Shopify Storefront API does not natively support reviews out of the box - typically loaded via Metafields or Judge.me/Yotpo apps)
  async getReviews(productId: string): Promise<Review[]> {
    console.log(`Production fetch reviews for: ${productId} - Fallback to Judge.me/Yotpo simulation`);
    return [];
  },

  async addReview(productId: string, review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    console.log('Production add review', productId, review);
    return {
      id: `rev_${Date.now()}`,
      author: review.author,
      rating: review.rating,
      title: review.title,
      body: review.body,
      createdAt: new Date().toISOString(),
    };
  },

  // Get Store Settings
  async getStoreSettings(): Promise<StoreSettings> {
    return {
      name: 'FRT Studios',
      description: 'Premium photography services and studio bookings',
      logo: 'FRT Studios',
    };
  },

  // ==========================================
  // SHOPPING CART (SHOPIFY CART API)
  // ==========================================
  async createCart(): Promise<Cart> {
    const query = `
      mutation CreateCart {
        cartCreate {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
            cost {
              totalAmount { amount currencyCode }
              subtotalAmount { amount currencyCode }
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      cartCreate: { cart: Cart };
    }

    const data = await shopifyFetch<GraphQLResponse>({ query });
    return data.cartCreate.cart;
  },

  async getCart(cartId: string): Promise<Cart | null> {
    const query = `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          createdAt
          updatedAt
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      id
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node { url altText }
                        }
                      }
                    }
                  }
                }
                cost {
                  totalAmount { amount currencyCode }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
            totalTaxAmount { amount currencyCode }
          }
        }
      }
    `;

    interface GraphQLResponse {
      cart: Cart | null;
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { cartId },
    });

    return data.cart;
  },

  async addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
    const query = `
      mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      cartLinesAdd: { cart: Cart };
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { cartId, lines: lines.map(l => ({ merchandiseId: l.merchandiseId, quantity: l.quantity })) },
    });

    return data.cartLinesAdd.cart;
  },

  async updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<Cart> {
    const query = `
      mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      cartLinesUpdate: { cart: Cart };
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { cartId, lines },
    });

    return data.cartLinesUpdate.cart;
  },

  async removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    const query = `
      mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
      }
    `;

    interface GraphQLResponse {
      cartLinesRemove: { cart: Cart };
    }

    const data = await shopifyFetch<GraphQLResponse>({
      query,
      variables: { cartId, lineIds },
    });

    return data.cartLinesRemove.cart;
  }
};
export type ShopifyProdClient = typeof shopifyClient;
