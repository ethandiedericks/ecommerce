import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/api';
import Cards from '../components/Cards';
import { Link } from 'react-router-dom';

const ProductByCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (categoryId) {
          const data = await fetchProductsByCategory(categoryId);
          setProducts(data);
        }
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Cards key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductByCategoryPage;
