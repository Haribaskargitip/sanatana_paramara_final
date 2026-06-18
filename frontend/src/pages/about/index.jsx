import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

const AboutPage = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'About Us', path: '/about' }
  ];

  const coreValues = [
    {
      title: 'Purity & Authenticity',
      description: 'We believe true quality begins with purity. Every product is crafted using traditional methods, completely free from chemicals, additives, or preservatives.'
    },
    {
      title: 'Natural Heritage',
      description: 'Rooted in India\'s rich culinary traditions, we preserve age-old recipes and wisdom passed down through generations.'
    },
    {
      title: 'Family Trust',
      description: 'For us, it\'s not just about products — it\'s about families. We are committed to earning your trust through consistency and care.'
    },
    {
      title: 'Quality Promise',
      description: 'Every product we deliver carries a promise — purity you can trust, tradition you can taste, and quality you can feel.'
    }
  ];

  const traditionalProcesses = [
    {
      title: 'Wood Pressing',
      description: 'Oils extracted using traditional wooden presses to preserve natural nutrients and authentic taste.'
    },
    {
      title: 'Stone Grinding',
      description: 'Spice powders ground using ancient stone mills to maintain essential oils and aromatic compounds.'
    },
    {
      title: 'Natural Drying',
      description: 'Sun-drying and traditional preservation methods without artificial chemicals or preservatives.'
    },
    {
      title: 'Handcrafted',
      description: 'Pickles, papads, and traditional foods lovingly prepared by skilled artisans following authentic recipes.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Sanatana Parampare | Traditional Indian Food Heritage</title>
        <meta name="description" content="Discover Sanatana Parampare's journey in preserving traditional Indian food heritage. Learn about our commitment to purity, authenticity, and ancient wisdom in every product." />
        <meta name="keywords" content="about sanatana parampare, traditional indian food, authentic recipes, natural products, wood pressed oils, ancient wisdom, heritage foods" />
        <meta property="og:title" content="About Sanatana Parampare - Preserving Traditional Food Heritage" />
        <meta property="og:description" content="Experience the purest traditional foods following ancient Indian wisdom." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sanatanaparampare.com/about" />
      </Helmet>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
        <Header />

        <main className="pt-6">
          <div className="container mx-auto px-4">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-in-left">
                  <div className="mb-4 inline-block px-4 py-2 bg-emerald-100 rounded-full">
                    <p className="text-emerald-700 text-sm font-semibold">Heritage Preserved</p>
                  </div>
                  <h1 className="font-heading text-5xl lg:text-6xl font-bold text-emerald-900 mb-4">
                    ಸನಾತನ ಪರಂಪರೆ
                  </h1>
                  <h2 className="text-4xl font-bold text-emerald-600 mb-6">
                    Sanatana Parampare
                  </h2>
                  <p className="font-body text-lg text-gray-700 mb-8 leading-relaxed">
                    Experience the purest traditional foods following ancient Indian wisdom. We preserve the timeless culinary heritage through authentic recipes, natural ingredients, and traditional processing methods that have been cherished for generations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                      to="/product-collection-grid"
                      className="bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg px-8 py-4 rounded-full font-heading font-semibold transition-all duration-300 text-center transform hover:scale-105"
                    >
                      Explore Products
                    </Link>
                    <Link
                      to="/contact"
                      className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-full font-heading font-semibold transition-all duration-300 text-center"
                    >
                      Connect With Us
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300">
                    <div>
                      <p className="text-3xl font-bold text-emerald-700">10K+</p>
                      <p className="text-sm text-gray-600">Happy Families</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600">50+</p>
                      <p className="text-sm text-gray-600">Products</p>
                    </div>
                    {/* <div>
                      <p className="text-3xl font-bold text-emerald-700">14+</p>
                      <p className="text-sm text-gray-600">Years Legacy</p>
                    </div> */}
                  </div>
                </div>

                <div className="animate-slide-in-right">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <img
                      src="/assets/images/store.jpg"
                      alt="Sanatana Parampare Store"
                      className="relative w-full h-100 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent rounded-2xl"></div>
                  </div>

                  {/* Quality Badge */}
                  {/* <div className="absolute bottom-0 left-0 ml-6 mb-6 bg-white rounded-full p-6 shadow-2xl border-4 border-emerald-500">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">100%</p>
                      <p className="text-xs font-semibold text-emerald-700">Pure & Natural</p>
                    </div>
                  </div> */}

                </div>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in-up">
                {/* <span className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4">
                  <p className="text-emerald-700 text-sm font-semibold">📖 Our Journey</p>
                </span> */}
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
                  Our Heritage Story
                </h2>
                <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-6 text-center">
                  <p className="font-body text-lg text-gray-700 leading-relaxed">
                    <span className="text-emerald-700 font-bold text-xl">Sanatana Parampare</span> was born from a deep reverence for India's ancient culinary wisdom. Our journey began with a simple yet profound mission: to preserve and share the authentic flavors that have nourished generations of Indian families.
                  </p>
                  <p className="font-body text-lg text-gray-700 leading-relaxed">
                    In an era of mass production and artificial additives, we recognized the urgent need to protect traditional food preparation methods. Our founders, inspired by ancestral recipes and time-tested techniques, established a platform where purity meets tradition.
                  </p>
                  <p className="font-body text-lg text-gray-700 leading-relaxed">
                    Every product in our collection tells a story of heritage, craftsmanship, and unwavering commitment to quality. From wood-pressed oils extracted using century-old methods to spice powders ground on traditional stone mills, we ensure that every bite connects you to India's rich culinary legacy.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border-l-4 border-emerald-600 shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-emerald-900 mb-3">Our Mission</h3>
                    <p className="text-gray-700">
                      To preserve India's culinary heritage and make authentic, pure, and traditionally-crafted foods accessible to every family.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border-l-4 border-green-600 shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-emerald-900 mb-3">Our Vision</h3>
                    <p className="text-gray-700">
                      To be a trusted custodian of traditional Indian food heritage, ensuring generations continue to experience authentic nutrition and wellness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="py-20 bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in-up">
                {/* <span className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
                  <p className="text-green-700 text-sm font-semibold">💎 Core Values</p>
                </span> */}
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
                  Our Core Values
                </h2>
                <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
                <p className="font-body text-lg text-gray-700 max-w-3xl mx-auto">
                  At the heart of everything we create lies a simple promise — to bring you pure, honest, and time-honored goodness.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="card-hover bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500"
                  >
                    {/* <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-700">
                      <Icon name={value.icon} size={24} />
                    </div> */}
                    <h3 className="font-heading font-bold text-xl text-emerald-900 mb-4 text-center">
                      {value.title}
                    </h3>
                    <p className="font-body text-gray-700 text-center leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Traditional Processes Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in-up">
                {/* <span className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4">
                  <p className="text-emerald-700 text-sm font-semibold">🎯 Traditional Methods</p>
                </span> */}
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
                  Traditional Methods We Preserve
                </h2>
                <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
                <p className="font-body text-lg text-gray-700 max-w-3xl mx-auto">
                  Our commitment to authenticity is reflected in the traditional processing methods we've carefully preserved and continue to practice.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {traditionalProcesses.map((process, index) => (
                  <div
                    key={index}
                    className="card-hover bg-gradient-to-br from-white to-emerald-50 rounded-xl p-8 border-l-4 border-green-500 shadow-lg"
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        {/* <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center text-green-700 shadow-md">
                          <Icon name={process.icon} size={24} />
                        </div> */}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-xl text-emerald-900 mb-3">
                          {process.title}
                        </h3>
                        <p className="font-body text-gray-700 leading-relaxed">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Store Gallery Section */}
          <section className="py-20 bg-gradient-to-b from-white to-green-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in-up">
                {/* <span className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
                  <p className="text-green-700 text-sm font-semibold">📸 Our Store</p>
                </span> */}
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
                  Our Store Gallery
                </h2>
                <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
                <p className="font-body text-lg text-gray-700 max-w-3xl mx-auto">
                  Take a glimpse at our store and the authentic environment where our traditional products are crafted.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className="card-hover overflow-hidden rounded-xl shadow-lg group relative"
                  >
                    <div className="relative overflow-hidden h-100 bg-gray-200">
                      <img
                        src={`/assets/store/store${num}.jpg`}
                        alt={`Sanatana Parampare Store ${num}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quality Promise Section */}
          <section className="relative py-20 bg-gradient-to-r from-emerald-700 via-green-700 to-teal-600 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
                  Our Quality Promise
                </h2>
                <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
                <p className="font-body text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                  We pledge to deliver products that honor the trust you place in us. Every item undergoes rigorous quality checks, and we stand behind the purity and authenticity of everything we offer.
                </p>
              </div>
<div className="flex justify-center gap-12 mb-12 text-center">

  <div>
    <h3 className="font-heading font-bold text-xl mb-1">100% Pure</h3>
    <p className="font-body text-white/80">
      No chemicals, preservatives, or artificial additives
    </p>
  </div>

  <div>
    <h3 className="font-heading font-bold text-xl mb-1">Quality Tested</h3>
    <p className="font-body text-white/80">
      Rigorous testing ensures highest quality standards
    </p>
  </div>

  <div>
    <h3 className="font-heading font-bold text-xl mb-1">Made with Love</h3>
    <p className="font-body text-white/80">
      Handcrafted with care by skilled artisans
    </p>
  </div>

</div>

              <div className="text-center">
                <Link
                  to="/product-collection-grid"
                  className="inline-block bg-white text-emerald-700 hover:bg-gray-100 px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Explore Our Collection
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
         <section className="py-20 bg-white">
  <div className="container mx-auto px-4 text-center">

    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-emerald-900 mb-4">
      Ready to Experience Authentic Heritage?
    </h2>

    <p className="font-body text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
      Join thousands of families who've made the switch to pure, traditional, and naturally-crafted foods.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      <Link
        to="/product-collection-grid"
        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 transform hover:scale-105"
      >
        Shop Now
      </Link>

      <Link
        to="/contact"
        className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300"
      >
        Get in Touch
      </Link>

    </div>

  </div>
</section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;