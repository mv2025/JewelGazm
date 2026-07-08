import React from 'react';
import { mockSpecialDates } from '@/lib/mockData/accountData';
import { CalendarHeart, Bell, BellOff, Plus } from 'lucide-react';

export const SpecialDates: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-8">
        <div>
          <h2 className="font-serif text-3xl text-primary flex items-center gap-2">
            Special Dates <CalendarHeart className="w-6 h-6 text-gold" />
          </h2>
          <p className="text-sm font-sans text-gray-500 mt-1">Never miss an important moment with curated gift reminders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-sans font-semibold tracking-widest uppercase rounded hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Date
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSpecialDates.map((date) => (
          <div key={date.id} className="bg-white border border-border/60 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 shadow-sm">
            <div className="p-6">
              <h3 className="font-serif text-xl text-primary mb-1">{date.name}</h3>
              <p className="text-3xl font-sans font-light text-primary/80 my-4">{date.date}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-4">
                <span className="text-xs font-sans text-gray-500 font-medium">Gift Reminder</span>
                <button 
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase transition-colors
                    ${date.reminderOn 
                      ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 group' 
                      : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700 group'
                    }
                  `}
                >
                  {date.reminderOn ? (
                    <>
                      <Bell className="w-3.5 h-3.5 group-hover:hidden" />
                      <BellOff className="w-3.5 h-3.5 hidden group-hover:block" />
                      <span className="group-hover:hidden">ON</span>
                      <span className="hidden group-hover:block">TURN OFF</span>
                    </>
                  ) : (
                    <>
                      <BellOff className="w-3.5 h-3.5 group-hover:hidden" />
                      <Bell className="w-3.5 h-3.5 hidden group-hover:block" />
                      <span className="group-hover:hidden">OFF</span>
                      <span className="hidden group-hover:block">TURN ON</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
