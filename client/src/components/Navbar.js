import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { usePortfolio } from '../context/StaticPortfolioContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-text">Portfolio</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <div className="nav-item">
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
          </div>
          <div className="nav-item">
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
          </div>
          <div className="nav-item">
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </button>
          </div>
          <div className="nav-item">
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
          </div>
          <div className="nav-item">
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
          
          <div className="nav-item">
            <Link to={isAuthenticated ? "/admin" : "/signin"} className="nav-link admin-link">
              <FaUser /> Admin
            </Link>
          </div>
          
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
