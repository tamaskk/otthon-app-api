// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Source path pattern
        destination: 'https://otthon-app-api.vercel.app/api/:path*',  // Actual destination URL
      },
    ]
  },
}

export default nextConfig;
