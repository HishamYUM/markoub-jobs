import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Briefcase, Inbox } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-xl font-semibold text-neutral-900">
              Admin
            </Link>

            <div className="hidden h-5 w-px bg-neutral-200 md:block" />

            <nav className="flex items-center gap-4 text-sm">
              <Link
                to="/admin/positions"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
                activeProps={{ className: 'inline-flex items-center gap-2 text-neutral-900' }}
              >
                <Briefcase size={16} />
                Positions
              </Link>

              <Link
                to="/admin/applications"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
                activeProps={{ className: 'inline-flex items-center gap-2 text-neutral-900' }}
              >
                <Inbox size={16} />
                Applications
              </Link>
            </nav>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            Back to site
          </Link>
        </header>

        <Outlet />
      </div>
    </div>
  )
}