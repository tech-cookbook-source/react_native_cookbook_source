import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL - Multiple fallback options
const BASE_URLS = [
  'http://192.168.1.179:3000/api',    // For Expo on physical device/simulator
  'http://localhost:3000/api',        // For web/simulator
  'http://10.0.2.2:3000/api',         // For Android emulator
];

// Try to determine the best base URL
const getBaseURL = () => {
  // You can implement logic to detect the environment
  // For now, we'll use the first one as default
  return BASE_URLS[0];
};

// Create axios instance
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      console.log('🚀 Attempting registration with:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('✅ Registration successful:', response.data);
      return response.data;

    } catch (error) {
    //   console.error('❌ Registration error:', error);
      if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
        throw { message: 'Cannot connect to server. Please check if the backend is running.' };
      }
      throw error.response?.data || { message: 'Registration failed - Network error' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      console.log('🚀 Attempting login with:', credentials.email);
      const response = await api.post('/auth/login', credentials);
      console.log('✅ Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
        throw { message: 'Cannot connect to server. Please check if the backend is running.' };
      }
      throw error.response?.data || { message: 'Login failed - Network error' };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get profile' };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Test API connection
  testConnection: async () => {
    try {
      const response = await api.get('/test');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Connection failed' };
    }
  }
};

export default api;
