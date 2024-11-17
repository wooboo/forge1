import { database } from './index';
import { seed } from './seed';

async function main() {
  console.log('🌱 Starting database seeding...');
  try {
    await seed(database);
    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
  process.exit(0);
}

main();
