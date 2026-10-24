import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve('.'),
  async redirects() {
    return [
      {
        source: '/',
        destination: '/checkout?brand=aarav-naturals',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
