import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/ddwapdi3e/image/upload/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
