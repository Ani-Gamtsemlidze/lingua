import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
  /* config options here */
 module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/7.x/initials/svg**',
      },
    ],
  },
// }
};

// export default nextConfig;
