# 🚀 LocalHelp UI - Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn installed

## Installation

```bash
# Navigate to the project directory
cd local-services-ui

# Install dependencies
npm install
```

## Running the Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:3000
```

## Building for Production

```bash
# Build the project
npm run build

# Start the production server
npm start
```

## Project Structure

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Home page
│   ├── login/page.tsx     # Login page
│   ├── search/page.tsx    # Search/browse workers
│   ├── booking/page.tsx   # Booking confirmation
│   ├── worker/[id]/page.tsx  # Worker profile
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer
│   ├── ServiceCard.tsx    # Service card
│   ├── WorkerCard.tsx     # Worker card
│   └── Toast.tsx          # Toast notifications
├── context/               # React Context
│   └── LanguageContext.tsx # Multi-language support
└── data/                  # Mock data
    ├── services.ts        # Service definitions
    └── workers.ts         # Worker information
```

## Key Features

### 🎯 User Journey
1. **Home** - Browse services
2. **Search** - Filter and find workers
3. **Profile** - View worker details
4. **Booking** - Schedule a service
5. **Confirmation** - Success screen

### 🌐 Multi-Language Support
- English
- Hindi (हिंदी)
- Marathi (मराठी)

Switch languages using the selector in the navbar. Changes apply instantly!

### 📱 Responsive Design
- Mobile-first approach
- Works on all device sizes
- Optimized for touch interactions

### 🎨 Design System
- **Primary Color:** #2563EB (Trust Blue)
- **Accent Color:** #22C55E (Success Green)
- **Typography:** Inter (body) + Poppins (headings)
- **Icons:** Lucide React

## Testing the App

### Test User Flows

**Flow 1: Browse and Book**
1. Go to home page
2. Click on a service (e.g., "Plumber")
3. View available workers
4. Click "View Profile" on any worker
5. Click "Book Now"
6. Select date and time
7. Click "Confirm Booking"
8. See success screen

**Flow 2: Switch Language**
1. Click language selector in navbar
2. Choose "हिंदी" (Hindi) or "मराठी" (Marathi)
3. All text updates instantly
4. Navigate to different pages
5. Language persists even after refresh

**Flow 3: Mobile Experience**
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test on mobile viewport (375px, 667px)
4. Verify responsive layout
5. Test hamburger menu
6. Test sticky CTA buttons

## Technical Stack

```json
{
  "Framework": "Next.js 16.1.4",
  "Language": "TypeScript 5",
  "Styling": "Tailwind CSS 4",
  "UI Components": "Lucide React",
  "State Management": "React Context",
  "Fonts": "Google Fonts (Inter + Poppins)"
}
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Setup

No environment variables needed for the demo. All data is mock data stored locally in `src/data/`.

## Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build
npm run build

# Deploy the .next folder
# Or use Netlify CLI
```

### Deploy to Any Node.js Hosting
1. Build: `npm run build`
2. Start: `npm start`
3. Ensure Node.js 18+ is available

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Clear Cache
```bash
# Remove build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Language Not Switching
- Ensure localStorage is enabled in browser
- Check browser console for errors
- Try clearing cache and refreshing

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (14+)
- ✅ Mobile browsers

## Notes

- **No Backend:** This is a frontend-only demo using mock data
- **No Authentication:** Login is UI demo only
- **No Payments:** Booking is UI demo only
- **No Database:** All data is stored in JavaScript

## Next Steps (For Backend Integration)

When integrating with a real backend:

1. Replace mock data in `src/data/` with API calls
2. Update booking page to handle real payments
3. Implement authentication with your backend
4. Add real-time worker availability
5. Connect to location services
6. Add notification system

## Support & Documentation

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev
- **Lucide Icons:** https://lucide.dev

## License

This project was built for DUHACks Hackathon 2026.

---

**Happy coding! 🚀**

For questions or issues, check the console logs and ensure all dependencies are installed correctly.
