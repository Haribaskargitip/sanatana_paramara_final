import React, { useState, useEffect } from 'react';

const desktopImages = [
  '/assets/banner/1.jpg',
  '/assets/banner/2.jpg',
  '/assets/banner/3.jpg',
  '/assets/banner/4.jpg',
  '/assets/banner/5.jpg',
];

const mobileImages = [
  '/assets/banner/mobilefirst.png',
  '/assets/banner/mobileseccond.png',
  '/assets/banner/mobilethird.png',
  '/assets/banner/mobilefourth.png',
  '/assets/banner/mobilefive.png'
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

const HeroSection = ({ scale = 1 }) => {
  const isMobile = useIsMobile();
  const sliderImages = isMobile ? mobileImages : desktopImages;
  const [current, setCurrent] = useState(0);

  const baseHeight = isMobile ? 103 : 113;
  const adjustedHeight = baseHeight * scale;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % sliderImages.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        width: '100%',
        height: `${adjustedHeight}vh`,
        position: 'relative',
        transition: 'height 0.2s ease-out'
      }}
    >
      <img
        src={sliderImages[current]}
        alt={`Hero Slide ${current + 1}`}
        className="w-full h-full object-contain object-center transition-all duration-1000 block"
      />

      {!isMobile && sliderImages.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
            &#8592;
          </button>

          <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
            &#8594;
          </button>
        </>
      )}

      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-4 h-4 rounded-full ${
                idx === current ? 'bg-primary' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;