import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/clothing';
import { useShop } from '../context/ShopContext';

export const CapsuleBuilder: React.FC = () => {
  const { formatPrice, addToCart, setIsCartOpen } = useShop();

  // Filter items by slot
  const outerwearOptions = PRODUCTS.filter((p) => p.category === 'Outerwear' || p.id === 'prod-oxford-overshirt');
  const knitwearOptions = PRODUCTS.filter((p) => p.category === 'Knitwear' || (p.category === 'Shirting' && p.id !== 'prod-oxford-overshirt'));
  const bottomOptions = PRODUCTS.filter((p) => p.category === 'Trousers' || p.category === 'Denim');
  const accessoryOptions = PRODUCTS.filter((p) => p.category === 'Accessories');

  const [selectedOuter, setSelectedOuter] = useState<Product>(outerwearOptions[0]);
  const [selectedKnit, setSelectedKnit] = useState<Product>(knitwearOptions[0]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(bottomOptions[0]);
  const [selectedAccessory, setSelectedAccessory] = useState<Product>(accessoryOptions[0]);

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    [selectedOuter.id]: 'L',
    [selectedKnit.id]: 'M',
    [selectedBottom.id]: 'M',
    [selectedAccessory.id]: 'M'
  });

  const [isBundleAdded, setIsBundleAdded] = useState(false);

  const ensembleItems = [selectedOuter, selectedKnit, selectedBottom, selectedAccessory];
  const originalTotal = ensembleItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscountPercent = 15;
  const bundleSavings = Math.round((originalTotal * bundleDiscountPercent) / 100);
  const bundleTotal = originalTotal - bundleSavings;

  const handleAddEnsemble = () => {
    ensembleItems.forEach((item) => {
      const size = selectedSizes[item.id] || item.sizes[0]?.size || 'M';
      const color = item.colors[0];
      addToCart(item, color, size, 1);
    });
    setIsBundleAdded(true);
    setTimeout(() => {
      setIsBundleAdded(false);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <section id="capsule-builder-section" className="py-20 px-6 lg:px-12 bg-[#F4F2EE] border-y border-stone-200">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            <span>Interactive Wardrobe Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-light text-stone-900">
            Capsule Studio: Mix & Match
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Curate an architectural four-piece ensemble. Select your silhouette layers below to preview the cohesive palette and unlock an automatic 15% capsule bundle privilege.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Layer Selectors (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slot 1: Outerwear */}
            <div className="bg-white p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider text-stone-900">
                  Layer 01 · Outerwear & Coat
                </span>
                <span className="text-stone-500 font-serif-display text-sm">
                  {formatPrice(selectedOuter.price)}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {outerwearOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedOuter(item);
                      if (!selectedSizes[item.id]) {
                        setSelectedSizes((prev) => ({ ...prev, [item.id]: 'L' }));
                      }
                    }}
                    className={`p-3 text-left border transition-all ${
                      selectedOuter.id === item.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-stone-900 line-clamp-1">{item.name}</div>
                    <div className="text-[11px] text-stone-500">{item.weightGsm} GSM · {formatPrice(item.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 2: Knitwear & Top */}
            <div className="bg-white p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider text-stone-900">
                  Layer 02 · Knitwear & Base
                </span>
                <span className="text-stone-500 font-serif-display text-sm">
                  {formatPrice(selectedKnit.price)}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {knitwearOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedKnit(item);
                      if (!selectedSizes[item.id]) {
                        setSelectedSizes((prev) => ({ ...prev, [item.id]: 'M' }));
                      }
                    }}
                    className={`p-3 text-left border transition-all ${
                      selectedKnit.id === item.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-stone-900 line-clamp-1">{item.name}</div>
                    <div className="text-[11px] text-stone-500">{item.weightGsm} GSM · {formatPrice(item.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 3: Trousers & Denim */}
            <div className="bg-white p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider text-stone-900">
                  Layer 03 · Trousers & Denim
                </span>
                <span className="text-stone-500 font-serif-display text-sm">
                  {formatPrice(selectedBottom.price)}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bottomOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedBottom(item);
                      if (!selectedSizes[item.id]) {
                        setSelectedSizes((prev) => ({ ...prev, [item.id]: 'M' }));
                      }
                    }}
                    className={`p-3 text-left border transition-all ${
                      selectedBottom.id === item.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-stone-900 line-clamp-1">{item.name}</div>
                    <div className="text-[11px] text-stone-500">{item.weightGsm} GSM · {formatPrice(item.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 4: Artisanal Accessory */}
            <div className="bg-white p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider text-stone-900">
                  Layer 04 · Accent & Leather
                </span>
                <span className="text-stone-500 font-serif-display text-sm">
                  {formatPrice(selectedAccessory.price)}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {accessoryOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedAccessory(item);
                      if (!selectedSizes[item.id]) {
                        setSelectedSizes((prev) => ({ ...prev, [item.id]: 'M' }));
                      }
                    }}
                    className={`p-3 text-left border transition-all ${
                      selectedAccessory.id === item.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-stone-900 line-clamp-1">{item.name}</div>
                    <div className="text-[11px] text-stone-500">{formatPrice(item.price)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Curated Ensemble Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 bg-[#141416] text-white p-6 sm:p-8 border border-stone-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-stone-400 block">Curated Palette</span>
                <h3 className="font-serif-display text-2xl text-white">4-Piece Ensemble</h3>
              </div>
              <div className="bg-amber-900/60 border border-amber-700/60 text-amber-300 text-[10px] uppercase tracking-wider px-2.5 py-1 font-semibold">
                -15% Bundle Privilege
              </div>
            </div>

            {/* Itemized Mini List */}
            <div className="space-y-4 mb-6 text-xs text-stone-300">
              {ensembleItems.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-stone-800/60">
                  <div className="flex items-center gap-3">
                    <span className="text-stone-500 text-[10px] tabular-nums font-mono">0{idx + 1}</span>
                    <span className="font-medium text-stone-200">{item.name}</span>
                  </div>
                  <span className="text-stone-400 tabular-nums">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            {/* Pricing Math */}
            <div className="space-y-2 pt-2 border-t border-stone-800 text-xs mb-6">
              <div className="flex justify-between text-stone-400">
                <span>Individual Retail Total:</span>
                <span className="line-through tabular-nums">{formatPrice(originalTotal)}</span>
              </div>
              <div className="flex justify-between text-amber-400 font-medium">
                <span>Capsule Ensemble Savings (15%):</span>
                <span className="tabular-nums">-{formatPrice(bundleSavings)}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-serif-display font-medium text-white pt-2 border-t border-stone-800">
                <span>Complete Capsule Total:</span>
                <span className="tabular-nums">{formatPrice(bundleTotal)}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAddEnsemble}
              disabled={isBundleAdded}
              className={`w-full py-4 text-xs uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-3 ${
                isBundleAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-[#141416] hover:bg-stone-200'
              }`}
            >
              {isBundleAdded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Ensemble Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete Capsule ({formatPrice(bundleTotal)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-stone-400 text-center mt-3">
              Includes complimentary carbon-neutral courier delivery and garment care covers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
