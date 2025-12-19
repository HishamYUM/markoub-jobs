import * as React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type PositionOption = { id: string; title: string }
const NO_POSITION_VALUE = '__none__' as const

export type ApplicationFormProps = {
  positionId?: string
  positions?: Array<PositionOption>
  submitting: boolean
  onSubmit: (formData: FormData) => Promise<void>
  title?: string
}

const FIELD = {
  label: 'text-sm text-neutral-800',
  input: 'h-11 rounded-lg',
  section: 'space-y-2',
} as const

export function ApplicationForm({
  positionId,
  positions,
  submitting,
  onSubmit,
  title = 'Application',
}: ApplicationFormProps) {
  const { selectedPositionId, setSelectedPositionId, resolvedPositionId } =
    usePositionId(positionId)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const pid = resolvedPositionId(selectedPositionId)
    if (pid) fd.set('positionId', pid)
    else fd.delete('positionId')

    await onSubmit(fd)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <Card className="rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <div className="text-lg font-semibold text-neutral-900">{title}</div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className={FIELD.section}>
            <Label className={FIELD.label}>Full name *</Label>
            <Input
              name="fullName"
              required
              className={FIELD.input}
              placeholder="Yassine Alaoui"
            />
          </div>

          <div className={FIELD.section}>
            <Label className={FIELD.label}>Email address *</Label>
            <Input
              name="email"
              type="email"
              required
              className={FIELD.input}
              placeholder="example@mail.com"
            />
          </div>
        </div>

        {positions?.length ? (
          <PositionSelect
            value={selectedPositionId}
            onChange={setSelectedPositionId}
            positions={positions}
          />
        ) : null}

        <ResumePicker />

        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-orange-500 px-8 text-white hover:bg-orange-600"
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </Button>
        </div>
      </Card>
    </form>
  )
}

function usePositionId(positionId?: string) {
  const [selectedPositionId, setSelectedPositionId] = React.useState<string>(
    positionId ?? NO_POSITION_VALUE,
  )

  const resolvedPositionId = React.useCallback(
    (selected: string): string | undefined => {
      if (positionId) return positionId
      return selected !== NO_POSITION_VALUE ? selected : undefined
    },
    [positionId],
  )

  return { selectedPositionId, setSelectedPositionId, resolvedPositionId }
}

function PositionSelect({
  value,
  onChange,
  positions,
}: {
  value: string
  onChange: (v: string) => void
  positions: Array<PositionOption>
}) {
  return (
    <div className={FIELD.section}>
      <Label className={FIELD.label}>Position applying for</Label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 rounded-lg w-full">
          <SelectValue placeholder="Position applying for" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={NO_POSITION_VALUE}>
            No specific position
          </SelectItem>
          {positions.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
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
    if (inputRef.current) inputRef.current.value = ''
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null)
  }

  return (
    <div className={FIELD.section}>
      <Label className={FIELD.label}>Resume *</Label>

      <input
        ref={inputRef}
        name="resume"
        type="file"
        accept="application/pdf"
        required
        className="hidden"
        onChange={onChange}
      />

      <div className="flex h-11 items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4">
        <div className="min-w-0 truncate text-sm text-neutral-900">
          {file ? file.name : 'No file selected'}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            className="h-9 rounded-md"
            onClick={openPicker}
          >
            {file ? 'Change' : 'Resume'}
          </Button>

          {file ? (
            <Button
              type="button"
              variant="ghost"
              className="h-9 rounded-md text-neutral-600 hover:text-neutral-900"
              onClick={clearFile}
            >
              ×
            </Button>
          ) : null}
        </div>
      </div>

      <div className="text-xs text-neutral-500">PDF only · Max 2MB</div>
    </div>
  )
}
