import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/auth';

function RegisterForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: ''
    },
    validate: values => {
      const errors = {};

      // Client-side validation for name fields
      if (!values.first_name.trim()) {
        errors.first_name = 'First name is required';
      } else if (values.first_name.trim().length > 255) {
        errors.first_name = 'First name must be 255 characters or less';
      }
      if (!values.last_name.trim()) {
        errors.last_name = 'Last name is required';
      } else if (values.last_name.trim().length > 255) {
        errors.last_name = 'Last name must be 255 characters or less';
      }

      // Client-side validation for password
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(values.password)) {
        errors.password = 'Password must contain letters, numbers, and special characters';
      }

      // Client-side validation for confirmPassword
      if (!values.confirm_password) {
        errors.confirm_password = 'Please confirm your password';
      } else if (values.confirm_password !== values.password) {
        errors.confirm_password = 'Passwords do not match';
      }

      return errors;
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        const response = await registerUser(values);
        toast.success('Registration successful!');
        onSuccess(); 
      } catch (error) {
        // Handle registration error
        if (error.response) {
          console.error('Registration error:', error.response.data);
          // Display server-side errors if available
          if (error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error('Registration failed. Please try again later.');
          }
        } else {
          console.error('Network error:', error.message);
          toast.error('Network error. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="email" id="email" name="email" placeholder="name@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={formik.handleChange} value={formik.values.email} required autoFocus/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input type="text" id="first_name" name="first_name" placeholder="First Name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${formik.errors.first_name ? 'border-red-500' : ''}`} onChange={formik.handleChange} value={formik.values.first_name} required />
          {formik.errors.first_name && <div className="text-red-500 text-sm">{formik.errors.first_name}</div>}
        </div>
        <div>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input type="text" id="last_name" name="last_name" placeholder="Last Name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${formik.errors.last_name ? 'border-red-500' : ''}`} onChange={formik.handleChange} value={formik.values.last_name} required />
          {formik.errors.last_name && <div className="text-red-500 text-sm">{formik.errors.last_name}</div>}
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" name="password" placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${formik.errors.password ? 'border-red-500' : ''}`} onChange={formik.handleChange} value={formik.values.password} required />
        {formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
      </div>
      <div>
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm_password" placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${formik.errors.confirm_password ? 'border-red-500' : ''}`} onChange={formik.handleChange} value={formik.values.confirm_password} required />
        {formik.errors.confirm_password && <div className="text-red-500 text-sm">{formik.errors.confirm_password}</div>}
      </div>
      <button type="submit" className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
}

export default RegisterForm;
