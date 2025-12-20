import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { notFound } from '@tanstack/react-router'
import {
  adminCreatePosition,
  adminDeletePosition,
  adminGetPositionById,
  adminListPositions,
  adminSetPositionActive,
  adminUpdatePosition,
} from '../../repos/positions.repo'

const idSchema = z.object({ id: z.string().uuid() })

const positionPayloadSchema = z.object({
  title: z.string().min(1),
  department: z.string().min(1),
  employmentType: z.string().min(1),
  workMode: z.enum(['remote', 'onsite', 'hybrid']),
  location: z.string().min(1),
  description: z.string().min(1),
})

const updateSchema = idSchema.merge(positionPayloadSchema)
const setActiveSchema = idSchema.merge(z.object({ isActive: z.boolean() }))
const deleteSchema = idSchema

export const adminListPositionsFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return adminListPositions()
  },
)

export const adminGetPositionFn = createServerFn({ method: 'GET' })
  .inputValidator(idSchema)
  .handler(async ({ data }) => {
    const p = await adminGetPositionById(data.id)
    if (!p) throw notFound()

    return p
  })

export const adminCreatePositionFn = createServerFn({ method: 'POST' })
  .inputValidator(positionPayloadSchema)
  .handler(async ({ data }) => {
    return adminCreatePosition(data)
  })

export const adminUpdatePositionFn = createServerFn({ method: 'POST' })
  .inputValidator(updateSchema)
  .handler(async ({ data }) => {
    return adminUpdatePosition(data.id, data)
  })

export const adminSetPositionActiveFn = createServerFn({ method: 'POST' })
  .inputValidator(setActiveSchema)
  .handler(async ({ data }) => {
    await adminSetPositionActive(data.id, data.isActive)
    return { success: true }
  })

export const adminDeletePositionFn = createServerFn({ method: 'POST' })
  .inputValidator(deleteSchema)
  .handler(async ({ data }) => {
    await adminDeletePosition(data.id)
    return { success: true }
  })
