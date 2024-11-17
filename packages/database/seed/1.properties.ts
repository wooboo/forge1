import type { Database } from '../index';
import { apartment, building } from '../schema';

export default async function seed(db: Database) {
  console.log('Inserting buildings...');
  // Insert buildings
  const buildings = await db
    .insert(building)
    .values([
      {
        id: 'BLD-0-KPS7',
        name: 'Plac Szczepański 7 xxx',
        address: 'Plac Szczepański 7x',
        zipCode: '31-011',
        city: 'Kraków',
        area: 2500,
      },
      {
        id: 'BLD-0-WO1D',
        name: 'Obrzeżna 1D',
        address: 'Obrzeżna 1D',
        zipCode: '00-000',
        city: 'Warszawa',
        area: 0,
      },
      {
        id: 'BLD-0-WG224',
        name: 'Górczewska 224',
        address: 'Górczewska 224',
        zipCode: '01-460',
        city: 'Warszawa',
        area: 0,
      },
    ])
    .returning();
  console.log(`✓ Inserted ${buildings.length} buildings`);

  console.log('Inserting apartments...');
  // Insert apartments
  const apartments = await db
    .insert(apartment)
    .values([
      {
        id: 'APT-0-KPS7A',
        name: 'A',
        buildingId: 'BLD-0-KPS7',
        area: 75,
      },
      {
        id: 'APT-0-KPS7B',
        name: 'B',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS73',
        name: '3',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS74',
        name: '4',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS74B',
        name: '4b',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS75',
        name: '5',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS76',
        name: '6',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS77',
        name: '7',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS78',
        name: '8',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS78A',
        name: '8a',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS79',
        name: '9',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS710',
        name: '10',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS7PIW',
        name: 'Piwnica',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS7OFF',
        name: 'Oficyna',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-KPS7REST',
        name: 'Rest',
        buildingId: 'BLD-0-KPS7',
        area: 0,
      },
      {
        id: 'APT-0-WO1D177',
        name: '177',
        buildingId: 'BLD-0-WO1D',
        area: 0,
      },
      {
        id: 'APT-0-WG224417',
        name: '417',
        buildingId: 'BLD-0-WG224',
        area: 0,
      },
    ])
    .returning();
  console.log(`✓ Inserted ${apartments.length} apartments`);
}
