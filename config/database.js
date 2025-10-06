const mongoose = require('mongoose');

// Database configuration
const dbConfig = {
  // MongoDB connection string from environment
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
  
  // Connection options
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  }
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/portfolio') {
      await mongoose.connect(dbConfig.uri, dbConfig.options);
      
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      db.once('open', () => {
        console.log('✅ Connected to MongoDB Atlas successfully!');
      });
      
      return db;
    } else {
      console.log('⚠️  No MONGODB_URI found. Please create a .env file with your database connection string.');
      console.log('📝 Example: MONGODB_URI=mongodb://localhost:27017/portfolio');
      return null;
    }
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
  }
};

// Get database connection status
const getConnectionStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states[mongoose.connection.readyState],
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  };
};

module.exports = {
  connectDB,
  disconnectDB,
  getConnectionStatus,
  dbConfig
};
