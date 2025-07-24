# Rays Innovations - IT Consulting Website

A modern, full-stack web application for Rays Innovations, an IT consulting company offering AWS cloud solutions, AI development, web/mobile app development, and comprehensive IT services.

## 🚀 Features

- **Professional Business Website**: Modern design with animations and interactive elements
- **Service Showcase**: 10 comprehensive IT services with detailed descriptions
- **Interactive Mega Menu**: Categorized service navigation with hover effects
- **Contact System**: Form submissions with database storage
- **Consultation Booking**: Service-specific consultation requests
- **Blog Section**: SEO-optimized content for thought leadership
- **Legal Pages**: Privacy Policy, Terms of Service, and Cookie Policy
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components (built on Radix UI)
- **Framer Motion** for animations
- **Wouter** for routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database (Neon serverless)
- **Drizzle ORM** for type-safe database queries
- **Zod** for schema validation

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- PostgreSQL database (local or cloud)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rays-innovations
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/rays_innovations
   
   # Or use Neon serverless PostgreSQL
   # DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   
   The application uses Drizzle ORM with PostgreSQL. Run the following command to push the schema to your database:
   ```bash
   npm run db:push
   ```

## 🏃‍♂️ Running Locally

1. **Start the development server**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend development server with hot reload
   - All API routes available at `/api/*`

2. **Access the application**
   
   Open your browser and navigate to `http://localhost:5000`

## 📁 Project Structure

```
rays-innovations/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and constants
│   │   └── App.tsx       # Main app component
│   └── index.html        # Entry HTML file
│
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Storage interface & implementation
│   ├── db.ts            # Database connection
│   └── vite.ts          # Vite integration for production
│
├── shared/               # Shared types and schemas
│   └── schema.ts        # Drizzle schema definitions
│
├── drizzle.config.ts    # Drizzle ORM configuration
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 💾 Database Information

### Database Schema

The application stores data in PostgreSQL with the following tables:

1. **users** - User information (currently unused in frontend)
   - id (varchar, primary key)
   - email (varchar, unique)
   - firstName (varchar)
   - lastName (varchar)
   - profileImageUrl (varchar)
   - createdAt (timestamp)
   - updatedAt (timestamp)

2. **inquiries** - Contact form submissions
   - id (serial, primary key)
   - name (varchar)
   - email (varchar)
   - phone (varchar, optional)
   - message (text)
   - serviceType (varchar) - Selected service category
   - createdAt (timestamp)

3. **consultation_bookings** - Consultation requests
   - id (serial, primary key)
   - name (varchar)
   - email (varchar)
   - phone (varchar)
   - company (varchar, optional)
   - serviceId (varchar) - Specific service requested
   - serviceTitle (varchar)
   - projectDescription (text)
   - budget (varchar, optional)
   - timeline (varchar, optional)
   - preferredContactMethod (varchar)
   - preferredTimeSlot (varchar, optional)
   - createdAt (timestamp)

### Database Location

- **Development**: Uses in-memory storage by default (MemStorage class) if DATABASE_URL is not set
- **Production**: Requires PostgreSQL database connection via DATABASE_URL environment variable
- **Recommended**: Use Neon serverless PostgreSQL for easy setup and scalability

### Setting up Neon Database (Recommended)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your `.env` file as `DATABASE_URL`

## 🚀 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```
   
   This creates:
   - Optimized frontend assets in `dist/public/`
   - Compiled backend code in `dist/`

2. **Run in production**
   ```bash
   npm start
   ```

## 🔒 Environment Variables

### Required for Production
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Set to "production"

### Optional
- `PORT` - Server port (default: 5000)
- `SESSION_SECRET` - For session management (auto-generated if not provided)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## 🤝 API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/consultation` - Book a consultation
- `GET /api/health` - Health check endpoint

## 🎨 Customization

### Updating Company Information
Edit the relevant components in `client/src/components/`:
- `HeroSection.tsx` - Hero content and CTAs
- `ServicesSection.tsx` - Service offerings
- `AboutSection.tsx` - Company information
- `Footer.tsx` - Footer content and links

### Adding New Services
1. Update `SERVICES` constant in `client/src/lib/constants.ts`
2. Add corresponding content and icons
3. Update color schemes if needed

### Modifying Styles
- Global styles: `client/src/index.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles use Tailwind utility classes

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL is correct
- Check network connectivity for cloud databases
- Run `npm run db:push` to ensure schema is up to date

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 18.x or higher
- Check for TypeScript errors: `npx tsc --noEmit`

### Development Server Issues
- Check if port 5000 is available
- Clear Vite cache: `rm -rf node_modules/.vite`
- Restart the development server

## 📄 License

This project is proprietary software for Rays Innovations.

## 👥 Support

For support, email support@raysinnovations.com or contact through the website's contact form.