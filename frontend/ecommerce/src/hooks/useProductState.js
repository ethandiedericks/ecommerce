import { useState } from 'react';

const useProductState = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  return { product, setProduct, loading, setLoading, error, setError, reviewModalOpen, setReviewModalOpen, count, setCount, selectedImage, setSelectedImage };
};

export default useProductState;
