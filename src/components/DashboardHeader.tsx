import { useUserOs } from '@/hooks/useUserOs';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Link } from '@tanstack/react-router';
import { User } from 'lucide-react';
import { Button } from './ui/button';

export const DashboardHeader = () => {

  const { open } = useSidebar();

  const { os } = useUserOs()

  const placeholderText = os === 'windows' ? 'ctrl+k' : 'cmd+k';

  return (
    <header className="flex items-center justify-between w-full px-4 py-1 bg-white">
      <SidebarTrigger className={open ? 'invisible pointer-events-none' : 'visible'} />
      <div>
        <Button variant="outline" className="flex items-center justify-between pl-2 gap-4 border rounded-lg">
          <span>Search</span>
          <span>{placeholderText}</span>
        </Button>
      </div>
      <div>
        <Link to="/profile">
          <User />
        </Link>
      </div>
    </header>
  )
}