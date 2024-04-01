import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, addToCart } from '../services/api';
import Reviews from '../components/Review/Reviews';
import ReviewDetails from '../components/Review/ReviewDetails';
import ReviewModal from '../components/Review/ReviewModal';
import ReviewForm from '../components/Review/ReviewForm';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../components/LoadingSkeleton';
import axiosInstance from '../axios';
import { FaPlus, FaMinus } from "react-icons/fa6";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

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
      await addToCart(productId, count);
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const subtractOne = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <section className="w-full p-4 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-y-8 p-8 mt-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-10">
        <div className="flex flex-col items-center">
            {/* Main image */}
            <img
              src={selectedImage || `${axiosInstance.defaults.baseURL.replace(/\/$/, '')}${product.images[0].image}`}
              className="max-h-[400px] rounded-lg"
              alt={product.name}
            />
            <div className="mt-4 flex space-x-4">
              {/* Thumbnail images */}
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${axiosInstance.defaults.baseURL.replace(/\/$/, '')}${image.image}`}
                  className="h-20 w-20 rounded-lg cursor-pointer border border-gray-300"
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(`${axiosInstance.defaults.baseURL.replace(/\/$/, '')}${image.image}`)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-semibold">{product.name}</h1>
            <Reviews averageRating={product.average_rating} />
            <p className="mt-4 text-gray-500">{product.description}</p>
            <div className="mt-4">
              <h2 className="text-3xl font-bold">R {product.price}</h2>
            </div>
            <div className="mt-8">
            <div className="grid grid-cols-2 gap-5">
              <div className='flex items-center bg-gray-100 rounded-md p-3 shadow-md'>
                <button onClick={subtractOne} className="px-4 h-full flex items-center justify-center text-orange-500">
                  <FaMinus />
                </button>
                <span className="w-20 md:w-28 text-center font-bold">{count}</span>
                <button onClick={() => setCount(count + 1)} className="px-4 h-full flex items-center justify-center text-orange-500">
                  <FaPlus />
                </button>
              </div>
              <div className=''>
                <button
                  className="flex text-sm font-bold items-center justify-center space-x-4 text-white bg-orange-500 w-full p-3 rounded-md border border-transparent hover:bg-orange-600 shadow-md shadow-orange-500"
                  onClick={handleAddToCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-cart h-5 w-5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
              
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8">
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-xl font-semibold mb-4">Reviews:</h5>
            <Reviews averageRating={product.average_rating} />
            <button
              className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setReviewModalOpen(true)}
            >
              Write a review
            </button>
          </div>
          <div>
            <ReviewDetails productId={productId} />
          </div>
        </div>
      </div>
      <ReviewModal
        openModal={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        productId={productId}
      />
    </section>
  );
};

export default ProductDetailPage;
