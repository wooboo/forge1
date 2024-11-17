import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  ARCJET_KEY: z.string().min(1).startsWith('ajkey_'),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    ARCJET_KEY: process.env.ARCJET_KEY,
  },
});
