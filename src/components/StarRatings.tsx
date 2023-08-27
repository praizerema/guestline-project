import React, { useState } from 'react';

interface StarRatingProps {
  color?: string;
  textColor?: string;
  rating: number;
  setRating: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  color = '#FFBE16',
  textColor = 'text-[#FFBE16]',
  rating,
  setRating,
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;

        return (
          <button
            type="button"
            key={index}
            className={`cursor-pointer ${
              starIndex <= (hover || rating) ? textColor : 'text-white'
            }`}
            onClick={() => setRating(starIndex)}
            onMouseEnter={() => setHover(starIndex)}
            onMouseLeave={() => setHover(rating)}
          >
            <span
              className="star text-2xl mr-4"
              style={{
                textShadow: `
                  -0.3px -0.3px 0 ${color},  
                  0.3px -0.3px 0 ${color},
                  -0.3px 0.3px 0 ${color},
                  0.3px 0.3px 0 ${color}`,
              }}
            >
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};


export const StarRatingFixed: React.FC<StarRatingProps> = ({
  color = '#FFBE16',
  textColor = 'text-[#FFBE16]',
  rating
}) => {

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;

        return (
          <span
         
            key={index}
            className={`${
              starIndex <= (rating) ? textColor : 'text-white'
            }`}
          >
            <span
              className="star text-2xl mr-4"
              style={{
                textShadow: `
                  -0.3px -0.3px 0 ${color},  
                  0.3px -0.3px 0 ${color},
                  -0.3px 0.3px 0 ${color},
                  0.3px 0.3px 0 ${color}`,
              }}
            >
              &#9733;
            </span>
          </span>
        );
      })}
    </div>
  );
};