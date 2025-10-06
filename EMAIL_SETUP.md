# 📧 Email Notifications Setup Guide

This guide will help you set up email notifications for your portfolio contact form. When someone sends you a message through your portfolio, you'll receive an email notification.

## 🚀 Quick Setup

### Step 1: Create Environment Variables

Create a `.env` file in your project root with the following content:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here

# Email Configuration (for contact form notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=your_email@gmail.com

# CORS Configuration
CORS_ORIGIN=*
```

### Step 2: Set Up Gmail App Password

Since you're using Gmail, you need to create an App Password:

1. **Go to your Google Account settings**
   - Visit: https://myaccount.google.com/
   - Click on "Security" in the left sidebar

2. **Enable 2-Step Verification** (if not already enabled)
   - Under "Signing in to Google", click "2-Step Verification"
   - Follow the setup process

3. **Generate App Password**
   - Go back to "Security"
   - Under "Signing in to Google", click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "Portfolio Contact Form" as the name
   - Copy the generated 16-character password

4. **Update your .env file**
   - Replace `your_app_password_here` with the generated App Password

### Step 3: Test Email Notifications

1. **Restart your server**
   ```bash
   npm start
   ```

2. **Test the contact form**
   - Go to your portfolio website
   - Navigate to the contact section
   - Send a test message
   - Check your email for the notification

## 📧 Email Features

### What You'll Receive:
- **Beautiful HTML email** with your portfolio branding
- **Contact details** (name, email, subject)
- **Full message content** with proper formatting
- **Timestamp** of when the message was sent
- **Direct reply capability** - you can reply directly to the email

### Email Template Includes:
- 🎨 **Professional design** matching your portfolio theme
- 📱 **Mobile-responsive** layout
- 🔗 **Clickable email links** for easy contact
- ⏰ **Timestamp** and source information
- 💬 **Formatted message** with proper line breaks

## 🔧 Troubleshooting

### Common Issues:

1. **"Authentication failed" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify 2-Step Verification is enabled

2. **"Less secure app access" error**
   - Use App Passwords instead of enabling less secure apps
   - App Passwords are more secure

3. **Emails not being received**
   - Check your spam/junk folder
   - Verify the EMAIL_USER in .env matches your Gmail address
   - Check server console for error messages

4. **"Invalid login" error**
   - Double-check the App Password (16 characters, no spaces)
   - Make sure EMAIL_SERVICE is set to "gmail"

### Server Console Messages:
- ✅ `Email notification sent successfully` - Email sent successfully
- ❌ `Failed to send email notification` - Check your email configuration
- ⚠️ `Email notifications not configured` - Set up EMAIL_USER and EMAIL_PASS

## 🔒 Security Notes

- **Never commit your .env file** to version control
- **Use App Passwords** instead of your main Gmail password
- **Keep your App Password secure** and don't share it
- **Regularly rotate** your App Password for security

## 📱 Alternative Email Services

If you prefer not to use Gmail, you can use other email services:

### Outlook/Hotmail:
```env
EMAIL_SERVICE=hotmail
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your_password
```

### Yahoo:
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your_app_password
```

### Custom SMTP:
```env
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your_password
```

## 🎯 Next Steps

Once email notifications are working:

1. **Test thoroughly** with different message types
2. **Set up email filters** in Gmail to organize portfolio messages
3. **Consider auto-replies** for immediate acknowledgment
4. **Monitor email delivery** and check spam folders regularly

---

**Need help?** Check the server console for detailed error messages and ensure all environment variables are correctly set.

