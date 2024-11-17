import { createId } from '../ids';
import type { Database } from '../index';
import { owner, propertyOwnership } from '../schema';
const TEST_USER_ID = 'user_2Ufivz3U2xGbaE123vPEPar6J0J';

export default async function seed(db: Database) {
  console.log('Inserting owners...');
  // Insert owners
  const owners = await db
    .insert(owner)
    .values([
      {
        id: 'OWN-0-TW',
        name: 'Tomek Wierzbicki',
        email: null,
        type: 'individual',
      },
      {
        id: 'OWN-0-PZ',
        name: 'Piotr Żabówka',
        userId: TEST_USER_ID, // Set user ID for first owner
        email: 'wooboox@gmail.com',
        type: 'individual',
      },
      {
        id: 'OWN-0-MZR',
        name: 'Małgosia Żabówka-Rogoźnicka',
        email: 'malgosia.zabowka.rogoznicka@gmail.com',
        type: 'individual',
      },
      {
        id: 'OWN-0-EO',
        name: 'Ewa Orłowska',
        email: null,
        type: 'individual',
      },
      {
        id: 'OWN-0-BR',
        name: 'Bożena Rogoźnicka',
        userId: TEST_USER_ID, // Set user ID for first owner
        type: 'individual',
      },
      {
        id: 'OWN-0-AS',
        name: 'Anna Suchodolska',
        email: null,
        type: 'individual',
      },
      {
        id: 'OWN-0-ADC',
        name: 'Anna Dańkowska-Cichy',
        email: null,
        type: 'individual',
      },
    ])
    .returning();
  console.log(`✓ Inserted ${owners.length} owners`);

  console.log('Inserting property ownerships...');
  // Insert property ownership
  const now = Math.floor(Date.now() / 1000);
  const propertyOwnerships = [
    // Plac Szczepański 7 ownerships
    {
      id: createId('POW'),
      buildingId: 'BLD-0-KPS7',
      ownerId: 'OWN-0-ADC',
      ownershipPercentage: 0.25,
      startDate: now,
    },
    {
      id: createId('POW'),
      buildingId: 'BLD-0-KPS7',
      ownerId: 'OWN-0-AS',
      ownershipPercentage: 0.06,
      startDate: now,
    },
    {
      id: createId('POW'),
      buildingId: 'BLD-0-KPS7',
      ownerId: 'OWN-0-BR',
      ownershipPercentage: 0.16,
      startDate: now,
    },
    {
      id: createId('POW'),
      buildingId: 'BLD-0-KPS7',
      ownerId: 'OWN-0-EO',
      ownershipPercentage: 0.25,
      startDate: now,
    },
    {
      id: createId('POW'),
      buildingId: 'BLD-0-KPS7',
      ownerId: 'OWN-0-MZR',
      ownershipPercentage: 0.06,
      startDate: now,
    },
    {
      id: createId('POW'),
      buildingId: 'BLD-0-KPS7',
      ownerId: 'OWN-0-TW',
      ownershipPercentage: 0.22,
      startDate: now,
    },
    // Obrzeżna 1D ownership
    {
      id: createId('POW'),
      buildingId: 'BLD-0-WO1D',
      apartmentId: 'APT-0-WO1D177',
      ownerId: 'OWN-0-PZ',
      ownershipPercentage: 1.0,
      startDate: now,
    },
    // Górczewska 224 ownerships
    {
      id: createId('POW'),
      buildingId: 'BLD-0-WG224',
      apartmentId: 'APT-0-WG224417',
      ownerId: 'OWN-0-PZ',
      ownershipPercentage: 0.5,
      startDate: now,
    },
    {
      id: createId('POW'),
      buildingId: 'BLD-0-WG224',
      apartmentId: 'APT-0-WG224417',
      ownerId: 'OWN-0-MZR',
      ownershipPercentage: 0.5,
      startDate: now,
    },
  ];

  await db.insert(propertyOwnership).values(propertyOwnerships);
  console.log('✓ Inserted all property ownerships');
}
