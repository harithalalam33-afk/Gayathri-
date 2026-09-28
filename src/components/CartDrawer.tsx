import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    formatPrice,
    setIsCheckoutOpen,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    setActiveProductModal
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <h3 className="font-serif-display text-xl text-stone-900 font-medium">
                  Atelier Shopping Bag
                </h3>
                <span className="text-xs text-stone-500 tabular-nums">({cartCount})</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <div className="flex justify-between text-xs text-stone-600 mb-1.5">
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-stone-900 tabular-nums">{formatPrice(remainingForFreeShipping)}</strong> more for complimentary courier delivery
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    ✓ Unlocked complimentary express worldwide delivery
                  </span>
                )}
                <span className="tabular-nums font-semibold text-stone-700">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display text-xl text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our small-batch architectural garments or curations from the capsule studio.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-stone-100 last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      setActiveProductModal(item.product);
                    }}
                    className="w-20 h-24 bg-stone-100 shrink-0 cursor-pointer overflow-hidden border border-stone-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            setActiveProductModal(item.product);
                          }}
                          className="text-xs font-semibold text-stone-900 hover:text-stone-600 cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span>Size: <strong className="text-stone-700">{item.size}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price in tabular-nums */}
                      <span className="text-xs sm:text-sm font-semibold text-stone-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      <span>{appliedPromo.code} ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-500 hover:text-black underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege code (try ATELIER10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 focus:border-stone-900 focus:outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 text-white hover:bg-stone-950 text-xs uppercase tracking-wider font-semibold"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p className={`text-[11px] mt-1 ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Gift Wrap / Note Toggle */}
              <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-0"
                />
                <Gift className="w-3.5 h-3.5 text-stone-500" />
                <span>Complimentary gift wrapping & handwritten calligraphed card</span>
              </label>

              {/* Totals Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700 font-medium">
                    <span>Privilege Savings</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Carbon-Neutral Dispatch</span>
                  <span className="tabular-nums">
                    {remainingForFreeShipping === 0 ? 'Complimentary' : formatPrice(20)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif-display font-medium text-stone-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">
                    {formatPrice(finalTotal + (remainingForFreeShipping === 0 ? 0 : 20))}
                  </span>
                </div>
              </div>

              {/* Main Checkout Trigger */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#141416] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed To Atelier Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Encrypted 256-Bit Atelier Transaction</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
