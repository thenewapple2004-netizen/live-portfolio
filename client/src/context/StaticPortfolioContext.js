import React, { createContext, useContext } from 'react';

const PortfolioContext = createContext();

// Static portfolio data for frontend-only deployment
const staticPortfolioData = {
  personalInfo: {
    name: "M. Arslan",
    title: "AI & MERN Stack Developer",
    bio: "Passionate AI and Mern-stack developer with 1+ year of experience building intelligent web applications. I specialize in MERN stack development, AI/ML integration, and SQL database optimization. I love creating smart, user-friendly interfaces and robust backend systems powered by artificial intelligence.",
    email: "mianarslanamjad2004@gmail.com",
    phone: "+92348-8691745",
    location: "Lahore, Pakistan",
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
    { name: "MongoDB", level: 65, category: "Database" },
    { name: "HTML/CSS", level: 85, category: "Frontend" },
    { name: "Git", level: 60, category: "Tools" }
  ],
  projects: [
    {
      id: 1,
      title: "AI-Powered Portfolio Website",
      description: "A modern portfolio website with AI integration, built using MERN stack. Features include dynamic content management, contact form with email notifications, and responsive design.",
      image: "/image/portfolio-1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "AI/ML"],
      liveUrl: "https://your-portfolio.vercel.app",
      githubUrl: "https://github.com/your-username/portfolio"
    },
    {
      id: 2,
      title: "Machine Learning Model",
      description: "Developed a machine learning model for data analysis and prediction. Implemented using Python, TensorFlow, and various ML algorithms.",
      image: "/image/ml-project.jpg",
      technologies: ["Python", "TensorFlow", "Machine Learning", "Data Science"],
      liveUrl: "#",
      githubUrl: "https://github.com/your-username/ml-project"
    }
  ],
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Tech Company",
      location: "Lahore, Pakistan",
      startDate: "2023",
      endDate: "Present",
      description: "Developing web applications using MERN stack, implementing AI/ML features, and managing database operations."
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      institution: "University Name",
      location: "Lahore, Pakistan",
      startDate: "2020",
      endDate: "2024",
      description: "Specialized in Artificial Intelligence and Software Engineering."
    }
  ]
};

export const PortfolioProvider = ({ children }) => {
  // Mock functions for static deployment
  const mockFunction = () => {
    console.log('Function called in static mode - no backend available');
  };

  const value = {
    portfolio: staticPortfolioData,
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    directAdminAccess: false,
    
    // Mock functions for admin functionality
    login: mockFunction,
    register: mockFunction,
    logout: mockFunction,
    changePassword: mockFunction,
    
    // Mock functions for portfolio management
    updatePortfolio: mockFunction,
    addSkill: mockFunction,
    updateSkill: mockFunction,
    deleteSkill: mockFunction,
    addProject: mockFunction,
    updateProject: mockFunction,
    deleteProject: mockFunction,
    addExperience: mockFunction,
    updateExperience: mockFunction,
    deleteExperience: mockFunction,
    addEducation: mockFunction,
    updateEducation: mockFunction,
    deleteEducation: mockFunction,
    
    // Mock functions for contact
    sendContactMessage: mockFunction,
    getContactMessages: mockFunction
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
