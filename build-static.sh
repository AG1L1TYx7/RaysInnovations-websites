#!/bin/bash

# Build script for static site deployment

echo "🚀 Building Rays Innovations static site..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the static site
echo "🔨 Building static files..."
npm run build

echo "✅ Build complete! Static files are in the 'dist' directory."
echo ""
echo "📋 Deployment options:"
echo "   - Netlify: Drag and drop the 'dist' folder to app.netlify.com"
echo "   - Vercel: Run 'vercel' in this directory"
echo "   - GitHub Pages: Push to GitHub and enable Pages from Settings"
echo "   - Preview locally: Run 'npm run preview'"