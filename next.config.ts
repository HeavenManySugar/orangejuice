import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://server.gitea.orb.local/api/v1/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "server.gitea.orb.local",
        port: '',
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
