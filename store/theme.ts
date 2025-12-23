import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',

      setTheme: (theme) => {
        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
        set({ theme, resolvedTheme });

        // Update DOM
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(resolvedTheme);
        }
      },

      initializeTheme: () => {
        const { theme } = get();
        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
        set({ resolvedTheme });

        // Update DOM
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(resolvedTheme);
        }

        // Listen for system theme changes
        if (typeof window !== 'undefined') {
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const { theme } = get();
            if (theme === 'system') {
              const newResolvedTheme = e.matches ? 'dark' : 'light';
              set({ resolvedTheme: newResolvedTheme });
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(newResolvedTheme);
            }
          });
        }
      },
    }),
    {
      name: 'meshur-theme',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
