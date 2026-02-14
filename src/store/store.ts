import type { LinkType } from '@/@types/link';
import type { User } from '@/@types/User';
import { create } from 'zustand';

interface IUrlShortenerStore {
  // User State and functions
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  // Links state and functions
  links: LinkType[];
  setLinks: (links: LinkType[]) => void;
  addLink: (link: LinkType) => void;
  deleteLink: (id: number) => void;
}

export const useUrlShortenerStore = create<IUrlShortenerStore>((set, get) => ({
  // User State and functions
  user: null,
  setUser: (user: User) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null })
  },
  // Links State and functions
  links: [],
  setLinks: (links: LinkType[]) => {
    set({ links });
  },
  addLink: (link: LinkType) => {
    const newLinks = [...get().links, link];
    set({ links: newLinks });
  },
  deleteLink: (id: number) => {
    const newLinks = get().links.filter((link) => link.id !== id);
    set({ links: newLinks });
  }
}))