import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropLeftFill, RiArrowDropLeftLine, RiArrowDropRightFill, RiArrowDropRightLine } from 'react-icons/ri';

interface CarouselProps {
  images: string[]; 
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button" onClick={goToPrevSlide}>
       <RiArrowDropLeftLine/>
      </button>
      <div className="carousel-slide">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <button className="carousel-button" onClick={goToNextSlide}>
       <RiArrowDropRightLine/>
      </button>
    </div>
  );
};

export default Carousel;
