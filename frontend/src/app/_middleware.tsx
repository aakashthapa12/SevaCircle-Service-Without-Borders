import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes
const PUBLIC_ROUTES = ['/', '/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  // Check for auth token (localStorage is not available server-side, so use cookies or headers)
  const isLoggedIn = request.cookies.get('userRole') || request.cookies.get('customerProfile');
  if (!isLoggedIn) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
