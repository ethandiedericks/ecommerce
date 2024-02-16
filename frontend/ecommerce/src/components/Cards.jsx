import React from 'react';

const Cards = ({ product }) => {
  return (
    <div className="w-full max-w-[200px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="flex justify-center items-center">
        {/* Add CSS to ensure the image fits perfectly */}
        <img className="h-[150px] p-8 rounded-t-lg" src={product.image} alt="product image" />
      </a>
      <div className="flex flex-col p-4" style={{ minHeight: '80px' }}>
        <div className='h-12 overflow-hidden'>
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">{product.title}</h5>
        </div>
        
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {/* Create an array of JSX elements */}
            {Array.from({ length: product.stars }).map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating.count}</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">R {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
