import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  FLAGS_SECRET: z.string().min(1),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    FLAGS_SECRET: process.env.FLAGS_SECRET,
  },
});
