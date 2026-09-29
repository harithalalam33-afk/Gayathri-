import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, PackageCheck, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsOrderTrackerOpen,
    setIsChatOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="#"
            className="text-xl sm:text-2xl font-serif-display font-medium tracking-[0.2em] text-[#141416] hover:opacity-85 transition-opacity uppercase whitespace-nowrap"
          >
            Atelier Vèrse
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-medium text-stone-600">
          <button
            onClick={() => scrollTo('collection-section')}
            className="hover:text-stone-950 transition-colors hover:underline underline-offset-8 decoration-stone-400"
          >
            Collection
          </button>
          <button
            onClick={() => scrollTo('lookbook-section')}
            className="hover:text-stone-950 transition-colors hover:underline underline-offset-8 decoration-stone-400"
          >
            Lookbook
          </button>
          <button
            onClick={() => scrollTo('capsule-builder-section')}
            className="hover:text-stone-950 transition-colors hover:underline underline-offset-8 decoration-stone-400"
          >
            Capsule Studio
          </button>
          <button
            onClick={() => scrollTo('atelier-story-section')}
            className="hover:text-stone-950 transition-colors hover:underline underline-offset-8 decoration-stone-400"
          >
            Craft & Story
          </button>
          <button
            onClick={() => scrollTo('flagships-section')}
            className="hover:text-stone-950 transition-colors hover:underline underline-offset-8 decoration-stone-400"
          >
            Flagship Ateliers
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-stone-700">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1 hover:text-stone-950 transition-colors text-xs flex items-center gap-1.5"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline uppercase text-[11px] tracking-wider text-stone-500 font-medium">Search</span>
          </button>

          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="p-1 hover:text-stone-950 transition-colors text-xs flex items-center gap-1.5"
            aria-label="Track order"
            title="Track existing shipment"
          >
            <PackageCheck className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden md:inline uppercase text-[11px] tracking-wider text-stone-500 font-medium">Tracking</span>
          </button>

          <button
            onClick={() => setIsChatOpen(true)}
            className="p-1 hover:text-stone-950 transition-colors text-xs flex items-center gap-1.5"
            aria-label="Ask Atelier Concierge"
            title="Open Atelier Concierge Chat"
          >
            <MessageSquare className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden lg:inline uppercase text-[11px] tracking-wider text-stone-500 font-medium">Concierge</span>
          </button>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-1 hover:text-stone-950 transition-colors relative"
            aria-label="Saved wishlist"
          >
            <Heart className="w-4 h-4 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-stone-800 text-stone-100 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#141416] text-[#FBFBFA] hover:bg-stone-800 transition-colors rounded-sm text-xs font-medium tracking-wider whitespace-nowrap"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span>Bag</span>
            <span className="text-stone-300 font-normal">/</span>
            <span className="tabular-nums font-semibold">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FBFBFA] px-6 py-6 space-y-4 text-sm tracking-wider uppercase font-medium text-stone-700">
          <button
            onClick={() => scrollTo('collection-section')}
            className="block w-full text-left py-2 hover:text-stone-950"
          >
            Collection
          </button>
          <button
            onClick={() => scrollTo('lookbook-section')}
            className="block w-full text-left py-2 hover:text-stone-950"
          >
            Editorial Lookbook
          </button>
          <button
            onClick={() => scrollTo('capsule-builder-section')}
            className="block w-full text-left py-2 hover:text-stone-950"
          >
            Capsule Studio (Mix & Match)
          </button>
          <button
            onClick={() => scrollTo('atelier-story-section')}
            className="block w-full text-left py-2 hover:text-stone-950"
          >
            Artisanal Craft & Transparency
          </button>
          <button
            onClick={() => scrollTo('flagships-section')}
            className="block w-full text-left py-2 hover:text-stone-950"
          >
            Flagship Boutiques
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsChatOpen(true);
            }}
            className="block w-full text-left py-2 text-stone-950 font-semibold flex items-center justify-between border-t border-stone-200 mt-2 pt-3"
          >
            <span>Live Atelier Concierge (n8n)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      )}
    </header>
  );
};
