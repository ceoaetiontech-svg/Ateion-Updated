import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { IAdminUser } from "../types/types";

interface IAuthContext {
  user: IAdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean }>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IAdminUser | null>(null);
  const isAuthenticated = user !== null;

  const login = useCallback(async (email: string, _password: string): Promise<{ success: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser({ email, name: "Admin", role: "super_admin" });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AuthContext);
}
