import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { adminCreatePositionFn } from '../../../server/api/admin/positions'
import { getErrorCode, toUserMessage } from '../../../lib/appErrors'

export const Route = createFileRoute('/admin/positions/new')({
  component: NewPositionPage,
})

function NewPositionPage() {
  const navigate = Route.useNavigate()
  const [submitting, setSubmitting] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const fd = new FormData(e.currentTarget)
      await adminCreatePositionFn({
        data: {
          title: String(fd.get('title') ?? ''),
          department: String(fd.get('department') ?? ''),
          employmentType: String(fd.get('employmentType') ?? ''),
          location: String(fd.get('location') ?? ''),
          description: String(fd.get('description') ?? ''),
        },
      })
      toast.success('Position created')
      await navigate({ to: '/admin/positions' })
    } catch (err) {
      toast.error(toUserMessage(getErrorCode(err)))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-neutral-900">
          New position
        </h1>

        <form onSubmit={onSubmit} className="mt-6">
          <Card className="rounded-2xl border border-neutral-200 p-8 shadow-sm space-y-5">
            <Field name="title" label="Title" />
            <Field name="department" label="Department" />
            <Field name="employmentType" label="Employment type" />
            <Field name="location" label="Location" />

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                name="description"
                required
                className="min-h-[160px] w-full rounded-xl border border-neutral-200 p-3 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => navigate({ to: '/admin/positions' })}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
              >
                {submitting ? 'Saving…' : 'Create'}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  )
}

function Field({ name, label }: { name: string; label: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input name={name} required className="h-11 rounded-xl" />
    </div>
  )
}
