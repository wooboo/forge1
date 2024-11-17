import { type InferInsertModel, relations } from 'drizzle-orm';
import { real, text } from 'drizzle-orm/sqlite-core';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const building = sqliteTable('building', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  zipCode: text('zip_code'),
  city: text('city'),
  area: real('area'), // in square meters/feet
});

export const apartment = sqliteTable('apartment', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  buildingId: text('building_id')
    .notNull()
    .references(() => building.id),
  area: real('area'), // in square meters/feet
});

export const owner = sqliteTable('owner', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  type: text('type').notNull(), // 'individual' or 'company'
});

export const propertyOwnership = sqliteTable('property_ownership', {
  id: text('id').primaryKey(),
  buildingId: text('building_id').references(() => building.id),
  apartmentId: text('apartment_id').references(() => apartment.id),
  ownerId: text('owner_id')
    .notNull()
    .references(() => owner.id),
  ownershipPercentage: real('ownership_percentage').notNull(),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
});

export const tenant = sqliteTable('tenant', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  nip: text('nip'),
  regon: text('regon'),
  pesel: text('pesel'),
  street: text('street'),
  zip: text('zip'),
  city: text('city'),
});

export const lease = sqliteTable('lease', {
  id: text('id').primaryKey(),
  buildingId: text('building_id').references(() => building.id),
  apartmentId: text('apartment_id').references(() => apartment.id),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenant.id),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  monthlyRent: integer('monthly_rent').notNull(),
  depositAmount: integer('deposit_amount'),
});

export const agreement = sqliteTable('agreement', {
  id: text('id').primaryKey(),
  number: text('number').notNull(),
  date: integer('date').notNull(),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenant.id),
  buildingId: text('building_id')
    .notNull()
    .references(() => building.id),
  apartmentId: text('apartment_id').references(() => apartment.id),
  dueDate: integer('due_date').notNull(),
  deposit: integer('deposit').notNull(),
  baseRent: integer('base_rent').notNull(),
  indexation: integer('indexation').notNull().default(0),
});

export const document = sqliteTable('document', {
  id: text('id').primaryKey(),
  agreementId: text('agreement_id')
    .notNull()
    .references(() => agreement.id),
  type: text('type').notNull(), // 'umowa' or 'aneks'
  number: text('number').notNull(),
  date: integer('date').notNull(),
  startDate: integer('start_date'),
  endDate: integer('end_date'),
  description: text('description'),
  dueDate: integer('due_date'),
  deposit: integer('deposit'),
  baseRent: integer('base_rent'),
  indexation: integer('indexation'),
});

export const documentUtility = sqliteTable('document_utility', {
  id: text('id').primaryKey(),
  documentId: text('document_id')
    .notNull()
    .references(() => document.id),
  type: text('type').notNull(),
  monthlyAmount: real('monthly_amount').notNull(),
});

// Type exports for inserts
export type InsertBuilding = InferInsertModel<typeof building>;
export type InsertApartment = InferInsertModel<typeof apartment>;
export type InsertOwner = InferInsertModel<typeof owner>;
export type InsertPropertyOwnership = InferInsertModel<
  typeof propertyOwnership
>;
export type InsertTenant = InferInsertModel<typeof tenant>;
export type InsertLease = InferInsertModel<typeof lease>;
export type InsertAgreement = InferInsertModel<typeof agreement>;
export type InsertDocument = InferInsertModel<typeof document>;
export type InsertDocumentUtility = InferInsertModel<typeof documentUtility>;

// Building relations
export const buildingRelations = relations(building, ({ many }) => ({
  apartments: many(apartment),
  propertyOwnerships: many(propertyOwnership),
  leases: many(lease),
}));

// Apartment relations
export const apartmentRelations = relations(apartment, ({ one, many }) => ({
  building: one(building, {
    fields: [apartment.buildingId],
    references: [building.id],
  }),
  propertyOwnerships: many(propertyOwnership),
  leases: many(lease),
}));

// Owner relations
export const ownerRelations = relations(owner, ({ many }) => ({
  propertyOwnerships: many(propertyOwnership),
}));

// PropertyOwnership relations
export const propertyOwnershipRelations = relations(
  propertyOwnership,
  ({ one }) => ({
    building: one(building, {
      fields: [propertyOwnership.buildingId],
      references: [building.id],
    }),
    apartment: one(apartment, {
      fields: [propertyOwnership.apartmentId],
      references: [apartment.id],
    }),
    owner: one(owner, {
      fields: [propertyOwnership.ownerId],
      references: [owner.id],
    }),
  })
);

// Tenant relations
export const tenantRelations = relations(tenant, ({ many }) => ({
  leases: many(lease),
}));

// Lease relations
export const leaseRelations = relations(lease, ({ one }) => ({
  building: one(building, {
    fields: [lease.buildingId],
    references: [building.id],
  }),
  apartment: one(apartment, {
    fields: [lease.apartmentId],
    references: [apartment.id],
  }),
  tenant: one(tenant, {
    fields: [lease.tenantId],
    references: [tenant.id],
  }),
}));

// Agreement relations
export const agreementRelations = relations(agreement, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [agreement.tenantId],
    references: [tenant.id],
  }),
  building: one(building, {
    fields: [agreement.buildingId],
    references: [building.id],
  }),
  apartment: one(apartment, {
    fields: [agreement.apartmentId],
    references: [apartment.id],
  }),
  documents: many(document),
}));

// Document relations
export const documentRelations = relations(document, ({ one, many }) => ({
  agreement: one(agreement, {
    fields: [document.agreementId],
    references: [agreement.id],
  }),
  utilities: many(documentUtility),
}));

// Document Utility relations
export const documentUtilityRelations = relations(
  documentUtility,
  ({ one }) => ({
    document: one(document, {
      fields: [documentUtility.documentId],
      references: [document.id],
    }),
  })
);
