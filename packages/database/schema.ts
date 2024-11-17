import { type InferInsertModel, relations } from 'drizzle-orm';
import { real, text } from 'drizzle-orm/sqlite-core';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const property = sqliteTable('property', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  zipCode: text('zip_code'),
  city: text('city'),
  area: real('area'), // in square meters/feet
});

export const premises = sqliteTable('premises', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  propertyId: text('property_id')
    .notNull()
    .references(() => property.id),
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
  propertyId: text('property_id').references(() => property.id),
  premisesId: text('premises_id').references(() => premises.id),
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
  propertyId: text('property_id').references(() => property.id),
  premisesId: text('premises_id').references(() => premises.id),
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
  propertyId: text('property_id')
    .notNull()
    .references(() => property.id),
  premisesId: text('premises_id').references(() => premises.id),
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
export type InsertProperty = InferInsertModel<typeof property>;
export type InsertPremises = InferInsertModel<typeof premises>;
export type InsertOwner = InferInsertModel<typeof owner>;
export type InsertPropertyOwnership = InferInsertModel<
  typeof propertyOwnership
>;
export type InsertTenant = InferInsertModel<typeof tenant>;
export type InsertLease = InferInsertModel<typeof lease>;
export type InsertAgreement = InferInsertModel<typeof agreement>;
export type InsertDocument = InferInsertModel<typeof document>;
export type InsertDocumentUtility = InferInsertModel<typeof documentUtility>;

// Property relations
export const propertyRelations = relations(property, ({ many }) => ({
  premises: many(premises),
  propertyOwnerships: many(propertyOwnership),
  leases: many(lease),
}));

// Premises relations
export const premisesRelations = relations(premises, ({ one, many }) => ({
  property: one(property, {
    fields: [premises.propertyId],
    references: [property.id],
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
    property: one(property, {
      fields: [propertyOwnership.propertyId],
      references: [property.id],
    }),
    premises: one(premises, {
      fields: [propertyOwnership.premisesId],
      references: [premises.id],
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
  property: one(property, {
    fields: [lease.propertyId],
    references: [property.id],
  }),
  premises: one(premises, {
    fields: [lease.premisesId],
    references: [premises.id],
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
  property: one(property, {
    fields: [agreement.propertyId],
    references: [property.id],
  }),
  premises: one(premises, {
    fields: [agreement.premisesId],
    references: [premises.id],
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
