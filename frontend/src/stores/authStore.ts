import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import * as authService from "@/services/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const response = await authService.login(email, password);
        const { user, token } = response.data;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      },
      register: async (name, email, password) => {
        const response = await authService.register(name, email, password);
        const { user, token } = response.data;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      },
      logout: async () => {
        await authService.logout();
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        set({ user: null, token: null, isAuthenticated: false });
      },
      setUser: (user) => {
        if (user) {
          localStorage.setItem("auth_user", JSON.stringify(user));
        }
        set({ user, isAuthenticated: !!user });
      }
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
    }
  )
);
