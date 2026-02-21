#!/bin/bash

echo "🚀 Starting SevaCircle Development Servers..."
echo ""

# Check if node_modules exist
if [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Dependencies not found. Running setup..."
    npm run setup
    echo ""
fi

echo "✅ Starting Backend on http://localhost:3001"
echo "✅ Starting Frontend on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start both servers concurrently
npm run dev
