import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:3000/api/v1/:path*',  // Proxy to Backend
      },
      {
        source: '/api/score/:path*',
        destination:
            'http://localhost:3001/api/score/:path*',  // Proxy to Backend
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'server.gitea.orb.local',
        port: '',
        pathname: '/avatars/**',
      },
    ],
  },
};

export default nextConfig;
