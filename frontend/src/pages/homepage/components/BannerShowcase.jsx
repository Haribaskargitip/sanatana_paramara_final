import React from 'react';
import { Link } from 'react-router-dom';
import BannerImageSlider from '../../../components/ui/BannerImageSlider';

const BannerShowcase = () => {
  const featuredCategories = [
    {
      title: "Premium Ghee Collection",
      description: "Pure A2 cow ghee and traditional ghee varieties",
      images: ['/assets/banner/ghee1.png'],
      link: "/product-collection-grid?category=3",
      badge: "Premium Quality"
    },
    {
      title: "Traditional Spices",
      description: "Hand-ground masalas and spice powders",
      images: ['/assets/banner/masala.png'],
      link: "/product-collection-grid?category=7",
      badge: "Fresh Ground"
    },
    {
      title: "Homemade Pickles",
      description: "Authentic traditional pickle varieties",
      images: ['/assets/banner/pickles.png'],
      link: "/product-collection-grid?category=6",
      badge: "Homemade"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Traditional Flavors, Authentic Quality
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of traditional Indian food products,
            made with love and following ancient recipes for authentic taste.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {featuredCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">

              {/* Badge */}
              <div className="p-4 bg-orange-50">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  {category.badge}
                </span>
              </div>

              {/* Image */}
              <div className="h-[240px] overflow-hidden">
                <BannerImageSlider
                  images={category.images}
                  className="h-full w-full"
                  autoSlide={category.images.length > 1}
                  interval={4000}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>

                <Link
                  to={category.link}
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Explore Collection

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default BannerShowcase;