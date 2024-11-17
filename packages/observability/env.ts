import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  BETTERSTACK_API_KEY: z.string().min(1),
  BETTERSTACK_URL: z.string().min(1).url(),
  // Added by Sentry Integration, Vercel Marketplace
  SENTRY_ORG: z.string().min(1).optional(),
  SENTRY_PROJECT: z.string().min(1).optional(),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  },
});
