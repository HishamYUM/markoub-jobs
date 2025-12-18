import { db } from '../db'
import { applications } from '../db/schema'

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
