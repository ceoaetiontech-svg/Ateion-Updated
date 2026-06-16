import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { Sun, Moon, User, Key, LogOut, ChevronDown, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "../context/AdminAuthContext";
import { RECENT_ACTIVITY } from "../mock/activity";

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
  const [unread, setUnread] = useState(RECENT_ACTIVITY.length);
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

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AD";

  return (
    <header className="h-[72px] px-8 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)] backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
      <h1 className="text-xl font-bold font-['OV_Soge']">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-secondary)] relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-light)]">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</p>
                  {unread > 0 && (
                    <button
                      onClick={() => setUnread(0)}
                      className="text-xs text-[var(--color-accent)] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {RECENT_ACTIVITY.map((entry) => (
                    <button
                      key={entry.id}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-background-tertiary)] transition-colors text-left cursor-pointer border-b border-[var(--color-border-light)] last:border-0"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        entry.type === "course"
                          ? "bg-blue-500/10 text-blue-500"
                          : entry.type === "user"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        <Bell size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{entry.action}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)] truncate">{entry.detail}</p>
                        <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{entry.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleAdminTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-secondary)]"
          aria-label={isAdminDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isAdminDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 transition-all duration-200 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
                {user?.name || "Admin"}
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
                className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl overflow-hidden"
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
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                      item.danger
                        ? "text-red-500 hover:bg-red-500/10"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    <item.icon size={16} />
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
