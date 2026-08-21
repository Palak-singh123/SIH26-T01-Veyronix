import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.133.163',
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
