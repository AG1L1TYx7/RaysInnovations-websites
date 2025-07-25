# replit.md

## Overview

This is a modern static website for an IT consulting company called "Rays Innovations." The application is built using React with TypeScript as a pure frontend application with no backend dependencies, focusing on providing consulting services including AWS cloud solutions, AI development, and web/mobile app development.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application is a pure static single-page application (SPA) with no backend:

- **Frontend**: React + TypeScript with Vite as the build tool
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Routing**: Client-side routing with Wouter
- **Contact Forms**: Uses mailto links to open user's email client
- **Deployment**: Static site that can be hosted on any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- **No Backend**: All backend files removed - pure frontend only

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **Animations**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation

### Contact Forms
- **Contact System**: Uses mailto links to send emails directly from the user's email client
- **Consultation Booking**: Email-based consultation requests
- **Form Validation**: Client-side validation with React Hook Form and Zod

### Static Site Features
- **No Backend Required**: Pure frontend application
- **Email Integration**: Contact forms use mailto links
- **Static Hosting**: Can be deployed to Netlify, Vercel, GitHub Pages, etc.

## Data Flow

1. **Contact Forms**: Users fill out contact forms which are validated on the frontend using Zod schemas
2. **Email Generation**: Form data is formatted into mailto links with proper subject and body
3. **User Email Client**: Clicking submit opens the user's default email client with pre-filled content
4. **Toast Notifications**: Success messages inform users to send the email from their client

## External Dependencies

### Core Dependencies
- **React 18**: UI library
- **TypeScript**: Type safety
- **@radix-ui/***: Headless UI component primitives
- **framer-motion**: Animation library
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Development Tools
- **Vite**: Frontend build tool with hot reload
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

The application is configured as a static site:

1. **Build Process**: Vite builds the React application into static files
2. **Output Directory**: Build outputs to `dist/` directory
3. **Static Hosting**: Can be deployed to any static hosting service

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use GitHub Actions for deployment
- **AWS S3 + CloudFront**: Upload to S3 bucket
- **Any Web Server**: Upload `dist` folder contents

### Key Features
- Responsive design optimized for all device sizes
- SEO-optimized with proper meta tags and structured data
- Professional company website with enhanced service showcases
- Advanced mega menu with categorized services and animations
- 10 comprehensive IT services across multiple categories
- Contact forms with validation and error handling
- Consultation booking system with service-specific modals
- Testimonials and blog sections for content marketing
- Gradient backgrounds and modern UI enhancements
- Interactive service cards with hover effects

### Documentation and Setup (January 2025)
- Added comprehensive README.md with installation and setup instructions
- Clear instructions for local development and production deployment
- Project structure documentation and troubleshooting guide
- Static site deployment options (Netlify, Vercel, GitHub Pages, etc.)
- Environment setup and dependency management instructions

### Recent Enhancements (July 2025)
- Expanded service portfolio from 4 to 10 comprehensive IT services
- Enhanced mega menu with categorized service organization
- Improved service cards layout with better visual hierarchy
- Added new service categories: Cloud, AI & Analytics, Development, Operations & Security
- New services: Azure Consulting, LLM Integration, E-commerce Solutions, DevOps, Cybersecurity, Data Analytics
- Enhanced color palette with support for 10 distinct service colors
- Improved animations and hover effects throughout the interface
- Better responsive grid layouts for service displays
- Updated accent colors for better visual contrast
- Fixed mega menu positioning to stay within viewport using centered fixed positioning
- Removed dedicated services page, mega menu now scrolls to services section on home page
- Enhanced mega menu with interactive service showcase displaying detailed information on hover
- Removed client portal as per user requirement - focused on core business website functionality
- **Converted to Static Site (January 2025)**: Removed all backend dependencies, converted to pure frontend static website
- Contact forms now use mailto links instead of API endpoints
- Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

### Services Section Enhancements (January 2025)
- Ultra-premium service cards with 3D transforms and shimmer effects
- Enhanced floating icons with multiple particle animations and gradient overlays
- Animated statistics cards with spring animations and hover effects
- Advanced CTA buttons with multiple animation layers
- Added custom CSS animations: spin-slow, shimmer, 3D card transforms
- Improved service badges with gradient backgrounds
- Enhanced decorative elements and background patterns

### About Us Section Redesign (January 2025)
- Complete UI overhaul with premium design elements
- Added animated background decorations with morphing shapes
- Interactive timeline showcasing company journey from 2014 to 2024
- Enhanced image gallery with floating statistics cards
- Core values section with animated cards and gradient effects
- Improved typography with gradient text effects
- Added team section preview with CTA
- Custom animations: float-vertical, gradient-border, morph effects
- Integrated react-intersection-observer for scroll-triggered animations