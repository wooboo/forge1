import { createRequire } from 'node:module';
import { env } from '@repo/env';
import { defineConfig } from 'drizzle-kit';

const require = createRequire(import.meta.url);
export default defineConfig({
  schema: require.resolve('./schema.ts'),
  out: require.resolve('./'),
  dialect: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
