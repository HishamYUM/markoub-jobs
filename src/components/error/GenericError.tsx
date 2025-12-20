import { Link } from '@tanstack/react-router'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

export type GenericErrorProps = {
  title?: string
  message?: string
  backTo?: { to: string; label: string }
}

export function GenericError({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  backTo,
}: GenericErrorProps) {
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <Card className="rounded-lg border border-neutral-200 p-8 shadow-sm">
          <div className="text-2xl font-semibold text-neutral-900">{title}</div>
          <p className="mt-2 text-neutral-600">{message}</p>

          {backTo ? (
            <div className="mt-6">
              <Button asChild variant="outline" className="rounded-md">
                <Link to={backTo.to}>{backTo.label}</Link>
              </Button>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}
