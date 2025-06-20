const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("blog_management");
    console.log("Connected to MongoDB Atlas!");
      // Create default admin user if not exists
    const adminExists = await db.collection('users').findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.collection('users').insertOne({
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      });
      console.log('Default admin user created');
    }

    // Create default regular user if not exists
    const userExists = await db.collection('users').findOne({ email: 'user@example.com' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      await db.collection('users').insertOne({
        name: 'User',
        email: 'user@example.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date()
      });
      console.log('Default regular user created');
    }
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email không hợp lệ' });
    }
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email đã được sử dụng' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection('users').insertOne({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    });

    const token = jwt.sign(
      { userId: result.insertedId, email: email.toLowerCase(), role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: result.insertedId, name: name.trim(), email: email.toLowerCase(), role: 'user' }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Đăng ký thất bại. Vui lòng thử lại sau.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Post routes
app.get('/api/posts', authenticateToken, async (req, res) => {
  try {
    const posts = await db.collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const post = {
      title,
      content,
      authorId: req.user.userId,
      authorName: req.user.email,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('posts').insertOne(post);
    
    res.status(201).json({
      message: 'Post created successfully',
      post: { ...post, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is admin or post owner
    if (req.user.role !== 'admin' && post.authorId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          title, 
          content, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Only admin can delete posts
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can delete posts' });
    }

    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access: http://192.168.1.179:${PORT}`);
  connectToDatabase();
});
