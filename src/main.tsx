import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from "./routeTree.gen.ts";
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { useUrlShortenerStore } from './store/store.ts';

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
  const user = useUrlShortenerStore((state) => state.user);
  return <RouterProvider router={router} context={{ auth: { user, isLoading: !!user } }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
