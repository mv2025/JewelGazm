import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { ShieldAlert, Globe, IndianRupee, Moon } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-border/40 pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary">Account Settings</h2>
        <p className="text-sm font-sans text-gray-500 mt-1">Manage your preferences and security</p>
      </div>

      {/* Google Security Notice */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-sans font-medium text-blue-900 mb-1">Secured by Google</h4>
          <p className="text-sm font-sans text-blue-700/80 leading-relaxed">
            Your account is securely authenticated through your connected Google Account ({user?.email}). 
            Passwords and Two-Factor Authentication are managed directly by Google to ensure maximum security.
          </p>
        </div>
      </div>

      <div className="bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm mt-8">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary">Language</h4>
              </div>
            </div>
            <select className="bg-gray-50 border border-border/60 rounded-md px-3 py-1.5 text-sm font-sans text-primary focus:outline-none focus:border-gold">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary">Currency</h4>
              </div>
            </div>
            <select className="bg-gray-50 border border-border/60 rounded-md px-3 py-1.5 text-sm font-sans text-primary focus:outline-none focus:border-gold">
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <Moon className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary">Theme</h4>
              </div>
            </div>
            <select className="bg-gray-50 border border-border/60 rounded-md px-3 py-1.5 text-sm font-sans text-primary focus:outline-none focus:border-gold">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
