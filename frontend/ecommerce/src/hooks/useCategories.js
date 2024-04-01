import { useState, useEffect } from 'react';
import { fetchCategories, fetchProductsByCategory } from '../services/api';

const useCategories = () => {
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

  return { categories, productsByCategory };
};

export default useCategories;
