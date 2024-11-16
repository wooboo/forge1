import 'server-only';

import { env } from '@repo/env';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
export * as schema from './schema';

export const database = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  schema,
});
