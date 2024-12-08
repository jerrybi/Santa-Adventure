import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.artiversehub.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
  redirects: () => {
    return [
      {
        source: '/jp',
        destination: '/ja',
        permanent: true
      },
      {
        source: '/jp/p/:slug',
        destination: '/ja/p/:slug',
        permanent: true
      },
      {
        source: '/jp/explore',
        destination: '/ja/explore',
        permanent: true
      },
      {
        source: '/jp/explore/page/:slug',
        destination: '/ja/explore/page/:slug',
        permanent: true
      },
      {
        source: '/jp/categories',
        destination: '/ja/categories',
        permanent: true
      },
      {
        source: '/jp/c/:slug',
        destination: '/ja/c/:slug',
        permanent: true
      },
      {
        source: '/cn',
        destination: '/zh',
        permanent: true
      },
      {
        source: '/cn/p/:slug',
        destination: '/zh/p/:slug',
        permanent: true
      },
      {
        source: '/cn/explore',
        destination: '/zh/explore',
        permanent: true
      },
      {
        source: '/cn/explore/page/:slug',
        destination: '/zh/explore/page/:slug',
        permanent: true
      },
      {
        source: '/cn/categories',
        destination: '/zh/categories',
        permanent: true
      },
      {
        source: '/cn/c/:slug',
        destination: '/zh/c/:slug',
        permanent: true
      },
    ];
  }
};

export default withNextIntl(nextConfig);
