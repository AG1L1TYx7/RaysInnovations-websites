# Rays Innovations - IT Consulting Website

A modern, static website for Rays Innovations, an IT consulting company offering AWS cloud solutions, AI development, web/mobile app development, and comprehensive IT services. This is a pure frontend application with no backend dependencies.

## 🚀 Features

- **Professional Business Website**: Modern design with animations and interactive elements
- **Service Showcase**: 10 comprehensive IT services with detailed descriptions
- **Interactive Mega Menu**: Categorized service navigation with hover effects
- **Contact System**: Email integration via mailto links
- **Consultation Booking**: Direct email consultation requests
- **Blog Section**: SEO-optimized static content
- **Legal Pages**: Privacy Policy, Terms of Service, and Cookie Policy
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Static Deployment**: Can be hosted on any static hosting service

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components (built on Radix UI)
- **Framer Motion** for animations
- **Wouter** for client-side routing
- **React Hook Form** with Zod validation
- **Font Awesome** for icons

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

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

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be running at http://localhost:5173

## 🏗️ Building for Production

1. **Build the static site**
   ```bash
   npm run build
   ```
   
   This will create a `dist` directory with all static files.

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Quick Build
```bash
./build-static.sh
```

This script will install dependencies and build the static site.

### Deployment Options

The built static site in the `dist` directory can be deployed to any static hosting service:

#### Netlify
1. Build the site: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the `dist` folder

Or use the included `netlify.toml` configuration:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Vercel
Using the included `vercel.json` configuration:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
1. Build the site: `npm run build`
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Set source to the `dist` directory

#### Other Options
- **AWS S3 + CloudFront**: Upload the `dist` folder to S3
- **Any web server**: Upload the `dist` folder contents to your server

## 📁 Project Structure

```
rays-innovations/
├── client/                 # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and constants
│   │   └── App.tsx       # Main app component
│   └── index.html        # Entry HTML file
│
├── attached_assets/      # Images and other assets
├── dist/                 # Production build output (created after build)
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
├── netlify.toml         # Netlify deployment config
├── vercel.json          # Vercel deployment config
└── build-static.sh      # Build script
```

## 📝 Available Scripts

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Build static site for production
- `npm run preview` - Preview production build locally

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

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 18.x or higher
- Check for TypeScript errors: `npx tsc --noEmit`

### Development Server Issues
- Check if port 5173 is available
- Clear Vite cache: `rm -rf node_modules/.vite`
- Restart the development server

## 📄 License

This project is proprietary software for Rays Innovations.

## 👥 Support

For support, email support@raysinnovations.com or contact through the website's contact form.