import type { User } from '@/@types/User';
import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@/hooks/useQuery';
import type { ReactNode } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useQuery<User>({
    url: `${BASE_URL}/auth/me`,
    authenticated: true,
  });

  return (
    <AuthContext.Provider value={{ user: data, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );

}