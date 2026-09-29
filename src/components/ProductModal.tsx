import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Ruler, Truck, RefreshCw, Check, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    openChatWithPrompt
  } = useShop();

  const product = activeProductModal;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'sustainability' | 'care'>('details');

  if (!product) return null;

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const sizeObj = product.sizes.find((s) => s.size === selectedSize);
  const isOutOfStock = sizeObj ? !sizeObj.inStock : false;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-black border border-stone-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Gallery / Left Column */}
          <div className="md:col-span-6 bg-[#F4F2EE] relative p-6 sm:p-8 flex flex-col items-center justify-center min-h-[380px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[460px] w-auto object-contain transition-transform duration-300"
            />

            {product.badge && (
              <div className="absolute top-6 left-6 bg-[#141416] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                {product.badge}
              </div>
            )}

            <div className="w-full mt-6 pt-4 border-t border-stone-300/60 flex items-center justify-between text-xs text-stone-600">
              <span>{product.origin}</span>
              <span className="font-semibold tabular-nums">{product.weightGsm} GSM</span>
            </div>
          </div>

          {/* Product Details / Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Clean metadata */}
              <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-wider mb-2">
                <span>{product.collection}</span>
                <span className="text-stone-700 font-medium">Rating: {product.rating} ★ ({product.reviewCount})</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-display font-normal text-stone-950 mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mb-4">{product.subtitle}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-stone-200 mb-6">
                <span className="text-2xl font-serif-display font-medium text-stone-950 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-stone-400 ml-auto uppercase tracking-wide">
                  Taxes Included
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-stone-900 uppercase tracking-wider">Color:</span>
                  <span className="text-stone-600">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIndex(i)}
                      className={`w-7 h-7 rounded-full border transition-all ${
                        selectedColorIndex === i
                          ? 'ring-2 ring-stone-950 ring-offset-2 scale-105'
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Choose ${c.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-stone-900 uppercase tracking-wider">Size:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openChatWithPrompt(`Could you tell me more about ${product.name} and provide tailoring/sizing guidance?`)}
                      className="text-stone-600 hover:text-stone-950 underline underline-offset-2 flex items-center gap-1 text-[11px]"
                    >
                      <MessageSquare className="w-3 h-3 text-amber-700" />
                      <span>Ask Stylist (n8n)</span>
                    </button>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-stone-600 hover:text-stone-950 underline underline-offset-2 flex items-center gap-1 text-[11px]"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Size & Fit Guide</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      disabled={!s.inStock}
                      className={`py-2 text-xs font-medium uppercase tracking-wider border transition-all ${
                        selectedSize === s.size
                          ? 'bg-[#141416] text-white border-[#141416]'
                          : s.inStock
                          ? 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                          : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed line-through'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>

                {/* Stock alert */}
                <div className="mt-2 text-[11px] text-stone-500">
                  {sizeObj?.stockCount && sizeObj.stockCount <= 3 ? (
                    <span className="text-amber-700 font-medium">
                      Low stock: Only {sizeObj.stockCount} units remaining in size {selectedSize}
                    </span>
                  ) : (
                    <span>Ready for immediate atelier courier dispatch</span>
                  )}
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-stone-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-stone-600 hover:text-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-stone-600 hover:text-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Main Purchase CTA */}
                <button
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#141416] text-white hover:bg-stone-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added To Bag</span>
                    </>
                  ) : (
                    <span>Add To Bag · {formatPrice(product.price * quantity)}</span>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                  className="p-3.5 border border-stone-300 hover:border-stone-900 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      inWishlist ? 'fill-red-600 text-red-600' : 'text-stone-700'
                    }`}
                  />
                </button>
              </div>

              {/* Collapsible Tabs: Details / Sustainability / Care */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider border-b border-stone-200 pb-2 mb-3">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'details'
                        ? 'border-b-2 border-stone-950 text-stone-950 font-semibold'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Construction
                  </button>
                  <button
                    onClick={() => setActiveTab('sustainability')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'sustainability'
                        ? 'border-b-2 border-stone-950 text-stone-950 font-semibold'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Provenance
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'care'
                        ? 'border-b-2 border-stone-950 text-stone-950 font-semibold'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Garment Care
                  </button>
                </div>

                <div className="text-xs text-stone-600 leading-relaxed min-h-[90px]">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc pl-4 text-stone-600">
                      {product.details.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'sustainability' && (
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold text-stone-900">Composition: </span>
                        {product.composition}
                      </p>
                      <p>
                        <span className="font-semibold text-stone-900">Atelier Origin: </span>
                        {product.origin}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-stone-500">
                        {product.sustainabilityCertifications.map((cert) => (
                          <span key={cert} className="text-stone-700 font-medium">
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-2">
                      <p>{product.careInstructions}</p>
                      <p className="text-stone-500 italic">
                        Complimentary lifetime seam repair service at any of our flagship ateliers.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Atelier Guarantees Footer */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wider text-stone-500 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                <span>Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-stone-700" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Lifetime Seams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
