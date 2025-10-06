const express = require('express');
const nodemailer = require('nodemailer');
const { Contact } = require('../config/models');
const { auth, adminAuth } = require('../middleware/auth');
const { config } = require('../config/config');

const router = express.Router();

// Send contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    // Send email notification to portfolio owner
    if (config.email.user && config.email.pass) {
      try {
        const transporter = nodemailer.createTransporter({
          service: config.email.service,
          auth: {
            user: config.email.user,
            pass: config.email.pass
          }
        });

        const mailOptions = {
          from: config.email.from,
          to: config.email.user, // Send to your email
          subject: `📧 New Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone contacted you through your portfolio website</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #333; margin-bottom: 10px; font-size: 18px;">👤 Contact Details</h3>
                  <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                  <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${subject}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #333; margin-bottom: 10px; font-size: 18px;">💬 Message</h3>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                    <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #888; font-size: 14px; margin: 0;">
                    This message was sent from your portfolio contact form at <strong>${new Date().toLocaleString()}</strong>
                  </p>
                  <p style="color: #888; font-size: 12px; margin: 10px 0 0 0;">
                    Reply directly to this email to respond to ${name}
                  </p>
                </div>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send email notification:', emailError.message);
        // Don't fail the entire request if email fails
      }
    } else {
      console.log('⚠️  Email notifications not configured. Please set EMAIL_USER and EMAIL_PASS in your environment variables.');
    }

    res.status(201).json({ 
      message: 'Message sent successfully! I\'ll get back to you soon.' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to send message. Please try again.', 
      error: error.message 
    });
  }
});

// Get all contact messages (admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact status (admin only)
router.put('/:contactId', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact status updated', contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete contact message (admin only)
router.delete('/:contactId', auth, adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Test email configuration (admin only)
router.post('/test-email', auth, adminAuth, async (req, res) => {
  try {
    if (!config.email.user || !config.email.pass) {
      return res.status(400).json({ 
        message: 'Email not configured. Please set EMAIL_USER and EMAIL_PASS in your environment variables.',
        configured: false
      });
    }

    const transporter = nodemailer.createTransporter({
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });

    const mailOptions = {
      from: config.email.from,
      to: config.email.user,
      subject: '🧪 Portfolio Email Test - Configuration Working!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">✅ Email Configuration Test</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your portfolio email notifications are working correctly!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">🎉 Success!</h3>
              <p style="color: #555; line-height: 1.6;">
                This is a test email to confirm that your portfolio contact form email notifications are properly configured and working.
              </p>
            </div>
            
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin-bottom: 20px;">
              <h4 style="color: #0c4a6e; margin: 0 0 10px 0;">📧 Email Configuration Details:</h4>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>Service:</strong> ${config.email.service}</p>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>From:</strong> ${config.email.from}</p>
              <p style="margin: 5px 0; color: #0c4a6e;"><strong>To:</strong> ${config.email.user}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 14px; margin: 0;">
                Test sent at <strong>${new Date().toLocaleString()}</strong>
              </p>
              <p style="color: #888; font-size: 12px; margin: 10px 0 0 0;">
                You can now receive notifications when someone contacts you through your portfolio!
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      message: 'Test email sent successfully! Check your inbox.',
      configured: true,
      email: config.email.user
    });
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    res.status(500).json({ 
      message: 'Failed to send test email. Check your email configuration.',
      error: error.message,
      configured: false
    });
  }
});

module.exports = router;
