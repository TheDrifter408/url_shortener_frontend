import { Header } from '@/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const Index = () => {
  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_public')({
  component: Index,
});
