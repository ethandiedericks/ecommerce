import { addToCart } from '../services/api';
import { toast } from 'react-toastify';

const useProductFunctions = () => {
  const handleAddToCart = async (productId, count, product) => {
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

  const subtractOne = (count, setCount) => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return { handleAddToCart, subtractOne };
};

export default useProductFunctions;
