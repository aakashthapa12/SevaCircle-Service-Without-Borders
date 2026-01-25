import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('auth_token')?.value
  const role = req.cookies.get('role')?.value

  console.log(`[Middleware] ${pathname} | Token: ${token ? 'YES' : 'NO'} | Role: ${role || 'NONE'}`)

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup']
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api')

  // Allow public routes without authentication
  if (isPublicRoute) {
    console.log(`[Middleware] ${pathname} -> ALLOWED (public)`)
    return NextResponse.next()
  }

  // All other routes require authentication
  if (!token) {
    console.log(`[Middleware] ${pathname} -> REDIRECT to /login (no token)`)
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Define role-based routes
  const isAdminRoute = pathname.startsWith('/admin')
  const userRoutes = ['/search', '/bookings', '/booking', '/payments', '/favorites', '/customer-profile']
  const workerRoutes = ['/worker-profile']

  // Admin routes require admin role
  if (isAdminRoute) {
    if (role !== 'admin') {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Role-based protection
  if (userRoutes.some((p) => pathname.startsWith(p)) && role !== 'user') {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (workerRoutes.some((p) => pathname.startsWith(p)) && role !== 'worker') {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
