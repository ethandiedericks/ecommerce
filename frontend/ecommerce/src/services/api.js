import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const fetchCategories = async () => {
  try {
    const response = await instance.get('/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await instance.get(`/categories/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await instance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchReviewsByProduct = async (productId) => {
  try {
    const response = await instance.get(`/products/${productId}/reviews/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await instance.post(`carts/${productId}/addtocart/`, { product: productId }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Product added to cart successfully');
    // Optionally, you can return response data or handle success differently.
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};
