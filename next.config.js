/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Skip TypeScript checking during build since we use JavaScript
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
