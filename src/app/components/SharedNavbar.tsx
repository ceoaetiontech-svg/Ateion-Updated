/**
 * ============================================================================
 * ATEION SHARED NAVBAR
 * ============================================================================
 * Primary navbar used across all pages (Homepage, GCO, Contact)
 * ============================================================================
 */

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-paths";
import logo from "../../assets/logo.png";

const navTextClass = "font-bold text-[13px] whitespace-nowrap font-manrope";

function LogoContainer() {
  return (
    <div className="flex items-center relative shrink-0">
      <img
        src={logo}
        alt="Ateion Logo"
        className="h-[60px] object-contain w-auto"
      />
    </div>
  );
}

function AboutUsBtn() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/#about')}
      className="bg-[rgba(235,235,235,0.8)] flex h-[36px] items-center justify-center px-[20px] rounded-full shrink-0 cursor-pointer hover:bg-[rgba(215,215,215,0.95)] transition-colors"
    >
      <p className={`${navTextClass} text-[#292929]`}>About Us</p>
    </motion.div>
  );
}

function WorkshopsBtn() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/#workshops')}
      className="bg-[rgba(235,235,235,0.8)] flex gap-[6px] h-[36px] items-center justify-center px-[20px] rounded-full shrink-0 cursor-pointer hover:bg-[rgba(215,215,215,0.95)] transition-colors"
    >
      <p className={`${navTextClass} text-[#292929]`}>Workshops</p>
      <svg className="w-[8px] h-[7px] rotate-180" fill="none" viewBox="0 0 8.06516 7.25">
        <path d={svgPaths.p3367e500} fill="#292929" />
      </svg>
    </motion.div>
  );
}

function GlobalOlympiadBtn() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/gco')}
      className="bg-[rgba(227,227,227,0.72)] flex h-[36px] items-center justify-center px-[20px] rounded-full shrink-0 cursor-pointer hover:bg-[rgba(200,200,200,0.85)] transition-colors"
    >
      <p className={`${navTextClass} text-[#292929]`}>Global Olympiad</p>
    </motion.div>
  );
}

function ResourcesBtn() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/#resources')}
      className="bg-[rgba(227,227,227,0.72)] flex h-[36px] items-center justify-center px-[20px] rounded-full shrink-0 cursor-pointer hover:bg-[rgba(200,200,200,0.85)] transition-colors"
    >
      <p className={`${navTextClass} text-[#292929]`}>Resources</p>
    </motion.div>
  );
}

function NavLinks() {
  return (
    <div className="flex gap-[16px] items-center shrink-0">
      <AboutUsBtn />
      <WorkshopsBtn />
      <GlobalOlympiadBtn />
      <ResourcesBtn />
    </div>
  );
}

function GetConnectedBtn() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(251, 68, 68, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/contact')}
      className="bg-[#fb4444] flex h-[36px] items-center justify-center px-[20px] rounded-full shrink-0 cursor-pointer hover:bg-[#ff5555] transition-all"
    >
      <p className={`${navTextClass} text-white`}>Get Connected</p>
    </motion.div>
  );
}

export default function SharedNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      <div className="flex items-center justify-between px-[24px] py-[20px] w-full max-w-[1280px] mx-auto">
        <div className="flex flex-1 items-center justify-start">
          <LogoContainer />
        </div>
        <div className="flex-[2] flex items-center justify-center">
          <NavLinks />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <GetConnectedBtn />
        </div>
      </div>
    </nav>
  );
}
