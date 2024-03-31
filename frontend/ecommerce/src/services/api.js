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

export const saveCartDataToLocal = (cartData) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartData));
    console.log('Cart data saved to local storage:', cartData);
  } catch (error) {
    console.error('Error saving cart data to local storage:', error);
    throw error;
  }
};


export const addToCart = async (productId, quantity) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await instance.post(`carts/`, { product_id: productId, quantity: quantity }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Product added to cart successfully');
    const updatedCartData = await fetchCartItems(); // Assuming you have a fetchCartItems function

    // Save the updated cart data to local storage
    saveCartDataToLocal(updatedCartData);
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

export const submitReview = async (productId, reviewData) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    console.log({ product_id: productId, ...reviewData })
    const response = await instance.post(`reviews/`, { product_id: productId, ...reviewData }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Review submitted successfully:', response.data);
    // Optionally, you can return response data or handle success differently.
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

export const checkout = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    // Retrieve cart data from localStorage or any other source
    const cartData = JSON.parse(localStorage.getItem('cart'));

    const response = await instance.post(`orders/paypal_checkout/`, cartData, {
      headers: { Authorization: `Bearer ${token}`} , 
    });
    const approvalUrl = response.data.approve_url;

    // Redirect the user to the PayPal approval URL
    window.location.href = approvalUrl;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

