import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { IAuthContext } from '@/context/AuthContext'

interface AuthRouterContext {
  auth: IAuthContext
}

const RootLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}

export const Route = createRootRouteWithContext<AuthRouterContext>()({
  component: RootLayout,
});
