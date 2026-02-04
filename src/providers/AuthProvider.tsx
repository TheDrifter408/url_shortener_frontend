import type { User } from '@/@types/User';
import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@/hooks/useQuery';
import type { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useQuery<User>({
    url: 'http://localhost:5000/auth/me',
    authenticated: true,
  });

  return (
    <AuthContext.Provider value={{ user: data, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );

}