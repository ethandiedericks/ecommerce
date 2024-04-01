import { useEffect } from 'react';
import { fetchProductById } from '../services/api';

const useProductEffect = (productId, setProduct, setLoading, setError) => {
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
  }, [productId, setProduct, setLoading, setError]);
};

export default useProductEffect;
