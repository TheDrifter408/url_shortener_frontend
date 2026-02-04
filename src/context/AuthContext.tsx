import type { User } from '@/@types/User';
import { createContext } from 'react';

export interface IAuthContext {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);