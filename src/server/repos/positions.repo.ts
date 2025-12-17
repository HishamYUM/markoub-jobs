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
