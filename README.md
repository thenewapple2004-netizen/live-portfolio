# Professional Portfolio - MERN Stack

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a beautiful frontend with smooth animations and a comprehensive admin panel for content management.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Sections**:
  - Hero section with animated text and social links
  - About section with timeline for experience/education
  - Skills section with animated progress bars
  - Projects showcase with filtering
  - Contact form with email integration
- **Smooth Animations**: Powered by Framer Motion
- **Modern UI Components**: Built with React and styled with CSS

### Backend
- **RESTful API**: Complete API for portfolio management
- **Authentication**: JWT-based authentication system
- **Database**: MongoDB with Mongoose ODM
- **Email Integration**: Contact form with email notifications
- **File Upload**: Support for image and document uploads

### Admin Panel
- **Content Management**: Easy-to-use admin interface
- **Real-time Updates**: Changes reflect immediately on the frontend
- **Sections**:
  - Personal Information
  - Skills Management
  - Projects Management
  - Experience & Education
  - Contact Messages
- **Live Preview**: Preview changes before publishing

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- React Icons
- Axios (HTTP client)
- React Hot Toast (notifications)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (authentication)
- Bcryptjs (password hashing)
- Nodemailer (email)
- Multer (file uploads)
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd professional-portfolio
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) servers.

## 🚀 Deployment

### Heroku Deployment

1. **Prepare for production**
   ```bash
   npm run build
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-portfolio-app
   ```

3. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_email_password
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Other Platforms
- **Vercel**: Deploy frontend, use MongoDB Atlas for database
- **Netlify**: Deploy frontend, use external API hosting
- **DigitalOcean**: Full-stack deployment with App Platform

## 📱 Usage

### First Time Setup

1. **Access the admin panel**
   - Navigate to `/admin` in your browser
   - Create an admin account (first user becomes admin)

2. **Configure your portfolio**
   - Add personal information
   - Upload profile image
   - Add skills with proficiency levels
   - Create project entries
   - Add work experience and education

3. **Customize the design**
   - Update colors in CSS files
   - Modify animations in component files
   - Add your own styling

### Admin Panel Features

- **Personal Info**: Name, title, bio, contact details, social links
- **Skills**: Add technical skills with proficiency levels and categories
- **Projects**: Showcase your work with images, descriptions, and links
- **Experience**: Add work history with detailed descriptions
- **Education**: Add educational background
- **Messages**: View and manage contact form submissions

## 🎨 Customization

### Colors and Styling
- Main colors are defined in CSS custom properties
- Gradient backgrounds can be modified in component CSS files
- Font family can be changed in `index.css`

### Adding New Sections
1. Create new component in `client/src/components/`
2. Add route in `App.js`
3. Create corresponding API endpoint in backend
4. Add to admin panel if needed

### Modifying Animations
- Framer Motion animations are defined in each component
- Modify `variants` objects to change animation behavior
- Adjust timing and easing in `transition` props

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Portfolio
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update portfolio data
- `POST /api/portfolio/projects` - Add new project
- `PUT /api/portfolio/projects/:id` - Update project
- `DELETE /api/portfolio/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/:id` - Update message status
- `DELETE /api/contact/:id` - Delete message

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for cloud databases

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Email Not Working**
   - Check email credentials in `.env`
   - Enable "Less secure app access" for Gmail
   - Use app-specific passwords

4. **Admin Panel Access**
   - Ensure you're logged in
   - Check JWT token in browser storage
   - Verify user role is 'admin'

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the documentation

## 🎯 Future Enhancements

- [ ] Blog section
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] SEO optimization
- [ ] Progressive Web App features
- [ ] Advanced project filtering
- [ ] Resume builder
- [ ] Testimonials section

---

**Built with ❤️ using the MERN stack**
