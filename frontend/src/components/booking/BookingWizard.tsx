import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Check, Plus, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/shopify';
import { useCart } from '@/providers/CartProvider';
import { Button } from '@/components/ui/Button';

interface BookingWizardProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.edges[0]?.node
  );
  
  // Date & Time states
  const [selectedDate, setSelectedDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  
  // Extras
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);

  const extrasList = [
    { id: 'ext_cad', name: 'Bespoke 3D CAD Renders', price: 150, desc: 'Receive high-fidelity 3D digital model blueprints of your design before casting.' },
    { id: 'ext_exp', name: 'Priority Custom Casting', price: 100, desc: 'Expedited gold casting, manual stone-setting, and polishing turnaround.' },
    { id: 'ext_engrave', name: 'Signature Laser Engraving', price: 50, desc: 'Add a personalized date, initials, or monogram inside the jewelry band.' },
    { id: 'ext_box', name: 'LED Premium Keepsake Box', price: 80, desc: 'A custom lacquer and velvet storage box with an integrated LED spotlight.' }
  ];

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  const getExtrasTotal = () => {
    return selectedExtras.reduce((acc, curr) => {
      const extra = extrasList.find(e => e.id === curr);
      return acc + (extra ? extra.price : 0);
    }, 0);
  };

  const getGrandTotal = () => {
    const variantPrice = parseFloat(selectedVariant.price.amount);
    return variantPrice + getExtrasTotal();
  };

  const handleBookingSubmit = async () => {
    setAddingToCart(true);
    try {
      // Add main service variant to Shopify cart
      await addToCart(selectedVariant.id, 1);
      // Wait for a brief moment and close modal
      onClose();
      // Reset wizard state
      setStep(1);
      setSelectedExtras([]);
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Calendar days helper (next 7 days starting tomorrow)
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        dateString: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate()
      });
    }
    return days;
  };

  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
        {/* Backdrop Close Click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-h-[90vh] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-neutral-900/50">
            <div className="flex flex-col">
              <span className="text-[9px] tracking-widest uppercase font-semibold text-gold">Book Design Consultation</span>
              <h3 className="font-serif text-lg font-light text-white">{product.title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="flex w-full bg-white/5 h-[1.5px] relative">
            <div 
              className="bg-gold h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Body */}
          <div className="flex-grow p-6 overflow-y-auto min-h-[40vh]">
            
            {/* Step 1: Package Selection */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="font-serif text-md font-light text-white mb-2">1. Select Creation Focus</h4>
                <div className="flex flex-col gap-3">
                  {product.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedVariant(node)}
                      className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border text-left transition-all ${
                        selectedVariant.id === node.id 
                          ? 'border-gold bg-gold/5' 
                          : 'border-white/5 bg-white/20 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-serif text-sm font-semibold text-white">{node.title}</span>
                        <span className="text-[10px] text-neutral-400 font-sans">SKU: {node.sku}</span>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <span className="font-serif text-md font-bold text-gold">${parseFloat(node.price.amount).toLocaleString()}</span>
                        <span className="block text-[8px] text-neutral-500 uppercase tracking-widest mt-0.5">Design Base Fee</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time Picker */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <h4 className="font-serif text-md font-light text-white">2. Schedule Design Session</h4>
                
                {/* Calendar Grid */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-sans flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Available Dates</span>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {getNextDays().map(day => (
                      <button
                        key={day.dateString}
                        onClick={() => setSelectedDate(day.dateString)}
                        className={`flex flex-col items-center p-3 rounded-lg border text-center transition-all ${
                          selectedDate === day.dateString 
                            ? 'border-gold bg-gold/5' 
                            : 'border-white/5 bg-white/20 hover:border-white/20'
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-sans">{day.dayName}</span>
                        <span className="text-lg font-serif font-bold text-white mt-1">{day.dayNum}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="flex flex-col gap-3 mt-2">
                  <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-sans flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time Slots</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-lg border text-center transition-all font-sans text-xs ${
                          selectedTime === time 
                            ? 'border-gold bg-gold/5 text-gold' 
                            : 'border-white/5 bg-white/20 text-white/80 hover:border-white/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Extras Selection */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <h4 className="font-serif text-md font-light text-white mb-2">3. Bespoke Design Add-Ons</h4>
                <div className="flex flex-col gap-3">
                  {extrasList.map(extra => (
                    <button
                      key={extra.id}
                      onClick={() => handleExtraToggle(extra.id)}
                      className={`flex items-start justify-between p-4 rounded-lg border text-left transition-all ${
                        selectedExtras.includes(extra.id) 
                          ? 'border-gold bg-gold/5' 
                          : 'border-white/5 bg-white/20 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3 max-w-[80%]">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          selectedExtras.includes(extra.id) 
                            ? 'border-gold bg-gold text-black' 
                            : 'border-white/20 bg-neutral-900'
                        }`}>
                          {selectedExtras.includes(extra.id) && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif text-sm font-semibold text-white">{extra.name}</span>
                          <span className="text-[10px] text-neutral-400 font-sans mt-0.5 leading-relaxed">{extra.desc}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-sm font-bold text-gold">+{extra.price ? `$${extra.price}` : ''}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary & Add to Cart */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <h4 className="font-serif text-md font-light text-white">4. Confirm Customizations</h4>
                
                {/* Summary Table */}
                <div className="flex flex-col bg-white/20 rounded-lg p-5 border border-white/5 gap-4">
                  <div className="flex justify-between items-start pb-4 border-b border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] tracking-widest text-gold uppercase font-sans">Selected Model</span>
                      <span className="font-serif text-sm text-white font-semibold">{selectedVariant.title}</span>
                      <span className="text-[10px] text-neutral-400 font-sans flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" /> {selectedDate} @ {selectedTime}
                      </span>
                    </div>
                    <span className="font-serif text-sm font-bold text-white">${parseFloat(selectedVariant.price.amount).toLocaleString()}</span>
                  </div>

                  {/* Extras list if any */}
                  {selectedExtras.length > 0 && (
                    <div className="flex flex-col gap-3 pb-4 border-b border-white/5">
                      <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-sans">Customizations Selected</span>
                      {selectedExtras.map(extId => {
                        const extra = extrasList.find(e => e.id === extId);
                        if (!extra) return null;
                        return (
                          <div key={extId} className="flex justify-between items-center text-xs">
                            <span className="text-neutral-300 font-sans">{extra.name}</span>
                            <span className="font-serif text-xs font-semibold text-white">+${extra.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-serif text-md text-white font-light">Grand Total (Est.)</span>
                    <span className="font-serif text-lg font-bold text-gold">${getGrandTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-900 border border-white/5 text-[10px] text-neutral-400 font-sans">
                  <AlertCircle className="w-4.5 h-4.5 text-gold shrink-0" />
                  <span>Your consultation will be reserved in your bag. Complete checkout to finalize booking.</span>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-neutral-900/50">
            {step > 1 ? (
              <Button variant="outline" className="text-white border-white/20" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button variant="outline" className="bg-white text-black hover:bg-neutral-200 border-none" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button
                variant="outline"
                className="bg-gold text-black hover:bg-[#bfa032] border-none font-semibold flex items-center gap-2"
                onClick={handleBookingSubmit}
                disabled={addingToCart}
              >
                {addingToCart ? 'Confirming...' : <><ShoppingCart className="w-4 h-4" /> Book Consultation</>}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingWizard;
