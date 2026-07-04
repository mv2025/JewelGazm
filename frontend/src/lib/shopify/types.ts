export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ImageNode {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface Edge<T> {
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  sku: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  image: ImageNode | null;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Metafield {
  id?: string;
  namespace: string;
  key: string;
  value: string;
  type?: string;
  description?: string | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: Connection<ImageNode>;
  variants: Connection<ProductVariant>;
  options: ProductOption[];
  metafields: Metafield[];
  collections?: Connection<{ id: string; handle: string; title: string }>;
  tags: string[];
  vendor: string;
  productType: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ImageNode | null;
  products: Connection<Product> & { pageInfo: PageInfo };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: {
      id: string;
      title: string;
      handle: string;
      images: Connection<ImageNode>;
    };
  };
  cost: {
    totalAmount: Money;
  };
}

export interface Cart {
  id: string;
  createdAt: string;
  updatedAt: string;
  lines: Connection<CartLine>;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
    totalTaxAmount: Money | null;
  };
  totalQuantity: number;
}

export interface StoreSettings {
  name: string;
  description: string;
  logo: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}
