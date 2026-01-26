"use client";

// Debug utility for authentication
export function clearAllAuthData() {
  // Clear localStorage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('customerProfile');

  // Clear cookies
  document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Trigger storage event
  window.dispatchEvent(new Event('storage'));
  
  console.log('All authentication data cleared');
}

export function checkAuthStatus() {
  const localStorage_isLoggedIn = localStorage.getItem('isLoggedIn');
  const localStorage_userRole = localStorage.getItem('userRole');
  const localStorage_userEmail = localStorage.getItem('userEmail');
  
  // Get all cookies
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  console.log('Authentication Status:', {
    localStorage: {
      isLoggedIn: localStorage_isLoggedIn,
      userRole: localStorage_userRole,
      userEmail: localStorage_userEmail
    },
    cookies: cookies
  });

  return {
    isAuthenticated: localStorage_isLoggedIn === 'true',
    userRole: localStorage_userRole,
    userEmail: localStorage_userEmail
  };
}

// Add to window for debugging
if (typeof window !== 'undefined') {
  (window as any).clearAllAuthData = clearAllAuthData;
  (window as any).checkAuthStatus = checkAuthStatus;
}