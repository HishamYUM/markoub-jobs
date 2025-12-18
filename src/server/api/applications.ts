import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { savePdfStream } from '../../server/services/uploadResume'
import { createApplication } from '../../server/repos/applications.repo'

const inputSchema = z.object({
  positionId: z.string().uuid().optional(),
  fullName: z.string().min(1),
  email: z.string().email(),
})

type Validated = z.infer<typeof inputSchema> & { file: File }

function isFormData(value: unknown): value is FormData {
  return typeof value === 'object' && value !== null && 'get' in value
}

export const submitApplicationFn = createServerFn({ method: 'POST' })
  .inputValidator((raw: unknown): Validated => {
    if (!isFormData(raw)) {
      throw new Error('EXPECTED_FORM_DATA')
    }

    const parsed = inputSchema.parse({
      positionId: (raw.get('positionId') || undefined) as string | undefined,
      fullName: raw.get('fullName'),
      email: raw.get('email'),
    })

    const file = raw.get('resume')
    if (!(file instanceof File)) {
      throw new Error('RESUME_REQUIRED')
    }
    if (file.type !== 'application/pdf') {
      throw new Error('INVALID_FILE_TYPE')
    }

    return { ...parsed, file }
  })
  .handler(async ({ data }: { data: Validated }) => {
    const resumePath = await savePdfStream(data.file)

    await createApplication({
      positionId: data.positionId,
      fullName: data.fullName,
      email: data.email,
      resumePath,
    })

    return { success: true }
  })
