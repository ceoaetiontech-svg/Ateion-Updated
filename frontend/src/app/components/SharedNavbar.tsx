/**
 * ============================================================================
 * ATEION SHARED NAVBAR — Redesigned
 * ============================================================================
 * Clean, modern navbar with text nav links, "GET STARTED" CTA,
 * and a small icon button on the far right.
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
  MessageSquare,
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
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Ateion Logo"
          className={`h-[70px] sm:h-[85px] object-contain w-auto transition-all duration-300 ${
            shouldInvert ? "brightness-0 invert" : "brightness-0 sepia-[1] hue-rotate-[250deg] saturate-[5] brightness-[0.8]"
          }`}
        />
      </Link>
    </div>
  );
});

/* ─────────────────────────────────────────────
   NAV LINK ITEMS (text links, not pill buttons)
───────────────────────────────────────────── */

interface NavLinkItem {
  label: string;
  path: string;
  matchPaths?: string[];
  hasDropdown?: boolean;
  dropdownItems?: { label: string; path: string }[];
}

const NAV_LINK_ITEMS: NavLinkItem[] = [
  { label: "Global Capability Olympiad", path: "/gco", matchPaths: ["/gco", "/policy", "/policies"] },
  { label: "Playground", path: "/playground" },
  { label: "Psychometric Test", path: "/psychometric-assessment" },
  { label: "Dashboard", path: "/dashboard" },
];

function NavTextLink({
  item,
  onCloseMobile,
}: {
  item: NavLinkItem;
  onCloseMobile?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = item.matchPaths
    ? item.matchPaths.some((p) => location.pathname.startsWith(p))
    : item.path !== "#" && (
        item.path === "/"
          ? location.pathname === "/"
          : location.pathname.startsWith(item.path)
      );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (item.hasDropdown) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`new-nav-link flex items-center gap-1 px-1 py-2 text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
            isActive
              ? "text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {item.label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 top-full mt-1 w-52 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl overflow-hidden z-[120]"
            >
              <div className="p-1">
                {item.dropdownItems?.map((sub) => {
                  const subActive = location.pathname.startsWith(sub.path);
                  return (
                    <button
                      key={sub.path}
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        if (onCloseMobile) onCloseMobile();
                        navigate(sub.path);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                        subActive
                          ? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                          : "text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]"
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (onCloseMobile) onCloseMobile();
        navigate(item.path);
      }}
      className={`new-nav-link px-1 py-2 text-[14px] font-medium transition-colors duration-200 cursor-pointer relative ${
        isActive
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      }`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {item.label}
      {isActive && (
        <motion.div
          layoutId="nav-active-dot"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

function DesktopNavLinks({ onCloseMobile }: { onCloseMobile?: () => void }) {
  return (
    <div className="flex items-center gap-6 xl:gap-8">
      {NAV_LINK_ITEMS.map((item) => (
        <NavTextLink key={item.label} item={item} onCloseMobile={onCloseMobile} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GET STARTED CTA BUTTON (lime-green)
───────────────────────────────────────────── */
function GetStartedBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        if (onClick) onClick();
        window.dispatchEvent(new CustomEvent("open-register"));
      }}
      className="get-started-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-[0.06em] cursor-pointer transition-all duration-200"
      style={{
        background: "#7c3aed",
        color: "#ffffff",
        border: "none",
        fontFamily: "var(--font-body)",
      }}
    >
      GET STARTED
      <ArrowRight size={15} strokeWidth={2.5} />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   SMALL ICON BUTTON (chat / menu icon on far right)
───────────────────────────────────────────── */
function SmallIconBtn() {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => navigate("/contact")}
      className="flex items-center justify-center w-[40px] h-[40px] rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-tertiary)] cursor-pointer transition-all duration-200"
      aria-label="Contact"
    >
      <MessageSquare size={18} />
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
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] cursor-pointer transition-colors"
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

/* ─────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────── */

const MOBILE_NAV_LINKS = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/ateion", icon: Users },
  { label: "PlayGround", path: "/playground", icon: Gamepad2 },
  { label: "GCO", path: "/gco", icon: Trophy },
  { label: "Partners", path: "/contact", icon: Users },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Psychometric Test", path: "/psychometric-assessment", icon: ClipboardCheck },
] as const;

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
      data-tour="main-mobile-menu"
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

/* ─────────────────────────────────────────────
   MAIN NAVBAR EXPORT
───────────────────────────────────────────── */

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

  // Lock body scroll when mobile menu is open
  // Uses position:fixed trick — the only approach that works on iOS Safari
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const savedTop = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      // Restore scroll position so page doesn't jump to top
      if (savedTop) {
        window.scrollTo(0, -parseInt(savedTop, 10));
      }
    }

    return () => {
      // Cleanup on unmount — always restore body
      const savedTop = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (savedTop) {
        window.scrollTo(0, -parseInt(savedTop, 10));
      }
    };
  }, [isMobileMenuOpen]);

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

        {/* LEFT SIDE — Logo */}
        <div className="flex items-center shrink-0">
          <LogoContainer />
        </div>

        {/* RIGHT SIDE — Nav links + CTA (desktop only) */}
        <div className="hidden lg:flex items-center justify-end gap-8">
          <DesktopNavLinks />
          {isAuthenticated && user ? (
            <>
              <ThemeToggleBtn />
              <UserProfileDropdown user={user} onLogout={handleLogout} />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <ThemeToggleBtn />
              <GetStartedBtn />
            </div>
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
                      data-tour={path === "/playground" ? "mobile-playground-nav" : undefined}
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
                  {/* GET STARTED — mobile */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent("open-register"));
                    }}
                    className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold uppercase tracking-wider transition-transform active:scale-[0.98]"
                    style={{ background: "#7c3aed", color: "#ffffff" }}
                  >
                    GET STARTED
                    <ArrowRight size={16} />
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
