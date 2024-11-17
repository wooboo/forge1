import type { Database } from './index';
import {
  agreement,
  document,
  documentUtility,
  lease,
  owner,
  premises,
  property,
  propertyOwnership,
  tenant,
} from './schema';
import seedProperties from './seed/1.properties';
import seedOwnership from './seed/2.ownership';
import seedTenants from './seed/3.tenantship';
import seedAgreements from './seed/4.agreements';

export async function clear(db: Database) {
  console.log('🧹 Clearing database...');
  // Delete in reverse order of dependencies
  await db.delete(documentUtility);
  await db.delete(document);
  await db.delete(agreement);
  await db.delete(lease);
  await db.delete(propertyOwnership);
  await db.delete(tenant);
  await db.delete(owner);
  await db.delete(premises);
  await db.delete(property);
  console.log('✨ Database cleared successfully');
}

export async function seed(db: Database) {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await clear(db);

  seedProperties(db);
  seedOwnership(db);
  seedTenants(db);
  seedAgreements(db);

  console.log('✅ Database seeding completed successfully');
}
