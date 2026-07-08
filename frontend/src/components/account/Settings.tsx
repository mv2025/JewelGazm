import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { ShieldAlert, Globe, IndianRupee, Moon } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-border/40 pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary">Account Settings</h2>
        <p className="text-sm font-sans text-primary/60 mt-1">Manage your preferences and security</p>
      </div>

      {/* Google Security Notice */}
      <div className="bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-6 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-sans font-medium text-blue-900 dark:text-blue-100 mb-1">Secured by Google</h4>
          <p className="text-sm font-sans text-blue-700/80 dark:text-blue-200/70 leading-relaxed">
            Your account is securely authenticated through your connected Google Account ({user?.email}). 
            Passwords and Two-Factor Authentication are managed directly by Google to ensure maximum security.
          </p>
        </div>
      </div>

      <div className="bg-surface border border-border/60 rounded-xl overflow-hidden shadow-sm mt-8">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary/70" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary">Language</h4>
              </div>
            </div>
            <select className="bg-surface-hover border border-border/60 rounded-md px-3 py-1.5 text-sm font-sans text-primary focus:outline-none focus:border-gold">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-primary/70" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary">Currency</h4>
              </div>
            </div>
            <select className="bg-surface border border-border/60 rounded-md px-3 py-1.5 text-sm font-sans text-primary focus:outline-none focus:border-gold">
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          
          <div className="w-full h-px bg-border/40"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center">
                <Moon className="w-4 h-4 text-primary/70" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary">Theme</h4>
              </div>
            </div>
            <select 
              className="bg-surface border border-border/60 rounded-md px-3 py-1.5 text-sm font-sans text-primary focus:outline-none focus:border-gold"
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
