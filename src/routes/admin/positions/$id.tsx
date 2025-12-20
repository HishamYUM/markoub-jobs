import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  adminGetPositionFn,
  adminSetPositionActiveFn,
  adminUpdatePositionFn,
} from '../../../server/api/admin/positions'
import { getErrorCode, toUserMessage } from '../../../lib/appErrors'

export const Route = createFileRoute('/admin/positions/$id')({
  loader: async ({ params }) => adminGetPositionFn({ data: { id: params.id } }),
  component: EditPositionPage,
})

function EditPositionPage() {
  const navigate = Route.useNavigate()
  const position = Route.useLoaderData()
  const [submitting, setSubmitting] = React.useState(false)
  const [toggling, setToggling] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const fd = new FormData(e.currentTarget)
      await adminUpdatePositionFn({
        data: {
          id: position.id,
          title: String(fd.get('title') ?? ''),
          department: String(fd.get('department') ?? ''),
          employmentType: String(fd.get('employmentType') ?? ''),
          location: String(fd.get('location') ?? ''),
          description: String(fd.get('description') ?? ''),
        },
      })
      toast.success('Position updated')
      await navigate({ to: '/admin/positions' })
    } catch (err) {
      toast.error(toUserMessage(getErrorCode(err)))
    } finally {
      setSubmitting(false)
    }
  }

  async function toggleActive() {
    setToggling(true)
    try {
      await adminSetPositionActiveFn({
        data: { id: position.id, isActive: !position.isActive },
      })
      toast.success(
        position.isActive ? 'Position deactivated' : 'Position activated',
      )
      await navigate({ to: '/admin/positions' })
    } catch (err) {
      toast.error(toUserMessage(getErrorCode(err)))
    } finally {
      setToggling(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full  px-6 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Edit position
            </h1>
            <p className="mt-1 text-neutral-600">
              {position.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-md"
            disabled={toggling}
            onClick={toggleActive}
          >
            {toggling
              ? 'Updating…'
              : position.isActive
                ? 'Deactivate'
                : 'Activate'}
          </Button>
        </div>

        <form onSubmit={onSubmit} className="mt-6">
          <Card className="rounded-xl border border-neutral-200 p-8 shadow-sm space-y-5">
            <Field name="title" label="Title" defaultValue={position.title} />
            <Field
              name="department"
              label="Department"
              defaultValue={position.department}
            />
            <Field
              name="employmentType"
              label="Employment type"
              defaultValue={position.employmentType}
            />
            <Field
              name="location"
              label="Location"
              defaultValue={position.location}
            />

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                name="description"
                required
                defaultValue={position.description}
                className="min-h-40 w-full rounded-md border border-neutral-200 p-3 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-md"
                onClick={() => navigate({ to: '/admin/positions' })}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-orange-500 text-white hover:bg-orange-600"
              >
                {submitting ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  )
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string
  label: string
  defaultValue: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        name={name}
        required
        defaultValue={defaultValue}
        className="h-11 rounded-md"
      />
    </div>
  )
}
