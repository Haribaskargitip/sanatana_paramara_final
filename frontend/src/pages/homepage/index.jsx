import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import BannerShowcase from './components/BannerShowcase';
import FeaturedProductsSection from './components/FeaturedProductsSection';
import ShopByCategorySection from './components/ShopByCategorySection';
import CategoryProductsSection from './components/CategoryProductsSection';
import EssentialOilsSection from './components/EssentialOilsSection';
import EdibleOilsSection from './components/EdibleOilsSection';
import ExperienceTraditionCTA from './components/ExperienceTraditionCTA';
import NewsletterSection from './components/NewsletterSection';
import TrustCertificates from '../../components/TrustCertificates';
import Footer from './components/Footer';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Homepage = () => {
  const [scale, setScale] = useState(1);

  const { addToCart, getCartItemCount, cartItems } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ KEY FIX: zoom only wrapper, not html/body
  useEffect(() => {
    const wrapper = document.querySelector('.app-wrapper');

    if (wrapper) {
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = 'top center';
      wrapper.style.transition = 'transform 0.2s ease-out';
    }
  }, [scale]);

  // Keyboard zoom
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        setScale((prev) => Math.min(prev + 0.1, 2));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        setScale((prev) => Math.max(prev - 0.1, 0.5));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        setScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddToCart = (product) => {
    let variant = null;

    if (product.selectedVariantId && product.variants) {
      variant = product.variants.find(v => v.id === product.selectedVariantId);
    } else if (product.variants?.length > 0) {
      variant = product.variants[0];
    }

    const cartItem = {
      id: variant ? `${product.id}-${variant.id}` : `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: variant ? variant.price : (product.salePrice || product.price),
      originalPrice: variant ? variant.originalPrice : product.originalPrice,
      image: product.image,
      variant: variant
        ? (variant.label || variant.weightValue + (variant.weightUnit || ''))
        : 'Default',
      category: product.category,
      brand: product.brand
    };

    addToCart(cartItem, 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    window.location.href = `/product-collection-grid?search=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Helmet>
        <title>Sanatana Parampare - Buy Premium Traditional Indian Food Products Online</title>
      </Helmet>

      {/* ✅ THIS IS THE IMPORTANT WRAPPER */}
      <div className="app-wrapper min-h-screen bg-background">

        <Header
          cartItemCount={getCartItemCount()}
          isLoggedIn={!!user}
          onSearch={handleSearch}
          cartItems={cartItems}
        />

        <main>
          <HeroSection scale={scale} />
          <EssentialOilsSection />
          <EdibleOilsSection />
          <ShopByCategorySection />
          <CategoryProductsSection onAddToCart={handleAddToCart} />
          <ExperienceTraditionCTA />
          <FeaturedProductsSection onAddToCart={handleAddToCart} />
          <BannerShowcase />
          <NewsletterSection />
          <TrustCertificates />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;