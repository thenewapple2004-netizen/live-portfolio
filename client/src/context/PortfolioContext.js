import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PortfolioContext = createContext();

const initialState = {
  portfolio: null,
  loading: true,
  error: null,
  user: null,
  isAuthenticated: false,
  directAdminAccess: false // Require authentication for admin access
};

const portfolioReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PORTFOLIO':
      return { ...state, portfolio: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload 
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Set up axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token and get user info
      axios.get('/api/auth/me')
        .then(res => {
          dispatch({ type: 'SET_USER', payload: res.data.user });
        })
        .catch(() => {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        });
    } else if (state.directAdminAccess) {
      // For direct admin access, set a dummy token to bypass auth
      axios.defaults.headers.common['Authorization'] = 'Bearer direct-admin-access';
      dispatch({ type: 'SET_USER', payload: { role: 'admin', username: 'admin' } });
    }
  }, [state.directAdminAccess]);

  // Load portfolio data
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await axios.get('/api/portfolio');
        dispatch({ type: 'SET_PORTFOLIO', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        console.error('Error loading portfolio:', error);
      }
    };

    loadPortfolio();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch({ type: 'SET_USER', payload: user });
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { 
        username, email, password 
      });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch({ type: 'SET_USER', payload: user });
      
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updatePortfolio = async (portfolioData) => {
    try {
      await axios.put('/api/portfolio', portfolioData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Portfolio updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  // Admin-specific CRUD operations
  const addSkill = async (skillData) => {
    try {
      await axios.post('/api/portfolio/skills', skillData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Skill added successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add skill');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateSkill = async (skillId, skillData) => {
    try {
      await axios.put(`/api/portfolio/skills/${skillId}`, skillData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Skill updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update skill');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      await axios.delete(`/api/portfolio/skills/${skillId}`);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Skill deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete skill');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const addProject = async (projectData) => {
    try {
      await axios.post('/api/portfolio/projects', projectData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Project added successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add project');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      await axios.put(`/api/portfolio/projects/${projectId}`, projectData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Project updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update project');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/portfolio/projects/${projectId}`);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Project deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const addExperience = async (experienceData) => {
    try {
      await axios.post('/api/portfolio/experience', experienceData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Experience added successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add experience');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateExperience = async (experienceId, experienceData) => {
    try {
      await axios.put(`/api/portfolio/experience/${experienceId}`, experienceData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Experience updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update experience');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const deleteExperience = async (experienceId) => {
    try {
      await axios.delete(`/api/portfolio/experience/${experienceId}`);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Experience deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete experience');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const addEducation = async (educationData) => {
    try {
      await axios.post('/api/portfolio/education', educationData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Education added successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add education');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateEducation = async (educationId, educationData) => {
    try {
      await axios.put(`/api/portfolio/education/${educationId}`, educationData);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Education updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update education');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const deleteEducation = async (educationId) => {
    try {
      await axios.delete(`/api/portfolio/education/${educationId}`);
      
      // Reload portfolio data to get the updated version from database
      const portfolioResponse = await axios.get('/api/portfolio');
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
      
      toast.success('Education deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete education');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const getContactMessages = async () => {
    try {
      const response = await axios.get('/api/contact');
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const sendContactMessage = async (messageData) => {
    try {
      await axios.post('/api/contact', messageData);
      toast.success('Message sent successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    changePassword,
    updatePortfolio,
    sendContactMessage,
    // Admin CRUD operations
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    getContactMessages
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
