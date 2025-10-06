const mongoose = require('mongoose');

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
    category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'Tools', 'AI/ML', 'Other'], default: 'Other' }
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

module.exports = mongoose.model('Portfolio', portfolioSchema);
