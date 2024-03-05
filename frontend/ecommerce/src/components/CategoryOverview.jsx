import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import axios from '../axios';
import { Link } from 'react-router-dom';

const CategoryOverview = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  // Fetch categories from backend
  useEffect(() => {
    axios.get('/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Fetch products by category from backend
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`/categories/${categoryId}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Fetch products for each category and store them in state
  useEffect(() => {
    const fetchProductsForAllCategories = async () => {
      const productsByCategoryMap = {};
      for (const category of categories) {
        const products = await fetchProductsByCategory(category.id);
        productsByCategoryMap[category.id] = products;
      }
      setProductsByCategory(productsByCategoryMap);
    };
    fetchProductsForAllCategories();
  }, [categories]);

  // Filter categories that have associated products
  const categoriesWithProducts = categories.filter(category => productsByCategory[category.id]?.length > 0);

  return (
    <div className='w-full p-3 md:p-10'>
      {categoriesWithProducts.map(category => (
        <div key={category.id} className='mb-8'>
          <div className='m-2 flex flex-row justify-between'>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</span>
            <Link
              to={`/categories/${category.id}/products/`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              View more
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8'>
            {/* Render products for this category */}
            {productsByCategory[category.id]?.slice(0, window.innerWidth >= 768 ? 5 : 4).map((product, index) => (
              <Link key={index} to={`/products/${product.id}`}>
                <Cards key={index} product={product} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryOverview;
