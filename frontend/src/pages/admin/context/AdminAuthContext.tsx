import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { IAdminUser } from "../types/types";

interface IAuthContext {
  user: IAdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
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

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Point to your Spring Boot backend URL
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
      
      // 2. Make the real database request
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return { success: false, error: "Invalid admin credentials" };
      }

      // 3. Save the secure token for future Admin API requests
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token.trim());
      }

      // 4. Update the React state to unlock the Admin Dashboard
      setUser({ email, name: "Admin", fullName: "Admin", role: "super_admin" });
      
      return { success: true };
    } catch (error) {
      console.error("Admin login error:", error);
      return { success: false, error: "Could not connect to the server." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token"); // Ensure token is wiped on logout
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
