# Portfolio Setup Guide

This guide will walk you through setting up your professional portfolio step by step.

## 🚀 Quick Start

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free)
- **Git** - [Download here](https://git-scm.com/)

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd professional-portfolio

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email (Optional - for contact form)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Environment
NODE_ENV=development
```

**Important Notes:**
- Replace `your_super_secret_jwt_key_here` with a strong, random string
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- If using MongoDB Atlas, replace the URI with your connection string

### 4. Start Development

```bash
# Start both frontend and backend
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:3000`

## 🎨 Customizing Your Portfolio

### 1. First Time Setup

1. **Access Admin Panel**
   - Go to `http://localhost:3000/admin`
   - Create your admin account (first user becomes admin)

2. **Add Personal Information**
   - Fill in your name, title, and bio
   - Add your contact information
   - Upload a profile image (use a URL or local file)
   - Add your social media links

### 2. Adding Content

#### Skills
- Go to Skills section in admin panel
- Add your technical skills
- Set proficiency levels (1-100%)
- Categorize skills (Frontend, Backend, Database, Tools, Other)

#### Projects
- Add your portfolio projects
- Include project images, descriptions, and links
- Mark featured projects to highlight them
- Add technologies used for each project

#### Experience & Education
- Add your work experience with detailed descriptions
- Include your educational background
- Add relevant technologies for each position

### 3. Customizing Design

#### Colors
Edit the CSS files to match your brand:
- Main colors: `client/src/index.css`
- Component colors: Individual component CSS files
- Gradient backgrounds: Look for `linear-gradient` in CSS files

#### Fonts
- Change font family in `client/src/index.css`
- Import new fonts from Google Fonts in `client/public/index.html`

#### Animations
- Modify Framer Motion animations in component files
- Adjust timing and easing in `transition` props

## 📱 Making It Your Own

### 1. Branding
- Update the site title in `client/public/index.html`
- Change the favicon in `client/public/`
- Modify the logo text in the navbar

### 2. Content Structure
- Add new sections by creating components
- Modify existing sections to fit your needs
- Update the navigation menu

### 3. Advanced Customization
- Add new API endpoints in the backend
- Create custom admin panels for new features
- Integrate with external services (analytics, CMS, etc.)

## 🚀 Deployment Options

### Option 1: Heroku (Recommended for beginners)

1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-portfolio-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_email_password
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push heroku main
   ```

### Option 2: Vercel + MongoDB Atlas

1. **Deploy frontend to Vercel**
   - Connect your GitHub repository
   - Set build command: `cd client && npm run build`
   - Set output directory: `client/build`

2. **Deploy backend separately**
   - Use Railway, Render, or similar service
   - Update frontend API calls to use your backend URL

### Option 3: Full-stack on DigitalOcean

1. **Create App Platform app**
2. **Connect your repository**
3. **Set environment variables**
4. **Deploy with one click**

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# For local MongoDB
brew services start mongodb-community

# For MongoDB Atlas, check your connection string
```

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear client cache
cd client
rm -rf node_modules package-lock.json
npm install
```

#### Email Not Working
- Use App Passwords for Gmail
- Check firewall settings
- Verify email credentials

#### Admin Panel Not Loading
- Check browser console for errors
- Verify JWT token in localStorage
- Ensure user has admin role

### Getting Help

1. **Check the console** for error messages
2. **Review the logs** in your terminal
3. **Search issues** in the repository
4. **Create an issue** with detailed error information

## 📚 Next Steps

### After Setup
1. **Add your content** through the admin panel
2. **Test all features** thoroughly
3. **Customize the design** to match your brand
4. **Deploy to production**
5. **Share your portfolio** with the world!

### Advanced Features
- Add a blog section
- Implement dark mode
- Add analytics tracking
- Create custom animations
- Integrate with external APIs

## 🎯 Tips for Success

1. **Keep it updated** - Regularly add new projects and skills
2. **Optimize images** - Use compressed images for faster loading
3. **Test on mobile** - Ensure your portfolio looks great on all devices
4. **SEO optimization** - Add meta tags and descriptions
5. **Performance** - Monitor loading times and optimize accordingly

---

**Need help?** Check the main README.md or create an issue in the repository!
