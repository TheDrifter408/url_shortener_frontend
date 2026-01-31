import { useUserOs } from '@/hooks/useUserOs';
import { Input } from './ui/input';
import { SidebarTrigger, useSidebar } from './ui/sidebar';

export const DashboardHeader = () => {

  const { open } = useSidebar();

  const { os } = useUserOs()

  const placeholderText = os === 'windows' ? 'ctrl+k' : 'cmd+k';

  return (
    <header className="flex items-center justify-between w-full">
      {
        !open ? (
          <SidebarTrigger />
        ) : (
          <div />
        )
      }
      <div>
        <form>
          <Input placeholder={placeholderText} />
        </form>
      </div>
      <div>
        User Profile
      </div>
    </header>
  )
}