import { useUserOs } from '@/hooks/useUserOs';
import { Input } from './ui/input';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Link } from '@tanstack/react-router';
import { User } from 'lucide-react';

export const DashboardHeader = () => {

  const { open } = useSidebar();

  const { os } = useUserOs()

  const placeholderText = os === 'windows' ? 'ctrl+k' : 'cmd+k';

  return (
    <header className="flex items-center justify-between w-full px-4 my-1">
      <SidebarTrigger className={open ? 'invisible pointer-events-none' : 'visible'} />
      <div>
        <form>
          <Input placeholder={placeholderText} />
        </form>
      </div>
      <div>
        <Link to="/profile">
          <User />
        </Link>
      </div>
    </header>
  )
}