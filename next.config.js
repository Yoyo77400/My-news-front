/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.vox-cdn.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
