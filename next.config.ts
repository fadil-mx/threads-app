import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // experimental: {
  //   serverActions: true,
  //   serverComponentsExternalPackages: ['mongoose'],
  // },
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

export default nextConfig
