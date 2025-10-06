import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBriefcase } from 'react-icons/fa';
import { usePortfolio } from '../../context/StaticPortfolioContext';
import './AdminForms.css';

const ExperienceManager = () => {
  const { portfolio, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: ''
  });

  const experience = portfolio?.experience || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const expData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        startDate: new Date(formData.startDate),
        endDate: formData.current ? null : new Date(formData.endDate)
      };

      if (editingExp) {
        await updateExperience(editingExp._id, expData);
      } else {
        await addExperience(expData);
      }
      
      setShowModal(false);
      setEditingExp(null);
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: ''
      });
    } catch (error) {
      console.error('Error saving experience:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
      current: exp.current || false,
      description: exp.description,
      technologies: exp.technologies?.join(', ') || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (expId) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(expId);
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const openModal = () => {
    setEditingExp(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      technologies: ''
    });
    setShowModal(true);
  };

  return (
    <div className="admin-form">
      <div className="form-header">
        <h4>Experience Management</h4>
        <p>Add and manage your work experience</p>
      </div>

      <div className="item-list">
        {experience.map((exp) => (
          <div key={exp._id} className="list-item">
            <div className="list-item-header">
              <div>
                <div className="list-item-title">{exp.position}</div>
                <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                  {exp.company} • {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                </div>
              </div>
              <div className="list-item-actions">
                <button className="action-btn edit-btn" onClick={() => handleEdit(exp)}>
                  <FaEdit />
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(exp._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4a5568', marginTop: '0.5rem' }}>
              {exp.description}
            </p>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="empty-state">
            <FaBriefcase />
            <h4>No experience added yet</h4>
            <p>Add your work experience to showcase your career</p>
          </div>
        )}

        <button className="add-btn" onClick={openModal}>
          <FaPlus />
          Add New Experience
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingExp ? 'Edit Experience' : 'Add New Experience'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <label>Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                  />
                  Currently working here
                </label>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="3"
                  placeholder="Describe your role and achievements..."
                />
              </div>

              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, AWS"
                />
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
                      {editingExp ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingExp ? 'Update Experience' : 'Add Experience'
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

export default ExperienceManager;
