import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

export type ResourceNotFoundProps = {
  title: string
  description?: string
  backTo: { to: string; label: string }
  primaryAction?: { to: string; label: string }
}

export function ResourceNotFound({
  title,
  description = 'This item does not exist or was removed.',
  backTo,
  primaryAction,
}: ResourceNotFoundProps) {
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <Card className="rounded-lg border border-neutral-200 p-8 shadow-sm">
          <div className="text-2xl font-semibold text-neutral-900">{title}</div>
          <p className="mt-2 text-neutral-600">{description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-md">
              <Link to={backTo.to}>{backTo.label}</Link>
            </Button>

            {primaryAction ? (
              <Button
                asChild
                className="rounded-md bg-orange-500 text-white hover:bg-orange-600"
              >
                <Link to={primaryAction.to}>{primaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  )
}
