/**
 * ============================================================================
 * ATEION SHARED NAVBAR
 * ============================================================================
 * Primary navbar used across all pages (Homepage, GCO, Contact)
 * ============================================================================
 */

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router";
import {
  ArrowRight,
  ChevronDown,
  ClipboardCheck,
  Gamepad2,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Moon,
  Settings,
  Sun,
  Trophy,
  User as UserIcon,
  UserPlus,
  Users,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

import logo from "../../assets/logo.webp";
import "../../styles/shared-nav.css";

const navTextClass = "font-bold text-[13px] whitespace-nowrap font-manrope m-0 leading-none";

/**
 * USER PROFILE DROPDOWN
 */
function UserProfileDropdown({ user, onLogout }: { user: any; onLogout: () => void }) {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold overflow-hidden">
          {user.profilePic ? (
            <img src={user.profilePic} alt={firstName} className="w-full h-full object-cover" />
          ) : (
            <span>{firstName[0].toUpperCase()}</span>
          )}
        </div>
        <span className="text-sm font-bold text-[var(--color-text-primary)] hidden sm:inline">
          {firstName}
        </span>
        <ChevronDown size={14} className={`text-[var(--color-text-tertiary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl overflow-hidden z-[110]"
          >
            <div className="p-3 border-b border-[var(--color-border-light)] bg-[var(--color-background-primary)]/50">
              <p className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">Account</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">{user.email}</p>
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

const VARIANT_CLASSES = {
  default:
    "bg-[var(--color-background-secondary)] border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-light)]",
  primary:
    "bg-[var(--color-primary)] border border-transparent text-white hover:bg-[var(--color-primary-hover)]",
  accent:
    "bg-[var(--color-accent)] border border-transparent text-[var(--color-background-secondary)] hover:bg-[var(--color-accent-hover)]",
  white:
    "bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]",
  "outline-dark":
    "bg-[var(--color-background-secondary)] border border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]",
};

/**
 * Unified NavButton component with 3 variants
 */
const NavButton = memo(function NavButton({
  children,
  variant = "default" as "default" | "muted" | "primary" | "accent" | "white" | "outline-dark",
  onClick,
  href,
  isActive = false,
  style,
}: {
  children: React.ReactNode;
  variant?: "default" | "muted" | "primary" | "accent" | "white" | "outline-dark";
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
  style?: React.CSSProperties;
}) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (onClick) onClick();
    if (href) navigate(href);
  }, [onClick, href, navigate]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleClick}
      data-active={isActive}
      style={style}
      className={`clay-button nav-btn ${VARIANT_CLASSES[variant]} rounded-full flex h-[36px] items-center justify-center px-[12px] xl:px-[24px] shrink-0 cursor-pointer transition-colors relative`}
    >
      {children}
    </motion.div>
  );
});

function useNavbarOnDark() {
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);

  useEffect(() => {
    const darkSections = document.querySelectorAll(".dark-section");
    if (darkSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const overDark = entries.some((entry) => entry.isIntersecting);
        setIsOnDarkSection(overDark);
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );

    darkSections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return isOnDarkSection;
}

const LogoContainer = memo(function LogoContainer() {
  const isLogoWhite = useNavbarOnDark();
  const { theme } = useTheme();
  const shouldInvert = isLogoWhite || theme === "dark";

  return (
    <div className="flex items-center relative shrink-0">
      <Link to="/">
        <img
          src={logo}
          alt="Ateion Logo"
          className={`h-[52px] sm:h-[76px] object-contain w-auto transition-all duration-300 ${
            shouldInvert ? "brightness-0 invert" : ""
          }`}
        />
      </Link>
    </div>
  );
});

/**
 * HOME BUTTON
 */
function HomeBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === "/";

  return (
    <NavButton
      variant="default"
      isActive={isActive}
      onClick={() => {
        if (onClick) onClick();
        navigate("/");
      }}
    >
      <span className={navTextClass}>Home</span>
    </NavButton>
  );
}

/**
 * GLOBAL OLYMPIAD BUTTON
 */
function GlobalOlympiadBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith("/gco") || location.pathname.startsWith("/policy") || location.pathname.startsWith("/policies");

  return (
    <NavButton
      variant="default"
      isActive={isActive}
      onClick={() => {
        if (onClick) onClick();
        navigate("/gco");
      }}
    >
      <span className={`${navTextClass}`}>
        Global Olympiad
      </span>
    </NavButton>
  );
}

/**
 * PLAYGROUND BUTTON
 */
function ResourcesBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith("/playground") || location.pathname.startsWith("/resources");

  return (
    <NavButton
      variant="default"
      isActive={isActive}
      style={{
        background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)",
        border: "none",
        color: "#fff",
      }}
      onClick={() => {
        if (onClick) onClick();
        navigate("/playground");
      }}
    >
      <span className={`${navTextClass}`}>
        PlayGround
      </span>
    </NavButton>
  );
}

/**
 * PSYCHOMETRIC TEST BUTTON
 */
function PsychometricTestBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith("/psychometric-assessment");

  return (
    <NavButton
      variant="default"
      isActive={isActive}
      onClick={() => {
        if (onClick) onClick();
        navigate("/psychometric-assessment");
      }}
    >
      <span className={`${navTextClass}`}>
        Psychometric Test
      </span>
    </NavButton>
  );
}

/**
 * DASHBOARD BUTTON
 */
function DashboardBtn({
  onClick,
}: {
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith("/dashboard");

  return (
    <NavButton
      variant="default"
      isActive={isActive}
      onClick={() => {
        if (onClick) onClick();
        navigate("/dashboard");
      }}
    >
      <span className={`${navTextClass}`}>
        Dashboard
      </span>
    </NavButton>
  );
}

const NAV_BUTTONS = [
  HomeBtn,
  DashboardBtn,
  GlobalOlympiadBtn,
  PsychometricTestBtn,
  ResourcesBtn,
] as const;

const MOBILE_NAV_LINKS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Global Olympiad", path: "/gco", icon: Trophy },
  { label: "Psychometric Test", path: "/psychometric-assessment", icon: ClipboardCheck },
  { label: "PlayGround", path: "/playground", icon: Gamepad2 },
] as const;

function NavLinks({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    if (activeEl && containerRef.current) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const rect = activeEl.getBoundingClientRect();
      setUnderlinePos({
        left: rect.left - parentRect.left + 16,
        width: rect.width - 32,
      });
    } else {
      setUnderlinePos({ left: 0, width: 0 });
    }
  }, [location]);

  return (
    <div ref={containerRef} className="flex gap-[4px] xl:gap-[16px] items-center shrink-0 relative">
      <motion.div
        className="absolute bottom-[-2px] h-[3px] bg-[var(--color-accent)] rounded-full z-10"
        animate={{ left: underlinePos.left, width: underlinePos.width, opacity: underlinePos.width > 0 ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ pointerEvents: "none" }}
      />
      {NAV_BUTTONS.map((Btn, i) => (
        <Btn key={i} onClick={onCloseMobile} />
      ))}
    </div>
  );
}

/**
 * GET CONNECTED BUTTON
 */
function GetConnectedBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith("/contact");

  return (
    <NavButton
      variant="primary"
      onClick={() => {
        if (onClick) onClick();
        navigate("/contact");
      }}
    >
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span className={`${navTextClass}`}>
          Get Connected
        </span>
      </div>
    </NavButton>
  );
}

/**
 * SIGN IN BUTTON
 */
function SignInBtn({ onClick }: { onClick?: () => void }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    window.addEventListener("open-login", () => setIsActive(true), { signal: ac.signal });
    window.addEventListener("close-login", () => setIsActive(false), { signal: ac.signal });
    return () => ac.abort();
  }, []);

  return (
    <NavButton
      variant="outline-dark"
      onClick={() => {
        if (onClick) onClick();
        window.dispatchEvent(new CustomEvent("open-login"));
      }}
    >
      <div className="flex items-center gap-2 group">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[var(--color-background-primary)]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span className={`${navTextClass}`}>
          Sign In
        </span>
      </div>
    </NavButton>
  );
}

/**
 * SIGN UP BUTTON
 */
function SignUpBtn({ onClick }: { onClick?: () => void }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    window.addEventListener("open-register", () => setIsActive(true), { signal: ac.signal });
    window.addEventListener("close-register", () => setIsActive(false), { signal: ac.signal });
    return () => ac.abort();
  }, []);

  return (
    <NavButton
      variant="primary"
      onClick={() => {
        if (onClick) onClick();
        window.dispatchEvent(new CustomEvent("open-register"));
      }}
    >
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
        <span className={`${navTextClass}`}>
          Sign Up
        </span>
      </div>
    </NavButton>
  );
}

/**
 * LOGOUT BUTTON
 */
function LogoutBtn({ onClick }: { onClick?: () => void }) {
  return (
    <NavButton
      variant="outline-dark"
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh to wipe state completely
        if (onClick) onClick();
      }}
    >
      <div className="flex items-center gap-2 group">
        <LogOut size={16} className="group-hover:text-[var(--color-background-primary)]" />
        <span className={`${navTextClass}`}>
          Logout
        </span>
      </div>
    </NavButton>
  );
}

function MobileMenuIcon({
  isOpen,
  onClick,
  isWhite,
}: {
  isOpen: boolean;
  onClick: () => void;
  isWhite: boolean;
}) {
  const lineClass = isOpen
    ? "bg-[var(--color-text-primary)]"
    : isWhite
      ? "bg-white"
      : "bg-[var(--color-text-primary)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`lg:hidden flex flex-col justify-center items-center w-[44px] h-[44px] cursor-pointer z-[150] relative rounded-2xl border transition-all duration-200 ${
        isOpen
          ? "bg-[var(--color-background-primary)] border-[var(--color-border-medium)] shadow-lg"
          : "bg-[var(--color-background-secondary)]/75 border-[var(--color-border-light)] backdrop-blur-md"
      }`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <motion.div
        className={`w-[22px] h-[2px] rounded-full origin-center transition-colors duration-300 ${lineClass}`}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className={`w-[22px] h-[2px] rounded-full my-[4px] transition-colors duration-300 ${lineClass}`}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className={`w-[22px] h-[2px] rounded-full origin-center transition-colors duration-300 ${lineClass}`}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </button>
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
      className="clay-button flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] cursor-pointer transition-colors"
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

export default function SharedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  const isNavbarOnDark = useNavbarOnDark();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Check auth state
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      setIsAuthenticated(!!token);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();

    const ac = new AbortController();
    const opts = { signal: ac.signal };
    window.addEventListener("close-login", checkAuth, opts);
    window.addEventListener("close-register", checkAuth, opts);
    return () => ac.abort();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/"; // Redirect to home on logout
  };

  // Handle scroll for frosted glass effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const ac = new AbortController();
    window.addEventListener("scroll", onScroll, { signal: ac.signal, passive: true });
    onScroll(); // Initial check
    return () => ac.abort();
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const isMobileNavActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/gco") {
      return (
        location.pathname.startsWith("/gco") ||
        location.pathname.startsWith("/policy") ||
        location.pathname.startsWith("/policies")
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? "nav-scrolled" 
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
      ref={menuRef}
    >
      <div className={`flex items-center justify-between px-[16px] md:px-[32px] xl:px-[48px] transition-all duration-300 w-full gap-[24px] ${
        scrolled ? "py-[8px] lg:py-[12px]" : "py-[12px] lg:py-[20px]"
      }`}>

        {/* LEFT SIDE */}
        <div className="flex items-center justify-start">
          <LogoContainer />

          <div className="hidden lg:flex items-center ml-[8px] xl:ml-[32px] gap-[8px]">
            <NavLinks />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center justify-end ml-auto gap-[4px] xl:gap-[12px]">
          <ThemeToggleBtn />

          {isAuthenticated && user ? (
            <UserProfileDropdown user={user} onLogout={handleLogout} />
          ) : (
            <>
              <GetConnectedBtn />
              <SignInBtn />
              <SignUpBtn />
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <MobileMenuIcon
          isOpen={isMobileMenuOpen}
          isWhite={isNavbarOnDark}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-nav-panel lg:hidden absolute left-3 right-3 top-full mt-2 overflow-hidden rounded-[26px] border border-[var(--color-border-light)] bg-[var(--color-background-primary)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="max-h-[calc(100vh-96px)] overflow-y-auto p-3">
              <div className="flex items-center justify-between px-2 pb-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    Navigation
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                    Choose where to go next
                  </p>
                </div>
                <div className="mobile-nav-surface h-9 w-9 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] flex items-center justify-center text-[var(--color-accent)]">
                  <Gamepad2 size={17} />
                </div>
              </div>

              <div className="grid gap-2">
                {MOBILE_NAV_LINKS.map(({ label, path, icon: Icon }) => {
                  const active = isMobileNavActive(path);

                  return (
                    <button
                      key={path}
                      type="button"
                      onClick={() => handleNavClick(path)}
                      className={`mobile-nav-row group flex min-h-[48px] w-full items-center gap-3 rounded-2xl border px-3 text-left transition-all duration-200 ${
                        active
                          ? "mobile-nav-row-active border-transparent bg-[var(--color-accent)] text-[#ffffff] shadow-[0_10px_28px_rgba(232,133,106,0.28)]"
                          : "border-[var(--color-border-light)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-background-tertiary)]"
                      }`}
                    >
                      <span
                        className={`mobile-nav-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "mobile-nav-icon-active bg-white/22 text-white"
                            : "bg-[var(--color-background-primary)] text-[var(--color-accent)]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] font-bold leading-none">
                        {label}
                      </span>
                      <ArrowRight
                        size={16}
                        className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          active ? "text-white/85" : "text-[var(--color-text-tertiary)]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="h-[1px] bg-[var(--color-border-light)] my-3" />

              {isAuthenticated && user ? (
                <div className="flex flex-col gap-3">
                  <div className="mobile-nav-surface flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold">
                      {user.firstName ? user.firstName[0] : user.fullName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">{user.fullName}</p>
                      <p className="text-xs text-[var(--color-text-tertiary)]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavClick("/profile")}
                    className="mobile-nav-surface min-h-[46px] rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 text-sm font-bold text-[var(--color-text-primary)]"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick("/dashboard")}
                    className="mobile-nav-surface min-h-[46px] rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 text-sm font-bold text-[var(--color-text-primary)]"
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mobile-nav-surface min-h-[46px] rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 text-sm font-bold text-[var(--color-error)]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => handleNavClick("/contact")}
                    className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(26,24,51,0.22)] transition-transform active:scale-[0.98]"
                  >
                    <Users size={17} />
                    Get Connected
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.dispatchEvent(new CustomEvent("open-login"));
                      }}
                      className="mobile-nav-surface flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-3 text-sm font-bold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-background-tertiary)]"
                    >
                      <LogIn size={16} />
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.dispatchEvent(new CustomEvent("open-register"));
                      }}
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-3 text-sm font-bold text-white transition-transform active:scale-[0.98]"
                    >
                      <UserPlus size={16} />
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              <div className="mobile-nav-surface mt-3 flex items-center justify-between rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">Appearance</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">Switch light or dark mode</p>
                </div>
                <ThemeToggleBtn />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
