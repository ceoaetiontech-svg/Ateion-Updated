/**
 * ============================================================================
 * GCO FLOATING PILL NAVBAR — PROFESSIONAL
 * ============================================================================
 * Wide, centered pill-shaped navbar for the GCO page.
 * White pill body, coral accent, logo with hover dropdown, icons with labels.
 * ============================================================================
 */

import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  User as UserIcon,
  Settings,
  GraduationCap,
  Building2,
  Heart,
  BookOpen,
  Calendar,
  Home,
  LayoutDashboard,
  Trophy,
  Gamepad2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import logo from "../../assets/logo.webp";

const navTextClass = "font-semibold text-[13px] whitespace-nowrap font-manrope m-0 leading-none";

/**
 * LOGO WITH HOVER DROPDOWN
 */
function LogoDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Global Olympiad", icon: Trophy, path: "/gco" },
    { label: "Playground", icon: Gamepad2, path: "/playground" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsOpen(true)}
        onClick={() => setIsOpen((prev) => !prev)}
        className="gco-pill-logo shrink-0 cursor-pointer"
      >
        <img
          src={logo}
          alt="Ateion"
          className={`h-[36px] w-auto object-contain transition-all duration-300 ${theme === "dark" ? "brightness-0 invert" : ""}`}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 mt-2 w-56 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl overflow-hidden z-[110]"
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="p-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(item.path);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors text-left"
                >
                  <item.icon size={16} className="shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight size={14} className="text-[var(--color-text-tertiary)]" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * USER PROFILE DROPDOWN
 */
function UserPillDropdown({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstName = user.firstName || user.fullName?.split(" ")[0] || "User";
  const email = user.email || "";

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="gco-pill-user-pill flex items-center gap-2 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0">
          {user.profilePic ? (
            <img src={user.profilePic} alt={firstName} className="w-full h-full object-cover" />
          ) : (
            <span>{firstName[0].toUpperCase()}</span>
          )}
        </div>
        <span className="text-[13px] font-bold text-[var(--color-text-primary)] hidden sm:inline max-w-[140px] truncate">
          {email}
        </span>
        <ChevronDown size={14} className={`text-[var(--color-text-tertiary)] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-52 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl overflow-hidden z-[110]"
          >
            <div className="p-3 border-b border-[var(--color-border-light)] bg-[var(--color-background-primary)]/50">
              <p className="text-[10px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">Account</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">{email}</p>
            </div>
            <div className="p-1">
              <button
                onClick={() => { setIsOpen(false); navigate("/profile"); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors text-left"
              >
                <UserIcon size={16} />
                Profile
              </button>
              <button
                onClick={() => { setIsOpen(false); navigate("/dashboard"); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors text-left"
              >
                <Settings size={16} />
                Dashboard
              </button>
              <div className="h-[1px] bg-[var(--color-border-light)] my-1" />
              <button
                onClick={() => { setIsOpen(false); onLogout(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-error)] hover:bg-[var(--color-error_light)] transition-colors text-left"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * NAV LINK ITEM — with icon support
 */
function NavLinkItem({
  label,
  icon: Icon,
  isActive,
  highlight,
  onClick,
}: {
  label: string;
  icon?: React.ElementType;
  isActive: boolean;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`gco-pill-nav-link ${isActive ? "gco-pill-nav-link--active" : ""} ${highlight ? "gco-pill-nav-link--highlight" : ""}`}
    >
      {Icon && <Icon size={15} className="shrink-0" />}
      <span className={navTextClass}>{label}</span>
    </motion.button>
  );
}

/**
 * THEME TOGGLE BUTTON (Sun/Moon)
 */
const ThemeToggleBtn = memo(function ThemeToggleBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="clay-button flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] cursor-pointer transition-colors shrink-0"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} className="text-[var(--color-text-secondary)]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});

export default function GCONavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      setIsAuthenticated(!!token);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkAuth();
    const ac = new AbortController();
    window.addEventListener("close-login", checkAuth, { signal: ac.signal });
    window.addEventListener("close-register", checkAuth, { signal: ac.signal });
    return () => ac.abort();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const ac = new AbortController();
    window.addEventListener("scroll", onScroll, { signal: ac.signal, passive: true });
    onScroll();
    return () => ac.abort();
  }, []);

  const navLinks = [
    { label: "Register as Student", icon: GraduationCap, path: "register-student", highlight: false },
    { label: "Register as School", icon: Building2, path: "register-school", highlight: false },
    { label: "Register as Volunteer", icon: Heart, path: "register-volunteer", highlight: false },
    { label: "Study Material", icon: BookOpen, path: "/playground", highlight: false },
    { label: "Upcoming Events", icon: Calendar, path: "/gco", highlight: true },
  ];

  const handleNavClick = (path: string) => {
    if (path === "register-student") {
      window.dispatchEvent(new CustomEvent("open-register"));
    } else if (path === "register-school") {
      navigate("/contact");
    } else if (path === "register-volunteer") {
      navigate("/register-volunteer");
    } else {
      navigate(path);
    }
  };

  const isActiveLink = (path: string) => {
    if (path === "/gco") return location.pathname.startsWith("/gco") || location.pathname.startsWith("/policy");
    if (path === "/playground") return location.pathname.startsWith("/playground");
    return false;
  };

  return (
    <nav
      className={`gco-pill-navbar ${scrolled ? "gco-pill-navbar--scrolled" : ""}`}
      role="navigation"
      aria-label="GCO navigation"
    >
      <div className="gco-pill-navbar__inner">
        {/* Logo with Dropdown */}
        <LogoDropdown />

        {/* Divider */}
        <div className="gco-pill-divider" />

        {/* Nav Links */}
        <div className="flex items-center gap-[2px]">
          {navLinks.map((link) => (
            <NavLinkItem
              key={link.label}
              label={link.label}
              icon={link.icon}
              isActive={isActiveLink(link.path)}
              highlight={link.highlight}
              onClick={() => handleNavClick(link.path)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="gco-pill-divider" />

        {/* Theme Toggle */}
        <ThemeToggleBtn />

        {/* User Area */}
        <div className="flex items-center shrink-0">
          {isAuthenticated && user ? (
            <UserPillDropdown user={user} onLogout={handleLogout} />
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="gco-pill-cta"
            >
              <span className={navTextClass}>Get Connected</span>
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}
