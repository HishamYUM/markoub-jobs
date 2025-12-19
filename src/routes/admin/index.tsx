import { Link, createFileRoute } from '@tanstack/react-router'
import { Card } from '../../components/ui/card'

export const Route = createFileRoute('/admin/')({
  component: AdminHome,
})

function AdminHome() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-neutral-900">Admin</h1>
        <p className="mt-2 text-neutral-600">
          Manage positions and review applications.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link to="/admin/positions" className="block">
            <Card className="rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow">
              <div className="text-lg font-semibold text-neutral-900">
                Positions
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Create, edit, activate/deactivate positions.
              </div>
            </Card>
          </Link>

          <Link to="/admin/applications" className="block">
            <Card className="rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow">
              <div className="text-lg font-semibold text-neutral-900">
                Applications
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Review candidates and download resumes.
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
