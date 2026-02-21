# SevaCircle - Modern Local Services Booking Platform

![Status](https://img.shields.io/badge/Status-Ready%20to%20Run-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0-blue)

A complete revamp of the local services booking platform with modern tech stack and clean, functional design.

## 🎯 What This Project Does

SevaCircle helps users find and book local service professionals (plumbers, electricians, carpenters, painters, mechanics, cleaners) in their area. Think of it as **Urban Company/TaskRabbit for local services**.

### Core Features
✅ Browse services and view professionals  
✅ View detailed worker profiles with ratings  
✅ Book services with date/time selection  
✅ User authentication (login/signup)  
✅ My Bookings page to track orders  
✅ Admin dashboard to manage all bookings  
✅ Responsive design (mobile + desktop)  
✅ SQLite database (zero setup required)  

---

## 🛠️ Tech Stack (Simplified & Modern)

### Frontend (`client/`)
- **React 18** - Modern UI library
- **Vite** - Lightning fast dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client routing
- **Axios** - API calls
- **Lucide React** - Beautiful icons

### Backend (`server/`)
- **Express.js** - Minimalist web framework
- **TypeScript** - Type safety
- **SQLite** - Zero-config database
- **JWT** - Authentication
- **bcrypt** - Password security
- **Zod** - Validation

### Why This Stack?
✅ **Simpler** than NestJS + Next.js  
✅ **Faster** development and startup  
✅ **No database setup** - SQLite works out of the box  
✅ **Easy to understand** - Perfect for demos and learning  
✅ **Production-ready** - Can scale when needed  

---

## 🚀 Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm run setup
```
This installs packages for root, client, and server.

### 2. Start Development Servers
```bash
npm run dev
```
This starts:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173

### 3. Open Browser
Navigate to **http://localhost:5173**

---

## 📁 Project Structure

```
seva-circle/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── pages/            # All pages (Home, Login, etc.)
│   │   ├── components/       # Reusable components
│   │   ├── services/         # API integration
│   │   ├── context/          # Auth context
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── index.html
│   └── package.json
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   │   ├── auth.ts       # Login/Register
│   │   │   ├── services.ts   # Get services
│   │   │   ├── workers.ts    # Get workers
│   │   │   └── bookings.ts   # Create/manage bookings
│   │   ├── middleware/       # Auth middleware
│   │   ├── database.ts       # SQLite setup + seeding
│   │   └── index.ts          # Server entry
│   ├── database.db           # SQLite database (auto-created)
│   └── package.json
│
├── package.json              # Root package.json
└── README.md                 # This file
```

---

## 🔑 Demo Credentials

The database is pre-seeded with demo accounts:

**User Account**  
Email: `demo@sevacircle.com`  
Password: `demo123`

**Admin Account**  
Email: `admin@sevacircle.com`  
Password: `admin123`

---

## 📱 Pages & Routes

| Route | Page | Protected | Description |
|-------|------|-----------|-------------|
| `/` | Home | No | Hero, services grid, top workers |
| `/services` | Services | No | List all services |
| `/workers` | Workers | No | List workers with filters |
| `/workers/:id` | Worker Detail | No | Full worker profile |
| `/login` | Login | No | User login |
| `/register` | Register | No | User signup |
| `/booking/:workerId` | Booking | Yes | Book a service |
| `/my-bookings` | My Bookings | Yes | View user's bookings |
| `/admin` | Admin Dashboard | Yes (Admin) | Manage all bookings |

---

## 🗄️ Database Schema

The SQLite database includes these tables:

### users
- id, name, email, phone, password, role, created_at

### services
- id, name, description, icon, base_price, created_at

### workers
- id, name, phone, service_id, rating, reviews, experience, languages, verified, distance, created_at

### bookings
- id, user_id, worker_id, service_id, date, time_slot, status, total_amount, address, notes, created_at

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details

### Workers
- `GET /api/workers` - List workers (filter by service_id)
- `GET /api/workers/:id` - Get worker details

### Bookings (Protected)
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/all` - Get all bookings (admin)
- `PATCH /api/bookings/:id/status` - Update status (admin)

---

## 🎨 Features Walkthrough

### 1. Homepage
- Hero section with CTA
- Grid of 6 services
- Top 4 rated professionals
- Fully responsive

### 2. Browse & Search
- Filter workers by service
- View ratings, experience, distance
- Verified badge for trusted workers

### 3. Booking Flow
1. Click worker → View profile
2. Click "Book Now" → Login if not authenticated
3. Select date, time, address
4. Confirm booking
5. See in "My Bookings"

### 4. Admin Dashboard
- View all bookings with stats
- Update booking status (pending → confirmed → completed)
- See customer and worker details

---

## 🛠️ Development Commands

```bash
# Install all dependencies
npm run setup

# Start both servers concurrently
npm run dev

# Start only backend
npm run server

# Start only frontend  
npm run client

# Build for production
npm run build
```

---

## 📦 What's Included

✅ **Full Authentication** - JWT-based auth with protected routes  
✅ **Database Seeding** - Auto-populated with 6 services & 8 workers  
✅ **Form Validation** - Client & server-side validation  
✅ **Error Handling** - Proper error messages & states  
✅ **Loading States** - User feedback during API calls  
✅ **Responsive Design** - Mobile-first approach  
✅ **Clean Code** - TypeScript, proper structure  
✅ **No External Setup** - SQLite works immediately  

---

## 🚨 Troubleshooting

### Port Already in Use
**Backend (3001):**
Edit `server/.env` and change `PORT=3001` to another port

**Frontend (5173):**
Edit `client/vite.config.ts` and change `server.port`

### Dependencies Not Installing
```bash
# Clean install
rm -rf node_modules client/node_modules server/node_modules
npm run setup
```

### Database Issues
Delete `server/database.db` and restart server. It will auto-recreate.

---

## 🎯 Next Steps / Enhancements

Want to extend this project? Here are ideas:

- [ ] Add payment integration (Stripe/Razorpay)
- [ ] Real-time chat between user & worker
- [ ] Worker availability calendar
- [ ] Review & rating system
- [ ] Image uploads for workers
- [ ] Push notifications
- [ ] Google Maps integration
- [ ] Email confirmations
- [ ] Multi-language support
- [ ] Deploy to cloud (Vercel + Railway)

---

## 🌟 Key Differences from Old Version

| Aspect | Old Version | New Version |
|--------|-------------|-------------|
| Frontend | Next.js | React + Vite |
| Backend | NestJS | Express.js |
| Database | PostgreSQL | SQLite |
| Setup Time | 10+ minutes | < 1 minute |
| Complexity | High | Low |
| Database Setup | Manual | Auto-seeded |
| File Size | Large | Compact |

---

## 📞 Support

If something doesn't work:
1. Make sure Node.js 18+ is installed
2. Run `npm run setup` to install dependencies
3. Check if ports 3001 and 5173 are available
4. Look at terminal errors for debugging

---

## ✨ Credits

**Built for**: DU Hacks Hackathon  
**Purpose**: Local services booking platform  
**Version**: 2.0 (Complete Revamp)  
**Date**: February 2026  

---

## 🎉 Ready to Go!

Everything is configured and ready. Just run:

```bash
npm run setup
npm run dev
```

Then open **http://localhost:5173** and start exploring!

**Happy Coding! 🚀**
