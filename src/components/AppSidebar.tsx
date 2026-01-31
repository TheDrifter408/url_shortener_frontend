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
    <Sidebar className={cn(
      "relative! inset-0! h-full rounded-l-md",
      "data-[state=collapsed]:w-0! data-[state=collapsed]:min-w-0"
    )}>
      <SidebarContent className="">
        {render(links)}
      </SidebarContent>
    </Sidebar>
  )
}