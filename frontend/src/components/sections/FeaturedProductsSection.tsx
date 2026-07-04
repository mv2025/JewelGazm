import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shopify, Product } from '@/lib/shopify';
import { ProductCard } from '@/components/common/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

interface FeaturedProductsSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

/**
 * Featured Products Grid Section
 * Fetches products from the storefront API and handles skeleton loaders
 */
export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  title = "Signature Masterpieces",
  subtitle = "Featured Products",
  limit = 4
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await shopify.getProducts({ first: limit });
        setProducts(data);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  return (
    <section className="pt-12 pb-12 bg-background select-none border-b border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header Title */}
        <div className="text-center mb-16 flex flex-col gap-2">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
            {subtitle}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-primary">
            {title}
          </h2>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {Array.from({ length: limit }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-16 flex justify-center">
          <Link to="/collections/all-jewellery">
            <Button variant="outline" size="md" magnetic>
              View All Creations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
