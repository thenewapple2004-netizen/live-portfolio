import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '../context/StaticPortfolioContext';
import './Skills.css';

const Skills = () => {
  const { portfolio, loading } = usePortfolio();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (loading || !portfolio) {
    return (
      <section id="skills" className="skills section">
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

  const { skills } = portfolio;

  if (!skills || skills.length === 0) {
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
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Removed unused skillVariants

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend':
        return '🎨';
      case 'Backend':
        return '⚙️';
      case 'Database':
        return '🗄️';
      case 'Tools':
        return '🛠️';
      default:
        return '💻';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Frontend':
        return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
      case 'Backend':
        return 'linear-gradient(135deg, #10b981, #059669)';
      case 'Database':
        return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
      case 'AI/ML':
        return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'Tools':
        return 'linear-gradient(135deg, #06b6d4, #0891b2)';
      default:
        return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    }
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Skills & Technologies
          </motion.h2>
          
          <div className="skills-grid">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <motion.div 
                key={category}
                className="skill-category"
                variants={itemVariants}
              >
                <div className="category-header">
                  <span className="category-icon">{getCategoryIcon(category)}</span>
                  <h3 className="category-title">{category}</h3>
                </div>
                
                <div className="skills-list">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill._id || skillIndex}
                      className="skill-item"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <motion.span 
                          className="skill-level"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      
                      <div className="skill-bar">
                        <motion.div 
                          className="skill-progress"
                          style={{ background: getCategoryColor(category) }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 2, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="skills-summary"
            variants={itemVariants}
          >
            <div className="summary-stats">
              <div className="stat-item">
                <h4>{skills.length}</h4>
                <p>Technologies</p>
              </div>
              <div className="stat-item">
                <h4>{Object.keys(skillsByCategory).length}</h4>
                <p>Categories</p>
              </div>
              <div className="stat-item">
                <h4>{Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%</h4>
                <p>Average Level</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
