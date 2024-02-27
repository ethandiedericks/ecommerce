import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const generateStars = (rating) => {
  // Convert null rating to 0
  rating = rating === null ? 0 : rating;

  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-300" />);
  }

  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-300" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return stars;
};

export default generateStars;
