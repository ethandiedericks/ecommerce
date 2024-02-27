import React, { useState, useEffect } from 'react';
import axios from '../axios';
import generateStars from '../utils/stars';

const ReviewDetails = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`/products/${productId}/reviews/`)
          .then(response => {
            setReviews(response.data);
          })
          .catch(error => {
            console.error('Error fetching reviews:', error);
          });
      }, [productId]);

  // Function to format the date as "06 Mar 2022"
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
            <p className='mt-2 font-semibold'>{capitalizeFirstLetter(review.user.first_name)} - {formatDate(review.created_at)}</p>
            <div className="mt-2 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
            {generateStars(review.rating)}
            </div>
            <p className='mb-2'>{review.text}</p>
            <hr/>
        </div>
      ))}
      
    </div>
  )
}

export default ReviewDetails;
