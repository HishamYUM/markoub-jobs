import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const positions = pgTable(
  'positions',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    title: text('title').notNull(),
    department: text('department').notNull(),
    employmentType: text('employment_type').notNull(),
    location: text('location').notNull(),
    description: text('description').notNull(),

    isActive: boolean('is_active').notNull().default(true),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index('positions_is_active_idx').on(t.isActive),
    index('positions_created_at_idx').on(t.createdAt),
  ],
)

export const applications = pgTable(
  'applications',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    positionId: uuid('position_id').references(() => positions.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),

    fullName: text('full_name').notNull(),
    email: text('email').notNull(),

    resumePath: text('resume_path').notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index('applications_position_id_idx').on(t.positionId),
    index('applications_created_at_idx').on(t.createdAt),
    index('applications_email_idx').on(t.email),
  ],
)
