# 🔐 Admin Authentication Setup Guide

This guide will help you set up admin authentication for your portfolio website. The admin panel allows you to manage your portfolio content, view contact messages, and update your information.

## 🚀 Quick Setup

### Option 1: Automatic Setup (Recommended)

Run this command in your project root:

```bash
node -e "
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const hashedPassword = await bcrypt.hash('YourSecurePassword123!', 12);
    
    await User.findOneAndUpdate(
      { email: 'your_email@gmail.com' },
      {
        username: 'Admin User',
        email: 'your_email@gmail.com',
        password: hashedPassword
      },
      { upsert: true, new: true }
    );
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: your_email@gmail.com');
    console.log('🔑 Password: YourSecurePassword123!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
"
```

This will create an admin user with:
- **Username**: `Admin User`
- **Password**: `YourSecurePassword123!`
- **Email**: `your_email@gmail.com`

### Step 2: Test Login
1. Go to your portfolio website
2. Click "Sign In" in the navbar
3. Use the credentials above
4. You should be redirected to the admin dashboard

### Step 3: Change Default Password
After first login, update the password in the admin panel or database.

---

## Option 2: Manual Database Setup

### Using MongoDB Compass or CLI:

1. **Connect to your database**
2. **Navigate to the `users` collection**
3. **Insert a new document:**

```json
{
  "username": "Admin User",
  "email": "your_email@gmail.com",
  "password": "$2a$12$hashed_password_here"
}
```

**Note**: The password must be hashed using bcrypt with 12 rounds.

### Generate Hashed Password:

```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 12))"
```

---

## 🔧 Admin Panel Features

Once logged in, you can:

### 📊 Dashboard
- View contact messages
- See portfolio statistics
- Quick access to all management tools

### 👤 Personal Information
- Update your name, title, and bio
- Change contact information
- Upload profile image
- Manage resume/CV

### 🛠️ Skills Management
- Add, edit, or remove skills
- Set skill levels and categories
- Organize skills by type

### 💼 Experience Management
- Add work experience entries
- Update job descriptions
- Manage employment history

### 🎓 Education Management
- Add educational background
- Update degrees and certifications
- Manage academic achievements

### 🚀 Projects Management
- Add new projects
- Update project descriptions
- Manage project links and images
- Showcase your work

### 📧 Contact Messages
- View all contact form submissions
- Reply to inquiries
- Manage communication

---

## 🔒 Security Best Practices

### Password Security:
- Use a strong, unique password
- Change default password immediately
- Consider using a password manager
- Enable 2FA if available

### Access Control:
- Limit admin access to trusted devices
- Log out when finished
- Monitor admin activity
- Regular security updates

### Environment Variables:
- Keep credentials in `.env` file
- Never commit sensitive data
- Use different passwords for different environments

---

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Double-check username and password
   - Ensure user exists in database
   - Verify password is correctly hashed

2. **"Database connection failed"**
   - Check MONGODB_URI in .env file
   - Verify database is accessible
   - Check network connection

3. **"JWT token invalid"**
   - Check JWT_SECRET in .env file
   - Ensure token hasn't expired
   - Try logging in again

4. **Admin panel not loading**
   - Check browser console for errors
   - Verify all routes are working
   - Check server logs

### Server Console Messages:
- ✅ `Admin user created successfully` - Setup completed
- ❌ `Authentication failed` - Check credentials
- ⚠️ `Database connection error` - Check MONGODB_URI

---

## 📱 Mobile Access

The admin panel is fully responsive and works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

---

## 🎯 Next Steps

After setting up admin access:

1. **Change default password** immediately
2. **Update personal information** with your details
3. **Add your skills and experience**
4. **Upload projects and portfolio items**
5. **Test contact form** and email notifications
6. **Customize the design** to match your brand

---

**Need help?** Check the server console for detailed error messages and ensure all environment variables are correctly set in your `.env` file.
