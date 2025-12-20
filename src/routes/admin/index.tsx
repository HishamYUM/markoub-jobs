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
          <AdminSectionCard
            to="/admin/positions"
            title="Positions"
            description="Create, edit, activate/deactivate positions."
          />

          <AdminSectionCard
            to="/admin/applications"
            title="Applications"
            description="Review candidates and download resumes."
          />
        </div>
      </div>
    </div>
  )
}

function AdminSectionCard({
  to,
  title,
  description,
}: {
  to: string
  title: string
  description: string
}) {
  return (
    <Link to={to} className="block">
      <Card className="rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow">
        <div className="text-lg font-semibold text-neutral-900">{title}</div>
        <div className="mt-1 text-sm text-neutral-600">{description}</div>
      </Card>
    </Link>
  )
}
