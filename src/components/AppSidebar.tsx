import type { ReactNode } from 'react';
import { Sidebar, SidebarContent } from './ui/sidebar';
import type { LinkType } from '@/@types/link';
import { cn } from '@/lib/utils';

interface IAppSidebarProps {
  links: LinkType[];
  render: (links: LinkType[]) => ReactNode;
}

export const AppSidebar = ({ links, render }: IAppSidebarProps) => {
  return (
    <Sidebar className={cn("absolute! top-1 left-1 h-full rounded-l-lg")}>
      <SidebarContent className="border-y border-l rounded-tr-0 rounded-l-lg bg-gray-100">
        {render(links)}
      </SidebarContent>
    </Sidebar>
  )
}