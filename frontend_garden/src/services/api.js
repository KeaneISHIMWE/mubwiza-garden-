import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data?.message || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

// Products API
export const productsAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (formData) => api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateProduct: (id, formData) => api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`),
  createCategory: (formData) => api.post('/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateCategory: (id, formData) => api.put(`/categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: (params) => api.get('/orders/my-orders', { params }),
  getAllOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

// Messages API
export const messagesAPI = {
  createMessage: (messageData) => api.post('/messages', messageData),
  getAllMessages: (params) => api.get('/messages', { params }),
  getMessage: (id) => api.get(`/messages/${id}`),
  updateMessageStatus: (id, data) => api.patch(`/messages/${id}`, data),
  deleteMessage: (id) => api.delete(`/messages/${id}`),
  getMessageStats: () => api.get('/messages/stats'),
};

// Utility function to get image URL
export const getImageUrl = (filename) => {
  if (!filename) return '/images/mubwiza background image.png';

  // If it's a garden image, use the local images folder
  const gardenImages = [
    'red roses.jpeg',
    'tomatoes.jpeg',
    'strowberries.jpeg',
    'mint tea.jpeg',
    'tomato seedling.jpeg',
    'vegatebles in the garden.jpeg',
    'flowers in garden in vase.jpeg',
    'seedlings in the garden.jpeg',
    'mubwiza background image.png',
    'tea spices.jpeg'
  ];

  if (gardenImages.includes(filename)) {
    return `/images/${filename}`;
  }

  // For uploaded images, use the backend uploads folder
  return `${API_BASE_URL.replace('/api', '')}/uploads/${filename}`;
};

export default api;
