import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/api';

function LoginForm({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      const errors = {};

      // Client-side validation for email
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      // Client-side validation for password
      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        const response = await loginUser(values.email, values.password);
        // Handle successful login
        toast.success('Login successful!');
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        console.log(response.data);
        // Update authentication state in the parent component
        onLogin(true);
      } catch (error) {
        // Handle login error
        console.error('Login error:', error.message);
        toast.error('Login failed. Please try again later.');
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
        {formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={formik.handleChange} value={formik.values.password} required />
        {formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
      </div>
      <button type="submit" className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
    </form>
  );
}

export default LoginForm;
