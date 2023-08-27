import React, { useState } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="carousel-container ">
      <button className="carousel-button" onClick={goToPrevSlide}>
        <span className="block md:hidden">
          <RiArrowDropLeftLine size={'2em'} />
        </span>
        <span className="hidden md:block">
          <RiArrowDropLeftLine size={'6em'} />
        </span>
      </button>
      <div className="carousel-slide">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <button className="carousel-button " onClick={goToNextSlide}>
        <span className="hidden md:block">
          <RiArrowDropRightLine size={'6em'} />
        </span>
        <span className="block md:hidden">
          <RiArrowDropRightLine size={'2em'} />
        </span>
      </button>
    </div>
  );
};

export default Carousel;
