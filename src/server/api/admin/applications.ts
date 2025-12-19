import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import {
  adminGetApplicationById,
  adminListApplications,
} from '../../repos/applications.repo'

const listInputSchema = z.object({
  positionId: z.string().uuid().optional(),
  spontaneousOnly: z.boolean().optional(),
})

const idSchema = z.object({ id: z.string().uuid() })

export const adminListApplicationsFn = createServerFn({ method: 'GET' })
  .inputValidator(listInputSchema)
  .handler(async ({ data }) => {
    return adminListApplications(data)
  })

export const adminGetApplicationFn = createServerFn({ method: 'GET' })
  .inputValidator(idSchema)
  .handler(async ({ data }) => {
    const app = await adminGetApplicationById(data.id)
    if (!app) throw new Error('APPLICATION_NOT_FOUND')
    return app
  })