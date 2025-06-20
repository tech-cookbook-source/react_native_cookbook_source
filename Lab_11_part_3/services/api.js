import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API URL configuration for different environments
const getApiUrl = () => {
  if (__DEV__) {
    // Development mode with Expo
    if (Platform.OS === 'web') {
      // Expo web can use localhost
      return 'http://localhost:3000/api';    } else {
      // For Expo on mobile devices (iOS/Android), use your computer's local IP
      // Your current local IP address is 192.168.1.179
      return 'http://192.168.1.179:3000/api';
    }
  } else {
    // Production mode - replace with your actual server URL
    return 'http://your-production-server.com/api';
  }
};

const API_BASE_URL = getApiUrl();

// Console log removed to prevent rendering issues
// console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (name, email, password) => api.post('/register', { name, email, password }),
};

export const postsAPI = {
  getPosts: () => api.get('/posts'),
  createPost: (title, content) => api.post('/posts', { title, content }),
  updatePost: (id, title, content) => api.put(`/posts/${id}`, { title, content }),
  deletePost: (id) => api.delete(`/posts/${id}`),
};

export default api;
