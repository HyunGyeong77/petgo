import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'petgo-api.onrender.com'
      }
    ]
  }
};

export default nextConfig;
