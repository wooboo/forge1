// import 'server-only';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from './env';
import * as schema from './schema';
export * as schema from './schema';

export const database = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  schema,
});

export type Database = typeof database;
