import type { Database } from '../index';
import { premises, property } from '../schema';

export default async function seed(db: Database) {
  console.log('Inserting properties...');
  // Insert properties
  const properties = await db
    .insert(property)
    .values([
      {
        id: 'PRP-0-KPS7',
        name: 'Plac Szczepański 7 xxx',
        address: 'Plac Szczepański 7x',
        zipCode: '31-011',
        city: 'Kraków',
        area: 2500,
      },
      {
        id: 'PRP-0-WO1D',
        name: 'Obrzeżna 1D',
        address: 'Obrzeżna 1D',
        zipCode: '00-000',
        city: 'Warszawa',
        area: 0,
      },
      {
        id: 'PRP-0-WG224',
        name: 'Górczewska 224',
        address: 'Górczewska 224',
        zipCode: '01-460',
        city: 'Warszawa',
        area: 0,
      },
    ])
    .returning();
  console.log(`✓ Inserted ${properties.length} properties`);

  console.log('Inserting premises...');
  // Insert premises
  const allPremises = await db
    .insert(premises)
    .values([
      {
        id: 'PRM-0-KPS7A',
        name: 'A',
        propertyId: 'PRP-0-KPS7',
        area: 75,
      },
      {
        id: 'PRM-0-KPS7B',
        name: 'B',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS73',
        name: '3',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS74',
        name: '4',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS74B',
        name: '4b',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS75',
        name: '5',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS76',
        name: '6',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS77',
        name: '7',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS78',
        name: '8',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS78A',
        name: '8a',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS79',
        name: '9',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS710',
        name: '10',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS7PIW',
        name: 'Piwnica',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS7OFF',
        name: 'Oficyna',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-KPS7REST',
        name: 'Rest',
        propertyId: 'PRP-0-KPS7',
        area: 0,
      },
      {
        id: 'PRM-0-WO1D177',
        name: '177',
        propertyId: 'PRP-0-WO1D',
        area: 0,
      },
      {
        id: 'PRM-0-WG224417',
        name: '417',
        propertyId: 'PRP-0-WG224',
        area: 0,
      },
    ])
    .returning();
  console.log(`✓ Inserted ${allPremises.length} premises`);
}
