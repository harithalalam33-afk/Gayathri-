import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    formatPrice,
    addToCart,
    setActiveProductModal
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: typeof PRODUCTS[0]) => {
    const defaultColor = product.colors[0];
    const defaultSize = product.sizes.find((s) => s.inStock)?.size || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h3 className="font-serif-display text-xl text-stone-900 font-medium">
                Saved Garments
              </h3>
              <span className="text-xs text-stone-500 tabular-nums">({wishlistProducts.length})</span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-10 h-10 mx-auto text-stone-300" />
                <h4 className="font-serif-display text-xl text-stone-800">No saved pieces</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any silhouette to reserve it to your personal wardrobe wishlist.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="flex gap-4 pb-6 border-b border-stone-100 last:border-b-0">
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setActiveProductModal(product);
                    }}
                    className="w-20 h-24 bg-stone-100 shrink-0 cursor-pointer overflow-hidden border border-stone-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setActiveProductModal(product);
                          }}
                          className="text-xs font-semibold text-stone-900 hover:text-stone-600 cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-1">
                        {product.origin.split(' ')[2]} · {product.weightGsm} GSM
                      </div>
                      <div className="text-xs font-semibold text-stone-900 mt-1 tabular-nums">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="mt-2 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-stone-50 border-t border-stone-200 text-center">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-xs uppercase tracking-wider text-stone-600 hover:text-black font-semibold"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
