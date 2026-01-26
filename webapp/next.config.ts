import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // PWA configuration will be added via next-pwa
}

export default nextConfig

