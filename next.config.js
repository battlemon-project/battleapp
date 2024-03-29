/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/shop',
        destination: '/game',
        permanent: true,
      },
      {
        source: '/hub',
        destination: '/hub/lemons',
        permanent: true,
      }
    ]
  }
};

module.exports = nextConfig;
