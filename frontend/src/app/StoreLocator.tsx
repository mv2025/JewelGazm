import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { updateSEO } from '@/utils/seo';
import { useToast } from '@/providers/ToastProvider';

interface Boutique {
  id: number;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
}

const BOUTIQUES: Boutique[] = [
  {
    id: 1,
    city: "New York",
    name: "Fifth Avenue Salon",
    address: "718 Fifth Avenue, New York, NY 10019",
    phone: "+1 (212) 555-0199",
    hours: "Mon - Sat: 10:00 AM - 7:00 PM | Sun: Closed",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    city: "London",
    name: "Mayfair Boutique",
    address: "24 Old Bond Street, London W1S 4PT",
    phone: "+44 (20) 7946 0958",
    hours: "Mon - Sat: 10:00 AM - 6:30 PM | Sun: 12:00 PM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    city: "Paris",
    name: "Place Vendôme Salon",
    address: "12 Place Vendôme, 75001 Paris",
    phone: "+33 (1) 42 27 78 90",
    hours: "Mon - Sat: 10:30 AM - 7:00 PM | Sun: Closed",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80"
  }
];

/**
 * Boutiques & Store Locator Page
 */
export const StoreLocator: React.FC = () => {
  const { addToast } = useToast();

  useEffect(() => {
    updateSEO({
      title: 'Our Boutiques & Store Locator',
      description: 'Locate a Jewelgazm showroom or schedule a private consultation.',
    });
  }, []);

  const handleBookConsultation = (boutiqueName: string) => {
    addToast(`Initiating bespoke booking client for ${boutiqueName}...`, 'info');
    setTimeout(() => {
      alert(`Simulation: Launching calendar appointment hook for: ${boutiqueName}`);
    }, 500);
  };

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col gap-2">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
            Bespoke Consultation
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-light text-primary uppercase tracking-wide">
            Our Showrooms
          </h1>
          <p className="text-xs font-sans font-light leading-relaxed text-primary/55 max-w-md mx-auto mt-1">
            Experience our fine jewelry in person. Visit a Jewelgazm boutique for custom consultation and design planning.
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="flex flex-col gap-12">
          {BOUTIQUES.map((boutique, index) => (
            <div
              key={boutique.id}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center border border-border/40 p-6 md:p-8 rounded-sm bg-surface-hover/10 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Salon Image */}
              <div className="w-full lg:w-1/2 aspect-[3/2] overflow-hidden rounded-sm bg-surface-hover shadow-md">
                <Image src={boutique.image} alt={boutique.name} aspectRatio="landscape" />
              </div>

              {/* Boutique details */}
              <div className="w-full lg:w-1/2 flex flex-col gap-5 items-start">
                <div>
                  <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold block mb-1">
                    {boutique.city} Boutique
                  </span>
                  <h2 className="font-serif text-xl font-medium text-primary tracking-wide">
                    {boutique.name}
                  </h2>
                </div>

                <div className="flex flex-col gap-3 text-xs font-sans font-light text-primary/75">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>{boutique.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>{boutique.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span>{boutique.hours}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleBookConsultation(boutique.name)}
                  variant="outline"
                  size="sm"
                  className="mt-2 flex items-center gap-2"
                  magnetic
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Book Private Fitting
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
