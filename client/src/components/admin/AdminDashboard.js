import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaCog, FaEye, FaEdit, FaKey } from 'react-icons/fa';
import { usePortfolio } from '../../context/StaticPortfolioContext';
import PersonalInfoForm from './PersonalInfoForm';
import SkillsManager from './SkillsManager';
import ProjectsManager from './ProjectsManager';
import ExperienceManager from './ExperienceManager';
import EducationManager from './EducationManager';
import ContactMessages from './ContactMessages';
import ChangePassword from './ChangePassword';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = usePortfolio();
  const [activeTab, setActiveTab] = useState('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaCog /> },
    { id: 'projects', label: 'Projects', icon: <FaEdit /> },
    { id: 'experience', label: 'Experience', icon: <FaEdit /> },
    { id: 'education', label: 'Education', icon: <FaEdit /> },
    { id: 'messages', label: 'Messages', icon: <FaEdit /> },
    { id: 'settings', label: 'Settings', icon: <FaKey /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'skills':
        return <SkillsManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'education':
        return <EducationManager />;
      case 'messages':
        return <ContactMessages />;
      case 'settings':
        return (
          <div className="settings-content">
            <div className="settings-section">
              <h4>Account Security</h4>
              <p>Manage your account security settings and password.</p>
              <button 
                className="change-password-btn"
                onClick={() => setShowChangePassword(true)}
              >
                <FaKey /> Change Password
              </button>
            </div>
          </div>
        );
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <div className="admin-actions">
            <button 
              className="preview-btn"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              title={isPreviewMode ? 'Exit Preview' : 'Preview Site'}
            >
              <FaEye />
            </button>
            <button className="logout-btn" onClick={logout} title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        </div>

        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h3>{tabs.find(tab => tab.id === activeTab)?.label}</h3>
          <p>Manage your portfolio content and settings</p>
        </div>

        <motion.div 
          className="content-body"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>

      {isPreviewMode && (
        <div className="preview-overlay">
          <div className="preview-header">
            <h3>Live Preview</h3>
            <button 
              className="close-preview"
              onClick={() => setIsPreviewMode(false)}
            >
              ×
            </button>
          </div>
          <iframe 
            src="/" 
            className="preview-frame"
            title="Portfolio Preview"
          />
        </div>
      )}

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
