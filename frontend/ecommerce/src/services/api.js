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

    await instance.post(`carts/`, { product_id: productId }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Product added to cart successfully');
    // Optionally, you can return response data or handle success differently.
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

export const fetchUserOrders = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await instance.get(`orders/`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const checkout = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await instance.post(`orders/checkout/`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Checkout successful:', response.data);
    // Optionally, you can return response data or handle success differently.
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export const fetchUserAddresses = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await instance.get(`addresses/`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    throw error;
  }
};

export const requestRefund = async (orderId) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await instance.post(`refunds/`, { order: orderId }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Refund requested successfully:', response.data);
    // Optionally, you can return response data or handle success differently.
  } catch (error) {
    console.error('Error requesting refund:', error);
    throw error;
  }
};

export const fetchCartItems = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await instance.get(`carts/`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await instance.delete(`carts/${itemId}/remove_item/`, { headers: { Authorization: `Bearer ${token}` } });

    // If successful, fetch the updated cart items
    const updatedCartItems = await fetchCartItems();
    return updatedCartItems;
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};
