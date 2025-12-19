import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { listPositionsFn } from '../server/api/positions'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { getErrorCode, toUserMessage } from '@/lib/appErrors'

import { submitApplicationFn } from '@/server/api/applications'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ApplicationForm } from '@/components/positions/ApplicationForm'

export const Route = createFileRoute('/')({
  loader: async () => listPositionsFn(),
  component: OpenPositionsPage,
})

function OpenPositionsPage() {
  const positions = Route.useLoaderData()
  const navigate = Route.useNavigate()

  const [open, setOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  async function onSpontaneousSubmit(fd: FormData) {
    setSubmitting(true)
    try {
      // Do NOT set positionId here
      await submitApplicationFn({ data: fd })
      toast.success('Application sent successfully')
      await navigate({ to: '/application-success' })

      setOpen(false)
    } catch (err) {
      toast.error(toUserMessage(getErrorCode(err)))
    } finally {
      setSubmitting(false)
    }
  }

  const departments = React.useMemo(() => {
    const set = new Set<string>()
    for (const p of positions) set.add(p.department)
    return ['All departments', ...Array.from(set).sort()]
  }, [positions])

  const [department, setDepartment] = React.useState('All departments')

  const filtered = React.useMemo(() => {
    if (department === 'All departments') return positions
    return positions.filter((p) => p.department === department)
  }, [positions, department])

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <h1 className="text-center text-5xl font-semibold tracking-tight text-neutral-900">
          Open Positions
        </h1>

        <div className="mt-14 flex items-center justify-between">
          <div className="text-xl font-semibold text-neutral-800">
            We have {filtered.length} open positions
          </div>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-55 rounded-xl bg-white">
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border-b border-neutral-300 py-7"
            >
              <div className="space-y-1">
                <Link
                  to="/positions/$id"
                  params={{ id: p.id }}
                  className="text-2xl font-semibold text-neutral-900 hover:underline"
                >
                  {p.title}
                </Link>
                <div className="text-base text-neutral-600">{p.department}</div>
              </div>

              <div className="flex items-center gap-16">
                <div className="text-lg text-neutral-800">Hybrid</div>
                <div className="text-lg text-neutral-800">Rabat, Morocco</div>
                <Link
                  to="/positions/$id"
                  params={{ id: p.id }}
                  hash="application"
                >
                  <Button variant="outline" className="h-10 rounded-xl px-7">
                    Apply
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="text-lg text-neutral-700">
            No matching role right now?
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-orange-600 px-8 text-white hover:bg-orange-700">
                Apply spontaneously
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl rounded-2xl p-0">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>Apply spontaneously</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                  <ApplicationForm
                    title=""
                    submitting={submitting}
                    positions={positions.map((p) => ({
                      id: p.id,
                      title: p.title,
                    }))}
                    onSubmit={onSpontaneousSubmit}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
