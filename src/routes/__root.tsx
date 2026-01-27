import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '../components/Header'

const RootLayout = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col h-full w-[90%] mx-auto">
        <Header />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
});
