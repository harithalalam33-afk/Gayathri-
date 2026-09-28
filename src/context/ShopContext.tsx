import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, Order } from '../types/clothing';
import { PRODUCTS } from '../data/products';

export type Currency = 'USD' | 'EUR' | 'GBP';

interface CurrencyRate {
  symbol: string;
  rate: number;
}

const CURRENCIES: Record<Currency, CurrencyRate> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 }
};

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  currencySymbol: string;
  formatPrice: (amountInUSD: number) => string;
  setCurrency: (c: Currency) => void;
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  orderHistory: Order[];
  addOrderToHistory: (order: Order) => void;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountAmount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_DEMO_ORDER: Order = {
  id: 'AV-8841',
  date: 'Sep 24, 2026',
  items: [
    {
      name: 'The Structured Melton Overcoat',
      color: 'Obsidian Black',
      size: 'L',
      quantity: 1,
      price: 495,
      image: PRODUCTS[0].image
    }
  ],
  subtotal: 495,
  discount: 0,
  shipping: 0,
  total: 495,
  shippingMethod: 'Express Atelier Courier (Carbon Neutral)',
  status: 'Dispatched',
  carrier: 'DHL Express Climate Conscious',
  trackingNumber: 'DHL-AT-903182103',
  estimatedDelivery: 'Oct 01, 2026',
  shippingAddress: {
    fullName: 'Alexander Wright',
    address: '148 Franklin St, Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States'
  }
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage persisted cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_verse_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Initial welcome starter item for instant interactivity
    return [
      {
        id: `${PRODUCTS[1].id}-Warm Oatmeal-M`,
        productId: PRODUCTS[1].id,
        product: PRODUCTS[1],
        color: PRODUCTS[1].colors[0],
        size: 'M',
        quantity: 1
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_verse_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [PRODUCTS[0].id];
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(INITIAL_DEMO_ORDER);
  const [orderHistory, setOrderHistory] = useState<Order[]>([INITIAL_DEMO_ORDER]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_verse_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_verse_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const currencySymbol = CURRENCIES[currency].symbol;

  const formatPrice = (amountInUSD: number): string => {
    const rate = CURRENCIES[currency].rate;
    const converted = Math.round(amountInUSD * rate);
    return `${currencySymbol}${converted.toLocaleString()}`;
  };

  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    setCart((prev) => {
      const itemKey = `${product.id}-${color.name}-${size}`;
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          product,
          color,
          size,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const freeShippingThreshold = 250;

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ATELIER10' || clean === 'WELCOME10') {
      setAppliedPromo({ code: clean, discountPercent: 10 });
      return { success: true, message: '10% atelier inaugural privilege applied.' };
    }
    if (clean === 'CAPSULE15' || clean === 'ARCHIVE15') {
      setAppliedPromo({ code: clean, discountPercent: 15 });
      return { success: true, message: '15% capsule collector privilege applied.' };
    }
    return { success: false, message: 'Code not recognized. Try "ATELIER10" or "CAPSULE15".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const discountAmount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const addOrderToHistory = (order: Order) => {
    setOrderHistory((prev) => [order, ...prev]);
    setCurrentOrder(order);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        currencySymbol,
        formatPrice,
        setCurrency,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        freeShippingThreshold,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        activeProductModal,
        setActiveProductModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        currentOrder,
        setCurrentOrder,
        orderHistory,
        addOrderToHistory,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        discountAmount
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
