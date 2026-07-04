import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Calendar, Sparkles, Award, Star } from 'lucide-react';
import { shopify, Product, ProductVariant, Review } from '@/lib/shopify';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatPrice } from '@/utils/currency';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { Modal } from '@/components/ui/Modal';
import { ProductCard } from '@/components/common/ProductCard';
import { updateSEO, injectJSONLD, getProductSchema } from '@/utils/seo';
import { BookingWizard } from '@/components/booking/BookingWizard';

/**
 * Premium Product Details Page
 * Implements mouse-move panning zoom, custom variant swatches, postal estimators,
 * accordion details, related recommendations, and verified review creations.
 */
export const ProductDetails: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImgUrl, setActiveImgUrl] = useState('');
  const [isBookingOpen, setBookingOpen] = useState(false);
  
  // Hover Zoom Ref and State
  const zoomRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center', transform: 'scale(1)' });

  // Accordion details
  const [accordionItems, setAccordionItems] = useState<any[]>([]);

  // Delivery estimation checker
  const [zipCode, setZipCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);

  // Recommendations and Reviews states
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, title: '', body: '' });

  // Fetch product data on handle changes
  useEffect(() => {
    if (!handle) return;
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const prod = await shopify.getProductByHandle(handle);
        if (prod) {
          setProduct(prod);
          const firstVariant = prod.variants.edges[0]?.node || null;
          setSelectedVariant(firstVariant);
          setActiveImgUrl(firstVariant?.image?.url || prod.images.edges[0]?.node?.url || '');
          
          // Load recommendations and reviews
          const recData = await shopify.getRecommendations(prod.id);
          setRecommendations(recData);

          const revData = await shopify.getReviews(prod.id);
          setReviews(revData);

          // Build accordion items
          const gemstoneMeta = prod.metafields.find(m => m.key === 'gemstone')?.value || 'Conflict-Free Diamonds';
          const metalMeta = prod.metafields.find(m => m.key === 'metal')?.value || '18K Gold';
          const certificationMeta = prod.metafields.find(m => m.key === 'certification')?.value || 'GIA Certified';
          const caratMeta = prod.metafields.find(m => m.key === 'carat_weight')?.value || null;

          setAccordionItems([
            {
              id: 'description',
              title: 'Overview',
              content: (
                <div className="flex flex-col gap-2 font-sans font-light text-xs text-primary/80 leading-relaxed">
                  <p>{prod.description}</p>
                </div>
              )
            },
            {
              id: 'materials',
              title: 'Materials & Specifications',
              content: (
                <div className="flex flex-col gap-2 font-sans font-light text-xs text-primary/80 leading-relaxed">
                  <p>Each design is individually crafted to order by our master jewelers:</p>
                  <ul className="list-disc pl-4 mt-1 flex flex-col gap-1">
                    <li>Metal: {metalMeta}</li>
                    <li>Gemstone: {gemstoneMeta}</li>
                    {caratMeta && <li>Total Carat Weight: {caratMeta}</li>}
                    <li>Certification: {certificationMeta}</li>
                    <li>Setting: Hand-selected pavé and prong layout</li>
                  </ul>
                </div>
              )
            },
            {
              id: 'shipping',
              title: 'Shipping & Concierge Service',
              content: "Complimentary fully-insured courier shipping with adult signature required. Every purchase arrives beautifully encased in our custom velvet-lined lacquered keepsake jewelry box. We provide complimentary return shipping for resizing within 30 days."
            }
          ]);

          // Update SEO
          const price = firstVariant?.price.amount || '0.00';
          const currency = firstVariant?.price.currencyCode || 'USD';
          updateSEO({
            title: `${prod.title} | Jewelgazm Haute Joaillerie`,
            description: prod.description,
            image: firstVariant?.image?.url || prod.images.edges[0]?.node?.url,
          });

          injectJSONLD(getProductSchema({
            title: prod.title,
            description: prod.description,
            price,
            currency,
            imageUrl: firstVariant?.image?.url || prod.images.edges[0]?.node?.url || '',
            url: window.location.href,
            sku: firstVariant?.sku || 'JEWEL-DEFAULT',
          }));
        }
      } catch (err) {
        console.error('Failed to load product page:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [handle]);

  // Synchronize variant image with gallery view
  const selectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.image?.url) {
      setActiveImgUrl(variant.image.url);
    }
  };

  // Gallery hover zoom calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Disable zoom on mobile/tablet touch viewports
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // Calculate cursor positions in percentages
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.75)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    });
  };

  // Estimate delivery arrival times
  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim() || zipCode.length < 5) {
      addToast('Please enter a valid zip code', 'error');
      return;
    }
    // Simulate API delivery dates check
    const days = Math.floor(Math.random() * 3) + 3; // 3 to 5 days
    const date = new Date();
    date.setDate(date.getDate() + days);
    
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', weekday: 'long' });
    setDeliveryDate(formatter.format(date));
    addToast('Delivery details estimated.', 'success');
  };

  // Submit reviews
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newReview.author.trim() || !newReview.title.trim() || !newReview.body.trim()) {
      addToast('Please fill out all fields', 'error');
      return;
    }

    try {
      const added = await shopify.addReview(product.id, {
        author: newReview.author,
        rating: newReview.rating,
        title: newReview.title,
        body: newReview.body,
      });

      setReviews(prev => [added, ...prev]);
      setReviewModalOpen(false);
      setNewReview({ author: '', rating: 5, title: '', body: '' });
      addToast('Review submitted successfully for verification.', 'success');
    } catch (err) {
      addToast('Failed to add review.', 'error');
    }
  };

  const handleAddToBag = async () => {
    if (!selectedVariant) return;
    try {
      await addToCart(selectedVariant.id, quantity);
      addToast(`Added ${quantity} x ${product?.title} to your bag`, 'success');
    } catch (err) {
      addToast('Failed to add to bag.', 'error');
    }
  };

  if (loading || !product) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-20 max-w-7xl flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-[1.5px] border-gold border-t-transparent" />
        <span className="mt-4 text-[10px] tracking-widest font-sans uppercase text-primary/45">
          Loading creation details...
        </span>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images.edges.map(e => e.node.url);
  const metalOption = product.options.find(o => o.name === 'Metal');
  const sizeOption = product.options.find(o => o.name === 'Ring Size' || o.name === 'Length' || o.name === 'Carat Weight');

  return (
    <div className="py-12 md:py-20 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Breadcrumb Navigation links */}
        <div className="flex gap-2 text-[10px] font-sans font-light tracking-wider text-primary/40 uppercase mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/collections/all" className="hover:text-primary">Collections</Link>
          <span>/</span>
          <span className="text-primary/70 line-clamp-1">{product.title}</span>
        </div>

        {/* Core details Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">
          
          {/* Left Column: Media Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4.5 items-start w-full">
            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 w-full md:w-20 shrink-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                {images.map(img => (
                  <button
                    key={img}
                    onClick={() => setActiveImgUrl(img)}
                    className={cn(
                      'w-16 aspect-[4/5] border rounded-sm overflow-hidden bg-surface-hover transition-all focus:outline-none shrink-0',
                      activeImgUrl === img ? 'border-gold ring-1 ring-gold/40' : 'border-border/60 hover:border-primary/40'
                    )}
                  >
                    <img src={img} alt={product.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main zoomable Image container */}
            <div
              ref={zoomRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flex-1 w-full bg-surface-hover aspect-[4/5] border border-border/40 overflow-hidden relative cursor-zoom-in rounded-sm select-none"
            >
              <img
                src={activeImgUrl}
                alt={product.title}
                style={zoomStyle}
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
              />
            </div>
          </div>

          {/* Right Column: Checkout Panel */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] font-sans font-light uppercase text-gold block mb-1.5">
                {product.vendor}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-primary leading-tight">
                {product.title}
              </h1>

              {/* Review summary indicator */}
              <div className="flex items-center gap-2 mt-3 text-xs font-sans">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold shrink-0" />
                  ))}
                </div>
                <span className="text-primary/45 font-light">
                  ({reviews.length} Verified {reviews.length === 1 ? 'Review' : 'Reviews'})
                </span>
              </div>
            </div>

            {/* Pricing Details */}
            {selectedVariant && (
              <div className="py-4 border-y border-border/60 flex flex-col gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-sans font-semibold text-primary">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {selectedVariant.compareAtPrice && (
                    <span className="text-xs line-through text-primary/35 font-sans font-light">
                      {formatPrice(selectedVariant.compareAtPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-sans font-light text-primary/50">
                  Or 4 interest-free installments of <span className="font-medium text-primary">
                    {formatPrice({ amount: (parseFloat(selectedVariant.price.amount) / 4).toFixed(2), currencyCode: 'USD' })}
                  </span> with <span className="underline cursor-pointer hover:text-gold">Affirm</span>
                </p>
              </div>
            )}

            {/* Option Selectors */}
            {product.options.map(option => (
              <div key={option.name} className="flex flex-col gap-2.5 mt-2">
                <span className="text-[10px] tracking-widest font-sans font-medium uppercase text-primary/45">
                  Select {option.name}: <span className="text-primary font-semibold">{selectedVariant?.selectedOptions.find(o => o.name === option.name)?.value}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {option.values.map(val => {
                    const isActive = selectedVariant?.selectedOptions.find(
                      o => o.name === option.name
                    )?.value === val;

                    // Locate matched variant
                    const matched = product.variants.edges.find(e =>
                      e.node.selectedOptions.some(opt => opt.name === option.name && opt.value === val)
                    )?.node;

                    return (
                      <button
                        key={val}
                        onClick={() => matched && selectVariant(matched)}
                        className={cn(
                          'px-4 py-2 border rounded-sm text-[10px] font-sans uppercase font-light tracking-wide transition-colors focus:outline-none focus:ring-1 focus:ring-gold',
                          isActive
                            ? 'border-primary bg-primary text-white dark:border-white dark:bg-white dark:text-primary'
                            : 'border-border/80 hover:border-primary text-primary/75'
                        )}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* CTA Buy panel and Wishlist buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-3">
                {/* Add to Bag CTA */}
                <Button
                  onClick={handleAddToBag}
                  variant="primary"
                  className="flex-grow justify-center gap-2.5"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  Add to Bag
                </Button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    addToast(isFavorited ? 'Removed from wishlist' : 'Added to wishlist', 'success');
                  }}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={cn(
                    'p-3 border border-border hover:border-gold text-primary hover:text-gold rounded-sm transition-all focus-visible:ring-1 focus-visible:ring-gold',
                    isFavorited && 'text-gold fill-gold border-gold/30 bg-gold/5'
                  )}
                >
                  <Heart className="w-5 h-5 shrink-0" />
                </button>
              </div>

              {/* Consultation CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full border border-primary hover:bg-primary hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-primary text-primary text-[10px] font-sans font-medium tracking-[0.2em] uppercase py-3 transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 font-sans" />
                Book Private Consultation
              </button>
            </div>

            {/* Estimated Delivery Calculator */}
            <form onSubmit={checkDelivery} className="border border-border/40 p-4 rounded-sm flex flex-col gap-2 bg-surface-hover/30 mt-2">
              <span className="text-[9px] tracking-widest font-sans uppercase font-medium text-primary/45 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Delivery Checker
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter postal zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  className="flex-1 bg-surface border border-border/60 focus:border-gold px-3 py-1.5 text-xs focus:outline-none rounded-sm"
                />
                <button
                  type="submit"
                  className="bg-primary text-white border border-primary px-4 py-1.5 text-[9px] tracking-widest font-sans font-semibold uppercase hover:bg-gold hover:border-gold transition-colors rounded-sm focus-visible:ring-1 focus-visible:ring-gold"
                >
                  Check
                </button>
              </div>
              {deliveryDate && (
                <p className="text-[10px] font-sans font-light text-primary/75 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Estimated arrival: <span className="font-semibold text-primary">{deliveryDate}</span>
                </p>
              )}
            </form>

            {/* Collapsible details spec panels */}
            <div className="mt-4">
              <Accordion items={accordionItems} />
            </div>

          </div>
        </div>

        {/* Customer reviews section */}
        <section className="border-t border-border/80 pt-16 mb-24 select-none">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-light text-primary">
                Verified Reviews
              </h2>
              <p className="text-[11px] font-sans font-light text-primary/45 uppercase tracking-widest mt-1">
                Hear from our collectors
              </p>
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="border border-gold hover:bg-gold hover:text-white text-gold text-[9px] tracking-widest font-sans font-semibold uppercase px-5 py-2.5 rounded-sm transition-all focus-visible:ring-1 focus-visible:ring-gold"
            >
              Write a Review
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border/65 rounded-sm">
              <p className="font-serif text-sm text-primary/45">No reviews yet for this creation.</p>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="text-[9px] tracking-widest font-sans font-semibold uppercase text-gold hover:underline mt-2"
              >
                Be the first to write a review
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map(rev => (
                <div key={rev.id} className="border border-border/45 p-6 rounded-sm flex flex-col gap-3 bg-surface-hover/10">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-3 h-3 shrink-0',
                            i < rev.rating ? 'fill-gold text-gold' : 'text-primary/10'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-sans font-light text-primary/40">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-serif text-xs font-semibold text-primary">{rev.title}</h4>
                  <p className="text-xs font-sans font-light leading-relaxed text-primary/75 italic">
                    "{rev.body}"
                  </p>
                  <span className="text-[9px] font-sans font-semibold uppercase tracking-widest text-primary/60">
                    — {rev.author}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related recommended items catalog list */}
        {recommendations.length > 0 && (
          <section className="border-t border-border/80 pt-16 select-none">
            <h2 className="font-serif text-xl md:text-2xl font-light text-center tracking-wide text-primary mb-12">
              Recommendations For You
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Review Modal popup */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Write a Review"
      >
        <form onSubmit={handleSubmitReview} className="flex flex-col gap-4 font-sans select-none">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50">Your Name</label>
            <input
              type="text"
              required
              value={newReview.author}
              onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
              placeholder="e.g. Sophia Sterling"
              className="border border-border/80 px-3 py-2 text-xs focus:outline-none focus:border-gold rounded-sm bg-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50">Star Rating</label>
            <div className="flex gap-1.5 mt-1">
              {[1, 2, 3, 4, 5].map(stars => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => setNewReview(prev => ({ ...prev, rating: stars }))}
                  className="p-0.5 text-primary/20 hover:text-gold transition-colors focus:outline-none"
                >
                  <Star
                    className={cn(
                      'w-5 h-5 shrink-0',
                      stars <= newReview.rating ? 'fill-gold text-gold' : 'text-primary/20'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50">Review Title</label>
            <input
              type="text"
              required
              value={newReview.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Exquisite Scintillation!"
              className="border border-border/80 px-3 py-2 text-xs focus:outline-none focus:border-gold rounded-sm bg-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50">Review Body</label>
            <textarea
              required
              rows={4}
              value={newReview.body}
              onChange={(e) => setNewReview(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Share details of your experience..."
              className="border border-border/80 px-3 py-2 text-xs focus:outline-none focus:border-gold rounded-sm bg-transparent resize-none"
            />
          </div>

          <Button type="submit" variant="primary" className="justify-center mt-2">
            Submit Verified Review
          </Button>
        </form>
      </Modal>

      {/* Step-by-Step Booking Wizard */}
      <BookingWizard
        product={product}
        isOpen={isBookingOpen}
        onClose={() => setBookingOpen(false)}
      />

    </div>
  );
};

export default ProductDetails;
