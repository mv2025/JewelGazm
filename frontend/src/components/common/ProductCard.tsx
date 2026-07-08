import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/shopify';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatPrice } from '@/utils/currency';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Premium Product Card component
 * Incorporates dual image fade on hover, interactive variant swatch matching,
 * global wishlist syncing, and quick-add actions.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const activeVariant = product.variants.edges[0]?.node;

  const [isHovered, setIsHovered] = useState(false);
  const [quickAdding, setQuickAdding] = useState(false);

  const images = product.images.edges.map(e => e.node.url);
  const mainImage = activeVariant?.image?.url || images[0] || '';
  // Dual-image swap
  const hoverImage = images[1] || mainImage;

  const isFavorited = isInWishlist(product.id);
  const hasDiscount = activeVariant?.compareAtPrice !== null;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!activeVariant) return;
    setQuickAdding(true);
    try {
      await addToCart(activeVariant.id, 1);
      addToast(`Added ${product.title} to your bag`, 'success');
    } catch (err) {
      addToast('Failed to add item to bag. Please try again.', 'error');
    } finally {
      setQuickAdding(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    addToast(
      isFavorited
        ? `Removed ${product.title} from your wishlist`
        : `Added ${product.title} to your wishlist`,
      'success'
    );
  };

  // Find all metal option values
  const metalOption = product.options.find(o => o.name === 'Metal');

  return (
    <div
      className={cn('product-card group relative flex flex-col w-full bg-transparent', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/products/${product.handle}`} className="relative aspect-[4/5] overflow-hidden bg-surface-hover select-none">
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.tags.includes('Best Seller') && (
            <span className="bg-primary text-white dark:bg-white dark:text-primary text-[8px] tracking-widest font-sans font-medium uppercase px-2.5 py-1">
              Best Seller
            </span>
          )}
          {product.tags.includes('New Arrivals') && (
            <span className="bg-gold text-white text-[8px] tracking-widest font-sans font-medium uppercase px-2.5 py-1">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[8px] tracking-widest font-sans font-medium uppercase px-2.5 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Floating Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute top-3 right-3 z-10 p-2 bg-surface/90 dark:bg-primary/95 backdrop-blur-[2px] rounded-full border border-border shadow-sm text-primary transition-luxury hover:bg-gold hover:text-white dark:hover:bg-gold dark:hover:text-white focus-visible:ring-1 focus-visible:ring-gold focus-visible:outline-none',
            isFavorited && 'text-gold fill-gold border-gold/20'
          )}
        >
          <Heart className="w-3.5 h-3.5 shrink-0" />
        </button>

        {/* Product Images (Zoom in on Hover) */}
        <img
          src={mainImage}
          alt={product.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]',
            isHovered ? 'scale-110' : 'scale-100'
          )}
        />

        {/* Quick Add Overlay Drawer Slider on Hover (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-t from-black/20 to-transparent flex justify-center">
          <button
            onClick={handleQuickAdd}
            disabled={quickAdding || !product.availableForSale}
            className="w-full bg-surface text-primary border border-border text-[9px] tracking-widest font-sans font-medium uppercase py-3 shadow-md hover:bg-gold hover:text-white hover:border-gold transition-colors flex items-center justify-center gap-2 focus-visible:ring-1 focus-visible:ring-gold"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            {quickAdding ? 'Adding...' : 'Quick Add'}
          </button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="flex flex-col pt-4 pb-2">
        {/* Title */}
        <Link
          to={`/products/${product.handle}`}
          className="font-serif text-sm tracking-wide text-primary hover:text-gold transition-colors line-clamp-1 mb-1 font-medium"
        >
          {product.title}
        </Link>

        {/* Category Details */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] tracking-widest text-primary/45 uppercase font-sans font-light">
            {product.productType}
          </span>
          {/* Price Layout */}
          <div className="flex items-center gap-1.5">
            {hasDiscount && (
              <span className="text-[10px] line-through text-primary/35 font-sans font-light">
                {formatPrice(activeVariant.compareAtPrice)}
              </span>
            )}
            <span className="text-xs font-sans font-semibold text-primary">
              {formatPrice(activeVariant.price)}
            </span>
          </div>
        </div>



        {/* Dedicated Mobile Quick Add Button (Visible on Touch/Mobile Screens only) */}
        <button
          onClick={handleQuickAdd}
          disabled={quickAdding || !product.availableForSale}
          className="lg:hidden mt-3 w-full bg-primary hover:bg-[var(--theme-accent-light)]/90 text-white text-[9px] tracking-widest font-sans font-medium uppercase py-2.5 shadow-sm active:bg-gold transition-colors flex items-center justify-center gap-2 focus-visible:ring-1 focus-visible:ring-gold rounded-xs"
        >
          <ShoppingBag className="w-3 h-3 shrink-0" />
          {quickAdding ? 'Adding...' : 'Quick Add'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
