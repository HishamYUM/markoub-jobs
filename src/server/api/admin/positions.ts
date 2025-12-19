import { createServerFn } from '@tanstack/react-start'
import { adminListPositions } from '../../repos/positions.repo'

export const adminListPositionsFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return adminListPositions()
  },
)
