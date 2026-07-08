import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Sidebar, TabId } from '@/components/account/Sidebar';
import { Overview } from '@/components/account/Overview';
import { Orders } from '@/components/account/Orders';
import { Wishlist } from '@/components/account/Wishlist';
import { Collections } from '@/components/account/Collections';
import { Sizes } from '@/components/account/Sizes';
import { Notifications } from '@/components/account/Notifications';
import { Settings } from '@/components/account/Settings';
import { Addresses } from '@/components/account/Addresses';
import { PaymentMethods } from '@/components/account/PaymentMethods';
// Placeholders for other components

const Reviews = () => <div className="p-8 text-center text-gray-500">Reviews Component (Coming Soon)</div>;
const Support = () => <div className="p-8 text-center text-gray-500">Support Component (Coming Soon)</div>;

export const Account: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If admin, maybe redirect to admin dashboard (or let them see their normal account too)
  // We already have admin routing handled, but let's keep it safe.
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'orders': return <Orders />;
      case 'wishlist': return <Wishlist />;
      case 'collections': return <Collections />;
      case 'addresses': return <Addresses />;
      case 'payments': return <PaymentMethods />;
      case 'sizes': return <Sizes />;
      case 'reviews': return <Reviews />;
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings />;
      case 'support': return <Support />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-white flex justify-start items-start">
      <div className="w-full flex flex-col sm:flex-row gap-6 lg:gap-16 mt-8">
        {/* Sidebar */}
        <div className="w-full max-w-xs md:max-w-[260px] shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
