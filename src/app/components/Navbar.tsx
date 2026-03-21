import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import svgPaths from "../../imports/svg-paths";
import logo from "../../assets/logo.png";

function LogoContainer() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <img
        src={logo}
        alt="Ateion Logo"
        className="h-[40px] md:h-[60px] object-contain w-auto"
      />
    </div>
  );
}

function NavButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-[rgba(235,235,235,0.8)] flex h-[36px] items-center justify-center px-[20px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[rgba(215,215,215,0.95)] transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function NavButtonText({ text, hasDropdown = false }: { text: string; hasDropdown?: boolean }) {
  return (
    <div className="flex items-center gap-[6px]">
      <p className="font-bold leading-none text-[#292929] text-[12px] md:text-[13px] whitespace-nowrap" style={{ fontFamily: "'Manrope', sans-serif" }}>{text}</p>
      {hasDropdown && (
        <div className="hidden md:flex items-center justify-center relative shrink-0 opacity-80">
          <div className="flex-none">
            <div className="relative size-[8px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.06516 7.25">
                <path d={svgPaths.p3367e500} fill="#292929" id="Polygon 1" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavLinks() {
  return (
    <div className="flex gap-[12px] md:gap-[16px] items-center justify-center">
      <NavButton>
        <NavButtonText text="About Us" />
      </NavButton>
      <NavButton>
        <NavButtonText text="Workshops" hasDropdown />
      </NavButton>
      <NavButton>
        <NavButtonText text="Global Olympiad" />
      </NavButton>
      <NavButton>
        <NavButtonText text="Resources" />
      </NavButton>
    </div>
  );
}

function NavActions() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(251, 68, 68, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/contact')}
      className="bg-[#fb4444] flex h-[36px] items-center justify-center px-[20px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[#ff5555] transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <p className="font-bold leading-none text-[12px] md:text-[13px] text-white whitespace-nowrap" style={{ fontFamily: "'Manrope', sans-serif" }}>Get Connected</p>
    </motion.div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-[280px] bg-white/95 backdrop-blur-md z-50 md:hidden shadow-lg"
          >
            <div className="flex flex-col p-6 gap-4">
              <button
                onClick={onClose}
                className="self-end text-2xl text-gray-600 hover:text-black transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
              <nav className="flex flex-col gap-3 mt-8">
                <button
                  onClick={() => handleNavigate('/')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium text-gray-800"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavigate('/')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium text-gray-800"
                >
                  Workshops
                </button>
                <button
                  onClick={() => handleNavigate('/gco')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium text-gray-800"
                >
                  Global Olympiad
                </button>
                <button
                  onClick={() => handleNavigate('/')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium text-gray-800"
                >
                  Resources
                </button>
                <button
                  onClick={() => handleNavigate('/contact')}
                  className="bg-[#fb4444] text-white py-3 px-4 rounded-full font-bold text-[14px] mt-4 hover:bg-[#ff5555] transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Get Connected
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-transparent fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-center px-[16px] md:px-[24px] py-[16px] md:py-[20px] relative shrink-0 w-full max-w-[1280px] mx-auto">
          {/* Logo - Left */}
          <div className="absolute left-[16px] md:left-[24px] flex items-center">
            <button className="cursor-pointer" onClick={() => navigate('/')} aria-label="Go to homepage">
              <LogoContainer />
            </button>
          </div>

          {/* Center Nav Links */}
          <div className="flex items-center justify-center">
            <NavLinks />
          </div>

          {/* Right CTA */}
          <div className="absolute right-[16px] md:right-[24px] flex items-center">
            <NavActions />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden absolute right-[16px] md:right-[24px] flex flex-col gap-[5px] p-2 z-50 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
