import React, { useState } from 'react';
// Removed unused motion import
import { FaPlus, FaEdit, FaTrash, FaCode } from 'react-icons/fa';
import { usePortfolio } from '../../context/StaticPortfolioContext';
import './AdminForms.css';

const ProjectsManager = () => {
  const { portfolio, addProject, updateProject, deleteProject } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });

  const projects = portfolio?.projects || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
      };

      if (editingProject) {
        await updateProject(editingProject._id, projectData);
      } else {
        await addProject(projectData);
      }
      
      setShowModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        image: '',
        liveUrl: '',
        githubUrl: '',
        featured: false
      });
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false
    });
    setShowModal(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const openModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
    setShowModal(true);
  };

  return (
    <div className="admin-form">
      <div className="form-header">
        <h4>Projects Management</h4>
        <p>Add and manage your portfolio projects</p>
      </div>

      <div className="item-list">
        {projects.map((project) => (
          <div key={project._id} className="list-item">
            <div className="list-item-header">
              <div>
                <div className="list-item-title">
                  {project.title}
                  {project.featured && <span className="featured-badge">Featured</span>}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                  {project.technologies?.join(', ')}
                </div>
              </div>
              <div className="list-item-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(project._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4a5568', marginTop: '0.5rem' }}>
              {project.description}
            </p>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="empty-state">
            <FaCode />
            <h4>No projects added yet</h4>
            <p>Add your first project to showcase your work</p>
          </div>
        )}

        <button className="add-btn" onClick={openModal}>
          <FaPlus />
          Add New Project
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g., E-commerce Website"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="3"
                  placeholder="Describe your project..."
                />
              </div>

              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured Project
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      {editingProject ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingProject ? 'Update Project' : 'Add Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
