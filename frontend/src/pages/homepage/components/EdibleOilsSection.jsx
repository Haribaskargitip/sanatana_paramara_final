import React, { useState, useEffect } from 'react';
import productApi from '../../../services/productApi';

const EdibleOilsSection = () => {
    const [edibleOils, setEdibleOils] = useState([
        { id: 101, name: 'Almond Oil', img: '/assets/images/edible oils/Almond.png' },
        { id: 102, name: 'Deepam Oil', img: '/assets/images/edible oils/Deepam.png' },
        { id: 103, name: 'Castor Oil', img: '/assets/images/edible oils/castor.png' },
    ]);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const updatedOils = await Promise.all(edibleOils.map(async (oil) => {
                    try {
                        const results = await productApi.search(oil.name);
                        if (results && results.length > 0) {
                            // Find the best match by name
                            const match = results.find(p =>
                                p.name.toLowerCase().includes(oil.name.toLowerCase()) ||
                                oil.name.toLowerCase().includes(p.name.toLowerCase())
                            );
                            if (match) {
                                return { ...oil, id: match.id };
                            }
                        }
                    } catch (err) {
                        console.error(`Error fetching ID for ${oil.name}:`, err);
                    }
                    return oil;
                }));
                setEdibleOils(updatedOils);
            } catch (error) {
                console.error("Error updating Edible Oils with backend IDs:", error);
            }
        };

        fetchProductIds();
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl font-bold text-accent mb-4">
                        Edible Oils
                    </h2>
                    <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the purity of our premium edible oils, crafted for health and wellness.
                    </p>
                </div>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
  {edibleOils.map((oil) => (
  <a
  key={oil.id}
  href={`/product-detail-page/${oil.id}`}
  className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
  style={{ textDecoration: 'none' }}
>
  {/* Image Section */}
  {/* <div className="h-48 md:h-72 bg-gray-100 flex items-center justify-center p-1">
    <img
      src={oil.img}
      alt={oil.name}
      className="w-full h-full object-contain"
      loading="lazy"
    />
  </div> */}
   <img
      src={oil.img}
      alt={oil.name}
     className="w-[200%] h-[89%] object-contain"
      loading="lazy"
    />
    
  {/* Line + Content Section */}
  <div className="min-h-20 border-t border-gray-200 flex items-center justify-center px-2 py-2">
  <span className="font-heading text-sm md:text-lg font-semibold text-center break-words whitespace-normal leading-tight">
    {oil.name}
  </span>
</div>
</a>
  ))}
</div>
            </div>
        </section>
    );
};

export default EdibleOilsSection;

