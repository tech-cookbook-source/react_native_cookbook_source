const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'API Test Server is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Mock endpoints for testing without MongoDB
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@admin.com' && password === 'admin123') {
    res.json({
      message: 'Login successful',
      token: 'mock_admin_token',
      user: { id: 1, name: 'Admin', email: 'admin@admin.com', role: 'admin' }
    });
  } else if (email === 'user@user.com' && password === 'user123') {
    res.json({
      message: 'Login successful',
      token: 'mock_user_token',
      user: { id: 2, name: 'User', email: 'user@user.com', role: 'user' }
    });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/posts', (req, res) => {
  res.json([
    {
      _id: '1',
      title: 'Bài viết demo 1',
      content: 'Đây là nội dung bài viết demo số 1',
      authorName: 'admin@admin.com',
      createdAt: new Date(),
    },
    {
      _id: '2', 
      title: 'Bài viết demo 2',
      content: 'Đây là nội dung bài viết demo số 2',
      authorName: 'user@user.com',
      createdAt: new Date(),
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Test API Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
});
