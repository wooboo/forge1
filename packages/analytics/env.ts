import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {};

const client: Parameters<typeof createEnv>[0]['client'] = {
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-'),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
