import React, { useState, useEffect, useCallback } from 'react';
import './Slider.css';

const Slider = ({ slides }) => {
  const slideCount = slides.length;
  const [currentSlide, setCurrentSlide] = useState(Math.floor(slides.length / 2)); // Start with the middle slide

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);
  
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [goToNextSlide]);

  useEffect(() => {
    // Reset to the first slide when reaching the end
    if (currentSlide === slides.length - 1) {
      const resetTimeout = setTimeout(() => {
        setCurrentSlide(0);
      }, 100); 
      return () => clearTimeout(resetTimeout);
    }
  }, [currentSlide, slides.length]);

  return (
    <div className="slider" style={{ '--slide-count': slideCount }}>
      <div className="slide-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              transform: `translateX(-${(currentSlide - Math.floor(slides.length / 2)) * 100}%)`, // Adjusting the transform based on the difference from the middle slide
              transition: 'transform 0.5s',
            }}
          >
            <img src={slide.image} alt={slide.caption} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
