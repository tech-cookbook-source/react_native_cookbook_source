const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Test the connection by creating a simple document
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ 
      message: 'MongoDB connection successful!', 
      timestamp: new Date() 
    });
    console.log('✅ Test document inserted successfully');
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
