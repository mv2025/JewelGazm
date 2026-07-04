import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { shopify, Collection as ShopifyCollection } from '@/lib/shopify';
import { ProductCard } from '@/components/common/ProductCard';
import { CollectionSkeleton, ProductCardSkeleton } from '@/components/ui/Skeleton';
import { MediaImage } from '@/components/ui/media/MediaImage';
import { Drawer } from '@/components/ui/Drawer';
import { updateSEO } from '@/utils/seo';

// Filter constants
const METALS = ['18K White Gold', '18K Yellow Gold', '18K Rose Gold', 'Platinum'];
const GEMSTONES = ['Diamond', 'Emerald', 'Sapphire', 'Ruby', 'Solitaire'];
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
  const { handle = 'all' } = useParams<{ handle: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Parse filter parameters from URL
  const selectedMetal = searchParams.get('metal') || '';
  const selectedGemstone = searchParams.get('gemstone') || '';
  const selectedSort = searchParams.get('sort') || 'BEST_SELLING';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

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
            minPrice,
            maxPrice,
          },
          selectedSort
        );
        setCollection(data);

        // Update page SEO
        if (data) {
          updateSEO({
            title: `${data.title} | Jewelgasm Haute Joaillerie`,
            description: data.description || `Explore premium hand-crafted luxury jewelry collection from Jewelgasm.`,
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
  }, [handle, selectedMetal, selectedGemstone, selectedSort, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const productEdges = collection?.products?.edges || [];
  const totalCount = productEdges.length;

  // Sidebar Filter Form Layout
  const FilterSidebar = () => (
    <div className="flex flex-col gap-8 select-none">
      {/* Metal Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/45 uppercase border-b border-border pb-2">
          Metal Type
        </h4>
        <div className="flex flex-col gap-2.5">
          {METALS.map(metal => {
            const active = selectedMetal === metal;
            return (
              <button
                key={metal}
                onClick={() => updateFilter('metal', active ? '' : metal)}
                className="flex items-center justify-between text-xs font-sans text-primary/75 hover:text-gold text-left py-0.5"
              >
                <span>{metal}</span>
                <span className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-colors ${
                  active ? 'bg-gold border-gold text-white' : 'border-border'
                }`}>
                  {active && <Check className="w-2.5 h-2.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gemstone Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/45 uppercase border-b border-border pb-2">
          Gemstone
        </h4>
        <div className="flex flex-col gap-2.5">
          {GEMSTONES.map(gem => {
            const active = selectedGemstone === gem;
            return (
              <button
                key={gem}
                onClick={() => updateFilter('gemstone', active ? '' : gem)}
                className="flex items-center justify-between text-xs font-sans text-primary/75 hover:text-gold text-left py-0.5"
              >
                <span>{gem}</span>
                <span className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-colors ${
                  active ? 'bg-gold border-gold text-white' : 'border-border'
                }`}>
                  {active && <Check className="w-2.5 h-2.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider/Range Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="font-serif text-[10px] tracking-[0.2em] font-semibold text-primary/45 uppercase border-b border-border pb-2">
          Price Range
        </h4>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-sans text-primary/45 uppercase">Min Price</span>
            <input
              type="number"
              placeholder="$ Min"
              value={searchParams.get('minPrice') || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="border border-border/80 px-2.5 py-1.5 text-xs font-sans font-light focus:outline-none focus:border-gold rounded-sm bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-sans text-primary/45 uppercase">Max Price</span>
            <input
              type="number"
              placeholder="$ Max"
              value={searchParams.get('maxPrice') || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="border border-border/80 px-2.5 py-1.5 text-xs font-sans font-light focus:outline-none focus:border-gold rounded-sm bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Clear Active Filters Link */}
      {(selectedMetal || selectedGemstone || minPrice || maxPrice) && (
        <button
          onClick={clearAllFilters}
          className="text-[9px] tracking-widest font-sans font-semibold uppercase text-gold hover:text-gold-hover text-left flex items-center gap-1.5 border border-gold/20 hover:border-gold px-3 py-2 rounded-sm self-start transition-all"
        >
          <X className="w-3.5 h-3.5" />
          Clear Active Filters
        </button>
      )}
    </div>
  );

  if (loading && !collection) {
    return (
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <CollectionSkeleton />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Collection Hero Header Banner */}
      {collection && (
        <div className="relative w-full py-20 bg-primary select-none overflow-hidden text-center text-white border-b border-border/40 mb-10">
          {collection.image?.url && (
            <div className="absolute inset-0">
              <MediaImage
                src={collection.image.url}
                alt={collection.title}
                className="opacity-35 object-center"
                wrapperClassName="w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary z-10" />
            </div>
          )}
          <div className="relative z-10 container mx-auto px-6 max-w-2xl flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] font-sans font-light uppercase text-gold">
              Jewelgasm Fine Jewelry
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
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mt-8">
        <div className="flex gap-10">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Right side Grid Catalog list */}
          <div className="flex-1">
            
            {/* Header controls bar */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-8 select-none">
              <div className="flex items-center gap-3">
                {/* Mobile Filter toggle button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-border px-3.5 py-2 hover:border-gold hover:text-gold text-xs transition-colors rounded-sm focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
                <span className="text-[11px] font-sans text-primary/45 font-light uppercase tracking-wider">
                  {totalCount} {totalCount === 1 ? 'Creation' : 'Creations'}
                </span>
              </div>

              {/* Sorting drop selector */}
              <div className="flex items-center gap-2 relative">
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : productEdges.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {productEdges.map(({ node: product }) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
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
                  className="bg-primary text-white text-[10px] tracking-widest font-sans font-semibold uppercase px-6 py-3 hover:bg-gold transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile filters slide Drawer overlay */}
      <Drawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Refine Collection"
        side="right"
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
};

export default Collection;
