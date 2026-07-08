import React from 'react';
import { mockSizes } from '@/lib/mockData/accountData';
import { Edit2, Heart } from 'lucide-react';

export const Sizes: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-8">
        <div>
          <h2 className="font-serif text-3xl text-primary">Ring & Bracelet Sizes</h2>
          <p className="text-sm font-sans text-gray-500 mt-1">Save sizes for a seamless checkout experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Sizes */}
        <div className="bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#FAF8F5] px-6 py-4 border-b border-border/60 flex items-center justify-between">
            <h3 className="font-serif text-xl text-primary">My Sizes</h3>
            <button className="text-gray-400 hover:text-gold transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Ring Size</h4>
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">US / Canada</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.user.ring.us}</p>
                </div>
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">UK / AU</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.user.ring.uk}</p>
                </div>
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">EU</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.user.ring.eu}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/30">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Bracelet Size</h4>
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">CM</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.user.bracelet.cm}</p>
                </div>
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Inches</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.user.bracelet.inches}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Sizes */}
        <div className="bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm relative">
          <div className="absolute top-4 right-6 text-gold/30">
            <Heart className="w-24 h-24 absolute -top-8 -right-8 opacity-20" fill="currentColor" />
          </div>
          
          <div className="bg-primary/5 px-6 py-4 border-b border-border/60 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-xl text-primary">Partner's Sizes</h3>
            </div>
            <button className="text-gray-400 hover:text-gold transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-6 space-y-6 relative z-10">
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Ring Size</h4>
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">US / Canada</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.partner.ring.us}</p>
                </div>
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">UK / AU</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.partner.ring.uk}</p>
                </div>
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">EU</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.partner.ring.eu}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/30">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Bracelet Size</h4>
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">CM</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.partner.bracelet.cm}</p>
                </div>
                <div className="flex-1 bg-gray-50 border border-border/40 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Inches</p>
                  <p className="font-serif text-xl text-primary">{mockSizes.partner.bracelet.inches}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
