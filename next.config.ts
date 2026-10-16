import type { NextConfig } from "next";

const springBootUrl =
  process.env.SPRING_BOOT_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

const nextConfig: NextConfig = {
  // Always proxy API calls to Spring Boot backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${springBootUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
