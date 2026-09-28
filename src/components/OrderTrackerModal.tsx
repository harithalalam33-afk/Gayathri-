import React, { useState } from 'react';
import { X, Search, CheckCircle2, Circle, Truck, Package, Clock, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTrackerModal: React.FC = () => {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    orderHistory,
    currentOrder,
    setCurrentOrder,
    formatPrice
  } = useShop();

  const [searchId, setSearchId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOrderTrackerOpen) return null;

  const activeOrder = currentOrder || orderHistory[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const clean = searchId.trim().toUpperCase().replace('#', '');
    const found = orderHistory.find(
      (o) => o.id.toUpperCase() === clean || o.trackingNumber.toUpperCase().includes(clean)
    );

    if (found) {
      setCurrentOrder(found);
      setSearchId('');
    } else {
      setErrorMsg(`No shipment found for "${clean}". Try demo ID "AV-8841".`);
    }
  };

  const steps = [
    { label: 'Order Confirmed', desc: 'Atelier allocation verified', done: true },
    { label: 'Tailoring & QC Inspection', desc: 'Hand inspection in Porto', done: true },
    {
      label: 'Dispatched via Courier',
      desc: activeOrder ? activeOrder.carrier : 'DHL Climate Neutral',
      done: activeOrder ? activeOrder.status !== 'Confirmed' : true
    },
    {
      label: 'Local Hub Arrival',
      desc: 'Customs cleared & sorted',
      done: activeOrder ? activeOrder.status === 'Out for Delivery' || activeOrder.status === 'Delivered' : false
    },
    {
      label: 'Delivered with Signature',
      desc: 'Recipient handoff',
      done: activeOrder ? activeOrder.status === 'Delivered' : false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-stone-900" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                Real-Time Courier Tracking
              </span>
              <h3 className="font-serif-display text-2xl text-stone-900">
                Atelier Dispatch Status
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1.5 text-stone-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. AV-8841) or Tracking Code"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 focus:border-stone-900 focus:outline-none uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#141416] hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold"
            >
              Track
            </button>
          </form>

          {errorMsg && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 border border-red-200">
              {errorMsg}
            </p>
          )}

          {/* Quick select recent order tabs */}
          {orderHistory.length > 1 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400">Recent:</span>
              {orderHistory.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => setCurrentOrder(ord)}
                  className={`px-2 py-1 text-xs font-mono transition-colors ${
                    activeOrder?.id === ord.id
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  #{ord.id}
                </button>
              ))}
            </div>
          )}

          {activeOrder ? (
            <div className="space-y-6">
              {/* Order Metadata Box */}
              <div className="p-5 bg-stone-50 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Order ID</span>
                  <span className="font-mono font-semibold text-stone-900">#{activeOrder.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Carrier</span>
                  <span className="font-medium text-stone-900">{activeOrder.carrier.split(' ')[0]} Express</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Status</span>
                  <span className="font-semibold text-emerald-800">{activeOrder.status}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Est. Delivery</span>
                  <span className="font-medium text-stone-900">{activeOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 block mb-6">
                  Shipment Milestone Timeline
                </span>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {steps.map((st, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className="absolute -left-6 mt-0.5">
                        {st.done ? (
                          <div className="w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center ring-4 ring-white">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-stone-300 ring-4 ring-white" />
                        )}
                      </div>
                      <div>
                        <h4 className={`text-xs font-medium ${st.done ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>
                          {st.label}
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address & Items */}
              <div className="p-4 bg-white border border-stone-200 rounded-xs grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                    Delivery Address
                  </span>
                  <p className="font-medium text-stone-900">{activeOrder.shippingAddress.fullName}</p>
                  <p className="text-stone-600">{activeOrder.shippingAddress.address}</p>
                  <p className="text-stone-600">
                    {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.postalCode}
                  </p>
                  <p className="text-stone-600">{activeOrder.shippingAddress.country}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                    Garment Package
                  </span>
                  <div className="space-y-1 text-stone-700">
                    {activeOrder.items.map((it, i) => (
                      <div key={i} className="flex justify-between">
                        <span>
                          {it.quantity}× {it.name}
                        </span>
                        <span className="tabular-nums font-medium">{formatPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-stone-500 text-xs">
              No shipment selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
