/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/api', '@repo/db', '@repo/shared', '@repo/tokens'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      { source: '/marketplace', destination: '/creator/marketplace', permanent: false },
      { source: '/marketplace/:id', destination: '/creator/marketplace/:id', permanent: false },
      { source: '/dashboard', destination: '/brand/dashboard', permanent: false },
      { source: '/campaigns', destination: '/brand/campaigns', permanent: false },
      { source: '/campaigns/new', destination: '/brand/campaigns/new', permanent: false },
      { source: '/campaigns/:id', destination: '/creator/campaigns/:id', permanent: false },
      { source: '/wallet', destination: '/creator/wallet', permanent: false },
      { source: '/slab-reveal', destination: '/creator/slab-reveal', permanent: false },
      { source: '/verification', destination: '/creator/verification', permanent: false },
      { source: '/kyc', destination: '/creator/kyc', permanent: false },
      { source: '/admin', destination: '/admin/dashboard', permanent: false },
      { source: '/settings', destination: '/brand/settings', permanent: false },
    ];
  },
};

module.exports = nextConfig;
