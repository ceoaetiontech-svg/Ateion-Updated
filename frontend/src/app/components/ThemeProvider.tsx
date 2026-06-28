import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from "next-themes";
import React, { useCallback } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemeProvider>
  );
}

export function useTheme() {
  const { theme, setTheme } = useNextTheme();
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return {
    theme: (theme || "light") as "light" | "dark",
    setTheme: (t: "light" | "dark") => setTheme(t),
    toggleTheme,
  };
}
