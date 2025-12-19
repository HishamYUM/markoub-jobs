import { and, desc, eq, isNull } from 'drizzle-orm'
import { db } from '../db'
import { applications, positions } from '../db/schema'

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
