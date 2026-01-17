import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms/index')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/terms/"!</div>
}
