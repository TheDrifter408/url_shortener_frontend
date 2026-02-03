import { createContext, type Dispatch, type SetStateAction } from 'react';

interface ISidebarContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<ISidebarContext | undefined>(undefined);