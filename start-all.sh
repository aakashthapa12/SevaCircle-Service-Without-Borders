#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting SevaCircle Platform with AI Chat${NC}"
echo ""

# Kill existing processes
echo -e "${BLUE}🧹 Cleaning up existing processes...${NC}"
pkill -9 -f "tsx watch" 2>/dev/null
pkill -9 -f "vite" 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
sleep 2

# Start backend
echo -e "${BLUE}🔧 Starting Backend Server...${NC}"
cd server
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo -e "${BLUE}⏳ Waiting for backend to initialize...${NC}"
sleep 5

# Check if backend is running
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend running on http://localhost:3001${NC}"
else
    echo -e "${RED}❌ Backend failed to start. Check backend.log${NC}"
    exit 1
fi

# Start frontend
echo -e "${BLUE}🎨 Starting Frontend Client...${NC}"
cd client
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
echo -e "${BLUE}⏳ Waiting for frontend to initialize...${NC}"
sleep 5

# Check if frontend is running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend running on http://localhost:5173${NC}"
else
    echo -e "${RED}❌ Frontend failed to start. Check frontend.log${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                          ║${NC}"
echo -e "${GREEN}║   🎉 SevaCircle Platform is Ready!                      ║${NC}"
echo -e "${GREEN}║                                                          ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📱 Frontend:${NC}      http://localhost:5173"
echo -e "${BLUE}🔧 Backend API:${NC}   http://localhost:3001"
echo -e "${BLUE}🤖 AI Chat:${NC}       http://localhost:5173/chat"
echo -e "${BLUE}💚 Health Check:${NC}  http://localhost:3001/api/health"
echo ""
echo -e "${BLUE}📋 Logs:${NC}"
echo -e "   Backend:  tail -f backend.log"
echo -e "   Frontend: tail -f frontend.log"
echo ""
echo -e "${BLUE}🛑 To stop:${NC}     pkill -9 -f 'tsx watch' && pkill -9 -f 'vite'"
echo ""
echo -e "${GREEN}Press Ctrl+C to stop all servers${NC}"
echo ""

# Keep script running
wait
