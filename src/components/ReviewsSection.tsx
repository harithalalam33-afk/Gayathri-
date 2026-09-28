import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  const [filterFit, setFilterFit] = useState<string>('All');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredReviews = filterFit === 'All'
    ? REVIEWS
    : REVIEWS.filter((r) => r.fitFeedback === filterFit);

  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Rating Breakdown Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
            Client Verification & Feedback
          </div>
          <h2 className="text-3xl font-serif-display font-light text-stone-900">
            Collector Reviews
          </h2>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-5xl font-serif-display font-medium text-stone-900 tabular-nums">
              4.94
            </span>
            <div>
              <div className="flex text-amber-600 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs text-stone-500 mt-1 block">
                Based on 289 verified purchases
              </span>
            </div>
          </div>

          {/* Fit Sentiment Meter */}
          <div className="pt-6 border-t border-stone-200 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-900 block">
              Fit Sentiment Breakdown
            </span>
            <div>
              <div className="flex justify-between text-xs text-stone-600 mb-1">
                <span>True to size</span>
                <span className="font-semibold tabular-nums">94%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-stone-900 h-full w-[94%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-stone-600 mb-1">
                <span>Runs slightly relaxed</span>
                <span className="font-semibold tabular-nums">6%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-stone-500 h-full w-[6%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <span className="text-xs text-stone-500">
              Showing {filteredReviews.length} authenticated reflections
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400">Filter fit:</span>
              {['All', 'True to Size'].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setFilterFit(fit)}
                  className={`px-2.5 py-1 text-xs transition-colors ${
                    filterFit === fit
                      ? 'bg-stone-900 text-white font-medium'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-white border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>

                  <p className="text-xs font-medium text-stone-900 mb-2">
                    {rev.productName}
                  </p>

                  <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-stone-800">{rev.author}</span>
                    <span className="text-stone-400">·</span>
                    <span>{rev.location}</span>
                    {rev.verified && (
                      <span title="Verified Purchaser" className="inline-flex items-center">
                        <CheckCircle className="w-3 h-3 text-emerald-600 ml-0.5" />
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1 text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="tabular-nums">{helpfulCounts[rev.id] || 8}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
