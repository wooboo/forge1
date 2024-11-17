import type { MetadataRoute } from 'next';
import { env } from '../env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL(
      '/sitemap.xml',
      env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ).href,
  };
}
