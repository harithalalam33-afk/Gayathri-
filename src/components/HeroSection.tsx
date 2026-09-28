import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import heroImg from '../assets/images/hero_fashion_editorial_1790580742940.jpg';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#141416] text-[#FBFBFA] overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(88vh-80px)]">
        {/* Editorial Text Content */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10 border-b lg:border-b-0 lg:border-r border-stone-800">
          <div className="space-y-6 max-w-lg">
            {/* Clean unboxed text kicker - Zero-Pill discipline */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
              <span>Autumn / Winter 2026</span>
              <span aria-hidden="true">·</span>
              <span>Capsule 04</span>
              <span aria-hidden="true">·</span>
              <span>Porto & Kojima Ateliers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-light leading-[1.08] tracking-tight text-white text-balance">
              Form follows fiber.
              <span className="block font-normal italic font-serif-display text-stone-300">
                Architectural tailoring in small batches.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Engineered from heavy 640 GSM Portuguese melton wool, 7-gauge Mongolian cashmere, and vintage narrow-shuttle Japanese selvedge. Garments sculpted to endure for generations.
            </p>
          </div>

          <div className="pt-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollTo('collection-section')}
                className="px-6 py-3.5 bg-white text-[#141416] hover:bg-stone-200 transition-colors text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-3 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('lookbook-section')}
                className="px-6 py-3.5 border border-stone-700 hover:border-stone-400 text-stone-200 hover:text-white transition-colors text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-stone-400" />
                <span>View Lookbook</span>
              </button>
            </div>

            {/* Unboxed proof markers */}
            <div className="pt-6 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <div>
                <span className="text-white font-medium block">640 GSM</span>
                <span className="text-[11px] text-stone-300">Portuguese Melton</span>
              </div>
              <span className="text-stone-700">|</span>
              <div>
                <span className="text-white font-medium block">100% GOTS</span>
                <span className="text-[11px] text-stone-300">Organic Yarns</span>
              </div>
              <span className="text-stone-700">|</span>
              <div>
                <span className="text-white font-medium block">Zero Plastic</span>
                <span className="text-[11px] text-stone-300">Circular Packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Imagery */}
        <div className="lg:col-span-7 relative min-h-[460px] lg:min-h-full bg-stone-900 overflow-hidden">
          <img
            src={heroImg}
            alt="Atelier Vèrse Autumn 2026 architectural outerwear campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
          />

          {/* Subtle measured scrim for editorial depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/60 via-transparent to-transparent pointer-events-none" />

          {/* Editorial corner caption */}
          <div className="absolute bottom-6 right-6 bg-[#141416]/80 backdrop-blur-md px-4 py-2 text-[11px] uppercase tracking-widest text-stone-300 border border-stone-700/50">
            Campaign 04 · Monolith Silhouette
          </div>
        </div>
      </div>
    </section>
  );
};
