/**
 * ============================================================================
 * ATEION SHARED NAVBAR
 * ============================================================================
 * Primary navbar used across all pages (Homepage, GCO, Contact)
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router";
import { Sun, Moon, LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
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

/**
 * Unified NavButton component with 3 variants
 */
function NavButton({
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

  const variantClasses = {
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

  const handleClick = () => {
    if (onClick) onClick();
    if (href) navigate(href);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleClick}
      data-active={isActive}
      style={style}
      className={`clay-button nav-btn ${variantClasses[variant]} rounded-full flex h-[36px] items-center justify-center px-[12px] xl:px-[24px] shrink-0 cursor-pointer transition-colors relative`}
    >
      {children}
    </motion.div>
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

function LogoContainer() {
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
}

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
  return (
    <button
      type="button"
      onClick={onClick}
      className="lg:hidden flex flex-col justify-center items-center w-[40px] h-[40px] cursor-pointer z-[150] relative"
      aria-label="Toggle menu"
    >
      <motion.div
        className={`w-[24px] h-[2px] rounded-full origin-center transition-colors duration-300 ${
          isWhite ? "bg-white" : "bg-[var(--color-text-primary)]"
        }`}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className={`w-[24px] h-[2px] rounded-full my-[4px] transition-colors duration-300 ${
          isWhite ? "bg-white" : "bg-[var(--color-text-primary)]"
        }`}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className={`w-[24px] h-[2px] rounded-full origin-center transition-colors duration-300 ${
          isWhite ? "bg-white" : "bg-[var(--color-text-primary)]"
        }`}
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
function ThemeToggleBtn() {
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
}

export default function SharedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  const isNavbarOnDark = useNavbarOnDark();
  const navigate = useNavigate();
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[var(--color-background-primary)] border-t border-[var(--color-border-light)] overflow-y-auto absolute w-full shadow-lg max-h-[80vh]"
          >
            <div className="flex flex-col gap-[12px] px-[24px] py-[24px]">

              {NAV_BUTTONS.map((Btn, i) => (
                <Btn key={i} onClick={() => setIsMobileMenuOpen(false)} />
              ))}

              <div className="h-[1px] bg-[var(--color-border-light)] my-[4px]" />

              {isAuthenticated && user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold">
                      {user.firstName ? user.firstName[0] : user.fullName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">{user.fullName}</p>
                      <p className="text-xs text-[var(--color-text-tertiary)]">{user.email}</p>
                    </div>
                  </div>
                  <NavButton variant="default" onClick={() => handleNavClick("/profile")}>Profile</NavButton>
                  <NavButton variant="default" onClick={() => handleNavClick("/dashboard")}>Dashboard</NavButton>
                  <NavButton variant="outline-dark" onClick={handleLogout}>Logout</NavButton>
                </div>
              ) : (
                <>
                  <GetConnectedBtn onClick={() => handleNavClick("/contact")} />
                  <div className="h-[1px] bg-[var(--color-border-light)] my-[4px]" />
                  <SignInBtn onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent("open-login")); }} />
                  <SignUpBtn onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent("open-register")); }} />
                </>
              )}

              <div className="h-[1px] bg-[var(--color-border-light)] my-[4px]" />
              <div className="flex justify-center">
                <ThemeToggleBtn />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
