import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, Heart, ShoppingBag, MapPin, User,
  ChevronDown, Menu, Store,
} from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';
import { useSearch } from '@/providers/SearchProvider';
import { useAuth } from '@/providers/AuthProvider';
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

export const Header: React.FC = () => {
  const location = useLocation();
  const { cart, setCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { setSearchOpen } = useSearch();
  const { user } = useAuth();

  const [isScrolled, setIsScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [activeMegaMenuIdx, setActiveMegaMenuIdx] = useState<number | null>(null);
  const [pincodeOpen, setPincodeOpen]         = useState(false);
  const [pincode, setPincode]                 = useState('');
  const pincodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
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

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;
  const textColorClass = isTransparent ? "text-[#C0C0C0]" : "text-[var(--theme-primary)]";
  const mutedTextColorClass = isTransparent ? "text-[#C0C0C0]/80" : "text-[var(--theme-primary)]/70";
  const borderColorClass = isTransparent ? "border-[#C0C0C0]/20" : "border-[#E8E0D5]";
  const hoverBgClass = isTransparent ? "hover:bg-[#C0C0C0]/10" : "hover:bg-[var(--theme-primary)]/5";

  let headerPositionClass = '';
  if (isHomePage) {
    headerPositionClass = isScrolled ? 'fixed top-0 left-0' : 'absolute top-0 left-0';
  } else {
    headerPositionClass = 'sticky top-0';
  }

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className={cn(
          'w-full z-50 transition-all duration-300 select-none',
          headerPositionClass,
          isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
        )}
      >
        {/* ── ROW 1: Utility Bar ── */}
        <div className={cn(
          "w-full transition-all duration-500 grid",
          isScrolled ? "grid-rows-[0fr] opacity-0 border-transparent" : "grid-rows-[1fr] opacity-100 border-b " + borderColorClass
        )}>
          <div className="overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-screen-xl flex justify-between items-center py-3 md:py-4">
              
              {/* Left: Logo, Stores / Pincode */}
              <div className="flex items-center gap-4 lg:gap-6 flex-1">
                {/* Mini Logo */}
                <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                  <img
                    src={logoHeader}
                    alt="Jewelgazm Logo Mini"
                    className={cn(
                      "w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                      isScrolled ? "h-10 md:h-12" : "h-16 md:h-20"
                    )}
                  />
                </Link>

                <Link to="/stores" className={cn("flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors hover:opacity-70 hidden sm:flex", textColorClass)}>
                  <Store className="w-3.5 h-3.5" />
                  <span>Stores</span>
                </Link>
                <div ref={pincodeRef} className="relative hidden md:block">
                  <button
                    onClick={() => setPincodeOpen(v => !v)}
                    className={cn("flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors hover:opacity-70", textColorClass)}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{pincode || 'Pincode'}</span>
                    <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', pincodeOpen && 'rotate-180')} />
                  </button>

                  {pincodeOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E8E0D5] rounded-xl shadow-xl z-50 p-4 text-[var(--theme-primary)]">
                      <p className="font-sans text-xs font-semibold mb-2 tracking-wide">Enter Delivery Pincode</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="e.g. 400001"
                          value={pincode}
                          onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                          className="flex-1 px-3 py-2 text-sm border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[var(--theme-primary)] font-sans"
                        />
                        <button
                          onClick={() => setPincodeOpen(false)}
                          className="px-3 py-2 bg-[var(--theme-primary)] text-white text-xs font-semibold rounded-lg hover:bg-[#3a0b13] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Center: Announcement */}
              <div className="flex-1 text-center hidden md:block">
                <p className={cn("text-[9px] font-sans font-medium tracking-[0.25em] uppercase", textColorClass)}>
                  Complimentary Insured Shipping over ₹5,000
                </p>
              </div>

              {/* Right: Account & Wishlist */}
              <div className="flex items-center justify-end gap-6 flex-1">
                {user ? (
                  <Link to="/account" className={cn("flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors hover:opacity-70", textColorClass)}>
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                  </Link>
                ) : (
                  <Link to="/login" className={cn("flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors hover:opacity-70", textColorClass)}>
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                )}
                <Link to="/wishlist" className={cn("flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors hover:opacity-70", textColorClass)}>
                  <div className="relative">
                    <Heart className="w-3.5 h-3.5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ── ROW 2: Brand Identity (Logo) ── */}
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl py-3 md:py-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={cn("lg:hidden p-1.5 rounded-full transition-colors", textColorClass, hoverBgClass)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-widest uppercase font-light text-[var(--theme-accent)] drop-shadow-md">
                Jewelgazm
              </h1>
            </Link>
          </div>

          {/* Spacer to keep logo perfectly centered when mobile menu button takes space on the left */}
          <div className="w-8 lg:hidden"></div>
        </div>

        {/* ── ROW 3: Navigation & Primary Actions ── */}
        <div
          className={cn(
            "hidden lg:flex items-center justify-between container mx-auto px-6 max-w-screen-xl relative transition-all duration-300 origin-top pb-3"
          )}
          onMouseLeave={() => setActiveMegaMenuIdx(null)}
        >
          {/* Main Navigation Links */}
          <nav className="flex-1 flex justify-center gap-10" aria-label="Main navigation">
            {(navData as NavLinkItem[]).map((item, idx) => {
              const hasMega  = item.megaMenu && item.megaMenu.length > 0;
              const isActive = activeMegaMenuIdx === idx;
              return (
                <div
                  key={idx}
                  className="relative pb-2"
                  onMouseEnter={() => hasMega && setActiveMegaMenuIdx(idx)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 block',
                      isActive ? textColorClass : mutedTextColorClass,
                      'hover:text-current'
                    )}
                  >
                    {item.label}
                  </Link>
                  <span className={cn(
                    'absolute bottom-0 left-0 right-0 h-[1.5px] transition-transform duration-200 origin-center',
                    isTransparent ? 'bg-white' : 'bg-[var(--theme-primary)]',
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  )} />
                </div>
              );
            })}
          </nav>

          {/* Search & Cart (Right aligned within Row 3) */}
          <div className="absolute right-6 top-0 flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn("p-2 rounded-full transition-colors", textColorClass, hoverBgClass)}
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={cn("relative p-2 rounded-full transition-colors", textColorClass, hoverBgClass)}
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className={cn(
                  "absolute top-0 right-0 w-4 h-4 text-[9px] flex items-center justify-center rounded-full font-sans font-bold",
                  isTransparent ? "bg-[var(--theme-accent)] text-[var(--theme-primary)]" : "bg-[var(--theme-primary)] text-white"
                )}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mega Menu Dropdown */}
          {activeMegaMenuIdx !== null &&
            (navData as NavLinkItem[])[activeMegaMenuIdx]?.megaMenu?.length && (
              <div className="absolute top-full left-0 w-full pt-2">
                <MegaMenu
                  columns={(navData as NavLinkItem[])[activeMegaMenuIdx].megaMenu!}
                  onClose={() => setActiveMegaMenuIdx(null)}
                />
              </div>
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
                className="font-sans text-sm font-semibold tracking-widest uppercase text-[var(--theme-primary)] hover:text-[var(--theme-accent-light)] transition-colors"
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
                      className="font-sans text-xs text-[var(--theme-primary)]/65 hover:text-[var(--theme-primary)] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="h-px bg-[#E8E0D5]/60 my-2" />

          <div className="flex flex-col gap-4">
            <Link
              to="/account"
              className="font-sans text-xs font-semibold tracking-widest uppercase text-[var(--theme-primary)]/80 hover:text-[var(--theme-accent-light)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/stores"
              className="font-sans text-xs font-semibold tracking-widest uppercase text-[var(--theme-primary)]/80 hover:text-[var(--theme-accent-light)] transition-colors"
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