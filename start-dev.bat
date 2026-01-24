@echo off
REM Local Services Booking Platform - Startup Script

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   🚀 Local Services Booking Platform                  ║
echo ║   Starting Development Environment...                 ║
echo ╚════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Check if backend folder exists
if not exist "backend" (
    echo ❌ Error: backend folder not found
    pause
    exit /b 1
)

REM Check if frontend folder exists
if not exist "local-services-ui" (
    echo ❌ Error: local-services-ui folder not found
    pause
    exit /b 1
)

echo ✅ Project folders found
echo.

REM Start backend in a new window
echo 🔧 Starting Backend (NestJS) on port 3001...
start "Backend - NestJS" cmd /k "cd backend && npm run start"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in a new window
echo 📱 Starting Frontend (Next.js) on port 3000...
start "Frontend - Next.js" cmd /k "cd local-services-ui && npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║ ✨ Services Starting...                               ║
echo ║                                                        ║
echo ║ Frontend:  http://localhost:3000                       ║
echo ║ Backend:   http://localhost:3001                       ║
echo ║ Health:    http://localhost:3001/api/health           ║
echo ║                                                        ║
echo ║ Check CONFIGURATION.md for detailed setup guide      ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo Checking service health...
timeout /t 5 /nobreak

node check-health.js

pause
