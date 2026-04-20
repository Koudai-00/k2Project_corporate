import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  iconUrl: text('icon_url'),
  appStoreUrl: text('app_store_url'),
  googlePlayUrl: text('google_play_url'),
  webUrl: text('web_url'),
  visibility: integer('visibility').default(1).notNull(), // 1: visible, 0: hidden
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyName: text('company_name').notNull(),
  address: text('address').notNull(),
  email: text('email'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});
