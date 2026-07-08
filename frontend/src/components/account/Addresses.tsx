import React from 'react';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';
import { mockAddresses } from '@/lib/mockData/accountData';

export const Addresses: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary">Saved Addresses</h2>
        <button className="flex items-center gap-2 bg-primary text-background px-5 py-2 text-sm font-sans font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAddresses.map((address) => (
          <div key={address.id} className="border border-border/60 rounded-xl p-6 bg-surface hover:border-gold/30 transition-colors shadow-sm relative group">
            {address.isDefault && (
              <span className="absolute top-6 right-6 bg-green-50 text-green-700 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full">
                Default {address.type}
              </span>
            )}
            
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary/40" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-primary">{address.fullName}</h4>
                <p className="text-xs font-sans text-primary/60 uppercase tracking-widest">{address.type} Address</p>
              </div>
            </div>

            <div className="space-y-1 mb-6 text-sm text-primary/70 font-sans">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
              <p className="pt-2 text-primary/90">Phone: {address.phone}</p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border/40">
              <button className="flex items-center gap-1.5 text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


