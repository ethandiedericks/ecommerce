import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchProductsByCategory } from '../services/api';
import Cards from './Cards';

const CategoryOverview = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const productsByCategoryMap = {};
        for (const category of categoriesData) {
          const products = await fetchProductsByCategory(category.id);
          productsByCategoryMap[category.id] = products;
        }
        setProductsByCategory(productsByCategoryMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const categoriesWithProducts = categories.filter(
    category => productsByCategory[category.id]?.length > 0
  );

  return (
    <div className="w-full p-3 md:p-10">
      {categoriesWithProducts.map(category => (
        <div key={category.id} className="mb-8">
          <div className="m-2 flex flex-col md:flex-row justify-between items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">
              {category.name}
            </span>
            <Link
              to={`/categories/${category.id}/products/`}
              className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 font-medium rounded-3xl text-sm px-5 py-2.5 md:me-2 md:mb-2"
            >
              View more
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {productsByCategory[category.id]
              ?.slice(0, window.innerWidth >= 768 ? 5 : 4)
              .map((product, index) => (
                <Link key={index} to={`/products/${product.id}`}>
                  <Cards key={index} product={product} />
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryOverview;
