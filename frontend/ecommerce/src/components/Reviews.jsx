import React from 'react';
import generateStars from '../utils/stars';

const Reviews = ({ averageRating }) => {
  return (
    <div className="flex items-center mt-2.5 mb-5">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {generateStars(averageRating)}
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{averageRating === null ? 0 : averageRating}</span>
    </div>
  );
};

export default Reviews;
