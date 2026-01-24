# Copilot Instructions for Local Services Booking Platform

## Project Overview
- **Monorepo** with two main apps:
  - `backend/`: NestJS (TypeScript) API server for service booking, user, worker, and admin management.
  - `local-services-ui/`: Next.js (React) frontend for user interaction and booking flows.
- **Data flow**: Frontend communicates with backend via REST endpoints (see backend `src/modules/` for routes).
- **Database**: PostgreSQL (optional for demo); Prisma ORM used in backend (`backend/prisma/schema.prisma`).

## Key Developer Workflows
- **Start all services (dev):**
  - Easiest: Run `start-dev.bat` from project root (spawns both servers)
  - Manual: `cd backend && npm run start` (port 3001), `cd local-services-ui && npm run dev` (port 3000)
- **Health check:** `node check-health.js` (root) or visit `/api/health` on backend
- **Backend tests:**
  - Unit: `npm run test` (in backend)
  - E2E: `npm run test:e2e` (in backend)
- **Frontend hot reload:** Edit files in `local-services-ui/src/app/` or `components/` and save

## Project-Specific Patterns & Conventions
- **Backend**
  - Modular structure: Each domain (users, bookings, workers, admin, auth) in `src/modules/`
  - Prisma client auto-generated in `backend/generated/prisma/`
  - Config via `.env` (see example in root README)
  - Common utilities in `src/common/`
- **Frontend**
  - Uses Next.js App Router (see `src/app/`)
  - UI components in `src/components/` and `src/components/ui/`
  - Context (e.g., language) in `src/context/`
  - Data mocks in `src/data/` for local development

## Integration & Cross-Component Communication
- **API endpoints**: All frontend/backend integration via HTTP (see backend controller files for routes)
- **No direct DB access from frontend**
- **Health check**: `/api/health` endpoint for backend status

## Notable Files & Directories
- `start-dev.bat`, `check-health.js`: Dev workflow automation
- `backend/prisma/schema.prisma`: DB schema
- `backend/src/modules/`: Main backend features
- `local-services-ui/src/app/`: Main frontend pages
- `local-services-ui/src/components/`: Shared UI components

## Tips for AI Agents
- Prefer using provided scripts for starting, testing, and checking health
- Follow modular patterns for new backend features (add to `src/modules/`)
- Use mock data in frontend for UI work if backend is unavailable
- Reference controller and service files for API contract details

---
For more, see [README.md](../../README.md), [backend/README.md](../backend/README.md), and [local-services-ui/README.md](../local-services-ui/README.md).
