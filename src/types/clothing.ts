export interface ProductColor {
  name: string;
  hex: string;
  previewUrl?: string;
}

export interface ProductSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Outerwear' | 'Knitwear' | 'Trousers' | 'Shirting' | 'Denim' | 'Accessories';
  collection: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  fallbackTone: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  badge?: string;
  description: string;
  details: string[];
  composition: string;
  weightGsm: number;
  origin: string;
  sustainabilityCertifications: string[];
  fitRecommendation: string;
  careInstructions: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item cart key (productId + color + size)
  productId: string;
  product: Product;
  color: ProductColor;
  size: string;
  quantity: number;
}

export interface LookbookLook {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  fallbackTone: string;
  hotspots: {
    productId: string;
    productName: string;
    price: number;
    top: number; // percentage
    left: number; // percentage
  }[];
}

export interface Order {
  id: string;
  date: string;
  items: {
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingMethod: string;
  status: 'Confirmed' | 'Tailoring & QC' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  verified: boolean;
  fitFeedback: 'True to Size' | 'Slightly Relaxed' | 'Slightly Snug';
  comment: string;
}
