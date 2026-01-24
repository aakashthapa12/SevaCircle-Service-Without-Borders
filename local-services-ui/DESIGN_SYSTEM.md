# 🎨 LocalHelp UI - Design System & Feature Reference

## Color Palette

### Primary Colors
```css
/* Trust Blue - Main brand color */
--primary-blue: #2563EB;
--primary-blue-dark: #1D4ED8;
--primary-blue-light: #DBEAFE;

/* Success Green - Confirmations & positive actions */
--success-green: #22C55E;
--success-green-dark: #16A34A;
--success-green-light: #DCFCE7;

/* Background & Neutrals */
--bg-light: #F8FAFC;
--bg-white: #FFFFFF;
--text-dark: #1F2937;
--text-gray: #6B7280;
--border-gray: #E5E7EB;
```

### Color Usage
| Element | Color | Usage |
|---------|-------|-------|
| Primary Buttons | #2563EB | CTAs, navigation, Book Now |
| Secondary Buttons | White/Outline | Alternative actions |
| Success Actions | #22C55E | Confirmations, verified badges |
| Error/Warnings | #EF4444 | Alerts, cancel operations |
| Page Background | #F8FAFC | Main layout background |
| Cards | #FFFFFF | Content containers |

---

## Typography

### Font Stack
```css
/* Headings */
font-family: 'Poppins', sans-serif;
font-weight: 600, 700;

/* Body Text */
font-family: 'Inter', sans-serif;
font-weight: 400, 500;
```

### Type Scale
| Use Case | Size | Weight | Line Height |
|----------|------|--------|-------------|
| H1 (Hero) | 2.25rem (36px) | 700 | 1.2 |
| H2 (Section) | 1.875rem (30px) | 700 | 1.2 |
| H3 (Subsection) | 1.5rem (24px) | 600 | 1.3 |
| H4 (Card Title) | 1.25rem (20px) | 600 | 1.3 |
| Body | 1rem (16px) | 400 | 1.5 |
| Small | 0.875rem (14px) | 400 | 1.4 |
| Extra Small | 0.75rem (12px) | 500 | 1.4 |

---

## Spacing System

### Spacing Scale
```
1 unit = 4px

xs: 4px (1 unit)
sm: 8px (2 units)
md: 12px (3 units)
lg: 16px (4 units)
xl: 24px (6 units)
2xl: 32px (8 units)
3xl: 48px (12 units)
4xl: 64px (16 units)
```

### Common Spacing
| Component | Padding | Margin |
|-----------|---------|--------|
| Page/Section | px-4 sm:px-6 lg:px-8 | py-8 md:py-12 lg:py-16 |
| Card | p-6 | mb-6 |
| Button | px-4 py-2 (sm), px-6 py-3 (md) | - |
| Input | px-4 py-3 | mb-4 |

---

## Component Styles

### Buttons

#### Primary Button
```css
background-color: #2563EB;
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s ease;

:hover {
  background-color: #1D4ED8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

:active {
  transform: scale(0.98);
}

:disabled {
  background-color: #D1D5DB;
  cursor: not-allowed;
}
```

#### Secondary Button
```css
background-color: white;
color: #2563EB;
border: 2px solid #2563EB;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s ease;

:hover {
  background-color: #DBEAFE;
}
```

### Cards
```css
background-color: white;
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
padding: 24px;
transition: all 0.3s ease;

:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}
```

### Input Fields
```css
border: 2px solid #E5E7EB;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
transition: all 0.3s ease;

:focus {
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

:disabled {
  background-color: #F3F4F6;
  cursor: not-allowed;
}
```

### Badges
```css
/* Verified Badge */
background-color: #22C55E;
color: white;
padding: 6px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 6px;

/* Popular Badge */
background-color: #2563EB;
color: white;
padding: 8px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;
```

---

## Responsive Breakpoints

```javascript
// Tailwind breakpoints (Mobile-first)
sm: '640px',   // Small phones
md: '768px',   // Tablets
lg: '1024px',  // Desktops
xl: '1280px',  // Large desktops
```

### Layout Strategy

```tsx
// Mobile (< 640px)
- Single column
- Full-width elements
- Hamburger menu
- Stacked navigation

// Tablet (640px - 1024px)
- 2-column grid
- Desktop menu appears
- Optimized spacing

// Desktop (> 1024px)
- 3+ column grid
- Sidebar layouts
- Max-width container
- Full features
```

---

## Shadow System

### Elevation Levels
```css
/* No Shadow */
box-shadow: none;

/* Level 1 - Subtle */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Level 2 - Card */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
            0 1px 2px 0 rgba(0, 0, 0, 0.06);

/* Level 3 - Hover */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Level 4 - Elevated */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
            0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Level 5 - Modal */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

---

## Animations & Transitions

### Timing
```css
/* Fast - UI feedback */
transition-duration: 150ms;

/* Normal - Component interactions */
transition-duration: 300ms;

/* Slow - Page transitions */
transition-duration: 500ms;

/* Easing */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 300ms ease-in-out;
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: slideUp 300ms ease-out;
```

#### Scale Hover
```css
transition: all 300ms ease;

:hover {
  transform: scale(1.02);
  box-shadow: elevated;
}
```

---

## Icon System (Lucide React)

### Icon Sizes
| Size | Pixel | Use Case |
|------|-------|----------|
| xs | 16px | Badges, small UI elements |
| sm | 20px | Button icons, labels |
| md | 24px | Section headers, forms |
| lg | 32px | Feature icons, hero |
| xl | 48px | Large CTAs |
| 2xl | 64px | Hero sections |

### Common Icons
```tsx
// Navigation
<Menu /> <X /> <ArrowLeft />

// Actions
<Search /> <Filter /> <Clock /> <Calendar />
<MapPin /> <Phone /> <Mail /> <MessageSquare />

// Status
<CheckCircle /> <Star /> <Award />

// Services
(Using emoji instead for mock data)
```

---

## State Management Patterns

### Loading State
```tsx
<button disabled className="opacity-50 cursor-not-allowed">
  {isLoading ? "Loading..." : "Submit"}
</button>
```

### Empty State
```tsx
{items.length === 0 ? (
  <div className="text-center py-16">
    <div className="text-6xl mb-4">🔍</div>
    <h2 className="text-2xl font-bold text-gray-800">No items found</h2>
    <p className="text-gray-600 mb-6">Try a different search</p>
  </div>
) : (
  // Content
)}
```

### Error State
```tsx
{error && (
  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
    <p className="text-red-800">{error}</p>
  </div>
)}
```

---

## Forms & Validation

### Input Pattern
```tsx
<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-800">
    Label
  </label>
  <input
    type="text"
    placeholder="Enter value"
    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg 
               focus:border-blue-600 outline-none transition"
    disabled={isDisabled}
  />
  {error && <p className="text-red-600 text-sm">{error}</p>}
</div>
```

### Button Group
```tsx
<div className="flex gap-3">
  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg">
    Primary Action
  </button>
  <button className="flex-1 border-2 border-gray-300 py-3 rounded-lg">
    Secondary Action
  </button>
</div>
```

---

## Accessibility Guidelines

### Semantic HTML
- Use `<button>` for clickable elements
- Use `<label>` for form inputs
- Use `<nav>` for navigation
- Use `<main>` for main content
- Use `<footer>` for footer

### ARIA Attributes
```tsx
// Buttons
<button aria-label="Close menu">
  <X size={24} />
</button>

// Links
<a href="/search" aria-current="page">
  Search
</a>

// Loading
<div aria-busy="true" role="status">
  Loading...
</div>
```

### Color Contrast
- Text on buttons: 4.5:1 ratio minimum
- Body text on background: 4.5:1 ratio minimum
- Graphics: 3:1 ratio minimum

### Keyboard Navigation
- All interactive elements focusable with Tab
- Enter/Space activates buttons
- Escape closes modals
- Arrow keys navigate lists

---

## Performance Optimization

### Image Optimization
```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
/>
```

### Code Splitting
```tsx
// Dynamic imports for large components
const Modal = dynamic(() => import('./Modal'), {
  loading: () => <Skeleton />
});
```

### CSS Optimization
- Use Tailwind's PurgeCSS
- Minimize unused styles
- Use CSS Grid/Flexbox for layouts
- Avoid inline styles

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | Latest | ✅ Full |
| Mobile | Modern | ✅ Full |

---

## Code Style Guidelines

### Component Naming
```
✅ ServiceCard.tsx
✅ WorkerProfile.tsx
✅ BookingForm.tsx

❌ Component.tsx
❌ card.tsx
❌ MyComponent.tsx
```

### File Organization
```
Component.tsx (Component code)
Component.module.css (Scoped styles - if needed)
Component.test.tsx (Tests)
index.ts (Export)
```

### Imports Order
```tsx
// 1. External libraries
import React from 'react';
import Link from 'next/link';

// 2. Local utilities
import { formatPrice } from '@/utils';

// 3. Local components
import { Button } from '@/components';

// 4. Local styles
import styles from './Component.module.css';
```

---

## References

- **Figma Design System:** [Link if available]
- **Tailwind Docs:** https://tailwindcss.com
- **React Docs:** https://react.dev
- **Next.js Docs:** https://nextjs.org
- **Lucide Icons:** https://lucide.dev
- **Web Accessibility:** https://www.w3.org/WAI/

---

**Version:** 1.0  
**Last Updated:** January 24, 2026  
**Team:** LocalHelp (DUHACks 2026)
