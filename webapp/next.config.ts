import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Force new build hash
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  
  // Generate ETag headers to help with cache validation
  generateEtags: true,
  
  // Ensure proper headers for cache control
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
