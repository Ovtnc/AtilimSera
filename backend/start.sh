#!/bin/bash

echo "🚀 Starting Atılım Modern Sera Backend Server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🌟 Starting server on port 5000..."
npm run dev
