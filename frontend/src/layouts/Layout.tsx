import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { useLenis } from '@/providers/LenisProvider';
import { useAnalytics } from '@/hooks/useAnalytics';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Global Page Layout Wrapper
 * Aggregates common bars, navigation overlays, footer, and scrolls to top on route change.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useAnalytics();

  // Scroll window to top on route transition
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  // Disable pointer events on scroll to improve performance and eliminate hover lag
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary font-sans antialiased selection:bg-gold/20 transition-colors duration-300">
      {/* Keyboard Accessibility Skip Link */}
      <SkipToContent />

      {/* Common Header Navigation */}
      <Header />

      {/* Global Predictive Search Overlay */}
      <SearchOverlay />

      {/* Global Shopping Cart Side Drawer */}
      <CartDrawer />

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        {children}
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
