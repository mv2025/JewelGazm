import React, { createContext, useContext, useState, useEffect } from 'react';
import { shopify, Product, Collection } from '@/lib/shopify';
import { portfolio, CaseStudy } from '@/lib/portfolio';
import { blog, BlogPost } from '@/lib/blog/mockBlog';

interface SearchResults {
  products: Product[];
  collections: Collection[];
  portfolios: CaseStudy[];
  blogs: BlogPost[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResults;
  loading: boolean;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    products: [],
    collections: [],
    portfolios: [],
    blogs: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);

  // Predictive search with API call debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ products: [], collections: [], portfolios: [], blogs: [] });
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await shopify.predictiveSearch(searchQuery);
        
        // Also perform search on portfolio case studies
        const allCaseStudies = await portfolio.getCaseStudies();
        const matchingPortfolios = allCaseStudies.filter(
          cs =>
            cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cs.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cs.challenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cs.deliverables.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 3);

        // Also perform search on blog posts
        const allBlogs = await blog.getPosts();
        const matchingBlogs = allBlogs.filter(
          bp =>
            bp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bp.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3);

        setSearchResults({
          ...results,
          portfolios: matchingPortfolios,
          blogs: matchingBlogs,
        });
      } catch (err) {
        console.error('Error during predictive search:', err);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce interval

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ products: [], collections: [], portfolios: [], blogs: [] });
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        loading,
        isSearchOpen,
        setSearchOpen,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};
