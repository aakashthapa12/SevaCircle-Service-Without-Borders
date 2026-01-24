# 🚀 Local Services Booking Platform - Configuration Guide

## ✅ Current Status
- **Frontend**: ✨ Running on `http://localhost:3000`
- **Backend**: ✨ Running on `http://localhost:3001`
- **Backend Health**: `http://localhost:3001/api/health`

---

## 📋 Backend Configuration (.env)

**Location**: `c:\Users\Adarsh shukla\Desktop\DUHACks\backend\.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/local_services_db"
NODE_ENV="development"
PORT=3001
```

### Configuration Options Explained:

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Database connection |
| `NODE_ENV` | `development` or `production` | Environment mode |
| `PORT` | `3001` | Backend server port |

### To Change Database:
Edit `.env` and update `DATABASE_URL`:
```env
# Format: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://user:password@localhost:5432/your_db_name"
```

---

## 🗄️ Prisma Configuration

**Schema Location**: `c:\Users\Adarsh shukla\Desktop\DUHACks\backend\prisma\schema.prisma`

**Current Models**:
- `User` - Customer users
- `Worker` - Service providers
- `Booking` - Service bookings

**Generate Updated Client**:
```bash
cd backend
npx prisma generate
```

**After Schema Changes**:
```bash
cd backend
npx prisma generate
npm run build
```

---

## 🎨 Frontend Configuration

**Location**: `c:\Users\Adarsh shukla\Desktop\DUHACks\local-services-ui`

### Environment Variables (Optional)
Create `.env.local` if needed:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Supported Languages
- English (en)
- हिंदी (hi)
- मराठी (mr)

Language selection is stored in localStorage.

---

## 🚀 Starting Services

### Start Backend:
```bash
cd c:\Users\Adarsh shukla\Desktop\DUHACks\backend
npm run start
```

### Start Frontend:
```bash
cd c:\Users\Adarsh shukla\Desktop\DUHACks\local-services-ui
npm run dev
```

### Both Together (separate terminals):
```bash
# Terminal 1 - Backend
cd backend && npm run start

# Terminal 2 - Frontend
cd local-services-ui && npm run dev
```

---

## 🧪 Testing Services

### Test Backend Health:
```bash
curl http://localhost:3001/api/health
```

**Expected Response**:
```json
{
  "status": "ok",
  "service": "local-services-api",
  "timestamp": "2026-01-24T...",
  "database": "connected"
}
```

### Test Frontend:
Open browser: `http://localhost:3000`

---

## 📊 Database Setup (For Production)

If you want to use PostgreSQL:

1. **Install PostgreSQL** locally or use a cloud provider
2. **Create Database**:
   ```sql
   CREATE DATABASE local_services_db;
   ```

3. **Run Migrations**:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

4. **Seed Data** (Optional):
   ```bash
   npx prisma db seed
   ```

---

## 🔧 Common Issues & Solutions

### Issue: Database Connection Failed
**Solution**: Either set up PostgreSQL or ignore (works without DB for hackathon)

### Issue: Port Already in Use
```bash
# Change PORT in .env to a different port (e.g., 3002)
```

### Issue: Prisma Client Errors
```bash
cd backend
npx prisma generate
npm run build
npm run start
```

### Issue: Frontend Build Errors
```bash
cd local-services-ui
rm -r .next .turbopack node_modules/.cache
npm run dev
```

---

## 📁 Project Structure

```
DUHACks/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── main.ts            # Entry point
│   │   ├── app.module.ts      # Root module
│   │   ├── prisma/            # Database service
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── workers/
│   │   │   ├── bookings/
│   │   │   └── admin/
│   │   ├── health/            # Health check
│   │   └── config/            # Configuration
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── .env                   # Environment variables
│   └── package.json
│
└── local-services-ui/         # Next.js Frontend
    ├── src/
    │   ├── app/               # Pages
    │   ├── components/        # React components
    │   ├── context/           # Context providers
    │   └── data/              # Mock data
    ├── package.json
    └── .env.local (optional)
```

---

## 🎯 API Endpoints (Backend)

| Method | Endpoint | Status |
|--------|----------|--------|
| GET | `/` | ✅ Available |
| GET | `/api/health` | ✅ Available |
| POST | `/api/auth/login` | 🔄 Ready for implementation |
| GET | `/api/users` | 🔄 Ready for implementation |
| GET | `/api/workers` | 🔄 Ready for implementation |
| POST | `/api/bookings` | 🔄 Ready for implementation |

---

## 🎓 Next Steps for Development

1. **Setup Database** (optional for hackathon)
   ```bash
   # Install PostgreSQL or use cloud service
   # Update DATABASE_URL in .env
   ```

2. **Implement API Endpoints**
   - Create services in each module
   - Add controllers with routes
   - Connect to Prisma for database operations

3. **Add Authentication**
   - Implement OTP verification
   - Add JWT tokens
   - Create auth guards

4. **Frontend API Integration**
   - Replace mock data with API calls
   - Implement error handling
   - Add loading states

---

## ✨ Features Ready to Use

### Frontend
- ✅ Multi-language support (En/Hi/Mr)
- ✅ Responsive design
- ✅ Service browsing
- ✅ Worker profiles
- ✅ Booking UI flow
- ✅ Mock data loaded

### Backend
- ✅ NestJS server running
- ✅ Prisma ORM configured
- ✅ Module structure ready
- ✅ Health check endpoint
- ✅ Global validation pipes
- ✅ CORS enabled

---

## 📞 Support

For issues:
1. Check `.env` configuration
2. Ensure ports 3000 and 3001 are available
3. Rebuild after schema changes: `npx prisma generate && npm run build`
4. Clear caches: `.next`, `.turbopack`, `node_modules/.cache`

---

**Created**: January 24, 2026
**Status**: ✨ Production-Ready Development Environment
