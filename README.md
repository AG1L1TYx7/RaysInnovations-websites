# Rays Innovations - Corporate Website

A modern, responsive corporate website for Rays Innovations IT consulting company, built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern React Application**: Built with React 18 and TypeScript
- **Responsive Design**: Optimized for all device sizes
- **Interactive UI**: Smooth animations with Framer Motion
- **Service Showcase**: 10 comprehensive IT services with detailed modals
- **Contact System**: Email-based contact forms with validation
- **SEO Optimized**: Proper meta tags and structured data
- **Professional Design**: Modern UI with Tailwind CSS and shadcn/ui components

## 📋 Prerequisites

Before running this application locally, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rays-innovations-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5000
- **Network**: http://0.0.0.0:5000

### 4. View the Application

Open your browser and navigate to `http://localhost:5000` to see the website.

## 📁 Project Structure

```
rays-innovations-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and constants
│   │   ├── hooks/         # Custom React hooks
│   │   └── main.tsx       # Application entry point
│   ├── index.html         # HTML template
│   └── public/            # Static assets
├── server/                # Development server configuration
│   └── index.ts          # Vite development server setup
├── attached_assets/       # Project assets and images
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Preview production build
- `npm run check` - Type check with TypeScript

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The application runs as a static frontend.

### Customization

- **Services**: Edit `client/src/lib/constants.ts` to modify services
- **Styling**: Customize colors and themes in `client/src/index.css`
- **Content**: Update component files in `client/src/components/`

## 📱 Features Overview

### Services Section
- **Cloud Solutions**: AWS, Azure consulting
- **AI & Analytics**: LLM integration, data analytics
- **Development**: Web, mobile, e-commerce solutions
- **Operations**: DevOps, cybersecurity services

### Contact System
- Form validation with Zod schemas
- Email integration via mailto links
- Consultation booking modals
- Service-specific inquiries

### Interactive Elements
- Animated hero section with image slider
- Mega menu with service categories
- Testimonials carousel
- Smooth scroll navigation
- Responsive mobile menu

## 🚢 Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Deployment Options

1. **Static Hosting Services**:
   - Netlify: Drag and drop the `dist` folder
   - Vercel: Connect your Git repository
   - GitHub Pages: Use GitHub Actions

2. **Web Servers**:
   - Upload `dist` folder contents to any web server
   - Configure server to serve `index.html` for all routes

3. **Cloud Platforms**:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Dependencies Issues**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Errors**:
   ```bash
   # Check TypeScript errors
   npm run check
   ```

### Development Server Issues

If you encounter host-related errors, the server is configured to allow:
- localhost
- 127.0.0.1
- 0.0.0.0
- Replit domains (for Replit deployments)

## 📧 Contact Information

For support or inquiries about this project:
- **Email**: contact@raysinnovations.com
- **Website**: https://raysinnovations.com

## 📄 License

This project is proprietary to Rays Innovations. All rights reserved.

---

**Built with ❤️ by Rays Innovations Development Team**