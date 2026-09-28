import React, { useState } from 'react';
import { ArrowRight, Check, Shield, Recycle, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setIsOrderTrackerOpen, setIsAppointmentModalOpen, setIsSizeGuideOpen } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#141416] text-[#E6E4DF] border-t border-stone-800">
      {/* Brand Values Banner */}
      <div className="border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs text-stone-400">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium uppercase tracking-wider mb-0.5">
                Certified Natural Fibers
              </strong>
              <span>GOTS organic cotton, mulesing-free virgin wool, and SCS traceable Mongolian cashmere.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Recycle className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium uppercase tracking-wider mb-0.5">
                Circular Atelier Takeback
              </strong>
              <span>Return well-loved garments after years of wear for archive credit and regenerative re-spinning.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium uppercase tracking-wider mb-0.5">
                Lifetime Mending Pledge
              </strong>
              <span>Complimentary seam and button restoration at our Paris, New York, and Tokyo flagships.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <a
            href="#"
            className="text-2xl font-serif-display font-medium tracking-[0.2em] text-white uppercase block"
          >
            Atelier Vèrse
          </a>
          <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
            Contemporary ready-to-wear rooted in architectural discipline, tactile integrity, and small-batch European and Japanese tailoring.
          </p>
          <div className="pt-2 text-[11px] text-stone-500 uppercase tracking-widest">
            Porto · Okayama · Biella · Paris · New York
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-2 space-y-3 text-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
            Collection
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => scrollTo('collection-section')} className="hover:text-white transition-colors">
                Outerwear & Coats
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('collection-section')} className="hover:text-white transition-colors">
                Grade-A Cashmere
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('collection-section')} className="hover:text-white transition-colors">
                Kurabo Selvedge
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('capsule-builder-section')} className="hover:text-white transition-colors">
                Mix & Match Studio
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('lookbook-section')} className="hover:text-white transition-colors">
                Monolith Lookbook
              </button>
            </li>
          </ul>
        </div>

        {/* Client Care */}
        <div className="md:col-span-2 space-y-3 text-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
            Client Care
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => setIsOrderTrackerOpen(true)} className="hover:text-white transition-colors">
                Track Shipment
              </button>
            </li>
            <li>
              <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">
                Size & Measurement Matrix
              </button>
            </li>
            <li>
              <button onClick={() => setIsAppointmentModalOpen(true)} className="hover:text-white transition-colors">
                Book Boutique Fitting
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('atelier-story-section')} className="hover:text-white transition-colors">
                Provenance & Ethics
              </button>
            </li>
            <li>
              <a href="mailto:concierge@ateliverse.com" className="hover:text-white transition-colors">
                Direct Concierge Inquiry
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            The Atelier Dispatch
          </h4>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Receive private allocations for small-batch releases, archival fabric discoveries, and runway previews.
          </p>

          {subscribed ? (
            <div className="p-3 bg-stone-900 border border-stone-800 text-xs text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>You have been added to the private allocation register.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2.5 text-xs bg-stone-900 border border-stone-700 text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-white text-stone-950 hover:bg-stone-200 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="text-[11px] text-stone-400">
            Strict anti-spam policy. Dispatches sent approximately once monthly.
          </div>
        </div>
      </div>

      {/* Copyright & hairlines */}
      <div className="border-t border-stone-800/80 max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
        <div>
          © 2026 Atelier Vèrse Studios Ltd. All rights reserved. Registered trademark.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Privacy & Cookie Charter</span>
          <span className="hover:text-white cursor-pointer">Accessibility</span>
        </div>
      </div>
    </footer>
  );
};
