import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
});
