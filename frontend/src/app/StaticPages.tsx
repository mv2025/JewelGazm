import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { useToast } from '@/providers/ToastProvider';
import { updateSEO } from '@/utils/seo';
import policyConfig from '@/content/policies.json';

// Zod schema for Contact Form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormInput = z.infer<typeof contactFormSchema>;

// ========================================================
// ABOUT PAGE
// ========================================================
export const About: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Our Heritage & Story',
      description: 'Discover the craft heritage, design ethics, and material sourcing chronicles of Jewelgasm.',
    });
  }, []);

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl flex flex-col gap-16">
        <div className="text-center">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">The Maison</span>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-primary uppercase mt-1">Our Heritage</h1>
        </div>

        <div className="w-full aspect-[21/9] overflow-hidden rounded-sm shadow-md bg-surface-hover">
          <Image src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop&q=80" alt="Jewelgasm Heritage" aspectRatio="wide" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs font-sans font-light leading-relaxed text-primary/75">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-primary">Founding Vision</h3>
            <p>
              Jewelgasm was founded in 2021 with a simple commitment: to build a modern jewelry house that prioritizes architectural symmetry, material purity, and absolute trade transparency.
            </p>
            <p>
              Disillusioned by traditional retail markups and opaque sourcing webs, we bypassed brokers to source conflict-free diamonds and custom-cast metals directly. Every sketch is turned into reality by our master team in our Brooklyn workshop.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-primary">Sourcing Ethics</h3>
            <p>
              Our diamonds are exclusively sourced from certified CanadaMark and Kimberley Process mines, ensuring conflict-free origin and strict environmental protection metrics.
            </p>
            <p>
              We exclusively alloy gold cast in 18-karat standard weights, matching beautiful aesthetic tones with skins-safe compositions. Our certificates of authenticity are signed physically by our chief gemologist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// CONTACT PAGE
// ========================================================
export const Contact: React.FC = () => {
  const { addToast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    updateSEO({
      title: 'Contact Customer Care',
      description: 'Reach out to our customer care team or consult with a custom design specialist.',
    });
  }, []);

  const onSubmit = async (data: ContactFormInput) => {
    await new Promise(r => setTimeout(r, 1200));
    console.log('Contact form:', data);
    addToast('Your message has been sent. Customer care will respond within 12 hours.', 'success');
    reset();
  };

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">Customer Care</span>
          <h1 className="font-serif text-2xl md:text-3xl font-light text-primary uppercase mt-1">Get in Touch</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Details Column */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
            <h3 className="font-serif text-lg font-light text-primary">Maison Contacts</h3>
            
            <div className="flex flex-col gap-5 text-xs font-sans font-light text-primary/75">
              <div className="flex items-center gap-3.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>support@frtstudios.com</span>
              </div>
              <div className="flex items-center gap-3.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+1 (800) 555-0190</span>
              </div>
              <div className="flex items-center gap-3.5">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>Brooklyn Workshop, New York</span>
              </div>
            </div>
            
            <p className="text-[11px] font-sans font-light leading-relaxed text-primary/50 border-t border-border pt-6 max-w-xs">
              Client service lines operate Monday to Friday between 9:00 AM and 6:00 PM EST.
            </p>
          </div>

          {/* Form Column */}
          <div className="col-span-1 lg:col-span-3 border border-border p-6 md:p-8 bg-surface rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 font-sans text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50 mb-0.5">Your Name</label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  className="border border-border/80 px-3 py-2 text-xs focus:outline-none focus:border-gold bg-transparent rounded-sm"
                  {...register('name')}
                />
                {errors.name && <span className="text-[9px] text-red-500 mt-0.5">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50 mb-0.5">Your Email</label>
                <input
                  type="email"
                  disabled={isSubmitting}
                  className="border border-border/80 px-3 py-2 text-xs focus:outline-none focus:border-gold bg-transparent rounded-sm"
                  {...register('email')}
                />
                {errors.email && <span className="text-[9px] text-red-500 mt-0.5">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-medium tracking-widest uppercase text-primary/50 mb-0.5">Message</label>
                <textarea
                  rows={5}
                  disabled={isSubmitting}
                  className="border border-border/80 px-3 py-2 text-xs focus:outline-none focus:border-gold bg-transparent resize-none rounded-sm"
                  {...register('message')}
                />
                {errors.message && <span className="text-[9px] text-red-500 mt-0.5">{errors.message.message}</span>}
              </div>

              <Button type="submit" variant="primary" disabled={isSubmitting} className="justify-center mt-2">
                <Send className="w-3.5 h-3.5 shrink-0 mr-1.5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// FAQ PAGE
// ========================================================
export const FAQ: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Frequently Asked Questions',
      description: 'Read frequently asked questions about GIA certification, conflict-free sourcing, and lifetime warranties.',
    });
  }, []);

  const accordionItems = policyConfig.faq.map((item, idx) => ({
    id: `faq-${idx}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-gold">Frequently Asked</span>
          <h1 className="font-serif text-2xl md:text-3xl font-light text-primary uppercase mt-1">Client FAQ</h1>
        </div>

        <Accordion items={accordionItems} />
      </div>
    </div>
  );
};

// ========================================================
// RETURN POLICY PAGE
// ========================================================
export const ReturnPolicy: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Complimentary Returns & Sizing Policies',
      description: 'Learn about our complimentary returns and 30-day resizing programs.',
    });
  }, []);

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl text-xs font-sans font-light leading-relaxed text-primary/80">
        <h1 className="font-serif text-2xl font-light text-primary mb-6 uppercase tracking-wider">{policyConfig.returns.title}</h1>
        <p>{policyConfig.returns.content}</p>
        <p className="mt-4">
          Should you require assistance setting up an insured return parcel pickup, please reach out to our client care team directly at support@frtstudios.com. Sizing alterations take approximately 3-5 business days upon receiving the parcel in our workshop.
        </p>
      </div>
    </div>
  );
};

// ========================================================
// PRIVACY POLICY PAGE
// ========================================================
export const Privacy: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Privacy Policy',
      description: 'Read the Jewelgasm client privacy policy.',
    });
  }, []);

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl text-xs font-sans font-light leading-relaxed text-primary/80">
        <h1 className="font-serif text-2xl font-light text-primary mb-6 uppercase tracking-wider">{policyConfig.privacy.title}</h1>
        <p>{policyConfig.privacy.content}</p>
        <p className="mt-4">
          This document updates automatically in compliance with European GDPR, California CCPA, and general SSL encryption standards. Sourcing metrics and customer coordinates are locked behind private vaults.
        </p>
      </div>
    </div>
  );
};

// ========================================================
// TERMS OF SERVICE PAGE
// ========================================================
export const Terms: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Terms of Service',
      description: 'Read the Jewelgasm terms and conditions.',
    });
  }, []);

  return (
    <div className="py-16 md:py-24 select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl text-xs font-sans font-light leading-relaxed text-primary/80">
        <h1 className="font-serif text-2xl font-light text-primary mb-6 uppercase tracking-wider">{policyConfig.terms.title}</h1>
        <p>{policyConfig.terms.content}</p>
        <p className="mt-4">
          All catalog details are subject to raw material commodities indexes. Custom deposits are final and processed under local arbitration acts of New York.
        </p>
      </div>
    </div>
  );
};

// ========================================================
// 404 NOT FOUND PAGE
// ========================================================
export const NotFound: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: '404 - Page Not Found',
      description: 'The requested luxury item or page could not be located in our archives.',
    });
  }, []);

  return (
    <div className="py-24 md:py-36 text-center select-none flex flex-col items-center justify-center gap-5">
      <span className="font-serif text-6xl text-gold/30 font-light">404</span>
      <div>
        <h1 className="font-serif text-lg font-medium uppercase tracking-widest text-primary">
          Creation Not Found
        </h1>
        <p className="text-xs font-sans font-light text-primary/50 max-w-xs mx-auto mt-2 leading-relaxed">
          The fine item or directory page you are looking for has been moved or does not exist in our collections.
        </p>
      </div>
      <Link to="/" className="mt-2">
        <Button variant="primary">Return to Salon</Button>
      </Link>
    </div>
  );
};
