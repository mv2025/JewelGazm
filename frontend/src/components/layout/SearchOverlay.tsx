import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';
import { useSearch } from '@/providers/SearchProvider';
import { formatPrice } from '@/utils/currency';

/**
 * Fullscreen Predictive Search Overlay Component
 * Focuses on load, displays debounced query matches for services, collections, portfolios, and blogs.
 */
export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    loading,
    clearSearch,
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Escape key close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  const handleClose = () => {
    setSearchOpen(false);
    clearSearch();
  };

  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.collections.length > 0 ||
    searchResults.portfolios.length > 0 ||
    searchResults.blogs.length > 0;

  const suggestedSearches = [
    'Editorial Campaigns',
    'Studio Space Rentals',
    'Commercial Products',
    'Creative Portraits',
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex flex-col pt-12 md:pt-20 pb-10"
        >
          {/* Header Action Row */}
          <div className="container mx-auto px-6 md:px-12 max-w-5xl flex justify-between items-center mb-10 select-none">
            <span className="font-serif text-[10px] tracking-[0.25em] font-semibold text-primary/40 uppercase">
              Search Jewelgazm
            </span>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-surface-hover rounded-full transition-colors text-primary/50 hover:text-primary focus-visible:ring-1 focus-visible:ring-gold focus-visible:outline-none"
              aria-label="Close search overlay"
            >
              <X className="w-5 h-5 shrink-0" />
            </button>
          </div>

          {/* Search Box Input */}
          <div className="container mx-auto px-6 md:px-12 max-w-3xl mb-12">
            <div className="relative flex items-center border-b-[0.5px] border-primary/20 focus-within:border-gold py-2">
              <Search className="w-5 h-5 text-primary/45 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, studio spaces, portfolios, articles..."
                className="w-full bg-transparent font-serif text-lg md:text-xl font-light text-primary placeholder-primary/25 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-xs font-sans text-primary/40 hover:text-primary px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular Suggestions (shown when input is empty) */}
            {!searchQuery.trim() && (
              <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3">
                <span className="text-[10px] tracking-widest font-sans uppercase text-primary/35">
                  Suggestions:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {suggestedSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3.5 py-1.5 bg-surface border border-border hover:border-gold hover:text-gold text-[10px] font-sans font-light tracking-wide uppercase transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto scrollbar">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-[1.5px] border-gold border-t-transparent" />
                  <span className="mt-4 text-[10px] tracking-widest font-sans uppercase text-primary/45">
                    Querying creative assets...
                  </span>
                </div>
              ) : searchQuery.trim() ? (
                hasResults ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Column 1: Services matches */}
                    {searchResults.products.length > 0 && (
                      <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                        <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/35 uppercase border-b border-border pb-2">
                          Matching Services ({searchResults.products.length})
                        </h4>
                        <div className="flex flex-col gap-4">
                          {searchResults.products.map(product => {
                            const img = product.images.edges[0]?.node.url;
                            const price = product.priceRange?.minVariantPrice || { amount: '0.00', currencyCode: 'USD' };

                            return (
                              <Link
                                key={product.id}
                                to={`/products/${product.handle}`}
                                onClick={handleClose}
                                className="flex items-center gap-4 group p-2 hover:bg-surface-hover transition-colors"
                              >
                                <div className="w-12 h-15 shrink-0 bg-surface-hover border border-border/40 overflow-hidden">
                                  {img && <img src={img} alt={product.title} className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-serif text-xs font-medium text-primary group-hover:text-gold transition-colors line-clamp-1">
                                    {product.title}
                                  </h5>
                                  <span className="text-[10px] font-sans font-light text-primary/45">
                                    Starting at {formatPrice(price)}
                                  </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-primary/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Column 2: Collections, Portfolios & Blogs */}
                    <div className="col-span-1 flex flex-col gap-8">
                      {/* Portfolios */}
                      {searchResults.portfolios.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/35 uppercase border-b border-border pb-2">
                            Matching Projects ({searchResults.portfolios.length})
                          </h4>
                          <div className="flex flex-col gap-3">
                            {searchResults.portfolios.map(project => (
                              <Link
                                key={project.id}
                                to={`/portfolio/${project.handle}`}
                                onClick={handleClose}
                                className="flex items-center gap-3 group p-2 hover:bg-surface-hover transition-colors"
                              >
                                <div className="w-10 h-10 shrink-0 bg-surface-hover border border-border/40 overflow-hidden">
                                  {project.heroImage && (
                                    <img
                                      src={project.heroImage}
                                      alt={project.title}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <h5 className="font-serif text-[11px] font-medium text-primary group-hover:text-gold transition-colors line-clamp-1">
                                    {project.title}
                                  </h5>
                                  <span className="text-[9px] font-sans font-light text-primary/45 uppercase tracking-widest block">
                                    {project.category}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Blogs */}
                      {searchResults.blogs.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/35 uppercase border-b border-border pb-2">
                            Matching Articles ({searchResults.blogs.length})
                          </h4>
                          <div className="flex flex-col gap-3">
                            {searchResults.blogs.map(post => (
                              <Link
                                key={post.id}
                                to={`/blog/${post.handle}`}
                                onClick={handleClose}
                                className="flex items-center gap-3 group p-2 hover:bg-surface-hover transition-colors"
                              >
                                <div className="w-10 h-10 shrink-0 bg-surface-hover border border-border/40 overflow-hidden">
                                  {post.image && (
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <h5 className="font-serif text-[11px] font-medium text-primary group-hover:text-gold transition-colors line-clamp-1">
                                    {post.title}
                                  </h5>
                                  <span className="text-[9px] font-sans font-light text-primary/45 block">
                                    {post.category}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Collections */}
                      {searchResults.collections.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/35 uppercase border-b border-border pb-2">
                            Matching Categories
                          </h4>
                          <div className="flex flex-col gap-3.5">
                            {searchResults.collections.map(col => (
                              <Link
                                key={col.id}
                                to={`/collections/${col.handle}`}
                                onClick={handleClose}
                                className="group flex items-center justify-between p-3 border border-border bg-surface hover:border-gold hover:text-gold transition-colors"
                              >
                                <span className="font-sans text-[11px] font-medium tracking-widest uppercase">
                                  {col.title}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="font-serif text-sm text-primary/50">
                      No matching records found for "{searchQuery}".
                    </p>
                    <p className="text-[10px] font-sans text-primary/35 uppercase tracking-widest mt-2">
                      Try searching another term
                    </p>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
