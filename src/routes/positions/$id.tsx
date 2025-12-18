import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getPositionFn } from '../../server/api/positions'

import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'

import { positionContent } from '../../components/positions/PositionContent'
import { ApplicationForm } from '../../components/positions/ApplicationForm'
import { submitApplicationFn } from '@/server/api/applications'

export const Route = createFileRoute('/positions/$id')({
  loader: async ({ params }) => getPositionFn({ data: { id: params.id } }),
  component: PositionDetailPage,
})

function PositionDetailPage() {
  const position = Route.useLoaderData()
  const [submitting, setSubmitting] = React.useState(false)

  async function onSubmit(fd: FormData) {
    setSubmitting(true)
    try {
      await submitApplicationFn({ data: fd })
      alert('Application sent successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <span className="text-lg leading-none">‹</span>
            Browse all open positions
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Left summary card */}
          <div className="col-span-12 md:col-span-4">
            <Card className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
              <div className="space-y-2">
                <div className="text-2xl font-semibold text-neutral-900">
                  {position.title}
                </div>
                <div className="text-sm text-neutral-600">Hybrid · Rabat, Morocco</div>
              </div>

              <div className="mt-5">
                <Button
                  className="h-10 rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700"
                  onClick={() =>
                    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Apply
                </Button>
              </div>
            </Card>
          </div>

          {/* Right content */}
          <div className="col-span-12 md:col-span-8">
            <Section title="What We do">
              <p className="leading-7 text-neutral-700">{positionContent.whatWeDo}</p>
            </Section>

            <Section title="Your Mission">
              <BulletList items={positionContent.mission} />
            </Section>

            <Section title="Your Profile">
              <BulletList items={positionContent.profile} />
            </Section>

            <Section title="Tech Stack">
              <BulletList items={positionContent.techStack} />
            </Section>

            <Section title="What We Offer">
              <BulletList items={positionContent.offer} />
            </Section>

            <Separator className="my-8" />

            <div id="application" />

            <ApplicationForm
              positionId={position.id}
              submitting={submitting}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold text-neutral-900">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-neutral-700">
      {items.map((x, idx) => (
        <li key={idx} className="leading-7">
          {x}
        </li>
      ))}
    </ul>
  )
}