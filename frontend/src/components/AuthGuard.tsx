"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string[];
  fallbackPath?: string;
}

export default function AuthGuard({ 
  children, 
  requiredRole = [], 
  fallbackPath = '/login' 
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      console.log('[AuthGuard] Checking auth for:', pathname);
      
      // Public routes that don't need authentication
      const publicRoutes = ['/', '/login', '/signup', '/about'];
      
      if (publicRoutes.includes(pathname)) {
        console.log('[AuthGuard] Public route, allowing access');
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const userRole = localStorage.getItem('userRole');
      
      console.log('[AuthGuard] Auth check:', { isLoggedIn, userRole, pathname });

      if (!isLoggedIn || isLoggedIn !== 'true') {
        // User is not logged in, redirect to login
        console.log('[AuthGuard] Not logged in, redirecting to login');
        setIsLoading(false);
        router.replace(`${fallbackPath}?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Check role-based access if required
      if (requiredRole.length > 0 && userRole) {
        if (!requiredRole.includes(userRole)) {
          // User doesn't have required role
          console.log('[AuthGuard] Insufficient permissions, redirecting to login');
          setIsLoading(false);
          router.replace('/login');
          return;
        }
      }

      // Define role-based route restrictions
      const adminRoutes = ['/admin'];
      const userRoutes = ['/search', '/bookings', '/booking', '/payments', '/favorites', '/customer-profile'];
      const workerRoutes = ['/worker-profile'];
      
      const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
      const isUserRoute = userRoutes.some(route => pathname.startsWith(route));
      const isWorkerRoute = workerRoutes.some(route => pathname.startsWith(route));
      
      if (isAdminRoute && userRole !== 'admin') {
        console.log('[AuthGuard] Admin route access denied');
        setIsLoading(false);
        router.replace('/login');
        return;
      }
      
      if (isUserRoute && userRole !== 'user') {
        console.log('[AuthGuard] User route access denied');
        setIsLoading(false);
        router.replace('/login');
        return;
      }
      
      if (isWorkerRoute && userRole !== 'service_provider') {
        console.log('[AuthGuard] Worker route access denied');
        setIsLoading(false);
        router.replace('/login');
        return;
      }

      console.log('[AuthGuard] Access granted');
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (logout/login events)
    const handleStorageChange = () => {
      console.log('[AuthGuard] Storage changed, rechecking auth');
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [pathname, router, requiredRole, fallbackPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Access denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}