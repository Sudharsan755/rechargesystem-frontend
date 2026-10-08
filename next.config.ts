import type { NextConfig } from "next";

const springBootUrl =
  process.env.SPRING_BOOT_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

const nextConfig: NextConfig = {
  // If USE_SPRING_BOOT=true is set in .env.local, requests to /api/* proxy to Spring Boot
  ...(process.env.USE_SPRING_BOOT === "true"
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: `${springBootUrl}/api/:path*`,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
