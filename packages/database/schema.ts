import { text } from 'drizzle-orm/sqlite-core';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const page = sqliteTable('page', {
  id: integer('id').primaryKey(),
  email: text('email').unique(),
  name: text('name'),
});
