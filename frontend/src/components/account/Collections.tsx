import React from 'react';
import { mockSavedCollections } from '@/lib/mockData/accountData';
import { ArrowRight, Plus } from 'lucide-react';

export const Collections: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-8">
        <div>
          <h2 className="font-serif text-3xl text-primary">Saved Collections</h2>
          <p className="text-sm font-sans text-primary/60 mt-1">Curate your favorite pieces into personalized collections</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-background text-xs font-sans font-semibold tracking-widest uppercase rounded hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSavedCollections.map((collection) => (
          <div key={collection.id} className="group cursor-pointer relative overflow-hidden rounded-xl border border-border/30 hover:border-gold/50 transition-all duration-300">
            <div className="aspect-[16/10] bg-surface-hover overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
              <img 
                src={collection.coverImage} 
                alt={collection.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-1 drop-shadow-md">{collection.name}</h3>
                    <p className="font-sans text-sm text-white/90 drop-shadow-md">{collection.itemCount} Items</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Recently Added Placeholder */}
        <div className="group cursor-pointer relative overflow-hidden rounded-xl border border-border/30 bg-background flex flex-col items-center justify-center hover:border-gold/50 transition-all duration-300 min-h-[200px]">
          <div className="w-16 h-16 rounded-full bg-surface shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-6 h-6 text-gold" />
          </div>
          <h3 className="font-serif text-xl text-primary">Recently Added</h3>
          <p className="font-sans text-sm text-primary/60 mt-1">View unsorted items</p>
        </div>
      </div>
    </div>
  );
};



