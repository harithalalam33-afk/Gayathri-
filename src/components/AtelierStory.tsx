import React from 'react';
import craftImg from '../assets/images/craft_textile_atelier_1790580802349.jpg';

export const AtelierStory: React.FC = () => {
  return (
    <section id="atelier-story-section" className="py-24 px-6 lg:px-12 bg-white border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Craftsmanship Visual */}
          <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-stone-100 shadow-md">
            <img
              src={craftImg}
              alt="Artisanal tailoring in Atelier Vèrse workshop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 text-[11px] uppercase tracking-wider text-stone-900 border border-stone-200">
              Serra da Estrela, Portugal · Batch Tailoring
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
              Small-Batch Provenance & Ethics
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-display font-light text-stone-900 leading-tight">
              Honoring the hands that shape the fiber.
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Fast fashion produces millions of disposable silhouettes each season. Atelier Vèrse operates under an unapologetic antithesis: limited, serialized drops made in multi-generational family ateliers in Porto, Okayama, and Biella.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  100% Traceable Sourcing
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Every bale of virgin wool and raw organic cotton is mapped directly to certified regenerative farms with zero mulesing and living wage guarantees.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  Lifetime Seam Guarantee
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Should a stitch or button loosen after years of wear, bring or ship it to any Atelier Vèrse location for complimentary restorative mending.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  Waterless Indigo Wash
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Our Kojima selvedge uses closed-circuit botanical indigo dyeing, recycling 98% of process water and eliminating harmful effluent runoffs.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  Zero Plastic Packaging
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Shipped exclusively in certified FSC recyclable kraft boxes with organic cotton garment bags and cornstarch moisture barriers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
