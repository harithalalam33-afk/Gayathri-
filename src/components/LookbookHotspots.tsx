import React, { useState } from 'react';
import { Plus, Eye, ShoppingBag } from 'lucide-react';
import { LOOKBOOK_CAPSULES, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Product } from '../types/clothing';

export const LookbookHotspots: React.FC = () => {
  const { setActiveProductModal, addToCart, formatPrice } = useShop();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activePin, setActivePin] = useState<string | null>(null);

  const currentLook = LOOKBOOK_CAPSULES[activeLookIndex];

  const handleOpenProduct = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setActiveProductModal(found);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      const defaultColor = found.colors[0];
      const defaultSize = found.sizes.find((s) => s.inStock)?.size || 'M';
      addToCart(found, defaultColor, defaultSize, 1);
    }
  };

  return (
    <section id="lookbook-section" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-2">
            Autumn / Winter Editorial Campaign
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-light text-stone-900">
            Capsule 04: Monolith Lookbook
          </h2>
        </div>

        {/* Look Switcher Tabs */}
        <div className="flex items-center gap-2">
          {LOOKBOOK_CAPSULES.map((look, idx) => (
            <button
              key={look.id}
              onClick={() => {
                setActiveLookIndex(idx);
                setActivePin(null);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                activeLookIndex === idx
                  ? 'bg-[#141416] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900'
              }`}
            >
              Look 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Campaign Editorial Viewport */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141416] text-white p-6 sm:p-10">
        {/* Interactive Image Frame with Hotspots */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-stone-900 group">
          <img
            src={currentLook.image}
            alt={currentLook.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95"
          />

          {/* Interactive Hotspot Pins */}
          {currentLook.hotspots.map((hotspot) => {
            const isSelected = activePin === hotspot.productId;
            return (
              <div
                key={hotspot.productId}
                className="absolute z-20"
                style={{ top: `${hotspot.top}%`, left: `${hotspot.left}%` }}
              >
                {/* Pin Circle Trigger */}
                <button
                  onClick={() => setActivePin(isSelected ? null : hotspot.productId)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-white text-stone-900 scale-125 shadow-lg'
                      : 'bg-[#141416]/85 backdrop-blur-sm text-white hover:scale-110 hover:bg-white hover:text-stone-900 border border-white/50'
                  }`}
                  aria-label={`View ${hotspot.productName}`}
                >
                  <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
                  <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-white pointer-events-none" />
                </button>

                {/* Popover Card */}
                {isSelected && (
                  <div className="absolute left-10 -top-8 w-60 bg-white text-stone-900 p-4 shadow-2xl border border-stone-200 z-30 animate-fade-in">
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                      Featured Piece
                    </div>
                    <h4 className="text-xs font-semibold text-stone-900 mb-1 leading-snug">
                      {hotspot.productName}
                    </h4>
                    <div className="text-xs font-serif-display font-medium text-stone-800 mb-3 tabular-nums">
                      {formatPrice(hotspot.price)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenProduct(hotspot.productId)}
                        className="flex-1 py-1.5 bg-[#141416] hover:bg-stone-800 text-white text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(e, hotspot.productId)}
                        className="p-1.5 border border-stone-300 hover:border-stone-900 text-stone-800 transition-colors"
                        title="Add to bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[11px] uppercase tracking-wider text-stone-300">
            Click &apos;+&apos; pins to inspect garment specs
          </div>
        </div>

        {/* Lookbook Narrative & Garment Checklist */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-2">
              Curated Silhouette
            </div>
            <h3 className="text-2xl font-serif-display font-light text-white mb-2">
              {currentLook.title}
            </h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed mb-6">
              {currentLook.subtitle}
            </p>

            <div className="space-y-3 pt-4 border-t border-stone-800">
              <span className="text-[11px] uppercase tracking-widest text-stone-400 block mb-2">
                Pieces in this look:
              </span>
              {currentLook.hotspots.map((spot) => (
                <div
                  key={spot.productId}
                  onClick={() => handleOpenProduct(spot.productId)}
                  className="flex items-center justify-between p-3 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="text-xs font-medium text-stone-100 group-hover:text-white">
                      {spot.productName}
                    </div>
                    <div className="text-[11px] text-stone-400 tabular-nums">
                      {formatPrice(spot.price)}
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Model height: 186cm · Size L</span>
            <span className="text-stone-500">Editorial Photography</span>
          </div>
        </div>
      </div>
    </section>
  );
};
