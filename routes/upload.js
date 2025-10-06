const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    
    // Create subdirectories based on file type
    if (file.fieldname === 'profileImage') {
      uploadPath = path.join(uploadsDir, 'images');
    } else if (file.fieldname === 'resume') {
      uploadPath = path.join(uploadsDir, 'documents');
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profileImage') {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile image'), false);
    }
  } else if (file.fieldname === 'resume') {
    // Allow only PDF and DOC files
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed for resume'), false);
    }
  } else {
    cb(new Error('Invalid field name'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Upload profile image
router.post('/profile-image', auth, adminAuth, upload.single('profileImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;
    
    res.json({
      message: 'Profile image uploaded successfully',
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({ message: 'Error uploading profile image', error: error.message });
  }
});

// Upload resume
router.post('/resume', auth, adminAuth, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/documents/${req.file.filename}`;
    
    res.json({
      message: 'Resume uploaded successfully',
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: 'Error uploading resume', error: error.message });
  }
});

// Upload multiple files (profile image and resume)
router.post('/files', auth, adminAuth, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), (req, res) => {
  try {
    const result = {};
    
    if (req.files.profileImage) {
      result.profileImage = {
        fileUrl: `/uploads/images/${req.files.profileImage[0].filename}`,
        filename: req.files.profileImage[0].filename
      };
    }
    
    if (req.files.resume) {
      result.resume = {
        fileUrl: `/uploads/documents/${req.files.resume[0].filename}`,
        filename: req.files.resume[0].filename
      };
    }
    
    res.json({
      message: 'Files uploaded successfully',
      files: result
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Error uploading files', error: error.message });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Unexpected field name' });
    }
  }
  
  if (error.message.includes('Only image files are allowed')) {
    return res.status(400).json({ message: 'Only image files (JPG, PNG, GIF) are allowed for profile image' });
  }
  
  if (error.message.includes('Only PDF and DOC files are allowed')) {
    return res.status(400).json({ message: 'Only PDF and DOC files are allowed for resume' });
  }
  
  res.status(500).json({ message: 'Upload error', error: error.message });
});

module.exports = router;

