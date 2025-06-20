const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware - Allow all origins for development
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Simple test registration endpoint
app.post('/api/test-register', (req, res) => {
  console.log('🧪 Test registration endpoint hit with:', req.body);
  res.json({
    success: true,
    message: 'Test registration endpoint working!',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});


// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Lab 07 - Authentication Backend API',
    version: '1.0.0',
    endpoints: {
      test: 'GET /api/test',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile (Protected)',
      updateProfile: 'PUT /api/auth/profile (Protected)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 API Base URL: http://localhost:${PORT}`);
  console.log(`📱 Expo URL: http://192.168.1.179:${PORT}`);
  console.log(`🧪 Test endpoint: http://192.168.1.179:${PORT}/api/test`);
  console.log(`🔐 Register endpoint: http://192.168.1.179:${PORT}/api/auth/register`);
});
