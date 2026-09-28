import React, { useState } from 'react';
import { X, Ruler, HelpCircle, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  // Interactive Size Estimator
  const [heightCm, setHeightCm] = useState(180);
  const [fitPreference, setFitPreference] = useState<'tailored' | 'natural' | 'oversized'>('natural');

  if (!isSizeGuideOpen) return null;

  const getRecommendedSize = () => {
    let base = 'M';
    if (heightCm < 170) base = 'S';
    else if (heightCm <= 178) base = 'M';
    else if (heightCm <= 186) base = 'L';
    else base = 'XL';

    if (fitPreference === 'tailored') {
      if (base === 'XL') return 'L';
      if (base === 'L') return 'M';
      if (base === 'M') return 'S';
      return 'XS';
    } else if (fitPreference === 'oversized') {
      if (base === 'S') return 'M';
      if (base === 'M') return 'L';
      if (base === 'L') return 'XL';
      return 'XXL';
    }
    return base;
  };

  const recommended = getRecommendedSize();

  const measurementData = [
    { size: 'XS', chest: [92, 36.2], waist: [76, 29.9], hip: [94, 37.0], sleeve: [84, 33.0], length: [108, 42.5] },
    { size: 'S', chest: [98, 38.5], waist: [82, 32.2], hip: [100, 39.3], sleeve: [86, 33.8], length: [110, 43.3] },
    { size: 'M', chest: [104, 40.9], waist: [88, 34.6], hip: [106, 41.7], sleeve: [88, 34.6], length: [112, 44.0] },
    { size: 'L', chest: [110, 43.3], waist: [94, 37.0], hip: [112, 44.0], sleeve: [90, 35.4], length: [114, 44.8] },
    { size: 'XL', chest: [118, 46.4], waist: [102, 40.1], hip: [120, 47.2], sleeve: [92, 36.2], length: [116, 45.6] },
    { size: 'XXL', chest: [126, 49.6], waist: [110, 43.3], hip: [128, 50.3], sleeve: [94, 37.0], length: [118, 46.4] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-stone-900" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                Atelier Tailoring Specifications
              </span>
              <h3 className="font-serif-display text-2xl text-stone-900">
                Size & Silhouette Matrix
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-stone-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Interactive Fit Estimator */}
          <div className="p-5 bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                Interactive Silhouette Matcher
              </span>
              <span className="text-xs text-stone-500">Based on garment patterns</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Height:</span>
                  <strong className="text-stone-900 font-mono">
                    {heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)
                  </strong>
                </label>
                <input
                  type="range"
                  min="160"
                  max="205"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-stone-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-stone-600 mb-1 block">Preferred Silhouette:</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['tailored', 'natural', 'oversized'] as const).map((fit) => (
                    <button
                      key={fit}
                      onClick={() => setFitPreference(fit)}
                      className={`py-1.5 text-[11px] uppercase tracking-wider transition-colors ${
                        fitPreference === fit
                          ? 'bg-stone-900 text-white font-semibold'
                          : 'bg-white border border-stone-300 text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-200">
              <span className="text-xs text-stone-600">Your Recommended Atelier Size:</span>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                  {recommended}
                </span>
                <span className="text-xs text-stone-500">
                  ({fitPreference === 'oversized' ? 'Architectural draping' : 'Standard proportions'})
                </span>
              </div>
            </div>
          </div>

          {/* Unit Toggle & Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                Garment Measurement Chart
              </span>
              <div className="flex items-center border border-stone-300 bg-white">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 text-xs transition-colors ${
                    unit === 'cm' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-black'
                  }`}
                >
                  Centimeters (cm)
                </button>
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 text-xs transition-colors ${
                    unit === 'in' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-black'
                  }`}
                >
                  Inches (in)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-stone-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest / Bust</th>
                    <th className="p-3">Natural Waist</th>
                    <th className="p-3">Seat / Hip</th>
                    <th className="p-3">Sleeve Length</th>
                    <th className="p-3">Back Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 tabular-nums">
                  {measurementData.map((row) => (
                    <tr
                      key={row.size}
                      className={recommended === row.size ? 'bg-amber-50/70 font-semibold text-stone-950' : 'text-stone-600'}
                    >
                      <td className="p-3 font-semibold text-stone-900 flex items-center gap-1.5">
                        <span>{row.size}</span>
                        {recommended === row.size && (
                          <span className="text-[10px] text-amber-800 bg-amber-200/80 px-1 rounded-xs">
                            Rec.
                          </span>
                        )}
                      </td>
                      <td className="p-3">{unit === 'cm' ? `${row.chest[0]} cm` : `${row.chest[1]}"`}</td>
                      <td className="p-3">{unit === 'cm' ? `${row.waist[0]} cm` : `${row.waist[1]}"`}</td>
                      <td className="p-3">{unit === 'cm' ? `${row.hip[0]} cm` : `${row.hip[1]}"`}</td>
                      <td className="p-3">{unit === 'cm' ? `${row.sleeve[0]} cm` : `${row.sleeve[1]}"`}</td>
                      <td className="p-3">{unit === 'cm' ? `${row.length[0]} cm` : `${row.length[1]}"`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sizing Advisory Notice */}
          <div className="p-4 bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-2 font-medium text-stone-900">
              <HelpCircle className="w-4 h-4 text-stone-600" />
              <span>Complimentary Exchange Guarantee</span>
            </div>
            <p>
              If your chosen size does not drape exactly as desired, our concierge provides complimentary prepaid return courier shipping with immediate replacement dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
