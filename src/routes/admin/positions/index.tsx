import { Link, createFileRoute } from '@tanstack/react-router'
import { adminListPositionsFn } from '../../../server/api/admin/positions'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'

export const Route = createFileRoute('/admin/positions/')({
  loader: async () => adminListPositionsFn(),
  component: AdminPositionsList,
})

function AdminPositionsList() {
  const positions = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Positions
            </h1>
            <p className="mt-1 text-neutral-600">
              All positions (active + inactive).
            </p>
          </div>

          <Button
            asChild
            className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
          >
            <Link to="/admin/positions/new">New position</Link>
          </Button>
        </div>

        <Card className="mt-6 rounded-2xl border border-neutral-200 p-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Location</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Active</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      {p.department}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{p.location}</td>
                    <td className="px-4 py-3 text-neutral-700">
                      {p.employmentType}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      {p.isActive ? 'Yes' : 'No'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to="/admin/positions/$id"
                        params={{ id: p.id }}
                        className="text-orange-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
                {positions.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-neutral-600" colSpan={6}>
                      No positions yet.
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
