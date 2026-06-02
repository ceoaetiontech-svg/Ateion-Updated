/**
 * ============================================================================
 * ATEION SHARED NAVBAR
 * ============================================================================
 * Primary navbar used across all pages (Homepage, GCO, Contact)
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

import logo from "../../assets/logo.png";

const navTextClass = "font-bold text-[13px] whitespace-nowrap font-manrope";

/**
 * Unified NavButton component with 3 variants
 */
function NavButton({
  children,
  variant = "default" as "default" | "muted" | "primary" | "white" | "outline-dark",
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: "default" | "muted" | "primary" | "white" | "outline-dark";
  onClick?: () => void;
  href?: string;
}) {
  const navigate = useNavigate();

  const variantClasses = {
    default:
      "bg-[var(--color-background-secondary)] border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary_light)]",
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
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
      className={`clay-button ${variantClasses[variant]} rounded-full flex h-[36px] items-center justify-center px-[16px] xl:px-[24px] shrink-0 cursor-pointer transition-colors`}
    >
      {children}
    </motion.div>
  );
}

function useNavbarOnDark() {
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (!navbar) return;

      const navRect = navbar.getBoundingClientRect();
      const navMidY = navRect.top + navRect.height / 2;

      const darkSections = document.querySelectorAll(".dark-section");
      let overDark = false;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (navMidY >= rect.top && navMidY <= rect.bottom) {
          overDark = true;
        }
      });

      setIsOnDarkSection(overDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
          className={`h-[50px] md:h-[60px] object-contain w-auto transition-all duration-300 ${
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
      variant={isActive ? "primary" : "default"}
      onClick={() => {
        if (onClick) onClick();
        navigate("/");
      }}
    >
      <p className={`${navTextClass}`}>Home</p>
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
      variant={isActive ? "primary" : "default"}
      onClick={() => {
        if (onClick) onClick();
        navigate("/gco");
      }}
    >
      <p className={`${navTextClass}`}>
        Global Olympiad
      </p>
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
      variant={isActive ? "primary" : "default"}
      onClick={() => {
        if (onClick) onClick();
        navigate("/playground");
      }}
    >
      <p className={`${navTextClass}`}>
        PlayGround
      </p>
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
      variant={isActive ? "primary" : "default"}
      onClick={() => {
        if (onClick) onClick();
        navigate("/psychometric-assessment");
      }}
    >
      <p className={`${navTextClass}`}>
        Psychometric Test
      </p>
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
      variant={isActive ? "primary" : "default"}
      onClick={() => {
        if (onClick) onClick();
        navigate("/dashboard");
      }}
    >
      <p className={`${navTextClass}`}>
        Dashboard
      </p>
    </NavButton>
  );
}

function NavLinks({ onCloseMobile }: { onCloseMobile?: () => void }) {
  return (
    <div className="flex gap-[8px] xl:gap-[16px] items-center shrink-0">
      <HomeBtn onClick={onCloseMobile} />
      <DashboardBtn onClick={onCloseMobile} />
      <GlobalOlympiadBtn onClick={onCloseMobile} />
      <PsychometricTestBtn onClick={onCloseMobile} />
      <ResourcesBtn onClick={onCloseMobile} />
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
        <p className={`${navTextClass}`}>
          Get Connected
        </p>
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
    const handleOpen = () => setIsActive(true);
    const handleClose = () => setIsActive(false);
    window.addEventListener("open-login", handleOpen);
    window.addEventListener("close-login", handleClose);
    return () => {
      window.removeEventListener("open-login", handleOpen);
      window.removeEventListener("close-login", handleClose);
    };
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
        <p className={`${navTextClass}`}>
          Sign In
        </p>
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
    const handleOpen = () => setIsActive(true);
    const handleClose = () => setIsActive(false);
    window.addEventListener("open-register", handleOpen);
    window.addEventListener("close-register", handleClose);
    return () => {
      window.removeEventListener("open-register", handleOpen);
      window.removeEventListener("close-register", handleClose);
    };
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
        <p className={`${navTextClass}`}>
          Sign Up
        </p>
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

  const isNavbarOnDark = useNavbarOnDark();

  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-transparent"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-[16px] md:px-[32px] xl:px-[48px] py-[12px] lg:py-[20px] w-full gap-[24px]">
        
        {/* LEFT SIDE */}
        <div className="flex items-center justify-start">
          <LogoContainer />

          <div className="hidden lg:flex items-center ml-[16px] xl:ml-[32px] gap-[16px]">
            <NavLinks />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center justify-end ml-auto gap-[8px] xl:gap-[12px]">
          <ThemeToggleBtn />
          <GetConnectedBtn />
          <SignInBtn />
          <SignUpBtn />
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
            className="lg:hidden bg-[var(--color-background-primary)] border-t border-[var(--color-border-light)] overflow-hidden"
          >
            <div className="flex flex-col gap-[12px] px-[24px] py-[24px]">
              
              <HomeBtn
                onClick={() => handleNavClick("/")}
              />

              <DashboardBtn
                onClick={() => handleNavClick("/dashboard")}
              />

              <GlobalOlympiadBtn
                onClick={() => handleNavClick("/gco")}
              />

              <PsychometricTestBtn
                onClick={() => handleNavClick("/psychometric-assessment")}
              />

              <ResourcesBtn
                onClick={() => handleNavClick("/playground")}
              />

              <div className="h-[1px] bg-[var(--color-border-light)] my-[4px]" />

              <GetConnectedBtn
                onClick={() => handleNavClick("/contact")}
              />

              <div className="h-[1px] bg-[var(--color-border-light)] my-[4px]" />

              <SignInBtn
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-login"));
                }}
              />

              <SignUpBtn
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-register"));
                }}
              />

              <ThemeToggleBtn />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}