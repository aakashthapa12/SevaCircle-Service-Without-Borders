import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const userRole = req.cookies.get('userRole')?.value
  const isLoggedIn = req.cookies.get('isLoggedIn')?.value

  console.log(`[Middleware] ${pathname} | LoggedIn: ${isLoggedIn ? 'YES' : 'NO'} | Role: ${userRole || 'NONE'}`)

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup', '/about']
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api')

  // Allow public routes without authentication
  if (isPublicRoute) {
    console.log(`[Middleware] ${pathname} -> ALLOWED (public)`)
    return NextResponse.next()
  }

  // All other routes require authentication
  if (!isLoggedIn || isLoggedIn !== 'true') {
    console.log(`[Middleware] ${pathname} -> REDIRECT to /login (not authenticated)`)
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Define role-based routes
  const isAdminRoute = pathname.startsWith('/admin')
  const userRoutes = ['/search', '/bookings', '/booking', '/payments', '/favorites', '/customer-profile']
  const workerRoutes = ['/worker-profile']

  // Admin routes require admin role
  if (isAdminRoute) {
    if (userRole !== 'admin') {
      console.log(`[Middleware] ${pathname} -> REDIRECT to /login (admin required)`)
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // User routes require user role
  if (userRoutes.some((p) => pathname.startsWith(p))) {
    if (userRole !== 'user') {
      console.log(`[Middleware] ${pathname} -> REDIRECT to /login (user role required)`)
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Worker routes require service_provider role
  if (workerRoutes.some((p) => pathname.startsWith(p))) {
    if (userRole !== 'service_provider') {
      console.log(`[Middleware] ${pathname} -> REDIRECT to /login (service_provider role required)`)
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // For any other protected route
  console.log(`[Middleware] ${pathname} -> ALLOWED (authenticated)`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
