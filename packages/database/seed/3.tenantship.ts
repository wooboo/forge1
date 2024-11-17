import type { Database } from '../index';

import { createId } from '../ids';
import { tenant } from '../schema';

export default async function seed(db: Database) {
  console.log('Inserting tenants...');
  // Insert tenants
  const tenants = await db
    .insert(tenant)
    .values([
      {
        id: createId('TNT'),
        name: 'Agnieszka Javaheri ...',
        street: '...',
        zip: '01-460',
        city: 'Warszawa',
        nip: null,
        regon: null,
        pesel: null,
      },
    ])
    .returning();
  console.log(`✓ Inserted ${tenants.length} tenants`);

  console.log('Inserting leases...');
  // Insert leases
  // await db.insert(lease).values([]);

  console.log('✓ Inserted all leases');
}
