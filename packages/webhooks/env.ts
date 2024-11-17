import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  SVIX_TOKEN: z
    .string()
    .min(1)
    .startsWith('sk_')
    .or(z.string().min(1).startsWith('testsk_')),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    SVIX_TOKEN: process.env.SVIX_TOKEN,
  },
});
