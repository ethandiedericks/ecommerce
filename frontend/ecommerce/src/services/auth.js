import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/u/',
});

export const loginUser = async (email, password) => {
  try {
    const response = await instance.post('token/', { email, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
    try {
      const response = await instance.post('register/', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

export const logoutUser = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      console.error('Refresh token not found.');
      return;
    }
    const response = await instance.post('logout/', { refresh_token });
    if (response.status === 200) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      console.log('Logged out successfully.');
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};
