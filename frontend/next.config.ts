import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "http://localhost:3001/api/:path*", 
      },
    ];
  },
  images: {
    domains: ["challenge-uno.vercel.app"], // allow external url imas 
  },
};

export default nextConfig;
