import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { Sun, Moon, User, Key, LogOut, ChevronDown, Bell, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "../context/AdminAuthContext";

const ADMIN_THEME_KEY = "ateion-admin-theme";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Overview",
  "/admin/courses": "Manage Courses",
  "/admin/upload": "Upload Course",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
};

const menuItems = [
  { label: "View Profile", icon: User, onClick: () => {} },
  { label: "Change Password", icon: Key, onClick: () => {} },
  { label: "Sign Out", icon: LogOut, onClick: () => {}, danger: true },
];

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAdminAuth();
  const location = useLocation();

  const adminTheme = localStorage.getItem(ADMIN_THEME_KEY) || "dark";
  const isAdminDark = adminTheme === "dark";

  const toggleAdminTheme = () => {
    const next = isAdminDark ? "light" : "dark";
    localStorage.setItem(ADMIN_THEME_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const title = Object.entries(pageTitles).find(([path]) =>
    location.pathname.startsWith(path)
  )?.[1] || "Dashboard";

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AD";

  return (
    <header className="h-[72px] px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/80 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <label
          htmlFor="mobile-sidebar-toggle"
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </label>
        <h1 className="text-xl font-bold font-['OV_Soge'] tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-secondary)] relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-[var(--color-background-secondary)]/90 backdrop-blur-xl border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] overflow-hidden"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-light)]">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</p>
                </div>
                <div className="p-8 flex flex-col items-center justify-center text-[var(--color-text-tertiary)]">
                  <Bell size={24} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium">No notifications</p>
                  <p className="text-xs mt-1">You're all caught up.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleAdminTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:scale-105 active:scale-95"
          aria-label={isAdminDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isAdminDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 transition-all duration-200 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-accent)]/60 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
                {user?.fullName || "Admin"}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] capitalize">
                {user?.role?.replace("_", " ") || "admin"}
              </p>
            </div>
            <ChevronDown
              size={14}
              className={`text-[var(--color-text-tertiary)] transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[var(--color-background-secondary)]/90 backdrop-blur-xl border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] overflow-hidden"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMenuOpen(false);
                      if (item.label === "Sign Out") logout();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 cursor-pointer first:rounded-t-xl last:rounded-b-xl ${
                      item.danger
                        ? "text-red-400 hover:bg-red-500/10 hover:text-red-400"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      item.danger
                        ? "bg-red-500/10 text-red-400"
                        : "bg-[var(--color-background-tertiary)]/60 text-[var(--color-text-secondary)]"
                    }`}>
                      <item.icon size={14} />
                    </div>
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
