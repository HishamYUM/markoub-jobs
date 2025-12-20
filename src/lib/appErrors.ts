export function toUserMessage(code: string): string {
  switch (code) {
    case 'RESUME_REQUIRED':
      return 'Please attach your resume (PDF).'
    case 'INVALID_FILE_TYPE':
      return 'Resume must be a PDF file.'
    case 'FILE_TOO_LARGE':
      return 'Resume is too large (max 2MB).'
    case 'EXPECTED_FORM_DATA':
      return 'Invalid submission. Please try again.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export function getErrorCode(err: unknown): string {
  if (err instanceof Error && err.message) return err.message

  if (err instanceof Response) {
    return err.status === 404 ? 'NOT_FOUND' : `HTTP_${err.status}`
  }

  return 'UNKNOWN'
}

export function isHttpNotFound(err: unknown): boolean {
  return err instanceof Response && err.status === 404
}
