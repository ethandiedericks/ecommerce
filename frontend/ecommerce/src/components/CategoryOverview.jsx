import React, { useState, useEffect } from 'react';
import Cards from './Cards';

const CategoryOverview = () => {
  const [categories, setCategories] = useState({});

  // Fetch data from the FakeStore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // Group products by category
        const groupedCategories = data.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
        setCategories(groupedCategories);
      });
  }, []);

  return (
    <div className='w-full p-3 md:p-10'>
      {Object.entries(categories).map(([category, products]) => (
        <div key={category} className='mb-8'>
          <div className='m-2 flex flex-row justify-between'>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{category}</span>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              View more
            </button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-3 md:gap-4 md:p-5 items-center'>
            {products.slice(0, window.innerWidth >= 768 ? 5 : 4).map((product, index) => (
              <Cards key={index} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryOverview;
