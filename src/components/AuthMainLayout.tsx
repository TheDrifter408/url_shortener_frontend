import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export const AuthMainLayout = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return (
    <div className={cn(
      "flex h-full px-4 border rounded",
      className,
    )}>
      {children}
    </div>
  )
}