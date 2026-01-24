import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      currentTheme: 'NOIR', // Default to NOIR as per user preference likely
      setCurrentTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useThemeStore;
