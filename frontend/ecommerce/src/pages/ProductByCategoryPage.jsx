import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Cards from '../components/Cards';
import { Link } from 'react-router-dom';

const ProductByCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/categories/${categoryId}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  return (
    <div className='w-full p-10'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {products.map((product, index) => (
              <Link key={index} to={`/products/${product.id}`}>
                <Cards key={product.id} product={product} />
              </Link>     
            ))}
      </div>
    </div>
    
  );
}

export default ProductByCategoryPage;
