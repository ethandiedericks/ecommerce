import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, addToCart } from '../services/api';
import Reviews from '../components/Review/Reviews';
import ReviewDetails from '../components/Review/ReviewDetails';
import ReviewModal from '../components/Review/ReviewModal';
import ReviewForm from '../components/Review/ReviewForm'; // Import the ReviewForm component
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false); // State for review modal visibility
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const imageUrl = product.image.replace('/media', '/api/media');

  return (
    <section className="w-full p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-y-8 p-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 bg-white border border-gray-200 rounded-lg shadow p-8">
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
                className="flex text-sm font-bold items-center justify-center space-x-2 text-white bg-green-600 w-full p-3 rounded-md border border-transparent hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleAddToCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-5 w-5 bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-8">
          <h5 className="text-xl font-semibold mb-4">Description:</h5>
          <p>{product.description}</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-xl font-semibold mb-4">Reviews:</h5>
            <Reviews averageRating={product.average_rating} />
            <button 
              className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setReviewModalOpen(true)} // Open review modal when clicked
            >
              Write a review
            </button>
          </div>
          <div>
            <ReviewDetails productId={productId} />
          </div>
        </div>
      </div>
      <ReviewModal openModal={reviewModalOpen} onClose={() => setReviewModalOpen(false)} productId={productId}/>
     
    </section>
  );
};

export default ProductDetailPage;
