import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { submitReview } from '../../services/api'; // Assuming the API function is imported here

function ReviewForm({ productId }) { // Receive productId as props
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      rating: '',
      text: ''
    },
    validate: values => {
      const errors = {};

      // Client-side validation for rating
      if (!values.rating) {
        errors.rating = 'Rating is required';
      }

      // Client-side validation for text
      if (!values.text) {
        errors.text = 'Review text is required';
      }

      return errors;
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        await submitReview(productId, values); // Pass productId to submitReview function
        toast.success('Review submitted successfully!');
        formik.resetForm();
      } catch (error) {
        console.error('Review submission error:', error.message);
        toast.error('Failed to submit review. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
        <input type="number" id="rating" name="rating" min="1" max="5" placeholder="Enter rating (1-5)" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={formik.handleChange} value={formik.values.rating} required autoFocus/>
        {formik.errors.rating && <div className="text-red-500 text-sm">{formik.errors.rating}</div>}
      </div>
      <div>
        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review</label>
        <textarea id="text" name="text" placeholder="Write your review..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={formik.handleChange} value={formik.values.text} required />
        {formik.errors.text && <div className="text-red-500 text-sm">{formik.errors.text}</div>}
      </div>
      <button type="submit" className={`w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>{loading ? 'Submitting...' : 'Submit Review'}</button>
    </form>
  );
}

export default ReviewForm;
