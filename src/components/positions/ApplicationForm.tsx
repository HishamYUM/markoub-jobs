import * as React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export type ApplicationFormProps = {
  positionId?: string
  submitting: boolean
  onSubmit: (formData: FormData) => Promise<void>
  title?: string
}

export function ApplicationForm({
  positionId,
  submitting,
  onSubmit,
  title = 'Application',
}: ApplicationFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (positionId) fd.set('positionId', positionId)
    await onSubmit(fd)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <Card className="rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <div className="text-lg font-semibold text-neutral-900">{title}</div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm text-neutral-800">Full name *</Label>
            <Input
              name="fullName"
              required
              className="h-11 rounded-xl"
              placeholder="Yassine Alaoui"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-neutral-800">Email address *</Label>
            <Input
              name="email"
              type="email"
              required
              className="h-11 rounded-xl"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label className="text-sm text-neutral-800">Resume *</Label>
          <Input
            name="resume"
            type="file"
            accept="application/pdf"
            required
            className="h-11 rounded-xl"
          />
          <div className="text-xs text-neutral-500">PDF Only, 2 MB Max</div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-orange-600 px-8 text-white hover:bg-orange-700"
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </Button>
        </div>
      </Card>
    </form>
  )
}
