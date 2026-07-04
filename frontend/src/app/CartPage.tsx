import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { formatPrice } from '@/utils/currency';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { useToast } from '@/providers/ToastProvider';
import { updateSEO } from '@/utils/seo';

/**
 * Dedicated shopping cart details page
 */
export const CartPage: React.FC = () => {
  const { addToast } = useToast();
  const { cart, loading, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    updateSEO({
      title: 'Shopping Bag',
      description: 'Review the fine items in your shopping bag and proceed to secure checkout.',
    });
  }, []);

  const lines = cart?.lines.edges || [];
  const isEmpty = lines.length === 0;

  const handleCheckout = () => {
    addToast('Redirecting to checkout...', 'info');
    setTimeout(() => {
      alert('Simulation: Swapping to Shopify checkout portal. ID: ' + (cart?.id || 'standard-checkout'));
    }, 500);
  };

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <h1 className="font-serif text-2xl md:text-3xl font-light text-primary mb-12 uppercase tracking-wide">
          Your Shopping Bag
        </h1>

        {isEmpty ? (
          /* Empty bag layout */
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/70 rounded-sm">
            <h2 className="font-serif text-base font-medium uppercase tracking-widest text-primary mb-3">
              Your shopping bag is empty
            </h2>
            <p className="text-xs font-sans font-light leading-relaxed text-primary/55 max-w-xs mx-auto mb-8">
              Explore our haute joaillerie collections, custom engagement solitaires, and masterworks crafted to last forever.
            </p>
            <Link to="/collections/all-jewellery">
              <Button variant="primary">Explore Collections</Button>
            </Link>
          </div>
        ) : (
          /* Main checkout splitting */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* List column */}
            <div className="col-span-1 lg:col-span-2 divide-y divide-border/60">
              {lines.map(({ node: line }) => {
                const img = line.merchandise.image?.url || line.merchandise.product.images.edges[0]?.node.url;
                const options = line.merchandise.selectedOptions;

                return (
                  <div key={line.id} className="flex gap-6 py-6 first:pt-0 last:pb-0">
                    <div className="w-24 aspect-[4/5] bg-surface-hover border border-border/40 shrink-0 overflow-hidden">
                      <Image src={img} alt={line.merchandise.product.title} />
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link
                            to={`/products/${line.merchandise.product.handle}`}
                            className="font-serif text-sm font-medium text-primary hover:text-gold transition-colors leading-tight"
                          >
                            {line.merchandise.product.title}
                          </Link>

                          {options && options.length > 0 && (
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[11px] font-sans font-light text-primary/50">
                              {options.map(opt => (
                                <span key={opt.name}>
                                  {opt.name}: <span className="font-medium text-primary/75">{opt.value}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="text-[10px] font-sans text-primary/40 uppercase tracking-widest block mt-1.5">
                            SKU: {line.merchandise.sku}
                          </span>
                        </div>

                        <span className="text-xs font-sans font-semibold text-primary">
                          {formatPrice(line.merchandise.price)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        {/* Quantity Buttons */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            disabled={loading}
                            className="px-2.5 py-1.5 hover:bg-surface-hover text-primary/45 hover:text-primary transition-colors disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3.5 font-sans text-xs text-primary font-medium">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            disabled={loading}
                            className="px-2.5 py-1.5 hover:bg-surface-hover text-primary/45 hover:text-primary transition-colors disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => removeItem(line.id)}
                          disabled={loading}
                          className="flex items-center gap-1.5 text-[10px] font-sans font-semibold uppercase tracking-widest text-primary/30 hover:text-red-500 transition-all p-1 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded focus-visible:ring-1 focus-visible:ring-gold"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checkout summary panel */}
            <div className="col-span-1 border border-border p-6 bg-surface flex flex-col gap-6 rounded-sm">
              <h3 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/45 uppercase border-b border-border pb-3">
                Order Summary
              </h3>

              <div className="flex flex-col gap-3 text-xs font-sans">
                <div className="flex justify-between text-primary/65">
                  <span className="font-light">Subtotal</span>
                  <span>{formatPrice(cart?.cost?.subtotalAmount)}</span>
                </div>
                <div className="flex justify-between text-primary/65">
                  <span className="font-light">Insured Shipping</span>
                  <span className="text-gold uppercase font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-primary/65 border-b border-border pb-4">
                  <span className="font-light">Estimated Duties</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm text-primary pt-2 font-semibold">
                  <span>Total (USD)</span>
                  <span>{formatPrice(cart?.cost?.totalAmount)}</span>
                </div>
              </div>

              {/* Secure Trust details */}
              <div className="bg-surface-hover/20 p-4 border border-border/40 rounded-sm flex flex-col gap-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-primary/65 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  Jewelgasm Guarantee
                </span>
                <p className="text-[10px] font-sans font-light leading-relaxed text-primary/50">
                  Every masterpiece is hand-finished by master jewelers, fully insured in transit, and eligible for free resizing within 30 days.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  className="w-full justify-center"
                >
                  Proceed to Secure Checkout
                </Button>
                <Link to="/collections/all-jewellery" className="text-center">
                  <span className="text-[9px] tracking-widest font-sans font-semibold uppercase text-primary/40 hover:text-gold transition-colors">
                    Continue Shopping
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
