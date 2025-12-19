import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { adminListApplications } from '../../repos/applications.repo'

const listInputSchema = z.object({
  positionId: z.string().uuid().optional(),
  spontaneousOnly: z.boolean().optional(),
})

export const adminListApplicationsFn = createServerFn({ method: 'GET' })
  .inputValidator(listInputSchema)
  .handler(async ({ data }) => {
    return adminListApplications(data)
  })
