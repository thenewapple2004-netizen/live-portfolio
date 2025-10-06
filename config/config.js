// Application configuration
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },

  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    }
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },

  // File upload configuration
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    uploadPath: 'uploads/'
  },

  // Email configuration (for contact form)
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'noreply@portfolio.com'
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Security
  security: {
    bcryptRounds: 12,
    sessionSecret: process.env.SESSION_SECRET || 'your_session_secret_here'
  }
};

// Validation function
const validateConfig = () => {
  const required = ['database.uri', 'jwt.secret'];
  const missing = [];

  required.forEach(key => {
    const keys = key.split('.');
    let value = config;
    
    for (const k of keys) {
      value = value[k];
    }
    
    if (!value || value === 'your_jwt_secret_key_here') {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.warn('⚠️  Missing or default configuration values:', missing);
    console.warn('📝 Please update your .env file with proper values');
  }

  return missing.length === 0;
};

module.exports = {
  config,
  validateConfig
};
