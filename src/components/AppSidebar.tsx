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
    <Sidebar className={cn("")}>
      <SidebarContent className="">
        {render(links)}
      </SidebarContent>
    </Sidebar>
  )
}