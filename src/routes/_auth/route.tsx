import type { LinkType } from '@/@types/link';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SidebarGroup, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useQuery } from '@/hooks/useQuery';
import { useUrlShortenerStore } from '@/store/store';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

const AuthenticatedLayout = () => {

  const { data, loading, error } = useQuery<LinkType[]>({
    url: `http://localhost:5000/minurl/all`,
    authenticated: true,
  })

  const links = useUrlShortenerStore((state) => state.links);
  const setLinks = useUrlShortenerStore((state) => state.setLinks);

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  if (error) return null;

  const renderFn = (links: LinkType[], loading: boolean) => {
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
        <SidebarGroup>
          <SidebarMenuItem
            className="w-full border rounded-md overflow-hidden flex items-center px-2 py-1.5 hover:bg-gray-200"
          >
            <Link className="w-full inline-block flex-1" to="/shorten_url">
              {'Create'}
            </Link>
            <Plus className="size-4" />
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup className='gap-2'>
          {
            loading ? Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index} className="w-full border rounded-md animate-pulse duration-500" />
            )) : links.map((linkType, index) => (
              <SidebarMenuItem
                key={`${index}-${linkType.id}`}
                className="w-full border rounded-md overflow-hidden"
              >
                <Link
                  to="/links/$linkId"
                  params={{ linkId: linkType.slug.toString() }}
                  className="w-full px-2 py-1.5 inline-block text-sm hover:bg-gray-200"
                >
                  {linkType.long_url}
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
        <AppSidebar links={links} loading={loading} render={renderFn} />
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
