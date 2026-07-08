import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shopify, Product } from '@/lib/shopify';
import { ProductCard } from '@/components/common/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

import silverCelesteRing from '@/assets/Featured-Products/Silver-Celeste-Ring.png';
import silverSirenBand from '@/assets/Featured-Products/Silver-Siren-Band.png';
import silverAuraNecklace from '@/assets/Featured-Products/Silver-Aura-Necklace.png';
import silverLuminaStuds from '@/assets/Featured-Products/Silver-Lumina-Studs.png';

interface FeaturedProductsSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  metal?: 'gold' | 'silver' | 'all';
}

/**
 * Featured Products Grid Section
 * Fetches products from the storefront API and handles skeleton loaders
 */
export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  title = "Signature Masterpieces",
  subtitle = "Featured Products",
  limit = 4,
  metal = 'gold'
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

  // Override images for silver theme
  const getSilverImage = (handle: string) => {
    switch (handle) {
      case 'celeste-diamond-solitaire-ring': return silverCelesteRing;
      case 'siren-emerald-eternity-band': return silverSirenBand;
      case 'aura-solitaire-diamond-necklace': return silverAuraNecklace;
      case 'lumina-diamond-studs': return silverLuminaStuds;
      default: return null;
    }
  };

  const displayProducts = products.map(product => {
    if (metal === 'silver') {
      const silverImg = getSilverImage(product.handle);
      if (silverImg) {
        return {
          ...product,
          title: product.title.replace('Diamond', 'Silver Diamond').replace('Emerald', 'Silver Emerald'),
          images: {
            edges: [
              { node: { url: silverImg, altText: `${product.title} in Silver` } },
              ...(product.images.edges.length > 1 ? product.images.edges.slice(1) : [])
            ]
          },
          variants: {
            ...product.variants,
            edges: product.variants.edges.map(variantEdge => ({
              ...variantEdge,
              node: {
                ...variantEdge.node,
                image: { url: silverImg, altText: `${variantEdge.node.title} in Silver` }
              }
            }))
          }
        };
      }
    }
    return product;
  });

  return (
    <section className="pt-12 pb-12 bg-background select-none border-b border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header Title */}
        <div className="text-center mb-16 flex flex-col gap-2">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-[var(--theme-accent)]">
            {subtitle}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-[var(--theme-primary)]">
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
            {displayProducts.map(product => (
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
