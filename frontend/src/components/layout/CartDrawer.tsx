import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { Drawer } from '@/components/ui/Drawer';
import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/currency';
import { useToast } from '@/providers/ToastProvider';

/**
 * Slide-Out Shopping Cart Drawer Component
 * Manages item counts, subtotals, and routes checkout events.
 */
export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    isCartOpen,
    setCartOpen,
    cart,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  const handleCheckout = () => {
    setCartOpen(false);
    addToast('Redirecting to secure checkout portal...', 'info');
    // In production, we redirect to cart.webUrl (Shopify hosted Checkout URL)
    // For this frontend project, we can show a secure modal or direct to home
    setTimeout(() => {
      alert('Simulation: Swapping to Shopify checkout portal. WebUrl: ' + (cart?.id || 'shopify-checkout'));
    }, 500);
  };

  const handleNavigateToCart = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  const lines = cart?.lines.edges || [];
  const isEmpty = lines.length === 0;

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={() => setCartOpen(false)}
      title="Shopping Bag"
      side="right"
    >
      <div className="flex flex-col h-full select-none">
        {isEmpty ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center gap-5">
            <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center text-primary/30">
              <ShoppingBag className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <h3 className="font-serif text-sm tracking-widest uppercase text-primary mb-1.5 font-medium">
                Your Bag is Empty
              </h3>
              <p className="text-xs font-sans font-light leading-relaxed text-primary/50 max-w-[240px] mx-auto">
                Discover our fine collections, handcrafted engagement rings, and gold masterworks.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCartOpen(false);
                navigate('/collections/all-jewellery');
              }}
              className="mt-2"
            >
              Explore Collections
            </Button>
          </div>
        ) : (
          /* Cart List */
          <div className="flex-1 flex flex-col justify-between h-full">
            {/* Scrollable Items Stack */}
            <div className="flex-1 divide-y divide-border/60 overflow-y-auto pr-1">
              {lines.map(({ node: line }) => {
                const img = line.merchandise.image?.url || line.merchandise.product.images.edges[0]?.node.url;
                const options = line.merchandise.selectedOptions;

                return (
                  <div key={line.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    {/* Item Image */}
                    <div className="w-20 aspect-[4/5] bg-surface-hover border border-border/40 shrink-0 overflow-hidden">
                      <Image src={img} alt={line.merchandise.product.title} showPlaceholder={false} />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xs text-primary font-medium tracking-wide leading-tight line-clamp-1">
                          {line.merchandise.product.title}
                        </h4>
                        
                        {/* Option Labels */}
                        {options && options.length > 0 && (
                          <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[10px] font-sans font-light text-primary/45">
                            {options.map(opt => (
                              <span key={opt.name}>
                                {opt.name}: <span className="font-medium text-primary/70">{opt.value}</span>
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-[10px] font-sans font-semibold text-primary mt-1.5">
                          {formatPrice(line.merchandise.price)}
                        </div>
                      </div>

                      {/* Quantity Control Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border/75">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            disabled={loading}
                            className="p-1.5 hover:bg-surface-hover text-primary/45 hover:text-primary transition-colors disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-sans text-xs text-primary font-light">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            disabled={loading}
                            className="p-1.5 hover:bg-surface-hover text-primary/45 hover:text-primary transition-colors disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => removeItem(line.id)}
                          disabled={loading}
                          className="p-1 text-primary/30 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded transition-all focus-visible:ring-1 focus-visible:ring-gold"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations & Checkout */}
            <div className="border-t border-border pt-6 mt-6 flex flex-col gap-4 select-none">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-light text-primary/65 uppercase tracking-wider">Subtotal</span>
                <span className="font-semibold text-primary text-sm">
                  {formatPrice(cart?.cost?.subtotalAmount)}
                </span>
              </div>
              <p className="text-[10px] font-sans font-light leading-relaxed text-primary/45">
                Taxes and duties calculated at checkout. Safe transit insurance complimentary.
              </p>
              <div className="flex flex-col gap-2.5 mt-2">
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  className="w-full justify-center"
                >
                  Proceed to Secure Checkout
                </Button>
                <Button
                  onClick={handleNavigateToCart}
                  variant="secondary"
                  className="w-full justify-center"
                >
                  View Details & Edit Bag
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
