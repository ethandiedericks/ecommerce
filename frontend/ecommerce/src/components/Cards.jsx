import React from 'react';
import axiosInstance from '../axios';
import Reviews from './Review/Reviews';

const Cards = ({ product }) => {
  const imageUrl = `${axiosInstance.defaults.baseURL.replace(/\/$/, '')}${product.images[0]}`;

  return (
    <div className="w-full max-w-[200px] flex flex-col bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center items-center">
        <img className="h-[150px] p-8 rounded-t-lg" src={imageUrl} alt="product image" />
      </div>
      <div className="flex flex-col p-4">
        <div className='min-h-[80px] overflow-hidden text-ellipsis'>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        </div>
        <Reviews averageRating={product.average_rating} />
        <div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">R {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
