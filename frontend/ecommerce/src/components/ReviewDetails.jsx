import React, { useState, useEffect } from 'react';
import { fetchReviewsByProduct } from '../services/api';
import { formatDate, capitalizeFirstLetter } from '../utils/helpers';
import generateStars from '../utils/stars';

const ReviewDetails = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await fetchReviewsByProduct(productId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <p className='mt-2 font-semibold'>
            {capitalizeFirstLetter(review.user.first_name)} - {formatDate(review.created_at)}
          </p>
          <div className="mt-2 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
            {generateStars(review.rating)}
          </div>
          <p className='mb-2'>{review.text}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ReviewDetails;
