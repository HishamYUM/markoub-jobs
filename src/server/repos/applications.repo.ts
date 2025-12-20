import { and, desc, eq, isNull } from 'drizzle-orm'
import { db } from '../db'
import { applications, positions } from '../db/schema'

export type ApplicationRow = typeof applications.$inferSelect

export async function createApplication(data: {
  positionId?: string | null
  fullName: string
  email: string
  resumePath: string
}) {
  await db.insert(applications).values({
    positionId: data.positionId ?? null,
    fullName: data.fullName,
    email: data.email,
    resumePath: data.resumePath,
  })
}

export async function adminListApplications(filters: {
  positionId?: string
  spontaneousOnly?: boolean
}) {
  const where = and(
    filters.positionId
      ? eq(applications.positionId, filters.positionId)
      : undefined,
    filters.spontaneousOnly ? isNull(applications.positionId) : undefined,
  )

  const rows = await db
    .select({
      id: applications.id,
      fullName: applications.fullName,
      email: applications.email,
      resumePath: applications.resumePath,
      createdAt: applications.createdAt,
      positionTitle: positions.title,
    })
    .from(applications)
    .leftJoin(positions, eq(applications.positionId, positions.id))
    .where(where)
    .orderBy(desc(applications.createdAt))

  return rows
}

export async function adminGetApplicationById(id: string) {
  const rows = await db
    .select({
      id: applications.id,
      fullName: applications.fullName,
      email: applications.email,
      resumePath: applications.resumePath,
      createdAt: applications.createdAt,
      positionId: applications.positionId,
      position: {
        id: positions.id,
        title: positions.title,
      },
    })
    .from(applications)
    .leftJoin(positions, eq(applications.positionId, positions.id))
    .where(eq(applications.id, id))
    .limit(1)

  const row = rows[0].id ? rows[0] : null
  if (!row) return null

  // If no linked position, drizzle will return { id: null, title: null }
  const position =
    row.position?.id && row.position.title
      ? { id: row.position.id, title: row.position.title }
      : null

  return { ...row, position }
}
