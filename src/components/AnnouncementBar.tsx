import React, { useState } from 'react';
import { X, Globe } from 'lucide-react';
import { useShop, Currency } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { currency, setCurrency, freeShippingThreshold, formatPrice } = useShop();

  if (!isVisible) return null;

  return (
    <div className="h-10 bg-[#161618] text-[#E6E4DF] text-xs font-medium tracking-wide flex items-center justify-between px-4 sm:px-8 border-b border-stone-800 transition-all select-none">
      <div className="hidden sm:flex items-center gap-2 text-stone-400">
        <Globe className="w-3.5 h-3.5 text-stone-400" />
        <span>Worldwide Atelier Dispatch</span>
      </div>

      <div className="flex-1 text-center truncate px-2">
        <span className="text-stone-200">
          Complimentary express delivery on orders over {formatPrice(freeShippingThreshold)}
        </span>
        <span className="mx-2 text-stone-600">·</span>
        <span className="text-stone-400 hidden md:inline">Autumn Capsule 04 Available in Small Batches</span>
      </div>

      <div className="flex items-center gap-4 text-stone-400">
        <div className="flex items-center gap-1.5">
          {(['USD', 'EUR', 'GBP'] as Currency[]).map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-1.5 py-0.5 text-[11px] transition-colors ${
                currency === cur
                  ? 'text-white font-semibold underline underline-offset-2'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title={`Switch currency to ${cur}`}
            >
              {cur}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
