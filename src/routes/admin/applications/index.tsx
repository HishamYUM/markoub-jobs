import { Link, createFileRoute } from '@tanstack/react-router'
import { adminListApplicationsFn } from '../../../server/api/admin/applications'
import { Card } from '../../../components/ui/card'

export const Route = createFileRoute('/admin/applications/')({
  loader: async () => adminListApplicationsFn({ data: {} }),
  component: AdminApplicationsList,
})

function AdminApplicationsList() {
  const apps = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Applications
        </h1>
        <p className="mt-1 text-neutral-600">
          All applications (job-specific + spontaneous).
        </p>

        <Card className="mt-6 rounded-2xl border border-neutral-200 p-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Created</th>
                  <th className="px-4 py-3 text-left font-medium">Candidate</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Position</th>
                  <th className="px-4 py-3 text-right font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3 text-neutral-700">
                      {new Date(a.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {a.fullName}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{a.email}</td>
                    <td className="px-4 py-3 text-neutral-700">
                      {a.positionTitle ?? 'Spontaneous'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to="/admin/applications/$id"
                        params={{ id: a.id }}
                        className="text-orange-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {apps.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-neutral-600" colSpan={5}>
                      No applications yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-6">
          <Link
            to="/admin"
            className="text-sm text-neutral-600 hover:underline"
          >
            ← Back to admin
          </Link>
        </div>
      </div>
    </div>
  )
}
