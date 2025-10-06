import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './About.css';

const About = () => {
  const { portfolio, loading } = usePortfolio();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (loading || !portfolio) {
    return (
      <section id="about" className="about section">
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

  const { personalInfo, experience, education } = portfolio;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
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

  const featureVariants = {
    hidden: { y: 30, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  };

  const features = [
    {
      icon: <FaCode />,
      title: "Clean Code",
      description: "I write maintainable and scalable code following best practices and design patterns."
    },
    {
      icon: <FaRocket />,
      title: "Performance",
      description: "Optimized applications with fast loading times and smooth user experiences."
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Experienced in working with teams and contributing to open-source projects."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Always exploring new technologies and finding creative solutions to problems."
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            About Me
          </motion.h2>
          
          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              <h3>Hello! I'm {personalInfo.name}</h3>
              <p>{personalInfo.bio}</p>
              
              <div className="about-details">
                <div className="detail-item">
                  <strong>Location:</strong> {personalInfo.location || 'Available Worldwide'}
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> {personalInfo.email}
                </div>
                {personalInfo.phone && (
                  <div className="detail-item">
                    <strong>Phone:</strong> {personalInfo.phone}
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div className="about-features" variants={itemVariants}>
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-card"
                  variants={featureVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="feature-icon"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {(experience?.length > 0 || education?.length > 0) && (
            <motion.div className="timeline-section" variants={itemVariants}>
              <h3>Experience & Education</h3>
              
              <div className="timeline">
                {experience?.map((exp, index) => (
                  <motion.div 
                    key={index}
                    className="timeline-item"
                    variants={itemVariants}
                  >
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>{exp.position}</h4>
                      <h5>{exp.company}</h5>
                      <p className="timeline-date">
                        {new Date(exp.startDate).toLocaleDateString()} - 
                        {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString()}
                      </p>
                      <p>{exp.description}</p>
                      {exp.technologies?.length > 0 && (
                        <div className="tech-tags">
                          {exp.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {education?.map((edu, index) => (
                  <motion.div 
                    key={`edu-${index}`}
                    className="timeline-item"
                    variants={itemVariants}
                  >
                    <div className="timeline-marker education"></div>
                    <div className="timeline-content">
                      <h4>{edu.degree} in {edu.field}</h4>
                      <h5>{edu.institution}</h5>
                      <p className="timeline-date">
                        {new Date(edu.startDate).toLocaleDateString()} - 
                        {edu.current ? ' Present' : new Date(edu.endDate).toLocaleDateString()}
                      </p>
                      {edu.gpa && <p><strong>GPA:</strong> {edu.gpa}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
