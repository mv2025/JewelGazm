import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JewelgazmLogo from '@/assets/frt-logo.webp';

// ── Social Icon SVGs ──────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.821 1.452 5.486 0 9.95-4.46 9.954-9.948 0-2.66-1.033-5.16-2.91-7.04C16.634 1.77 14.137.743 11.486.743c-5.491 0-9.957 4.463-9.961 9.95-.001 1.83.479 3.618 1.393 5.187L1.83 22.03l6.326-1.659-.51.303zm10.222-3.822c-.272-.136-1.614-.797-1.863-.888-.249-.09-.43-.136-.61.136-.18.272-.7 1.136-.856 1.32-.156.18-.312.2-.584.065-2.222-1.11-3.664-2.045-4.834-4.055-.308-.528.308-.49.882-1.636.096-.18.047-.34-.023-.477-.07-.136-.61-1.472-.836-2.018-.22-.528-.46-.456-.63-.456-.164-.005-.353-.005-.543-.005-.19 0-.5.07-.762.353-.263.284-1.005.983-1.005 2.398 0 1.415 1.03 2.784 1.173 2.976.143.19 2.028 3.098 4.912 4.343.686.296 1.22.473 1.637.605.69.22 1.317.189 1.815.115.553-.083 1.614-.66 1.842-1.296.226-.637.226-1.182.158-1.296-.068-.115-.248-.18-.52-.316z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.211-.174.263-.403.156-1.503-.699-2.443-2.9-2.443-4.661 0-3.794 2.753-7.277 7.946-7.277 4.173 0 7.414 2.974 7.414 6.953 0 4.148-2.621 7.486-6.262 7.486-1.226 0-2.378-.637-2.773-1.387l-.756 2.879c-.273 1.055-.999 2.373-1.488 3.17 1.125.337 2.316.516 3.54.516 6.621 0 11.983-5.37 11.983-11.985C24.007 5.368 18.64 0 12.017 0z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
  </svg>
);

// ── Footer link groups ────────────────────────────────────────────────────────
const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Gold', href: '/collections/gold' },
      { label: 'Silver', href: '/collections/silver' },
      { label: 'Gents Rings', href: '/collections/gents-rings' },
      { label: 'Ladies Rings', href: '/collections/ladies-rings' },
      { label: 'Bracelets', href: '/collections/bracelets' },
      { label: 'Kada', href: '/collections/kada' },
    ],
  },
  {
    heading: 'Customer Care',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Return & Exchange', href: '/returns' },
      { label: 'Care Guide', href: '/care-guide' },
      { label: 'Store Locator', href: '/store-locator' },
      { label: 'Contact Concierge', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Heritage', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const SOCIAL_LINKS = [
  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/',        label: 'WhatsApp'  },
  { Icon: YouTubeIcon,   href: 'https://youtube.com',   label: 'YouTube'   },
  { Icon: PinterestIcon, href: 'https://pinterest.com', label: 'Pinterest' },
  { Icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook'  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-background border-t border-[#E8E0D5] select-none">

      {/* ── Top accent stripe ─────────────────────────────────────────── */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent opacity-30" />

      {/* ── Main body ──────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-6 md:px-12 pt-16 pb-10">

        {/* Row 1: Logo + tagline | Link columns | Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-10 pb-12 border-b border-[#E8E0D5]">

          {/* ── Brand column ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="inline-block">
              <img
                src={JewelgazmLogo}
                alt="Jewelgazm"
                className="h-32 md:h-36 w-auto object-contain"
              />
            </Link>
            <p className="font-sans text-[12px] font-light leading-relaxed text-[#6B5B4E] max-w-[220px]">
              Exceptional fine jewellery handcrafted for those who treasure beauty, legacy, and brilliance.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-[#D9D0C7] hover:border-[var(--theme-primary)] text-[#7A6A5E] hover:text-[var(--theme-primary)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--theme-primary)]/5"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                {/* Column heading */}
                <span className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--theme-primary)]">
                  {group.heading}
                </span>
                {/* Underline ornament */}
                <div className="h-px w-8 bg-[var(--theme-accent-light)] -mt-2" />
                {/* Links */}
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="font-sans text-[12px] font-light text-[#5A4D43] hover:text-[var(--theme-primary)] transition-colors duration-200 tracking-wide"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>


        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="font-sans text-[10px] font-light tracking-wide text-[#9E8E82]">
            © 2026 Jewelgazm. All Rights Reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Return Policy', href: '/returns' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <Link
                  to={item.href}
                  className="font-sans text-[10px] font-light text-[#9E8E82] hover:text-[var(--theme-primary)] transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-[#D9D0C7] text-[10px]">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Crafted badge */}
          <p className="font-sans text-[10px] font-light tracking-wide text-[#9E8E82] italic">
            Crafted with ♥ for every occasion
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
