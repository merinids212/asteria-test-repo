/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Only check TypeScript files in this project
    ignoreBuildErrors: false,
  },
  turbopack: {
    // Explicitly set root to this directory
    root: __dirname,
  },
}

module.exports = nextConfig
