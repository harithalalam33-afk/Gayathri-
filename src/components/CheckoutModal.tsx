import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Truck, CreditCard, Sparkles, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types/clothing';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    discountAmount,
    freeShippingThreshold,
    formatPrice,
    addOrderToHistory,
    setIsOrderTrackerOpen
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const isFreeShip = cartSubtotal >= freeShippingThreshold;
  const shippingCost = shippingMethod === 'standard' ? (isFreeShip ? 0 : 20) : 35;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount) + shippingCost;

  const handleFillDemo = () => {
    setFormData({
      fullName: 'Genevieve Laurent',
      email: 'genevieve.laurent@studio-paris.fr',
      phone: '+33 6 42 90 18 22',
      address: '14 Rue de Bretagne, 4ème étage',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75003',
      country: 'France'
    });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `AV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: cart.map((c) => ({
        name: c.product.name,
        color: c.color.name,
        size: c.size,
        quantity: c.quantity,
        price: c.product.price,
        image: c.product.image
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: finalTotal,
      shippingMethod:
        shippingMethod === 'standard'
          ? 'Standard Eco Courier (Carbon-Neutral)'
          : 'DHL Express Climate-Conscious Air',
      status: 'Confirmed',
      carrier: 'DHL Express Atelier Fleet',
      trackingNumber: `DHL-${orderId}-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      shippingAddress: {
        fullName: formData.fullName || 'Collector',
        address: formData.address || '14 Rue de Bretagne',
        city: formData.city || 'Paris',
        state: formData.state || 'Paris',
        postalCode: formData.postalCode || '75003',
        country: formData.country || 'France'
      }
    };

    setCreatedOrder(newOrder);
    addOrderToHistory(newOrder);
    clearCart();
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FBFBFA]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold block">
              Atelier Vèrse Secure Checkout
            </span>
            <h3 className="font-serif-display text-2xl text-stone-900">
              {step === 4 ? 'Order Confirmed' : 'Purchase Verification'}
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumbs (when not confirmed) */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-stone-200 text-xs font-medium uppercase tracking-wider text-center">
            <div
              className={`py-3 ${
                step === 1 ? 'bg-stone-900 text-white font-semibold' : 'text-stone-500 bg-stone-50'
              }`}
            >
              1. Delivery
            </div>
            <div
              className={`py-3 ${
                step === 2 ? 'bg-stone-900 text-white font-semibold' : 'text-stone-500 bg-stone-50'
              }`}
            >
              2. Courier
            </div>
            <div
              className={`py-3 ${
                step === 3 ? 'bg-stone-900 text-white font-semibold' : 'text-stone-500 bg-stone-50'
              }`}
            >
              3. Payment
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
                  Destination Information
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-xs text-stone-800 hover:text-black underline flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Auto-fill Demo Details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Genevieve Laurent"
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Street Address & Suite / Floor
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="14 Rue de Bretagne, 4th Floor"
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Paris"
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="75003"
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-stone-200">
                <span className="text-xs text-stone-500">Free courier returns within 30 days</span>
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.fullName) handleFillDemo();
                    setStep(2);
                  }}
                  className="px-6 py-3 bg-[#141416] text-white hover:bg-stone-800 text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  <span>Continue to Courier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Courier Method */}
          {step === 2 && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold block">
                Select Courier Dispatch Service
              </span>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Truck className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-stone-900">
                        Standard Carbon-Neutral Courier (3–5 business days)
                      </span>
                      <span className="text-xs font-semibold text-stone-900 tabular-nums">
                        {isFreeShip ? 'Complimentary' : formatPrice(20)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Direct courier from our Porto or Milan ateliers with electric local last-mile transit.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-stone-900">
                        DHL Express Priority Air (1–2 business days)
                      </span>
                      <span className="text-xs font-semibold text-stone-900 tabular-nums">
                        {formatPrice(35)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Priority customs clearance, dedicated tracking concierge, and signature handoff.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-600 hover:text-black underline uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#141416] text-white hover:bg-stone-800 text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold block">
                Select Payment Facility
              </span>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-center border text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 font-semibold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 text-center border text-xs font-medium transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 font-semibold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="font-semibold block mb-1 text-stone-900">Pay / GPay</span>
                  <span>Digital Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 text-center border text-xs font-medium transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 font-semibold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Package className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                  <span>On Delivery</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-stone-50 border border-stone-200">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="•••• •••• •••• 4242 (Encrypted Demo)"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 font-mono text-stone-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="10 / 28"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 font-mono text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="981"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 font-mono text-stone-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="p-4 bg-white border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Garments Subtotal:</span>
                  <span className="tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Privilege Code Savings:</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Courier Dispatch:</span>
                  <span className="tabular-nums">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Authorized Charge:</span>
                  <span className="tabular-nums font-serif-display text-lg">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-stone-600 hover:text-black underline uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-4 bg-[#141416] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-2 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authorize & Place Order ({formatPrice(finalTotal)})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && createdOrder && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold block mb-1">
                  Atelier Acquisition Confirmed
                </span>
                <h3 className="font-serif-display text-3xl text-stone-900">
                  Thank you, {createdOrder.shippingAddress.fullName}
                </h3>
                <p className="text-xs text-stone-500 mt-2">
                  Order <strong className="text-stone-900 font-mono">#{createdOrder.id}</strong> has been transmitted to our master cutters.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-stone-50 p-6 border border-stone-200 text-left space-y-4 max-w-lg mx-auto text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[11px] text-stone-400 block uppercase">Tracking ID</span>
                    <span className="font-mono font-medium text-stone-900">{createdOrder.trackingNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-400 block uppercase">Est. Arrival</span>
                    <span className="font-medium text-stone-900">{createdOrder.estimatedDelivery}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                    Reserved Items:
                  </span>
                  {createdOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-700">
                      <span>
                        {it.quantity}× {it.name} ({it.size} · {it.color})
                      </span>
                      <span className="font-semibold tabular-nums">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between font-semibold text-stone-900 text-sm">
                  <span>Total Paid</span>
                  <span className="tabular-nums font-serif-display text-base">{formatPrice(createdOrder.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 text-white hover:bg-stone-800 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Track Live Delivery Progress</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 border border-stone-300 hover:border-stone-900 text-stone-800 text-xs uppercase tracking-wider font-medium"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
