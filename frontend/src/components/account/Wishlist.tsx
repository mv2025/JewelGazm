import React from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';

import goldLuminaStuds from '@/assets/Featured-Products/gold-lumina-studs.png';
import silverCelesteRing from '@/assets/Featured-Products/Silver-Celeste-Ring.png';
import silverSirenBand from '@/assets/Featured-Products/Silver-Siren-Band.png';

export const Wishlist: React.FC = () => {
  // Using some mock products for the wishlist
  const wishlistItems = [
    {
      id: 'w1',
      name: 'Gold Lumina Studs',
      price: 28999,
      image: goldLuminaStuds,
      inStock: true
    },
    {
      id: 'w2',
      name: 'Silver Celeste Ring',
      price: 12999,
      image: silverCelesteRing,
      inStock: true
    },
    {
      id: 'w3',
      name: 'Silver Siren Band',
      price: 15000,
      image: silverSirenBand,
      inStock: false
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary">My Wishlist</h2>
        <span className="text-sm font-sans text-gray-500">{wishlistItems.length} Items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group relative bg-[#FAF8F5] rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-border/30 hover:border-gold/30 flex flex-col">
            <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors" />
            </button>
            
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h4 className="font-serif text-lg text-primary">{item.name}</h4>
              <p className="font-sans font-semibold text-primary mt-1 mb-4">₹{item.price.toLocaleString('en-IN')}</p>
              
              <div className="mt-auto pt-4 border-t border-border/40">
                {item.inStock ? (
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-xs font-sans font-semibold tracking-widest uppercase rounded hover:bg-primary/90 transition-colors">
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 text-gray-500 text-xs font-sans font-semibold tracking-widest uppercase rounded cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
