import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { notFound } from '@tanstack/react-router'
import { getPositionById, listActivePositions } from '../repos/positions.repo'

const positionIdSchema = z.string().uuid()

export const listPositionsFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Awaited<ReturnType<typeof listActivePositions>>> => {
    return listActivePositions()
  },
)

const getPositionInputSchema = z.object({ id: positionIdSchema })
type GetPositionInput = z.infer<typeof getPositionInputSchema>

export const getPositionFn = createServerFn({ method: 'GET' })
  .inputValidator(getPositionInputSchema)
  .handler(async ({ data }: { data: GetPositionInput }) => {
    const position = await getPositionById(data.id)
    if (!position) throw notFound()
    return position
  })
