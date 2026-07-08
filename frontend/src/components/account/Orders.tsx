import React from 'react';
import { mockOrders } from '@/lib/mockData/accountData';
import { Package, Download, MapPin, Repeat } from 'lucide-react';

export const Orders: React.FC = () => {
  if (!mockOrders || mockOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="font-serif text-2xl text-primary mb-2">No Orders Yet</h3>
        <p className="text-gray-500 font-sans text-sm max-w-md">
          Discover our exclusive collections and find the perfect piece to start your JewelGazm journey.
        </p>
        <button className="mt-8 px-8 py-3 bg-primary text-white font-sans text-xs font-semibold tracking-widest uppercase hover:bg-primary/90 transition-colors">
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="font-serif text-3xl text-primary mb-8 border-b border-border/40 pb-4">My Orders</h2>
      
      {mockOrders.map((order) => (
        <div key={order.id} className="bg-white border border-border/60 rounded-xl overflow-hidden hover:border-gold/30 transition-colors shadow-sm">
          <div className="bg-[#FAF8F5] px-6 py-4 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] font-sans text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                <p className="text-sm font-sans font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-sans text-gray-500 uppercase tracking-wider mb-1">Total</p>
                <p className="text-sm font-sans font-medium">₹{order.total.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-[10px] font-sans text-gray-500 uppercase tracking-wider mb-1">Order #</p>
                <p className="text-sm font-sans font-medium">{order.id}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide
                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : ''}
                ${order.status === 'Processing' ? 'bg-amber-100 text-amber-700' : ''}
              `}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md bg-gray-50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-lg text-primary truncate">{item.name}</h4>
                  <p className="text-sm text-gray-500 font-sans mt-1">Qty: {item.quantity}</p>
                  <p className="font-sans font-semibold mt-2">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
            
            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-border/40 flex flex-wrap gap-3">
              <button className="flex justify-center items-center gap-2 px-6 py-2.5 border border-border/80 rounded-md text-xs font-sans font-semibold tracking-wide hover:bg-gray-50 transition-colors flex-1 md:flex-none">
                <MapPin className="w-4 h-4" /> Track
              </button>
              <button className="flex justify-center items-center gap-2 px-6 py-2.5 border border-border/80 rounded-md text-xs font-sans font-semibold tracking-wide hover:bg-gray-50 transition-colors flex-1 md:flex-none">
                <Download className="w-4 h-4" /> Invoice
              </button>
              <button className="flex justify-center items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-md text-xs font-sans font-semibold tracking-wide hover:bg-primary/90 transition-colors flex-1 md:flex-none">
                <Repeat className="w-4 h-4" /> Buy Again
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
