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
  '/assets/banner/mobilefourth.png'
];

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return mounted ? isMobile : false;
}

// ✅ DESKTOP HERO SECTION
const DesktopHero = ({ current, setCurrent, nextSlide, prevSlide }) => {
    return (
        <section className="relative w-full h-[103vh] overflow-hidden flex items-center justify-center bg-black">
            <img
                src={desktopImages[current]}
                alt={`Hero Slide ${current + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                style={{ objectPosition: 'center center' }}
            />

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl text-primary hover:bg-white/50 transition-all duration-300"
                aria-label="Previous Slide"
            >
                &#8592;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl text-primary hover:bg-white/50 transition-all duration-300"
                aria-label="Next Slide"
            >
                &#8594;
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {desktopImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-4 h-4 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/60'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

// ✅ MOBILE HERO SECTION
const MobileHero = ({ current }) => {
    return (
        <section className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black">
            <img
                src={mobileImages[current]}
                alt={`Hero Slide ${current + 1}`}
                className="absolute inset-0 w-full h-full object-contains transition-all duration-1000"
                style={{ objectPosition: 'center center' }}
            />
        </section>
    );
};

// ✅ MAIN HERO COMPONENT
const HeroSection = () => {
    const isMobile = useIsMobile();
    const images = isMobile ? mobileImages : desktopImages;
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % desktopImages.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);

    // Render different component based on screen size
    return isMobile ? (
        <MobileHero current={current} />
    ) : (
        <DesktopHero 
            current={current} 
            setCurrent={setCurrent} 
            nextSlide={nextSlide} 
            prevSlide={prevSlide} 
        />
    );
};

export default HeroSection;