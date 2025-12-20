import { Link, createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'

import {
  adminDeletePositionFn,
  adminListPositionsFn,
} from '../../../server/api/admin/positions'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { getErrorCode, toUserMessage } from '../../../lib/appErrors'

export const Route = createFileRoute('/admin/positions/')({
  loader: async () => adminListPositionsFn(),
  component: AdminPositionsList,
})

function AdminPositionsList() {
  const positions = Route.useLoaderData()
  const navigate = Route.useNavigate()

  async function onDelete(id: string) {
    const ok = window.confirm('Delete this position? This cannot be undone.')
    if (!ok) return

    try {
      await adminDeletePositionFn({ data: { id } })
      toast.success('Position deleted')
      await navigate({ to: '/admin/positions' })
    } catch (err) {
      toast.error(toUserMessage(getErrorCode(err)))
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Positions
            </h1>
            <p className="mt-1 text-neutral-600">
              All positions (active + inactive)
            </p>
          </div>

          <Button
            asChild
            className="rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            <Link to="/admin/positions/new">New position</Link>
          </Button>
        </div>

        <Card className="mt-6 rounded-xl border border-neutral-200 p-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className={thClasses}>Title</th>
                  <th className={thClasses}>Department</th>
                  <th className={thClasses}>Location</th>
                  <th className={thClasses}>Type</th>
                  <th className={thClasses}>Active</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className={tdTitleClasses}>{p.title}</td>
                    <td className={tdClasses}>{p.department}</td>
                    <td className={tdClasses}>{p.location}</td>
                    <td className={tdClasses}>{p.employmentType}</td>
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            p.isActive ? 'bg-green-500' : 'bg-neutral-300'
                          }`}
                        />
                        <span className="text-neutral-700">
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-3">
                        <Link
                          to="/admin/positions/$id"
                          params={{ id: p.id }}
                          className="text-orange-500 hover:underline"
                        >
                          <Pencil size={14} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => void onDelete(p.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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
            <ArrowLeft size={16} className="inline-block mr-1" /> Back to admin
          </Link>
        </div>
      </div>
    </div>
  )
}

const thClasses = 'px-4 py-3 text-left font-medium'
const tdClasses = 'px-4 py-3 text-neutral-700'
const tdTitleClasses = 'px-4 py-3 font-medium text-neutral-900'
