import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { LookbookHotspots } from './components/LookbookHotspots';
import { CapsuleBuilder } from './components/CapsuleBuilder';
import { AtelierStory } from './components/AtelierStory';
import { ReviewsSection } from './components/ReviewsSection';
import { FlagshipsSection } from './components/FlagshipsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AtelierAppointmentModal } from './components/AtelierAppointmentModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#141416]">
        {/* Top Promotional Bar */}
        <AnnouncementBar />

        {/* Strict 3-zone Top Bar Contract */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <HeroSection />
          <ProductCatalog />
          <LookbookHotspots />
          <CapsuleBuilder />
          <AtelierStory />
          <ReviewsSection />
          <FlagshipsSection />
        </main>

        {/* Editorial Footer */}
        <Footer />

        {/* Overlays, Drawers & Modals */}
        <ProductModal />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <OrderTrackerModal />
        <SizeGuideModal />
        <AtelierAppointmentModal />
        <SearchModal />
      </div>
    </ShopProvider>
  );
}
