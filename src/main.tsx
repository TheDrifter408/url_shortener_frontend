import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from "./routeTree.gen.ts";
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';

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
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
