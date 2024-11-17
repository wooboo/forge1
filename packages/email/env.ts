import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  RESEND_AUDIENCE_ID: z.string().min(1),
  RESEND_FROM: z.string().min(1).email(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_'),
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_FROM: process.env.RESEND_FROM,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
  },
});
