"use client";

// Global auth state via React Context (the project's existing state pattern).
// Responsibilities: session restore + JWT verify on load, persistent login,
// login/register/logout, and in-tab/cross-tab sync.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  loginUser,
  registerUser,
  verifyUser,
  logoutUser,
} from "@/services/auth.service";
import { getStoredUser, AUTH_EVENT } from "@/lib/session";
import type { AuthUser, LoginRequest, RegisterRequest } from "@/types/api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean; // true until the initial verify resolves
  isAuthenticated: boolean;
  login: (payload: LoginRequest, remember?: boolean) => Promise<AuthUser>;
  register: (payload: RegisterRequest) => Promise<AuthUser>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Session restore: hydrate from storage instantly, then validate the token.
  useEffect(() => {
    let active = true;
    setUser(getStoredUser());
    verifyUser()
      .then((verified) => {
        if (active) setUser(verified);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Keep in sync when other tabs / components change the session.
  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const login = useCallback(
    async (payload: LoginRequest, remember = true) => {
      const u = await loginUser(payload, remember);
      setUser(u);
      return u;
    },
    []
  );

  const register = useCallback(async (payload: RegisterRequest) => {
    const u = await registerUser(payload, true);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    setUser(await verifyUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
