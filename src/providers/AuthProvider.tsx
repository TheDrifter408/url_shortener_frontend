import type { User } from '@/@types/User';
import { AuthContext } from '@/context/AuthContext';
import { useUrlShortenerStore } from '@/store/store';
import { useEffect, useState, type ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUrlShortenerStore((state) => state.user);
  const setUser = useUrlShortenerStore((state) => state.setUser);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.data as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();

  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );

}