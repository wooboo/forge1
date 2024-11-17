import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),
  ANALYZE: z.string().optional(),
  VERCEL: z.string().optional(),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    ANALYZE: process.env.ANALYZE,
    VERCEL: process.env.VERCEL,
  },
});
