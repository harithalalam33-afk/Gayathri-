import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveProductModal, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.composition.toLowerCase().includes(q) ||
          item.origin.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (product: typeof PRODUCTS[0]) => {
    setIsSearchOpen(false);
    setActiveProductModal(product);
  };

  const popularTags = ['Melton Wool', 'Cashmere', 'Kurabo Selvedge', 'Trousers', 'Heavyweight Tee'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search garments, textiles, weights, or collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-stone-400 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="p-3 hover:bg-stone-50 flex items-center justify-between cursor-pointer border border-transparent hover:border-stone-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover bg-stone-100"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900">{item.name}</div>
                      <div className="text-[11px] text-stone-500">
                        {item.category} · {item.origin.split(' ')[2]} · {item.weightGsm} GSM
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-900 tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-stone-500">
                No garments found matching &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
