import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authLayout/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forgot-password/"!</div>
}
