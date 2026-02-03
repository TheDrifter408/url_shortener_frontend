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
              className="w-full border rounded-md overflow-hidden"
            >
              <Link
                to="/links/$linkId"
                params={{ linkId: linkType.id.toString() }}
                className="w-full px-2 py-1.5 inline-block hover:bg-gray-200"
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
    <div id="auth-layout" className="h-screen w-full overflow-hidden p-1 relative bg-muted/50">
      <SidebarProvider className="h-full items-stretch border overflow-hidden rounded-lg bg-muted/75">
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
