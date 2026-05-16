import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/commande')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/commande"!</div>
}
