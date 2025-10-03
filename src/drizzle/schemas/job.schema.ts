import { pgTable, text, uuid, boolean, timestamp } from 'drizzle-orm/pg-core';
import { company } from './company.schema';

export const job = pgTable('job', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  desc: text('desc').notNull().unique(),
  category: boolean('category').default(false).notNull(),
  type: text('type').notNull(),
  salaryRange: text('salary_range').notNull(),
  location: text('location').notNull(),
  status: boolean('status').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  companyId: uuid('company_id')
    .notNull()
    .references(() => company.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});
