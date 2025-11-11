#!/bin/bash

# AJFS Innovations - Quick Start Script
# This script helps you get started with local development

set -e

echo "🚀 AJFS Innovations Website - Local Development Setup"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
echo "========================"
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your actual email credentials!"
    echo ""
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
echo "========================="
cd ../frontend

if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from .env.example..."
    cp .env.example .env
    echo "📝 Using default backend URL: http://localhost:8080"
    echo ""
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

echo "✅ Frontend setup complete!"
echo ""

# Create placeholder images directory
if [ ! -d "public/images" ]; then
    echo "📁 Creating images directory..."
    mkdir -p public/images
    echo "⚠️  Please add your images to frontend/public/images/"
    echo ""
fi

cd ..

echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure backend email settings:"
echo "   Edit: backend/.env"
echo ""
echo "2. Add placeholder images:"
echo "   Place images in: frontend/public/images/"
echo ""
echo "3. Start the backend (in one terminal):"
echo "   cd backend"
echo "   npm start"
echo ""
echo "4. Start the frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "5. Open browser to:"
echo "   http://localhost:3000"
echo ""
echo "=================================================="
echo "🎉 Happy coding!"
echo "=================================================="
