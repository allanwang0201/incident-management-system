// Next.js configuration (effective at build and server runtime)
// These settings affect Next.js behavior during development, build, and runtime
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode in development to surface potential issues
  reactStrictMode: true,

  // Transpile workspace packages in a monorepo to avoid ESM/CJS mismatches
  transpilePackages: ['@incident-system/shared', '@incident-system/design-system'],
};

module.exports = nextConfig;
