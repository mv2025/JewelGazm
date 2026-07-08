import React from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { mockPaymentMethods } from '@/lib/mockData/accountData';

export const PaymentMethods: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary">Payment Methods</h2>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 text-sm font-sans font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPaymentMethods.map((method) => (
          <div key={method.id} className="border border-border/60 rounded-xl p-6 bg-white hover:border-gold/30 transition-colors shadow-sm relative group">
            {method.isDefault && (
              <span className="absolute top-6 right-6 bg-green-50 text-green-700 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full">
                Default
              </span>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-8 rounded bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-sans font-medium text-primary text-base">{method.provider}</h4>
                <p className="text-xs font-sans text-gray-500 uppercase tracking-widest">{method.type}</p>
              </div>
            </div>

            <div className="space-y-1 mb-6 text-sm text-gray-600 font-sans bg-gray-50 p-4 rounded-lg">
              {method.type === 'Credit Card' ? (
                <>
                  <p className="font-mono text-gray-700 tracking-widest text-base">•••• •••• •••• {method.last4}</p>
                  <p className="text-xs pt-1">Expires {method.expiry}</p>
                </>
              ) : (
                <p className="font-medium text-gray-700">Linked to {method.provider}</p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border/40">
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
