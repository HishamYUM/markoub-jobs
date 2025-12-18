import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getPositionFn } from '../../server/api/positions'

import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Separator } from '../../components/ui/separator'
import { submitApplicationFn } from '@/server/api/applications'

export const Route = createFileRoute('/positions/$id')({
  loader: async ({ params }) => getPositionFn({ data: { id: params.id } }),
  component: PositionDetailPage,
})

function PositionDetailPage() {
  const position = Route.useLoaderData()

  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const form = e.currentTarget
      const fd = new FormData(form)

      // Ensure job-specific application
      fd.set('positionId', position.id)

      await submitApplicationFn({ data: fd })
      form.reset()
      alert('Application sent successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  // Static content to match screenshot sections (requirements don't provide these fields)
  const whatWeDo =
    'MarKoub.ma is a pioneering intercity bus ticketing platform in Morocco, committed to making travel easy, affordable, and convenient for everyone. We provide a seamless online experience for booking bus tickets, connecting users with a wide network of bus operators across the country. As we continue to grow, we are looking for a dynamic and experienced Full Stack Developer to join our team.'

  const mission = [
    'Developing application components using React, Next.js, and React Native (with Expo).',
    "Adhering to and enforcing practices, procedures, and use of tool sets described in the team's working agreement.",
    'Building, improving, and maintaining our code base and projects, ensuring they are easy to use, properly tested, simple to extend, and ultimately driving value for our users.',
    'Working as a generalist across back-end, front-end, and mobile development priorities, building integrations and other features for the product.',
    'Supporting the test-driven development of the software stack (e.g., code reviews, unit tests, CI) and documentation.',
    'Implementing integrations with internal and external systems.',
    'Writing clean, efficient, and well-documented code.',
  ]

  const profile = [
    'Experience in building frontend architecture and design systems.',
    'Practical experience in e2e and unit testing.',
    'Working understanding of mono repos and micro-frontends.',
    'Proficient with TypeScript (both frontend and backend).',
    'Great understanding of CI/CD, GitHub Actions, and Vite.',
    'Experience in mobile development using React Native and Expo.',
    'Able to learn new systems and languages with a short ramp-up period.',
    'Experienced in architecting and implementing robust, scalable solutions that tackle real user needs.',
    'Curious, positive, and a doer mentality.',
    '3+ years of professional experience with React, Next.js, React Native, and TypeScript.',
  ]

  const techStack = [
    'Frontend: React, Next.js, JavaScript, TypeScript, Vite',
    'Mobile: React Native, Expo',
    'Libraries: TRPC, Shadcn UI, Drizzle ORM, Node SDKs for various tools',
    'FullStack: Next.js',
    'Backend: Node.js, Nitro',
    'DB: MySQL, PlanetScale, Postgres, Clickhouse',
    'Cloud: VPS, Docker, Cloudflare, R2, Cloudflare Workers',
  ]

  const offer = [
    'Opportunity to be part of a passionate, dynamic and motivated team.',
    'An entrepreneurial journey in a fast growing pioneering scale-up.',
    'Flexibility and a hybrid work environment.',
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Back link */}
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
                <div className="text-sm text-neutral-600">
                  Hybrid · Rabat, Morocco
                </div>
              </div>

              <div className="mt-5">
                <Button
                  className="h-10 rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700"
                  onClick={() => {
                    document
                      .getElementById('application')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Apply
                </Button>
              </div>
            </Card>
          </div>

          {/* Right content */}
          <div className="col-span-12 md:col-span-8">
            <Section title="What We do">
              <p className="leading-7 text-neutral-700">{whatWeDo}</p>
            </Section>

            <Section title="Your Mission">
              <BulletList items={mission} />
            </Section>

            <Section title="Your Profile">
              <BulletList items={profile} />
            </Section>

            <Section title="Tech Stack">
              <BulletList items={techStack} />
            </Section>

            <Section title="What We Offer">
              <BulletList items={offer} />
            </Section>

            <Separator className="my-8" />

            {/* Application card */}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div id="application">
                <Card className="rounded-2xl border border-neutral-200 p-8 shadow-sm">
                  <div className="text-lg font-semibold text-neutral-900">
                    Application
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm text-neutral-800">
                        Full name *
                      </Label>
                      <Input
                        name="fullName"
                        className="h-11 rounded-xl"
                        placeholder="Yassine Alaoui"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-neutral-800">
                        Email address *
                      </Label>
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

                    {/* UI-only placeholder; real upload comes later */}

                    <Input
                      name="resume"
                      type="file"
                      accept="application/pdf"
                      required
                      className="h-11 rounded-xl"
                    />

                    <div className="text-xs text-neutral-500">
                      PDF Only, 2 MB Max
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="rounded-xl bg-orange-600 px-8 text-white"
                    >
                      {submitting ? 'Submitting…' : 'Submit application'}
                    </Button>
                  </div>
                </Card>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold text-neutral-900">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: Array<string> }) {
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
