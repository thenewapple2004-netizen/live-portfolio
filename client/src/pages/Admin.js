import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import './Admin.css';

const Admin = () => {
  const { isAuthenticated, login, register, directAdminAccess } = usePortfolio();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = isLogin 
        ? await login(formData.email, formData.password)
        : await register(formData.username, formData.email, formData.password);
      
      if (!result.success) {
        console.error('Authentication failed:', result.error);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
  };

  if (isAuthenticated || directAdminAccess) {
    return <AdminDashboard />;
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <motion.div 
          className="admin-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="admin-header">
            <div className="admin-icon">
              <FaUser />
            </div>
            <h2>Admin Access</h2>
            <p>
              {isLogin 
                ? 'Sign in to manage your portfolio' 
                : 'Create an admin account to get started'
              }
            </p>
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="admin-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {isLogin ? <FaSignInAlt /> : <FaUserPlus />}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="admin-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button 
              type="button" 
              className="toggle-mode"
              onClick={toggleMode}
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
