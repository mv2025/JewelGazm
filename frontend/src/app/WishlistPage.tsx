import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/providers/WishlistProvider';
import { ProductCard } from '@/components/common/ProductCard';
import { Button } from '@/components/ui/Button';
import { updateSEO } from '@/utils/seo';

/**
 * Dedicated Wishlist Items Page
 */
export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();

  useEffect(() => {
    updateSEO({
      title: 'Your Wishlist',
      description: 'Review your saved custom jewelry designs and creations from Jewelgazm.',
    });
  }, []);

  const isEmpty = wishlist.length === 0;

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-border pb-6">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-primary uppercase tracking-wide">
              Your Wishlist
            </h1>
            <p className="text-[11px] font-sans font-light text-primary/45 uppercase tracking-widest mt-1">
              Your curated favorites
            </p>
          </div>

          {!isEmpty && (
            <button
              onClick={clearWishlist}
              className="text-[9px] tracking-widest font-sans font-semibold uppercase text-primary/45 hover:text-red-500 border border-border hover:border-red-500/25 px-4 py-2 transition-all rounded-sm focus-visible:ring-1 focus-visible:ring-gold"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {isEmpty ? (
          /* Empty wishlist layout */
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/70 rounded-sm">
            <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center text-primary/30 mb-4">
              <Heart className="w-6 h-6 stroke-[1.25]" />
            </div>
            <h2 className="font-serif text-base font-medium uppercase tracking-widest text-primary mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs font-sans font-light leading-relaxed text-primary/55 max-w-xs mx-auto mb-8">
              Click the heart icon on cards while browsing to save creations here.
            </p>
            <Link to="/collections/all-jewellery">
              <Button variant="primary">Explore Collections</Button>
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
