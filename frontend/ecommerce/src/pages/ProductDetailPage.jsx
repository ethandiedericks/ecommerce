import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import Reviews from '../components/Reviews';
import ReviewDetails from '../components/ReviewDetails';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        if (productId) {
          const data = await fetchProductById(productId);
          setProduct(data);
        }
      } catch (error) {
        setError('Error fetching product. Please try again later.');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(productId);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <div className="mt-6 flex items-center justify-center h-screen">Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  const imageUrl = product.image.replace('/media', '/api/media');

  return (
    <section className="w-full p-4 flex justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-rows-3 gap-y-8 p-8">
        <div className="w-full grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center">
            <img src={imageUrl} className="max-h-[500px] rounded-lg" alt={product.name} />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <Reviews averageRating={product.average_rating} />
            <div className="mt-4">
              <h2 className="text-2xl font-bold">R {product.price}</h2>
            </div>
            <div className="mt-8">
              <button
                className="flex items-center justify-center w-full rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={handleAddToCart}
              >
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-semibold mb-4">Description:</h5>
          <p>{product.description}</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-xl font-semibold mb-4">Reviews:</h5>
            <Reviews averageRating={product.average_rating} />
            <button className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Write a review
            </button>
          </div>
          <div>
            <ReviewDetails productId={productId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
