import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../../types/user";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      setUser: (user: User) =>
        set(() => ({
          user,
          isAuthenticated: true,
        })),
      clearIsAuthenticated: () =>
        set(() => ({
          user: null,
          isAuthenticated: false,
        })),
      setHydrated: () => set(() => ({ isHydrated: true })),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);