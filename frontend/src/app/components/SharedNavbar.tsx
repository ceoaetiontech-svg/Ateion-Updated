/**
 * ============================================================================
 * ATEION SHARED NAVBAR
 * ============================================================================
 * Primary navbar used across all pages (Homepage, GCO, Contact)
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router";

import logo from "../../assets/logo.png";

const navTextClass = "font-bold text-[13px] whitespace-nowrap font-manrope";

/**
 * Unified NavButton component with 3 variants
 */
function NavButton({
  children,
  variant = "default" as "default" | "muted" | "primary" | "white",
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: "default" | "muted" | "primary" | "white";
  onClick?: () => void;
  href?: string;
}) {
  const navigate = useNavigate();

  const variantClasses = {
    default:
      "bg-[rgba(235,235,235,0.8)] hover:bg-[rgba(215,215,215,0.95)] text-[#292929]",
    muted:
      "bg-[rgba(235,235,235,0.8)] hover:bg-[rgba(215,215,215,0.95)] text-[#292929]",
    primary:
      "bg-[#fb4444] hover:bg-[#ff5555] text-white shadow-[0_4px_12px_rgba(251,68,68,0.25)] hover:shadow-[0_6px_20px_rgba(251,68,68,0.35)]",
    white:
      "bg-white hover:bg-[#f5f5f5] text-[#292929] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
  };

  const handleClick = () => {
    if (onClick) onClick();
    if (href) navigate(href);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`${variantClasses[variant]} flex h-[36px] items-center justify-center px-[12px] xl:px-[20px] rounded-full shrink-0 cursor-pointer transition-colors`}
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

  return (
    <div className="flex items-center relative shrink-0">
      <Link to="/">
        <img
          src={logo}
          alt="Ateion Logo"
          className={`h-[50px] md:h-[60px] object-contain w-auto transition-all duration-300 ${
            isLogoWhite ? "brightness-0 invert" : ""
          }`}
        />
      </Link>
    </div>
  );
}

function AboutUsBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <NavButton
      variant="default"
      onClick={() => {
        if (onClick) onClick();
        navigate("/#about");
      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>About Us</p>
    </NavButton>
  );
}

function GlobalOlympiadBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <NavButton
      variant="muted"
      onClick={() => {
        if (onClick) onClick();
        navigate("/gco");
      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>Global Olympiad</p>
    </NavButton>
  );
}

function ResourcesBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <NavButton
      variant="muted"
      onClick={() => {
        if (onClick) onClick();
        navigate("/PlayGround");
      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>PlayGround</p>
    </NavButton>
  );
}

function NavLinks({ onCloseMobile }: { onCloseMobile?: () => void }) {
  return (
    <div className="flex gap-[8px] xl:gap-[16px] items-center shrink-0">
      <AboutUsBtn onClick={onCloseMobile} />

      <GlobalOlympiadBtn onClick={onCloseMobile} />
      <ResourcesBtn onClick={onCloseMobile} />
    </div>
  );
}

function GetConnectedBtn({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <NavButton
      variant="primary"
      onClick={() => {
        if (onClick) onClick();
        navigate("/contact");
      }}
    >
      <p className={`${navTextClass} text-white`}>Get Connected</p>
    </NavButton>
  );
}

function SignInBtn({ onClick }: { onClick?: () => void }) {
  return (
    <NavButton
      variant="white"
      onClick={() => {
        if (onClick) onClick();
        window.dispatchEvent(new CustomEvent("open-login"));
      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>Sign In</p>
    </NavButton>
  );
}

function SignUpBtn({ onClick }: { onClick?: () => void }) {
  return (
    <NavButton
      variant="primary"
      onClick={() => {
        if (onClick) onClick();
        window.dispatchEvent(new CustomEvent("open-register"));
      }}
    >
      <p className={`${navTextClass} text-white`}>Sign Up</p>
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
          isWhite ? "bg-white" : "bg-[#1a1a1a]"
        }`}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`w-[24px] h-[2px] rounded-full my-[4px] transition-colors duration-300 ${
          isWhite ? "bg-white" : "bg-[#1a1a1a]"
        }`}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`w-[24px] h-[2px] rounded-full origin-center transition-colors duration-300 ${
          isWhite ? "bg-white" : "bg-[#1a1a1a]"
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
      <div className="flex items-center justify-between px-[16px] lg:px-[24px] py-[12px] lg:py-[20px] w-full max-w-[1280px] mx-auto">
        <div className="flex items-center justify-start">
          <LogoContainer />
          <div className="hidden lg:flex items-center ml-[16px] xl:ml-[32px]">
            <NavLinks />
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-end ml-auto gap-[8px] xl:gap-[12px]">
          <GetConnectedBtn />
          <SignInBtn />
          <SignUpBtn />
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuIcon
          isOpen={isMobileMenuOpen}
          isWhite={isNavbarOnDark}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#f7f3eb] border-t border-[rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="flex flex-col gap-[12px] px-[24px] py-[24px]">
              <AboutUsBtn
                onClick={() => handleNavClick("/#about")}
              />

              <GlobalOlympiadBtn
                onClick={() => handleNavClick("/gco")}
              />
              <ResourcesBtn
                onClick={() => handleNavClick("/#resources")}
              />
              <GetConnectedBtn
                onClick={() => handleNavClick("/contact")}
              />
              
              <div className="h-[1px] bg-[rgba(0,0,0,0.08)] my-[4px]" />
              
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}