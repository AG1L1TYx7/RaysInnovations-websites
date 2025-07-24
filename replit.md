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
- Professional company website with service showcases
- Contact forms with validation and error handling
- Consultation booking system
- Testimonials and blog sections for content marketing