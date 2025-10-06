import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Projects.css';

const Projects = () => {
  const { portfolio, loading } = usePortfolio();
  const [filter, setFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (loading || !portfolio) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-line large"></div>
            <div className="skeleton-line medium"></div>
            <div className="skeleton-line small"></div>
          </div>
        </div>
      </section>
    );
  }

  const { projects } = portfolio;

  if (!projects || projects.length === 0) {
    return null;
  }

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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Removed unused projectVariants

  // Get unique technologies for filtering
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies || []))];
  
  // Filter projects based on selected technology
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.technologies?.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );

  const featuredProjects = projects.filter(project => project.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : filteredProjects;

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Featured Projects
          </motion.h2>
          
          {allTechnologies.length > 0 && (
            <motion.div className="project-filters" variants={itemVariants}>
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Projects
              </button>
              {allTechnologies.slice(0, 6).map((tech, index) => (
                <button 
                  key={index}
                  className={`filter-btn ${filter === tech ? 'active' : ''}`}
                  onClick={() => setFilter(tech)}
                >
                  {tech}
                </button>
              ))}
            </motion.div>
          )}
          
          <div className="projects-grid">
            {displayProjects.map((project, index) => (
              <motion.div 
                key={project._id || index}
                className="project-card"
                whileHover={{ 
                  y: -15,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                  <div className="project-placeholder">
                    <FaCode />
                  </div>
                  )}
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          title="View Live Demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          title="View Source Code"
                        >
                          <FaGithub />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {displayProjects.length === 0 && (
            <motion.div className="no-projects" variants={itemVariants}>
              <FaEye />
              <h3>No projects found</h3>
              <p>Try selecting a different filter or check back later for new projects.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
