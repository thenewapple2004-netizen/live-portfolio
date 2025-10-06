const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import configuration
const { connectDB } = require('./config/database');
const { config, validateConfig } = require('./config/config');

const app = express();

// Validate configuration
validateConfig();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));

// Serve static files from the React app (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Serve React app for any other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${config.server.env}`);
  console.log(`📊 Database: ${config.database.uri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
});
