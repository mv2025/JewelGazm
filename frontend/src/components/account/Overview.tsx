import React, { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Package, Heart, MapPin, Award } from 'lucide-react';

import goldCelesteRing from '@/assets/Featured-Products/gold-celeste-ring.png';
import goldSirenBand from '@/assets/Featured-Products/gold-siren-band.png';
import goldLuminaStuds from '@/assets/Featured-Products/gold-lumina-studs.png';
import silverCelesteRing from '@/assets/Featured-Products/Silver-Celeste-Ring.png';

const recentlyViewed = [
  { id: 1, name: 'Gold Celeste Ring', price: '₹45,999', image: goldCelesteRing },
  { id: 2, name: 'Gold Siren Band', price: '₹32,500', image: goldSirenBand },
  { id: 3, name: 'Gold Lumina Studs', price: '₹28,999', image: goldLuminaStuds },
  { id: 4, name: 'Silver Celeste Ring', price: '₹12,999', image: silverCelesteRing },
];

export const Overview: React.FC = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-border/40">
        {user.picture ? (
          <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full border-2 border-gold/30 shadow-md" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-serif border border-gold/30">
            {user.name.charAt(0)}
          </div>
        )}
        <div className="text-center md:text-left">
          <p className="text-sm font-sans text-gray-500 mb-1">{greeting},</p>
          <h2 className="text-3xl font-serif text-primary">{user.name}</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full">
              Gold Member
            </span>
            <span className="text-xs text-gray-400">Member since 2025</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-border/40 flex flex-col items-center justify-center text-center hover:border-gold/30 transition-colors">
          <Package className="w-6 h-6 text-gold mb-2" />
          <span className="text-2xl font-serif text-primary">3</span>
          <span className="text-xs font-sans text-gray-500 uppercase tracking-widest mt-1">Orders</span>
        </div>
        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-border/40 flex flex-col items-center justify-center text-center hover:border-gold/30 transition-colors">
          <Heart className="w-6 h-6 text-gold mb-2" />
          <span className="text-2xl font-serif text-primary">14</span>
          <span className="text-xs font-sans text-gray-500 uppercase tracking-widest mt-1">Wishlist</span>
        </div>
        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-border/40 flex flex-col items-center justify-center text-center hover:border-gold/30 transition-colors">
          <MapPin className="w-6 h-6 text-gold mb-2" />
          <span className="text-2xl font-serif text-primary">2</span>
          <span className="text-xs font-sans text-gray-500 uppercase tracking-widest mt-1">Addresses</span>
        </div>
        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-border/40 flex flex-col items-center justify-center text-center hover:border-gold/30 transition-colors">
          <Award className="w-6 h-6 text-gold mb-2" />
          <span className="text-2xl font-serif text-primary">1,250</span>
          <span className="text-xs font-sans text-gray-500 uppercase tracking-widest mt-1">Points</span>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border/40">
        <h3 className="font-serif text-xl text-primary mb-6">Recently Viewed</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentlyViewed.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-sm font-sans text-primary">{product.name}</h4>
              <p className="text-xs font-sans text-gray-500 mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
