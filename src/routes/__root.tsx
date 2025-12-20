import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'sonner'
import appCss from '../styles.css?url'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Markoub Jobs' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),

  shellComponent: RootDocument,

  notFoundComponent: () => (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <Card className="rounded-lg border border-neutral-200 p-8 shadow-sm">
          <div className="text-2xl font-semibold text-neutral-900">
            Page not found
          </div>
          <p className="mt-2 text-neutral-600">
            The page you’re trying to open doesn’t exist or was moved.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            >
              <Link to="/">Browse open positions</Link>
            </Button>

            {/* <Button asChild variant="outline" className="rounded-lg">
              <Link to="/admin">Go to admin</Link>
            </Button> */}
          </div>
        </Card>
      </div>
    </div>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* <Header /> */}
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
