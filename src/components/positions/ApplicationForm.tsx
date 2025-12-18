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
          <ResumePicker />
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

function ResumePicker() {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [file, setFile] = React.useState<File | null>(null)

  function openPicker() {
    inputRef.current?.click()
  }

  function clearFile() {
    setFile(null)
    if (inputRef.current) inputRef.current.value = '' // critical: allows re-select same file
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.files?.[0] ?? null
    setFile(next)
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm text-neutral-800">Resume *</Label>

      <input
        ref={inputRef}
        name="resume"
        type="file"
        accept="application/pdf"
        required
        className="hidden"
        onChange={onChange}
      />

      <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm text-neutral-900">
            {file ? file.name : 'No file selected'}
          </div>
          <div className="text-xs text-neutral-500">PDF only · Max 2MB</div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-xl"
            onClick={openPicker}
          >
            {file ? 'Change' : 'Upload'}
          </Button>

          {file ? (
            <Button
              type="button"
              variant="ghost"
              className="h-9 rounded-xl text-neutral-600 hover:text-neutral-900"
              onClick={clearFile}
            >
              Remove
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
