import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/application-success')({
  component: ApplicationSuccessPage,
})

function ApplicationSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Application submitted 🎉
        </h1>

        <p className="mt-3 text-neutral-600">
          Thank you for your interest. Our team will review your application and
          get back to you if there’s a match.
        </p>

        <div className="mt-6">
          <Button asChild className="rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700">
            <Link to="/">Browse other positions</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}