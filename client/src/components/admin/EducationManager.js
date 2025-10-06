import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaGraduationCap } from 'react-icons/fa';
import { usePortfolio } from '../../context/StaticPortfolioContext';
import './AdminForms.css';

const EducationManager = () => {
  const { portfolio, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: ''
  });

  const education = portfolio?.education || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const eduData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.current ? null : new Date(formData.endDate)
      };

      if (editingEdu) {
        await updateEducation(editingEdu._id, eduData);
      } else {
        await addEducation(eduData);
      }
      
      setShowModal(false);
      setEditingEdu(null);
      setFormData({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: ''
      });
    } catch (error) {
      console.error('Error saving education:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
      endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
      current: edu.current || false,
      gpa: edu.gpa || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (eduId) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await deleteEducation(eduId);
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  const openModal = () => {
    setEditingEdu(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: ''
    });
    setShowModal(true);
  };

  return (
    <div className="admin-form">
      <div className="form-header">
        <h4>Education Management</h4>
        <p>Add and manage your educational background</p>
      </div>

      <div className="item-list">
        {education.map((edu) => (
          <div key={edu._id} className="list-item">
            <div className="list-item-header">
              <div>
                <div className="list-item-title">{edu.degree} in {edu.field}</div>
                <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                  {edu.institution} • {new Date(edu.startDate).toLocaleDateString()} - {edu.current ? 'Present' : new Date(edu.endDate).toLocaleDateString()}
                </div>
              </div>
              <div className="list-item-actions">
                <button className="action-btn edit-btn" onClick={() => handleEdit(edu)}>
                  <FaEdit />
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(edu._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            {edu.gpa && (
              <p style={{ fontSize: '0.9rem', color: '#4a5568', marginTop: '0.5rem' }}>
                GPA: {edu.gpa}
              </p>
            )}
          </div>
        ))}

        {education.length === 0 && (
          <div className="empty-state">
            <FaGraduationCap />
            <h4>No education added yet</h4>
            <p>Add your educational background</p>
          </div>
        )}

        <button className="add-btn" onClick={openModal}>
          <FaPlus />
          Add New Education
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingEdu ? 'Edit Education' : 'Add New Education'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Institution *</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                  placeholder="University/College Name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Degree *</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    required
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
                <div className="form-group">
                  <label>Field of Study *</label>
                  <input
                    type="text"
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                    required
                    placeholder="Computer Science, Engineering, etc."
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

              <div className="form-row">
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.current}
                      onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                    />
                    Currently studying
                  </label>
                </div>
                <div className="form-group">
                  <label>GPA</label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    placeholder="3.8/4.0"
                  />
                </div>
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
                      {editingEdu ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingEdu ? 'Update Education' : 'Add Education'
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

export default EducationManager;
