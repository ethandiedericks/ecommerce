import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Reviews from '../components/Reviews';
import ReviewDetails from '../components/ReviewDetails';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart
    console.log('Product added to cart:', product);
  };

  if (!product) {
    return <div className="mt-6 flex items-center justify-center h-screen">Loading...</div>;
  }

  const imageUrl = product.image.replace('/media', '/api/media');

  return (
    <section className="w-full p-4 mt-20 flex justify-center bg-gray-50">
      <div className="grid grid-rows-3 gap-y-6 p-8">
        <div className='w-full md:w-[900px] justify-center items-center grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 bg-white border border-gray-200 rounded shadow p-8 dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex justify-center border'>
            <img src={imageUrl} className='h-[350px] p-8 rounded-t-lg'/>
          </div>
          <div>
            <div>
              <h4>{product.name}</h4>
            </div>
            <Reviews averageRating={product.average_rating} />
            <div>
              <h4>R {product.price}</h4>
            </div>
            <div className='flex justify-center'>
              <button className=' mt-6 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                +
                <span className='ml-1 mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </span>&nbsp;Add to Cart
                </button>
            </div>
            
          </div>
        </div>
        <div className='w-full md:w-[900px] justify-center items-center grid grid-cols-1 gap-x-0 gap-y-10 bg-white border border-gray-200 rounded shadow p-8 dark:bg-gray-800 dark:border-gray-700'>
          <div>
            <h5>Description:</h5>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='w-full md:w-[900px] justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-10 bg-white border border-gray-200 rounded shadow p-8 dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex flex-col justify-center items-center'>
            <h5>Reviews:</h5>
            <Reviews averageRating={product.average_rating}/>
            <button className='flex items-center w-[200px] justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
              Write a review
            </button>
          </div>
          <div>
            <ReviewDetails productId={productId}/>
            
          </div>
        </div>
      </div>
      
    </section>
    
  );
};

export default ProductDetailPage;
