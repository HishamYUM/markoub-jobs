import { desc, eq } from 'drizzle-orm'
import { db } from '../db'
import { positions } from '../db/schema'

export type PositionRow = typeof positions.$inferSelect

export async function listActivePositions(): Promise<Array<PositionRow>> {
  return db
    .select()
    .from(positions)
    .where(eq(positions.isActive, true))
    .orderBy(desc(positions.createdAt))
}

export async function getPositionById(id: string): Promise<PositionRow | null> {
  const rows = await db
    .select()
    .from(positions)
    .where(eq(positions.id, id))
    .limit(1)

  return rows[0] ?? null
}

export async function adminListPositions() {
  return db.select().from(positions).orderBy(desc(positions.createdAt))
}

export async function adminGetPositionById(
  id: string,
): Promise<PositionRow | null> {
  const rows = await db
    .select()
    .from(positions)
    .where(eq(positions.id, id))
    .limit(1)
  return rows[0] ?? null
}

export async function adminCreatePosition(data: {
  title: string
  department: string
  employmentType: string
  location: string
  description: string
}) {
  const rows = await db.insert(positions).values(data).returning()
  return rows[0]
}

export async function adminUpdatePosition(
  id: string,
  data: {
    title: string
    department: string
    employmentType: string
    location: string
    description: string
  },
) {
  const rows = await db
    .update(positions)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(positions.id, id))
    .returning()
  return rows[0]
}

export async function adminSetPositionActive(id: string, isActive: boolean) {
  await db
    .update(positions)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(positions.id, id))
}

export async function adminDeletePosition(id: string) {
  await db.delete(positions).where(eq(positions.id, id))
}