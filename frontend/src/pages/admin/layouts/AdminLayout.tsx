import { useEffect, useCallback } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import CommandPalette from "../components/CommandPalette";
import ToastContainer from "../components/ui/Toast";

const ADMIN_THEME_KEY = "ateion-admin-theme";
const MAIN_THEME_KEY = "ateion-theme";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
};

export default function AdminLayout() {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const adminTheme = localStorage.getItem(ADMIN_THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (!adminTheme) {
      localStorage.setItem(ADMIN_THEME_KEY, "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", adminTheme);
    }

    return () => {
      const mainTheme = localStorage.getItem(MAIN_THEME_KEY) || (prefersDark ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", mainTheme);
    };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (e.key === "n" && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      if (location.pathname.startsWith("/admin/courses") || location.pathname.startsWith("/admin/dashboard")) {
        navigate("/admin/upload");
      }
    }

    if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      const searchInput = document.querySelector<HTMLInputElement>(
        'input[type="text"][placeholder*="Search"]',
      );
      searchInput?.focus();
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] text-[var(--color-text-primary)] flex">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <AdminHeader />
        <div className="p-8 max-w-[var(--admin-content-max-width,var(--max-width))] mx-auto w-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}
