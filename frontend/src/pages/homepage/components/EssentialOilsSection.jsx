import React from 'react';

const essentialOils = [
  { id: 39, name: 'Groundnut Oil', img: '/assets/images/esential oils/Ground nut oil bottle.png' },
  { id: 38, name: 'Dry Coconut Oil', img: '/assets/images/esential oils/Dry coconut oil Bottle.png' },
  { id: 18, name: 'Saflower Oil', img: '/assets/images/esential oils/Saflower oil Bottle.png' },
  { id: 19, name: 'Sesame Oil', img: '/assets/images/esential oils/Sesame oil bottle.png' },
  { id: 23, name: 'Mustard Oil', img: '/assets/images/esential oils/Mustard oil bottle.png' },
  { id: 21, name: 'Niger Oil', img: '/assets/images/esential oils/Niger oil Bottle.png' },
  { id: 20, name: 'Flax Seed Oil', img: '/assets/images/esential oils/Flax seed oil.png' },
  { id: 22, name: 'Virgin Coconut Oil', img: '/assets/images/esential oils/V Coconut oil Bottle.png' },
];

const EssentialOilsSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl font-bold text-accent mb-4">
          Wood Pressed Oils
        </h2>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our range of pure, traditional Wood-pressed oils for your daily needs.
        </p>
      </div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {essentialOils.map((oil, idx) => (
          <a
            key={oil.id}
            href={`/product-detail-page/${oil.id}`}
            className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            {/* Image Section */}
<div className="h-40 md:h-64 bg-gray-100 flex items-center justify-center p-3">
  <img
    src={oil.img}
    alt={oil.name}
    className="max-w-full max-h-full object-contain"
    loading="lazy"
  />
</div>

{/* Content Section */}
<div className="h-20 border-t border-gray-200 flex items-center justify-center px-2">
  <span className="font-heading text-sm md:text-lg font-semibold text-center">
    {oil.name}
  </span>
</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
export default EssentialOilsSection;