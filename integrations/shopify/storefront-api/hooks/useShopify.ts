/**
 * Shopify Storefront React Hooks Template
 * 
 * In production, copy the custom hooks from "frontend/src/providers/" and "frontend/src/hooks/" here.
 * These hooks bridge the React UI state directly to the Shopify clients.
 */
import { useEffect, useState } from 'react';
import { shopify } from '@/lib/shopify';

export function useProductDetail(handle: string) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await shopify.getProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [handle]);

  return { product, loading };
}
