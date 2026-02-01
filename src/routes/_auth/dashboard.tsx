import { createFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="flex h-full px-4 border rounded">
      <div id="links-overview">
        Hello World!
      </div>
    </div>
  )
}


export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

