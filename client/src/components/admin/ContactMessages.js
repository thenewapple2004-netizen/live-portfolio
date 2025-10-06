import React, { useState, useEffect, useCallback } from 'react';
import { FaEnvelope, FaEye, FaTrash, FaReply, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { usePortfolio } from '../../context/PortfolioContext';
import toast from 'react-hot-toast';
import './AdminForms.css';

const ContactMessages = () => {
  const { isAuthenticated, getContactMessages } = usePortfolio();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const result = await getContactMessages();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [getContactMessages]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated, fetchMessages]);

  const updateMessageStatus = async (messageId, status) => {
    try {
      await axios.put(`/api/contact/${messageId}`, { status });
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, status } : msg
      ));
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`/api/contact/${messageId}`);
        setMessages(messages.filter(msg => msg._id !== messageId));
        if (selectedMessage?._id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const testEmailConfiguration = async () => {
    try {
      const response = await axios.post('/api/contact/test-email');
      if (response.data.configured) {
        toast.success('✅ Test email sent successfully! Check your inbox.');
      } else {
        toast.error('❌ Email not configured. Please set up your email credentials.');
      }
    } catch (error) {
      console.error('Error testing email:', error);
      toast.error('❌ Failed to send test email. Check your email configuration.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#e53e3e';
      case 'read': return '#3182ce';
      case 'replied': return '#38a169';
      default: return '#718096';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return '🔴';
      case 'read': return '🔵';
      case 'replied': return '🟢';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="admin-form">
        <div className="loading-skeleton">
          <div className="skeleton-line large"></div>
          <div className="skeleton-line medium"></div>
          <div className="skeleton-line small"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-form">
      <div className="form-header">
        <div>
          <h4>Contact Messages</h4>
          <p>Manage messages from your portfolio contact form</p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={testEmailConfiguration}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FaPaperPlane />
          Test Email
        </button>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="empty-state">
              <FaEnvelope />
              <h4>No messages yet</h4>
              <p>Messages from your contact form will appear here</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message._id} 
                className={`message-item ${selectedMessage?._id === message._id ? 'selected' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="message-header">
                  <div className="message-sender">
                    <strong>{message.name}</strong>
                    <span className="message-email">{message.email}</span>
                  </div>
                  <div className="message-meta">
                    <span 
                      className="message-status"
                      style={{ color: getStatusColor(message.status) }}
                    >
                      {getStatusIcon(message.status)} {message.status}
                    </span>
                    <span className="message-date">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="message-subject">{message.subject}</div>
                <div className="message-preview">
                  {message.message.substring(0, 100)}...
                </div>
              </div>
            ))
          )}
        </div>

        {selectedMessage && (
          <div className="message-detail">
            <div className="message-detail-header">
              <h5>{selectedMessage.subject}</h5>
              <div className="message-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => updateMessageStatus(selectedMessage._id, 'read')}
                  title="Mark as Read"
                >
                  <FaEye />
                </button>
                <button 
                  className="action-btn edit-btn"
                  onClick={() => updateMessageStatus(selectedMessage._id, 'replied')}
                  title="Mark as Replied"
                >
                  <FaReply />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => deleteMessage(selectedMessage._id)}
                  title="Delete Message"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="message-detail-content">
              <div className="message-info">
                <div className="info-row">
                  <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
                </div>
                <div className="info-row">
                  <strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
                <div className="info-row">
                  <strong>Status:</strong> 
                  <span style={{ color: getStatusColor(selectedMessage.status) }}>
                    {getStatusIcon(selectedMessage.status)} {selectedMessage.status}
                  </span>
                </div>
              </div>

              <div className="message-body">
                <h6>Message:</h6>
                <p>{selectedMessage.message}</p>
              </div>

              <div className="message-reply">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="btn btn-primary"
                >
                  <FaReply />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
