import { database, schema } from '@repo/database';
import { eq } from 'drizzle-orm';

export const POST = async () => {
  const newPage = await database
    .insert(schema.page)
    .values({ name: 'cron-temp', email: 'test@test.com' })
    .returning({ id: schema.page.id });

  await database.delete(schema.page).where(eq(schema.page.id, newPage[0].id));

  return new Response('OK', { status: 200 });
};
