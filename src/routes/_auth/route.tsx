import type { LinkType } from '@/@types/link';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SidebarGroup, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const AuthenticatedLayout = () => {

  const links = Array.from({ length: 10 })
    .map((_, index) => ({ id: index, title: `link-title-${index}`, link: `link-${index}` }));

  const renderFn = (links: LinkType[]) => {
    return (
      <>
        <SidebarGroup>
          <SidebarMenuItem className="flex items-center justify-between w-full">
            <Link to="/dashboard" className="[&.active]:text-bold [&.active]:text-blue-700">
              Dashboard
            </Link>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup className='gap-2'>
          {links.map((linkType, index) => (
            <SidebarMenuItem
              key={`${index}-${linkType.id}`}
              className="w-full border rounded-md"
            >
              <Link
                to="/links/$linkId"
                params={{ linkId: linkType.id.toString() }}
                className="border rounded-md"
              >
                {linkType.title}
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </>
    )
  }

  return (
    <div id="auth-layout" className="h-screen w-full border overflow-hidden bg-muted/50">
      <SidebarProvider className="items-stretch">
        <AppSidebar links={links} render={renderFn} />
        <main className="flex-1">
          <DashboardHeader />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}

export const Route = createFileRoute('/_auth')({
  component: AuthenticatedLayout,
})
