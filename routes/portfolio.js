const express = require('express');
const mongoose = require('mongoose');
const { Portfolio } = require('../config/models');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Mock portfolio data for demo mode
const mockPortfolio = {
    personalInfo: {
      name: "Your Name",
      title: "Your Professional Title",
      bio: "Your professional bio and description. Tell visitors about your skills, experience, and what makes you unique.",
      email: process.env.ADMIN_EMAIL || "your_email@gmail.com",
      phone: process.env.ADMIN_PHONE || "+1234567890",
      location: "Your City, Country",
      profileImage: "/image/profile.jpg",
      resume: ""
    },
  skills: [
    { name: "React", level: 75, category: "Frontend" },
    { name: "Node.js", level: 60, category: "Backend" },
    { name: "C++", level: 70, category: "Backend" },
    { name: "Python", level: 70, category: "Backend" },
    { name: "Express.js", level: 60, category: "Backend" },
    { name: "JavaScript", level: 80, category: "Frontend" },
    { name: "TensorFlow", level: 50, category: "AI/ML" },
    { name: "MySQL", level: 75, category: "Database" },
    { name: "Machine Learning", level: 70, category: "AI/ML" },
    { name: "Natural Language Processing", level: 40, category: "AI/ML" },
    { name: "GitHub", level: 75, category: "Tools" },
    { name: "Jera", level: 80, category: "Tools" },
    { name: "VSCode", level: 88, category: "Tools" }
  ],
  projects: [
    {
      title: "Stock Market Prediction Using Artificial Intelligence",
      description: "A Mern-stack e-commerce platform with AI-powered recommendation system, intelligent search, and automated customer support. Built with MERN stack and integrated machine learning models for personalized shopping experiences.",
      technologies: ["React", "Python", "TensorFlow"],
      image: "",
      liveUrl: "https://example.com/ai-ecommerce",
      githubUrl: "https://github.com/example/ai-ecommerce",
      featured: true
    },
    {
      title: "Task Management System",
      description: "A task management system that allows you to manage your tasks and projects. Built with HTML, CSS, JavaScript.In this project i learned how to use HTML, CSS, JavaScript to create a task management system.This was very useful for me to learn how to use HTML, CSS, JavaScript to create a task management system.",
      technologies: ["HTML", "CSS", "JavaScript"],
      image: "",
      liveUrl: "https://example.com/analytics",
      githubUrl: "https://github.com/example/analytics",
      featured: true
    },
    {
      title: "DataBase",
      description: "A sophisticated chatbot platform with natural language processing capabilities. Supports multiple AI models, conversation management, and seamless integration with web applications.",
      technologies: ["React", "Node.js", "MongoDB", "Python", "NLP", "OpenAI API"],
      image: "",
      liveUrl: "https://example.com/chatbot",
      githubUrl: "https://github.com/example/chatbot",
      featured: true
    }
  ],
  experience: [
    {
      company: "Rizviz International Impex.",
      position: " AI & MERN Stack Developer",
      startDate: new Date("2025-07-21"),
      endDate: null,
      current: true,
      description: "Lead development of AI-powered web applications using MERN stack and machine learning. Specialized in integrating AI models with web applications, optimizing SQL databases, and building intelligent user interfaces. Mentored junior developers in AI/ML best practices.",
      technologies: ["React", "Web Scraping", "JavaScript", "MySQL", "Python", "TensorFlow", "ERP", "JERA", "Salesforce"]
    },
    {
      company: "Private Job",
      position: "MERN Stack Developer",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-07-22"),
      current: false,
      description: "Developed full-stack web applications using MERN stack and SQL databases. Implemented machine learning models for data analysis and created responsive user interfaces. Optimized database performance and integrated AI features.",
      technologies: ["HTML", "CSS", "JavaScript", "Data Entry", "MongoDB"]
    }
  ],
  education: [
    {
      institution: "Bahria University Lahore Campus",
      degree: "Bachelor of Science(CS)",
      field: "Programming Languages",
      startDate: new Date("2022-09-16"),
      endDate: new Date("2026-06-30"),
      current: false,
      description: "Currently pursuing my degree at Bahria University, a prestigious institution known for its emphasis on academic excellence, research, and practical learning."
    },
    {
      institution: "Concordia Group of Colleges",
      degree: "FSC",
      field: "Pre-Engineering",
      startDate: new Date("2016-09-01"),
      endDate: new Date("2020-05-31"),
      current: false,
      description: "Completed my intermediate studies at Concordia College, an institution known for its disciplined academic environment and quality education."
    }
  ],
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  }
};

// Get portfolio data (public)
router.get('/', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const portfolio = await Portfolio.findOne();
      if (!portfolio) {
        return res.json(mockPortfolio);
      }
      res.json(portfolio);
    } else {
      // Return mock data if MongoDB is not connected
      res.json(mockPortfolio);
    }
  } catch (error) {
    // Return mock data on error
    res.json(mockPortfolio);
  }
});

// Initialize portfolio with mock data (admin only)
router.post('/initialize', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      portfolio = new Portfolio(mockPortfolio);
      await portfolio.save();
      res.json({ message: 'Portfolio initialized successfully', portfolio });
    } else {
      res.json({ message: 'Portfolio already exists', portfolio });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update portfolio data (admin only)
router.put('/', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      // If no portfolio exists, create one with the provided data
      portfolio = new Portfolio(req.body);
    } else {
      Object.assign(portfolio, req.body);
    }
    
    await portfolio.save();
    res.json({ message: 'Portfolio updated successfully', portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add project (admin only)
router.post('/projects', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({ ...mockPortfolio, projects: [] });
    }
    
    portfolio.projects.push(req.body);
    await portfolio.save();
    
    res.status(201).json({ 
      message: 'Project added successfully', 
      project: portfolio.projects[portfolio.projects.length - 1] 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update project (admin only)
router.put('/projects/:projectId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(mockPortfolio);
      await portfolio.save();
    }
    
    const project = portfolio.projects.id(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    Object.assign(project, req.body);
    await portfolio.save();
    
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete project (admin only)
router.delete('/projects/:projectId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const project = portfolio.projects.id(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    portfolio.projects.pull(req.params.projectId);
    await portfolio.save();
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add skill (admin only)
router.post('/skills', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({ ...mockPortfolio, skills: [] });
    }
    
    portfolio.skills.push(req.body);
    await portfolio.save();
    
    res.status(201).json({ 
      message: 'Skill added successfully', 
      skill: portfolio.skills[portfolio.skills.length - 1] 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update skill (admin only)
router.put('/skills/:skillId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(mockPortfolio);
      await portfolio.save();
    }
    
    const skill = portfolio.skills.id(req.params.skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    Object.assign(skill, req.body);
    await portfolio.save();
    
    res.json({ message: 'Skill updated successfully', skill });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete skill (admin only)
router.delete('/skills/:skillId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const skill = portfolio.skills.id(req.params.skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    portfolio.skills.pull(req.params.skillId);
    await portfolio.save();
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Experience CRUD operations
// Add experience (admin only)
router.post('/experience', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({ ...mockPortfolio, experience: [] });
    }
    
    portfolio.experience.push(req.body);
    await portfolio.save();
    
    res.status(201).json({ 
      message: 'Experience added successfully', 
      experience: portfolio.experience[portfolio.experience.length - 1],
      portfolio 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update experience (admin only)
router.put('/experience/:experienceId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(mockPortfolio);
      await portfolio.save();
    }
    
    const experience = portfolio.experience.id(req.params.experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    Object.assign(experience, req.body);
    await portfolio.save();
    
    res.json({ message: 'Experience updated successfully', experience, portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete experience (admin only)
router.delete('/experience/:experienceId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const experience = portfolio.experience.id(req.params.experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    portfolio.experience.pull(req.params.experienceId);
    await portfolio.save();
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Education CRUD operations
// Add education (admin only)
router.post('/education', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({ ...mockPortfolio, education: [] });
    }
    
    portfolio.education.push(req.body);
    await portfolio.save();
    
    res.status(201).json({ 
      message: 'Education added successfully', 
      education: portfolio.education[portfolio.education.length - 1],
      portfolio 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update education (admin only)
router.put('/education/:educationId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(mockPortfolio);
      await portfolio.save();
    }
    
    const education = portfolio.education.id(req.params.educationId);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    
    Object.assign(education, req.body);
    await portfolio.save();
    
    res.json({ message: 'Education updated successfully', education, portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete education (admin only)
router.delete('/education/:educationId', auth, adminAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const education = portfolio.education.id(req.params.educationId);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    
    portfolio.education.pull(req.params.educationId);
    await portfolio.save();
    
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
