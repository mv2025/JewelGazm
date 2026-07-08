import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// View Imports
import { Home } from './Home';
import { Collection } from './Collection';
import { ProductDetails } from './ProductDetails';
import { CartPage } from './CartPage';
import { WishlistPage } from './WishlistPage';
import { StoreLocator } from './StoreLocator';
import { CaseStudyDetails } from './CaseStudyDetails';
import { BlogList } from './BlogList';
import { BlogPostDetails } from './BlogPostDetails';
import {
  About,
  Contact,
  FAQ,
  ReturnPolicy,
  Privacy,
  Terms,
  NotFound
} from './StaticPages';
import { AdminDashboard } from './AdminDashboard';
import { Login } from './Login';
import { Account } from './Account';

/**
 * Main Application Routing Registry
 * Connects routes inside the common Page Layout wrapper
 */
export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />
        
        {/* Collections pages */}
        <Route path="/collections" element={<Collection />} />
        <Route path="/collections/:handle" element={<Collection />} />

        {/* Product Details page (Jewellery Creations & Options) */}
        <Route path="/products/:handle" element={<ProductDetails />} />

        {/* Portfolio Case Studies */}
        <Route path="/portfolio/:handle" element={<CaseStudyDetails />} />

        {/* Blog System */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:handle" element={<BlogPostDetails />} />

        {/* Dynamic Cart and Wishlist pages */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Boutique showroom listings / Studio Location */}
        <Route path="/store-locator" element={<StoreLocator />} />

        {/* Maison information sheets */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/returns" element={<ReturnPolicy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin Dashboard */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Account Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* Premium User Dashboard */}
        <Route path="/account" element={<Account />} />

        {/* Fallback 404 handler */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
