import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, Heart, ShoppingBag, MapPin, User,
  ChevronDown, Menu, Store,
} from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';
import { useSearch } from '@/providers/SearchProvider';
import { Drawer } from '@/components/ui/Drawer';
import { MegaMenu } from './MegaMenu';
import navData from '@/content/navigation.json';
import { cn } from '@/utils/cn';

import logoHeader from '@/assets/frt-logo.webp';

interface NavLinkItem {
  label: string;
  href: string;
  megaMenu?: { title: string; links: { label: string; href: string }[] }[];
}

/**
 * Jewelgasm Premium Header
 * Row 1 — Logo · Pincode · Search bar · Labeled icon actions (Stays Sticky)
 * Row 2 — Desktop navigation links (Hides smoothly on Scroll)
 */
export const Header: React.FC = () => {
  const location = useLocation();
  const { cart, setCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { setSearchOpen } = useSearch();

  const [isScrolled, setIsScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [activeMegaMenuIdx, setActiveMegaMenuIdx] = useState<number | null>(null);
  const [pincodeOpen, setPincodeOpen]         = useState(false);
  const [pincode, setPincode]                 = useState('');
  const [searchQuery, setSearchQuery]         = useState('');
  const pincodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenuIdx(null);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pincodeRef.current && !pincodeRef.current.contains(e.target as Node)) {
        setPincodeOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cartCount     = cart?.totalQuantity || 0;
  const wishlistCount = wishlist.length;

  const ACTION_ICONS = [
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      onClick: () => setSearchOpen(true),
      href: undefined,
      badge: 0,
    },
    {
      id: 'stores',
      icon: Store,
      label: 'Stores',
      href: '/stores',
      onClick: undefined,
      badge: 0,
    },
    {
      id: 'account',
      icon: User,
      label: 'Account',
      href: '/account',
      onClick: undefined,
      badge: 0,
    },
    {
      id: 'wishlist',
      icon: Heart,
      label: 'Wishlist',
      href: '/wishlist',
      onClick: undefined,
      badge: wishlistCount,
    },
    {
      id: 'cart',
      icon: ShoppingBag,
      label: 'Cart',
      href: undefined,
      onClick: () => setCartOpen(true),
      badge: cartCount,
    },
  ];

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="w-full bg-[#4A0E17] text-white py-2 text-center z-50 relative select-none">
        <p className="text-[9px] font-sans font-medium tracking-[0.25em] uppercase">
          Complimentary Insured Shipping &amp; Free Sizing on All Orders above ₹5,000
        </p>
      </div>

      {/* ── Main Header ── */}
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-white border-b border-[#E8E0D5] select-none transition-shadow duration-300 block',
          isScrolled && 'shadow-md'
        )}
      >
        {/* ── Row 1: Logo | Pincode / Search / Icons ── */}
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="flex items-center gap-0 py-0">

            {/* ── Logo Column ── */}
            <div className="flex items-center justify-center shrink-0 pr-6 py-1 border-r border-[#E8E0D5]">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 mr-2 text-[#4A0E17] hover:bg-[#4A0E17]/5 rounded-full transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="flex items-center">
                <img
                  src={logoHeader}
                  alt="Jewelgasm"
                  className={cn(
                    "w-auto object-contain hover:scale-[1.03] transition-all duration-300 block",
                    isScrolled ? "h-14 md:h-16" : "h-20 md:h-24"
                  )}
                />
              </Link>
            </div>

            {/* ── Right section: Pincode / Search / Icons ── */}
            <div className="flex flex-1 items-center gap-4 pl-6 py-1">

              {/* Pincode Selector */}
              <div ref={pincodeRef} className="relative hidden md:block shrink-0">
                <button
                  onClick={() => setPincodeOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 border border-[#E8E0D5] rounded-lg hover:border-[#4A0E17]/40 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#4A0E17] shrink-0" />
                  <div className="text-left">
                    <p className="text-[8px] font-sans font-medium tracking-[0.15em] uppercase text-[#4A0E17]/50">
                      Where to deliver?
                    </p>
                    <p className="text-[11px] font-sans font-semibold text-[#4A0E17] leading-tight whitespace-nowrap">
                      {pincode || 'Update Delivery Pincode'}
                    </p>
                  </div>
                  <ChevronDown className={cn('w-3.5 h-3.5 text-[#4A0E17]/50 transition-transform duration-200', pincodeOpen && 'rotate-180')} />
                </button>

                {/* Pincode popover */}
                {pincodeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-78 bg-white border border-[#E8E0D5] rounded-xl shadow-xl z-50 p-4">
                    <p className="font-sans text-xs font-semibold text-[#4A0E17] mb-2 tracking-wide">
                      Enter Delivery Pincode
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 400001"
                        value={pincode}
                        onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 px-3 py-2 text-sm border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#4A0E17] font-sans text-[#4A0E17]"
                      />
                      <button
                        onClick={() => setPincodeOpen(false)}
                        className="px-3 py-2 bg-[#4A0E17] text-white text-xs font-semibold rounded-lg hover:bg-[#3a0b13] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-auto hidden sm:block">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search Rings, Necklaces, Bracelets…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E0D5] rounded-full text-sm font-sans text-[#4A0E17] placeholder-[#4A0E17]/40 focus:outline-none focus:border-[#4A0E17]/60 focus:bg-white transition-all duration-200"
                  />
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="absolute right-3 text-[#4A0E17]/50 hover:text-[#4A0E17] transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 md:gap-2 ml-auto lg:ml-0">
                {ACTION_ICONS.map(action => {
                  const Icon = action.icon;
                  const isMobileHidden = action.id === 'stores' || action.id === 'account';
                  const inner = (
                    <div className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-[#4A0E17]/5 transition-colors group cursor-pointer">
                      <div className="relative">
                        <Icon className="w-5 h-5 text-[#4A0E17] group-hover:text-[#4A0E17] stroke-[1.5]" />
                        {action.badge > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#4A0E17] text-white text-[8px] flex items-center justify-center rounded-full font-sans font-bold">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <span className="hidden lg:block text-[8px] font-sans font-semibold tracking-[0.12em] uppercase text-[#4A0E17]/70 group-hover:text-[#4A0E17] transition-colors leading-none">
                        {action.label}
                      </span>
                    </div>
                  );

                  if (action.onClick) {
                    return (
                      <button key={action.id} onClick={action.onClick} aria-label={action.label} className={cn(isMobileHidden && "hidden sm:block")}>
                        {inner}
                      </button>
                    );
                  }
                  return (
                    <Link key={action.id} to={action.href!} aria-label={action.label} className={cn(isMobileHidden && "hidden sm:block")}>
                      {inner}
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* ── Row 2: Desktop Nav Links (Fixed Dropdown Clip Bug) ── */}
        <div
          className={cn(
            "hidden lg:block border-t border-[#E8E0D5]/60 relative transition-all duration-300 ease-in-out origin-top block pb-0",
            /* FIXED: overflow-hidden is now ONLY applied on scroll so the dropdown box can freely render outside the navbar */
            isScrolled ? "max-h-0 opacity-0 border-t-0 pointer-events-none overflow-hidden" : "max-h-20 opacity-100 overflow-visible"
          )}
          onMouseLeave={() => setActiveMegaMenuIdx(null)}
        >
          <div className="container mx-auto px-10 max-w-screen-xl">
            <nav className="flex items-center justify-center gap-8 pt-4 pb-5" aria-label="Main navigation">
              {(navData as NavLinkItem[]).map((item, idx) => {
                const hasMega  = item.megaMenu && item.megaMenu.length > 0;
                const isActive = activeMegaMenuIdx === idx;
                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => hasMega && setActiveMegaMenuIdx(idx)}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        'font-sans text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[#4A0E17] block',
                        isActive ? 'text-[#4A0E17]' : 'text-[#4A0E17]/65'
                      )}
                    >
                      {item.label}
                    </Link>
                    <span className={cn(
                      'absolute -bottom-[20px] left-0 right-0 h-[2px] bg-[#4A0E17] transition-transform duration-200 origin-center',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )} />
                  </div>
                );
              })}
            </nav>
          </div>

          {activeMegaMenuIdx !== null &&
            (navData as NavLinkItem[])[activeMegaMenuIdx]?.megaMenu?.length && (
              <MegaMenu
                columns={(navData as NavLinkItem[])[activeMegaMenuIdx].megaMenu!}
                onClose={() => setActiveMegaMenuIdx(null)}
              />
          )}
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <Drawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Menu" side="left">
        <nav className="flex flex-col gap-5 pb-8" aria-label="Mobile Navigation">
          {(navData as NavLinkItem[]).map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <Link
                to={item.href}
                className="font-sans text-sm font-semibold tracking-widest uppercase text-[#4A0E17] hover:text-[#C9A96E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.megaMenu && (
                <div className="flex flex-col gap-1.5 pl-4 border-l border-[#E8E0D5]">
                  {item.megaMenu.flatMap(c => c.links).map((link, li) => (
                    <Link
                      key={li}
                      to={link.href}
                      className="font-sans text-xs text-[#4A0E17]/65 hover:text-[#4A0E17] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Divider */}
          <div className="h-px bg-[#E8E0D5]/60 my-2" />

          {/* Account and Stores Links */}
          <div className="flex flex-col gap-4">
            <Link
              to="/account"
              className="font-sans text-xs font-semibold tracking-widest uppercase text-[#4A0E17]/80 hover:text-[#C9A96E] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/stores"
              className="font-sans text-xs font-semibold tracking-widest uppercase text-[#4A0E17]/80 hover:text-[#C9A96E] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Stores
            </Link>
          </div>
        </nav>
      </Drawer>
    </>
  );
};

export default Header;