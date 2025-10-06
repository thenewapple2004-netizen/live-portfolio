import React, { useState } from 'react';
// Removed unused motion import
import { FaPlus, FaEdit, FaTrash, FaCog } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import './AdminForms.css';

const SkillsManager = () => {
  const { portfolio, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: 'Other'
  });

  const skills = portfolio?.skills || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingSkill) {
        await updateSkill(editingSkill._id, formData);
      } else {
        await addSkill(formData);
      }
      
      setShowModal(false);
      setEditingSkill(null);
      setFormData({ name: '', level: 50, category: 'Other' });
    } catch (error) {
      console.error('Error saving skill:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });
    setShowModal(true);
  };

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(skillId);
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const openModal = () => {
    setEditingSkill(null);
    setFormData({ name: '', level: 50, category: 'Other' });
    setShowModal(true);
  };

  return (
    <div className="admin-form">
      <div className="form-header">
        <h4>Skills Management</h4>
        <p>Add and manage your technical skills</p>
      </div>

      <div className="item-list">
        {skills.map((skill) => (
          <div key={skill._id} className="list-item">
            <div className="list-item-header">
              <div>
                <div className="list-item-title">{skill.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                  {skill.category} • {skill.level}%
                </div>
              </div>
              <div className="list-item-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(skill)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(skill._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-progress"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="empty-state">
            <FaCog />
            <h4>No skills added yet</h4>
            <p>Add your first skill to get started</p>
          </div>
        )}

        <button className="add-btn" onClick={openModal}>
          <FaPlus />
          Add New Skill
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., React, Node.js, Python"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Proficiency Level: {formData.level}%</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="range-input"
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
                      {editingSkill ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingSkill ? 'Update Skill' : 'Add Skill'
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

export default SkillsManager;
