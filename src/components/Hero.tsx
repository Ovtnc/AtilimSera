import React, { useState, useEffect } from 'react';

interface SliderImage {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  is_active: number;
  sort_order: number;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load slider images from API
    const fetchSliderImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/slider');
        const data = await response.json();
        
        if (data.sliders && data.sliders.length > 0) {
          setSlides(data.sliders);
        } else {
          // If no images from database, show default message
          setSlides([]);
        }
      } catch (error) {
        console.error('Error fetching slider images:', error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000); // 5 saniyede bir değişir

      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-br from-green-600 to-green-800">
        <div className="relative z-10 px-6 flex flex-col items-center gap-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow">
            Yükleniyor...
          </h1>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-br from-green-600 to-green-800">
        <div className="relative z-10 px-6 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow">
            Topraksız Tarımda Yenilikçi Yaklaşımlar
          </h1>
          <p className="text-lg md:text-xl max-w-3xl text-shadow">
            Sürdürülebilir tarım çözümleriyle geleceği şimdi inşa ediyoruz.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Slider Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`${slide.image}?t=${Date.now()}`}
            alt={slide.image_alt || slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Hero image load error:', slide.image);
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 px-6 flex flex-col items-center gap-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow scale-in text-center">
          {slides[currentSlide]?.title || "Topraksız Tarımda Yenilikçi Yaklaşımlar"}
        </h1>
        {slides[currentSlide]?.subtitle && (
          <h2 className="text-xl md:text-2xl font-semibold text-shadow scale-in text-center text-green-200">
            {slides[currentSlide].subtitle}
          </h2>
        )}
        <p className="text-lg md:text-xl max-w-3xl text-shadow scale-in text-center">
          {slides[currentSlide]?.description || "Sürdürülebilir tarım çözümleriyle geleceği şimdi inşa ediyoruz."}
        </p>
        {slides[currentSlide]?.button_text && slides[currentSlide]?.button_link && (
          <a
            href={slides[currentSlide].button_link}
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            {slides[currentSlide].button_text}
          </a>
        )}
      </div>

      

      
    </section>
  );
};

export default Hero;