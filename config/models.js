// Database models configuration and initialization
const mongoose = require('mongoose');

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    profileImage: { type: String },
    resume: { type: String }
  },
  skills: [{
    name: { type: String, required: true },
    level: { type: Number, min: 1, max: 100, default: 50 },
    category: { 
      type: String, 
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'AI/ML', 'Other'], 
      default: 'Other' 
    }
  }],
  projects: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String],
    image: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false }
  }],
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    technologies: [String]
  }],
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    gpa: { type: String }
  }],
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String }
  }
}, {
  timestamps: true
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'admin' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: { 
    type: Date 
  }
}, {
  timestamps: true
});

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
  },
  subject: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  message: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 1000
  },
  status: { 
    type: String, 
    enum: ['new', 'read', 'replied', 'archived'], 
    default: 'new' 
  },
  ipAddress: { 
    type: String 
  },
  userAgent: { 
    type: String 
  }
}, {
  timestamps: true
});

// Add password hashing middleware for User
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add password comparison method for User
userSchema.methods.comparePassword = async function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

// Create indexes for better performance
portfolioSchema.index({ 'personalInfo.email': 1 });
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Export models
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
  Portfolio,
  User,
  Contact,
  schemas: {
    portfolio: portfolioSchema,
    user: userSchema,
    contact: contactSchema
  }
};
