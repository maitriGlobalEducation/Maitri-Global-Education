import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.2"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maitriglobaleducation.com",
      },
    ],
  },
};

export default nextConfig;
