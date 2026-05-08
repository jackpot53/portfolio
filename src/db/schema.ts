import { pgTable, serial, text, varchar, integer, date, timestamp } from "drizzle-orm/pg-core"

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 20 }).notNull(),        // 'work' | 'education'
  title: text('title').notNull(),
  organization: text('organization').notNull(),
  startedAt: date('started_at').notNull(),                // 입사일 / 입학일
  endedAt: date('ended_at'),                              // 퇴사일 / 졸업일 (null = 재직중)
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type ExperienceRow = typeof experiences.$inferSelect
