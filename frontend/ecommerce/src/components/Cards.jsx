import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

// Function to generate star icons based on the average rating
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



const Cards = ({ product }) => {
  return (
    <div className="w-full max-w-[200px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="flex justify-center items-center">
        <img className="h-[150px] p-8 rounded-t-lg" src={product.image} alt="product image" />
      </a>
      <div className="flex flex-col p-4" style={{ minHeight: '80px' }}>
        <div className='h-12 overflow-hidden'>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">{product.name}</h5>
        </div>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {generateStars(product.average_rating)}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.average_rating === null ? 0 : product.average_rating}</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">R {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
