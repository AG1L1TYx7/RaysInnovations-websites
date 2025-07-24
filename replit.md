# replit.md

## Overview

This is a modern full-stack web application for an IT consulting company called "Rays Innovations." The application is built using React with TypeScript on the frontend and Express.js on the backend, with a focus on providing consulting services including AWS cloud solutions, AI development, and web/mobile app development.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React + TypeScript with Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Deployment**: Configured for production builds with static file serving

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **Animations**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL, using Neon serverless database
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development
- **API Routes**: Contact form submission and consultation booking endpoints

### Database Schema
The application uses three main tables:
- **users**: Basic user authentication (currently unused in frontend)
- **inquiries**: Contact form submissions with service type classification
- **consultation_bookings**: Detailed consultation requests with scheduling preferences

## Data Flow

1. **Contact Forms**: Users submit contact requests which are validated on the frontend using Zod schemas
2. **API Processing**: Backend validates data again and stores in database using the storage interface
3. **Error Handling**: Comprehensive error handling with user-friendly messages
4. **Response Flow**: Success/error states are communicated back to frontend with toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **framer-motion**: Animation library
- **wouter**: Lightweight React router

### Development Tools
- **Vite**: Frontend build tool with hot reload
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Backend bundling for production

## Deployment Strategy

The application is configured for a two-step build process:

1. **Frontend Build**: Vite builds the React application into static files
2. **Backend Build**: ESBuild bundles the Express server for production
3. **Static Serving**: Production server serves frontend assets and API routes
4. **Database**: Uses Neon serverless PostgreSQL for production database

### Environment Configuration
- Development: Uses in-memory storage fallback with Vite dev server
- Production: Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Build outputs to `dist/` directory with public assets in `dist/public/`

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