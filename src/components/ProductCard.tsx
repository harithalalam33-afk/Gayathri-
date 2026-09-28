import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types/clothing';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveProductModal
  } = useShop();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAddedQuickly, setIsAddedQuickly] = useState(false);
  const [imageError, setImageError] = useState(false);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);

  // Default available size
  const defaultSize = product.sizes.find((s) => s.inStock)?.size || 'M';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, defaultSize, 1);
    setIsAddedQuickly(true);
    setTimeout(() => setIsAddedQuickly(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className="group cursor-pointer flex flex-col bg-white border border-stone-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300"
    >
      {/* Visual Image Presentation (65-75% height) */}
      <div className="relative aspect-[4/5] bg-[#F4F2EE] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${product.fallbackTone} flex items-center justify-center p-6 text-center text-white/80`}>
            <span className="font-serif-display text-lg tracking-wide">{product.name}</span>
          </div>
        )}

        {/* Subtle non-pill metadata tag if present */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#141416]/90 backdrop-blur-sm text-stone-100 text-[10px] uppercase tracking-widest px-2.5 py-1">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-red-600 transition-colors shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              inWishlist ? 'fill-red-600 text-red-600' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Quick View & Quick Add Overlays on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 bg-[#141416] hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md"
            title="Quick add to bag in standard size"
          >
            {isAddedQuickly ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="w-10 h-9 bg-white/95 text-stone-800 hover:text-black hover:bg-white flex items-center justify-center transition-colors shadow-md"
            title="Open garment details"
            aria-label="View garment details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Hierarchy */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Quiet, unboxed text metadata with subtle typographic separators */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin.split(' ')[2] || 'Europe'}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{product.weightGsm} GSM</span>
          </div>

          <h3 className="text-sm sm:text-base font-medium text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom row: Swatches & Tabular Price */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          {/* Color swatch buttons */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-stone-900 ring-offset-1 border-stone-400 scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={`${color.name}`}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-stone-400 uppercase tracking-tight ml-1 hidden sm:inline">
              {selectedColor.name.split(' ')[0]}
            </span>
          </div>

          {/* Tabular numbers for price alignment */}
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-semibold text-stone-950 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
