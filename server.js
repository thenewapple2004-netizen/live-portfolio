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

// Basic health route for root
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'portfolio-backend', env: config.server.env });
});

// Serve static files from the React app only if a build directory exists
if (process.env.NODE_ENV === 'production') {
  const buildDir = path.join(__dirname, 'client/build');
  const indexFile = path.join(buildDir, 'index.html');
  try {
    if (require('fs').existsSync(indexFile)) {
      app.use(express.static(buildDir));
      app.get('*', (req, res) => {
        res.sendFile(indexFile);
      });
    }
  } catch (_) {
    // no-op: backend deployed separately from frontend
  }
}

const PORT = config.server.port;

// In serverless (Vercel), export the app instead of listening
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${config.server.env}`);
    console.log(`📊 Database: ${config.database.uri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
  });
}

module.exports = app;
