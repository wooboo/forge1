import { withContentCollections } from '@content-collections/next';
import { config, withAnalyzer, withSentry } from '@repo/next-config';
import type { NextConfig } from 'next';
import { env } from './env';

let nextConfig: NextConfig = { ...config };

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default withContentCollections(nextConfig);
