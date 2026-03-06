import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from "./routeTree.gen.ts";
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { useAuth } from './hooks/useAuth.ts';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        Loading....
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth: { user, isLoading: !!user } }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
