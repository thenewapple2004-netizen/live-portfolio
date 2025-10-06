import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { usePortfolio } from '../context/StaticPortfolioContext';
import './Hero.css';

const Hero = () => {
  const { portfolio, loading } = usePortfolio();

  if (loading || !portfolio) {
    return (
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="loading-skeleton">
              <div className="skeleton-line large"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line small"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { personalInfo } = portfolio;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="hero-image"
            variants={itemVariants}
          >
            <div className="image-container">
              {personalInfo.profileImage ? (
                <img 
                  src={`http://localhost:5000${personalInfo.profileImage}`} 
                  alt={personalInfo.name}
                  className="profile-image"
                />
              ) : (
                <div className="placeholder-image">
                  <span>{personalInfo.name.charAt(0)}</span>
                </div>
              )}
              <div className="image-bg"></div>
            </div>
          </motion.div>
          
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I'm <span className="highlight">{personalInfo.name}</span>
            </motion.h1>
            
            <motion.h2 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {personalInfo.title}
            </motion.h2>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {personalInfo.bio}
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </button>
              {personalInfo.resume && (
                <a 
                  href={`http://localhost:5000${personalInfo.resume}`} 
                  className="btn btn-secondary"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload /> Download Resume
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
