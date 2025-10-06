import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Footer.css';

const Footer = () => {
  const { portfolio } = usePortfolio();
  const currentYear = new Date().getFullYear();

  if (!portfolio) {
    return null;
  }

  const { personalInfo, socialLinks } = portfolio;

  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-main">
            <div className="footer-info">
              <h3>{personalInfo.name}</h3>
              <p>{personalInfo.title}</p>
              <p className="footer-bio">
                {personalInfo.bio.length > 100 
                  ? `${personalInfo.bio.substring(0, 100)}...` 
                  : personalInfo.bio
                }
              </p>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <span>Email:</span>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
              {personalInfo.phone && (
                <div className="contact-item">
                  <span>Phone:</span>
                  <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </div>
              )}
              {personalInfo.location && (
                <div className="contact-item">
                  <span>Location:</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-social">
              {socialLinks?.github && (
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              {socialLinks?.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Twitter"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
            
            <div className="footer-copyright">
              <p>
                © {currentYear} {personalInfo.name}. Made with{' '}
                <FaHeart className="heart-icon" /> using React & Node.js
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
