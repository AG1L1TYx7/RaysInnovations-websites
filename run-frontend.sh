#!/bin/bash

# Simple frontend runner for Rays Innovations
echo "🚀 Starting Rays Innovations Frontend..."
echo "Website will be available at http://localhost:5173"
echo ""

# Kill any existing vite processes
pkill -f vite || true

# Run Vite directly
npx vite --host 0.0.0.0 --port 5173