/**
 * Get the production URL for the app
 * Always returns the correct production URL, never preview deployments
 */
export function getProductionUrl(): string {
  // If we have VERCEL_URL, use it
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If already on production domain, use it
    if (hostname === 'chockladpengar.vercel.app' || hostname === 'chokladpengar.vercel.app') {
      return window.location.origin;
    }
    
    // For preview/development, always redirect to production
    // Note: Using the correct spelling from Vercel dashboard
    return 'https://chockladpengar.vercel.app';
  }
  
  // Server-side fallback
  return 'https://chockladpengar.vercel.app';
}

/**
 * Get the current app URL (can be preview or production)
 */
export function getCurrentUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return getProductionUrl();
}
