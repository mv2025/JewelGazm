import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { shopify, Collection as ShopifyCollection } from '@/lib/shopify';
import { ProductCard } from '@/components/common/ProductCard';
import { CollectionSkeleton, ProductCardSkeleton } from '@/components/ui/Skeleton';
import { MediaImage } from '@/components/ui/media/MediaImage';
import { Drawer } from '@/components/ui/Drawer';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { updateSEO } from '@/utils/seo';

import silverCelesteRing from '@/assets/Featured-Products/Silver-Celeste-Ring.png';
import silverSirenBand from '@/assets/Featured-Products/Silver-Siren-Band.png';
import silverAuraNecklace from '@/assets/Featured-Products/Silver-Aura-Necklace.png';
import silverLuminaStuds from '@/assets/Featured-Products/Silver-Lumina-Studs.png';
import silverBracelet from '@/assets/Shop-By-Categories/Silver-Bracelet.png';
import silverEarrings from '@/assets/Shop-By-Categories/Silver-Earrings.png';

// Filter constants
const SORT_OPTIONS = [
  { label: 'Featured', value: 'BEST_SELLING' },
  { label: 'Price: Low to High', value: 'PRICE_ASC' },
  { label: 'Price: High to Low', value: 'PRICE_DESC' },
  { label: 'Alphabetically', value: 'TITLE' },
];



/**
 * Premium Collection & Catalog Grid Page
 * Manages URL queries, filters, sidebar overlays, and paginated product cards.
 */
export const Collection: React.FC = () => {
  const { handle = 'all-jewellery' } = useParams<{ handle: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeMetal, setActiveMetal] = useState<'all' | 'gold' | 'silver'>('all');

  // Determine items per page and grid sizing dynamically
  let itemsPerPage = 15;
  let gridColsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  
  if (handle === 'pendants') {
    itemsPerPage = 10;
    gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"; // slightly larger for 10
  } else if (handle === 'necklaces') {
    itemsPerPage = 8;
    gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"; // much larger for 8
  }

  // Force effective metal to match collection handle if applicable
  const effectiveMetal = (handle === 'gold' || handle === 'silver') ? handle : activeMetal;



  // Parse filter parameters from URL
  const selectedMetal = searchParams.get('metal') || '';
  const selectedGemstone = searchParams.get('gemstone') || '';
  const selectedSort = searchParams.get('sort') || 'BEST_SELLING';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const selectedStyle = searchParams.get('style') || '';
  const selectedGender = searchParams.get('gender') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Query collection details on filter changes
  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const data = await shopify.getCollectionByHandle(
          handle,
          {
            metal: selectedMetal || undefined,
            gemstone: selectedGemstone || undefined,
            style: selectedStyle || undefined,
            gender: selectedGender || undefined,
            minPrice,
            maxPrice,
          } as any,
          selectedSort
        );
        setCollection(data);

        // Update page SEO
        if (data) {
          updateSEO({
            title: `${data.title} | Jewelgazm Haute Joaillerie`,
            description: data.description || `Explore premium hand-crafted luxury jewelry collection from Jewelgazm.`,
            image: data.image?.url,
          });
        }
      } catch (err) {
        console.error('Failed to load collection:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [handle, selectedMetal, selectedGemstone, selectedStyle, selectedGender, selectedSort, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    // Reset to page 1 on any filter change except page change
    if (key !== 'page') {
      nextParams.delete('page');
    }
    setSearchParams(nextParams);

    if (key === 'page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const productEdges = collection?.products?.edges || [];
  
  // Pre-calculate the cards to render so we get an accurate count based on client-side filters
  const renderedCards = productEdges.flatMap(({ node: product }) => {
    if (effectiveMetal === 'gold') {
      if (product.tags.includes('Silver') || product.title.includes('Silver')) return [];
      return [<ProductCard key={product.id} product={product} />];
    }
    
    if (effectiveMetal === 'silver') {
      if (product.tags.includes('Silver') || product.title.includes('Silver')) {
        return [<ProductCard key={product.id} product={product} />];
      }
      return [];
    }

    // effectiveMetal === 'all'
    return [<ProductCard key={product.id} product={product} />];
  });

  const totalCount = renderedCards.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCards = renderedCards.slice(startIndex, startIndex + itemsPerPage);

  if (loading && !collection) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-screen-2xl">
        <CollectionSkeleton />
      </div>
    );
  }

  return (
    <div className={cn("pb-24 transition-colors duration-700", activeMetal === 'silver' ? 'theme-silver bg-background' : 'bg-background')}>
      {/* Collection Hero Header Banner */}
      {collection && (
        <div className="relative w-full py-20 bg-[#141414] select-none overflow-hidden text-center text-white border-b border-border/40 mb-10">
          {collection.image?.url && (
            <div className="absolute inset-0">
              <MediaImage
                src={collection.image.url}
                alt={collection.title}
                className="opacity-35 object-center"
                wrapperClassName="w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/50 to-[#141414] z-10" />
            </div>
          )}
          <div className="relative z-10 container mx-auto px-6 max-w-2xl flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] font-sans font-light uppercase text-[var(--theme-accent)]">
              Jewelgazm Fine Jewelry
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-xs font-sans font-light leading-relaxed text-white/70 max-w-md mt-1">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      )}
      {/* Main Catalog body */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-screen-2xl mt-8">
        <div className="flex gap-10">

          {/* Right side Grid Catalog list */}
          <div className="flex-1">
            
            {/* Header controls bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-8 select-none">
              <div className="flex items-center gap-6">
                <span className="hidden sm:inline text-[11px] font-sans text-primary/45 font-light uppercase tracking-wider">
                  {totalCount} {totalCount === 1 ? 'Creation' : 'Creations'}
                </span>
                
                {/* Metal Toggle */}
                {handle !== 'gold' && handle !== 'silver' && (
                  <div className="flex items-center p-1 bg-surface border border-border/80 rounded-sm">
                  <button 
                    onClick={() => setActiveMetal('all')}
                    className={cn(
                      "px-4 py-1.5 text-[10px] font-sans font-medium tracking-widest uppercase transition-colors rounded-sm", 
                      activeMetal === 'all' ? "bg-[var(--theme-accent-light)] text-white" : "text-primary/60 hover:text-primary"
                    )}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setActiveMetal('gold')}
                    className={cn(
                      "px-4 py-1.5 text-[10px] font-sans font-medium tracking-widest uppercase transition-colors rounded-sm", 
                      activeMetal === 'gold' ? "bg-gold text-white" : "text-primary/60 hover:text-primary"
                    )}
                  >
                    Gold
                  </button>
                  <button 
                    onClick={() => setActiveMetal('silver')}
                    className={cn(
                      "px-4 py-1.5 text-[10px] font-sans font-medium tracking-widest uppercase transition-colors rounded-sm", 
                      activeMetal === 'silver' ? "bg-gray-400 text-white" : "text-primary/60 hover:text-primary"
                    )}
                  >
                    Silver
                  </button>
                </div>
                )}
              </div>

              {/* Style filter (specifically for pendants) */}
              {handle === 'pendants' && (
                <div className="flex items-center gap-2 relative sm:ml-auto">
                  <span className="hidden sm:inline text-[11px] font-sans text-primary/45 font-light uppercase tracking-wider">
                    Style:
                  </span>
                  <div className="relative">
                    <select
                      value={selectedStyle}
                      onChange={(e) => updateFilter('style', e.target.value)}
                      className="appearance-none bg-surface border border-border/80 px-4 py-2 pr-9 text-xs font-sans font-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold rounded-sm cursor-pointer"
                    >
                      <option value="">All Pendants</option>
                      <option value="Single Pendant">Single Pendants</option>
                      <option value="Pendant Set">Pendant Sets</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Gender filter (specifically for kada) */}
              {handle === 'kada' && (
                <div className="flex items-center gap-2 relative sm:ml-auto">
                  <span className="hidden sm:inline text-[11px] font-sans text-primary/45 font-light uppercase tracking-wider">
                    Gender:
                  </span>
                  <div className="relative">
                    <select
                      value={selectedGender}
                      onChange={(e) => updateFilter('gender', e.target.value)}
                      className="appearance-none bg-surface border border-border/80 px-4 py-2 pr-9 text-xs font-sans font-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold rounded-sm cursor-pointer"
                    >
                      <option value="">All Kadas</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Sorting drop selector */}
              <div className={cn("flex items-center gap-2 relative", (handle !== 'pendants' && handle !== 'kada') ? "sm:ml-auto" : "")}>
                <span className="hidden sm:inline text-[11px] font-sans text-primary/45 font-light uppercase tracking-wider">
                  Sort By:
                </span>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="appearance-none bg-surface border border-border/80 px-4 py-2 pr-9 text-xs font-sans font-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold rounded-sm cursor-pointer"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid display */}
            {loading ? (
              <div className={`grid ${gridColsClass} gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12`}>
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : renderedCards.length > 0 ? (
              <>
                <div className={`grid ${gridColsClass} gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12`}>
                  {paginatedCards}
                </div>
                
                {/* Pagination UI */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-20 pb-4 select-none">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => updateFilter('page', (currentPage - 1).toString())}
                      className="px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-widest text-primary hover:text-gold disabled:opacity-30 transition-colors"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => updateFilter('page', (i + 1).toString())}
                        className={cn(
                          "w-8 h-8 flex items-center justify-center text-[10px] font-sans font-medium rounded-full transition-all duration-300",
                          currentPage === i + 1 
                            ? "bg-primary text-background shadow-md shadow-primary/20 scale-110" 
                            : "text-primary/60 hover:bg-surface border border-transparent hover:border-border hover:text-primary"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => updateFilter('page', (currentPage + 1).toString())}
                      className="px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-widest text-primary hover:text-gold disabled:opacity-30 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Catalog Empty state */
              <div className="text-center py-24 select-none">
                <h3 className="font-serif text-sm tracking-widest uppercase text-primary mb-1.5 font-medium">
                  No Matching Creations
                </h3>
                <p className="text-xs font-sans font-light leading-relaxed text-primary/50 max-w-xs mx-auto mb-6">
                  We could not find any creations matching your active filters. Try adjusting metals, gemstones or pricing.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary text-background text-[10px] tracking-widest font-sans font-semibold uppercase px-6 py-3 hover:bg-gold transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Collection;
