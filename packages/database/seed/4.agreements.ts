import type { Database } from '../index';
import { agreement, document, documentUtility } from '../schema';

function parseDate(dateStr: string): number {
  const [day, month, year] = dateStr.split('/').map(Number);
  return Math.floor(new Date(year, month - 1, day).getTime() / 1000);
}

export default async function seed(db: Database) {
  console.log('Inserting agreements...');
  // Insert agreement
  const agreements = await db
    .insert(agreement)
    .values({
      id: 'AGR-0-KPS7A-02-2012', // Use exact ID from YAML
      number: '02/lokal A/2012',
      date: parseDate('27/06/2012'),
      startDate: parseDate('01/07/2012'),
      endDate: parseDate('30/09/2013'),
      tenantId: 'TNT-0-AJ', // Get the last inserted tenant
      buildingId: 'BLD-0-KPS7', // From YAML
      apartmentId: 'APT-0-KPS7A', // From YAML
      dueDate: 10,
      deposit: 11070,
      baseRent: 3000,
      indexation: 1,
    })
    .returning();
  console.log(`✓ Inserted ${agreements.length} agreements`);

  console.log('Inserting documents...');
  // Insert documents
  const documents = await db
    .insert(document)
    .values([
      {
        id: 'DOC-0-KPS7A-02-2012', // Use predictable ID pattern
        agreementId: 'AGR-0-KPS7A-02-2012',
        type: 'umowa',
        number: '02/lokal A/2012',
        date: parseDate('27/06/2012'),
        startDate: parseDate('01/07/2012'),
        endDate: parseDate('30/09/2013'),
        dueDate: 10,
        deposit: 11070,
        baseRent: 3000,
        indexation: 1,
      },
      {
        id: 'DOC-0-KPS7A-02-2012-A1', // Aneks 1
        agreementId: 'AGR-0-KPS7A-02-2012',
        type: 'aneks',
        number: '1',
        date: parseDate('01/08/2013'),
        description: 'wywóz odpadów',
      },
      {
        id: 'DOC-0-KPS7A-02-2012-A2', // Aneks 2
        agreementId: 'AGR-0-KPS7A-02-2012',
        type: 'aneks',
        number: '2',
        date: parseDate('01/09/2013'),
        description: 'przedłużenie',
        startDate: parseDate('01/10/2013'),
        endDate: parseDate('30/09/2015'),
      },
    ])
    .returning();
  console.log(`✓ Inserted ${documents.length} documents`);

  console.log('Inserting document utilities...');
  // Insert document utilities
  await db.insert(documentUtility).values({
    id: 'DUT-0-KPS7A-02-2012-A1-1', // Use predictable ID pattern
    documentId: 'DOC-0-KPS7A-02-2012-A1', // Reference to first aneks
    type: 'odpady',
    monthlyAmount: 63,
  });
  console.log('✓ Inserted document utilities');
}
