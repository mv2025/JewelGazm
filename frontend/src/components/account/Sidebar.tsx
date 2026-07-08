import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { cn } from '@/utils/cn';
import { 
  User, Package, Heart, Grid, MapPin, CreditCard, 
  Award, MenuSquare, CalendarHeart, Star, Bell, 
  Settings, HelpCircle, LogOut, Shield 
} from 'lucide-react';

export type TabId = 'overview' | 'orders' | 'wishlist' | 'collections' | 'addresses' | 'payments' | 'sizes' | 'reviews' | 'notifications' | 'settings' | 'support';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  onLogout: () => void;
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'collections', label: 'Saved Collections', icon: Grid },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'sizes', label: 'Ring & Bracelet Sizes', icon: MenuSquare },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all text-left",
              isActive 
                ? "bg-primary text-white" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
      
      <div className="mt-8 border-t border-border/40 pt-4 space-y-2">
        {user?.isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans font-medium text-white bg-primary hover:bg-primary/90 w-full text-left transition-all"
          >
            <Shield className="w-4 h-4" />
            Admin Dashboard
          </Link>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-red-500 hover:bg-red-50 w-full text-left transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
