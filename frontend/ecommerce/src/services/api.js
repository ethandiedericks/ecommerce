// api.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const loginUser = async (email, password) => {
    try {
      const response = await instance.post('u/token/', {
        email: email,
        password: password
      });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

export const registerUser = async (userData) => {
    try {
      const response = await instance.post('u/register/', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

export const fetchCategories = async () => {
  try {
    const response = await instance.get('/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async categoryId => {
  try {
    const response = await instance.get(`/categories/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchReviewsByProduct = async productId => {
  try {
    const response = await instance.get(`/products/${productId}/reviews/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

