/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable if using app directory
    // appDir: true,
  },
  // If importing workspace packages, you can enable transpilation by name
  // transpilePackages: ['@incident-system/shared'],
};

module.exports = nextConfig;
