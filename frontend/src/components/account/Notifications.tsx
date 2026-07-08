import React, { useState } from 'react';
import { mockNotificationSettings } from '@/lib/mockData/accountData';

export const Notifications: React.FC = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none ${checked ? 'bg-gold' : 'bg-border'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-surface transition duration-300 ${checked ? 'translate-x-4.5' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-border/40 pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary">Notifications</h2>
        <p className="text-sm font-sans text-primary/60 mt-1">Manage how you receive updates and alerts</p>
      </div>

      <div className="bg-surface border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-sans font-medium text-primary">Order Updates</h4>
              <p className="text-xs font-sans text-primary/60 mt-1">Shipping status, delivery confirmations</p>
            </div>
            <Switch checked={settings.orderUpdates} onChange={() => toggleSetting('orderUpdates')} />
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-sans font-medium text-primary">Price Drops</h4>
              <p className="text-xs font-sans text-primary/60 mt-1">Alerts when items in your wishlist go on sale</p>
            </div>
            <Switch checked={settings.priceDrops} onChange={() => toggleSetting('priceDrops')} />
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-sans font-medium text-primary">New Collections</h4>
              <p className="text-xs font-sans text-primary/60 mt-1">Early access to new launches</p>
            </div>
            <Switch checked={settings.newCollections} onChange={() => toggleSetting('newCollections')} />
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-sans font-medium text-primary">Wishlist Restock</h4>
              <p className="text-xs font-sans text-primary/60 mt-1">Alerts when out of stock items return</p>
            </div>
            <Switch checked={settings.wishlistRestock} onChange={() => toggleSetting('wishlistRestock')} />
          </div>
        </div>
      </div>
    </div>
  );
};

