import { Link, createFileRoute } from '@tanstack/react-router'
import { adminGetApplicationFn } from '../../../server/api/admin/applications'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'

export const Route = createFileRoute('/admin/applications/$id')({
  loader: async ({ params }) =>
    adminGetApplicationFn({ data: { id: params.id } }),
  component: ApplicationDetailPage,
})

function ApplicationDetailPage() {
  const app = Route.useLoaderData()

  const resumeUrl = `/${app.resumePath.replace(/^\/+/, '')}`

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <div className="mb-6">
          <Link
            to="/admin/applications"
            className="text-sm text-neutral-600 hover:underline"
          >
            ← Back to applications
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-neutral-900">Application</h1>

        <Card className="mt-6 rounded-2xl border border-neutral-200 p-8 shadow-sm space-y-4">
          <Row label="Candidate" value={app.fullName} />
          <Row label="Email" value={app.email} />
          <Row label="Position" value={app.position?.title ?? 'Spontaneous'} />
          <Row
            label="Submitted"
            value={new Date(app.createdAt).toLocaleString()}
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button asChild variant="outline" className="rounded-xl">
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                Open resume
              </a>
            </Button>

            <Button
              asChild
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
            >
              <a href={resumeUrl} download>
                Download resume
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="text-sm text-neutral-600">{label}</div>
      <div className="text-sm font-medium text-neutral-900 text-right">
        {value}
      </div>
    </div>
  )
}
