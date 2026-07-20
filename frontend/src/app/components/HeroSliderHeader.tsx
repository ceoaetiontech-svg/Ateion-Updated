/**
 * HeroSliderHeader.tsx — Hero Section with Interactive Mascot
 *
 * Scroll behavior:
 * - Scroll 0-25%: Website stays fixed, hat moves down to mascot head
 * - Scroll 25-50%: Website stays fixed, cards appear from behind mascot
 * - Scroll 50%+: Website scrolls normally
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "./ThemeProvider";

import mascot from "../../assets/mascott.png";
import singaporeImg from "../../assets/policies/singapore.webp";
import finlandImg from "../../assets/policies/finland.webp";
import japanImg from "../../assets/policies/japan.webp";
import indiaImg from "../../assets/policies/india.webp";
import SharedNavbar from "./SharedNavbar";
import NavbarSpacer from "./NavbarSpacer";

/* ─── Feature Cards Data ─── */
interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const featureCards: FeatureCard[] = [
  { id: 1, title: "AI Literacy", description: "Master artificial intelligence from day one", icon: "🤖", color: "#7c3aed" },
  { id: 2, title: "Capability First", description: "Real skills over memorized answers", icon: "🎯", color: "#e8586a" },
  { id: 3, title: "Global Ready", description: "Prepared for tomorrow's challenges", icon: "🌍", color: "#2563eb" },
  { id: 4, title: "Innovation Hub", description: "Build, create, and innovate daily", icon: "💡", color: "#059669" },
];

/* ─── Trusted-by image cards ─── */
interface TrustOrg {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  img: string;
  link: string;
}

const TRUST_ORGS: TrustOrg[] = [
  { id: "singapore", name: "Ministry of Education", country: "Singapore", countryCode: "SGP", img: singaporeImg, link: "/policies" },
  { id: "finland", name: "Finnish Education", country: "Finland", countryCode: "FIN", img: finlandImg, link: "/policies" },
  { id: "japan", name: "MEXT Scholarship", country: "Japan", countryCode: "JPN", img: japanImg, link: "/policies" },
  { id: "india", name: "National Education Policy", country: "India", countryCode: "IND", img: indiaImg, link: "/policies" },
];

function TrustImageCard({ org, index }: { org: TrustOrg; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.button
      type="button"
      onClick={() => navigate(org.link)}
      whileHover={{ y: -2, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.35 }}
      className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden border-2 border-[var(--color-border-light)] bg-white shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/40 transition-all cursor-pointer flex-shrink-0"
      title={org.name}
    >
      <img src={org.img} alt={org.name} className="w-full h-full object-cover" />
    </motion.button>
  );
}

/* ─── Decorative floating elements ─── */
function FloatingDecorations() {
  return (
    <>
      <motion.div className="absolute top-[15%] left-[42%] w-2 h-2 rounded-full bg-[#7c5cbf] opacity-60" animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[25%] right-[30%] w-1.5 h-1.5 rounded-full bg-[#7c5cbf] opacity-40" animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
      <motion.div className="absolute bottom-[30%] right-[25%] w-2 h-2 rounded-full bg-[#7c5cbf] opacity-50" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <motion.div className="absolute top-[20%] left-[38%] text-[#7c5cbf] opacity-40 text-xs font-bold select-none" animate={{ rotate: [0, 90, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>✕</motion.div>
      <motion.div className="absolute bottom-[25%] right-[22%] text-[#7c5cbf] opacity-30 text-sm font-bold select-none" animate={{ rotate: [0, -90, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>✕</motion.div>
      <motion.div className="absolute top-[30%] left-[46%] text-[var(--color-accent)] opacity-70 text-lg select-none" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>✦</motion.div>
    </>
  );
}

/* ─── Graduation Cap (Topi) Component ─── */
function GraduationCap({ isLanded }: { isLanded: boolean }) {
  return (
    <motion.div animate={{ scale: isLanded ? 1.05 : 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
      <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", filter: isLanded ? "drop-shadow(0 8px 24px rgba(124, 58, 237, 0.45))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.2))", transition: "filter 0.4s ease" }}>
        <defs>
          <linearGradient id="capGrad" x1="10" y1="50" x2="170" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1e3a"/>
            <stop offset="40%" stopColor="#12122a"/>
            <stop offset="100%" stopColor="#0a0a1e"/>
          </linearGradient>
          <linearGradient id="capBrimGrad" x1="10" y1="55" x2="170" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2a2a4a"/>
            <stop offset="50%" stopColor="#1a1a36"/>
            <stop offset="100%" stopColor="#10102a"/>
          </linearGradient>
          <linearGradient id="capSideGrad" x1="60" y1="80" x2="120" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16162e"/>
            <stop offset="100%" stopColor="#0e0e20"/>
          </linearGradient>
          <radialGradient id="goldGrad" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#ffe866"/>
            <stop offset="50%" stopColor="#ffd700"/>
            <stop offset="100%" stopColor="#cc9900"/>
          </radialGradient>
          <linearGradient id="tasselString" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700"/>
            <stop offset="100%" stopColor="#cc8800"/>
          </linearGradient>
          <linearGradient id="tasselEnd" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8586a"/>
            <stop offset="50%" stopColor="#d4485a"/>
            <stop offset="100%" stopColor="#c03848"/>
          </linearGradient>
          <linearGradient id="tasselThread" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd700"/>
            <stop offset="100%" stopColor="#daa520"/>
          </linearGradient>
        </defs>

        {/* Cap top panel - diamond/roof shape */}
        <path d="M 90 28 L 168 62 L 90 96 L 12 62 Z" fill="url(#capGrad)" stroke="#0d0d22" strokeWidth="1.5"/>

        {/* Top panel highlight edge */}
        <path d="M 90 28 L 168 62 L 162 64 L 90 32 L 18 64 L 12 62 Z" fill="white" opacity="0.08"/>

        {/* Cap top surface shine */}
        <path d="M 40 58 L 90 36 L 140 58" fill="none" stroke="white" strokeWidth="0.8" opacity="0.15" strokeLinecap="round"/>
        <path d="M 50 62 L 90 42 L 130 62" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" strokeLinecap="round"/>

        {/* Cap side/band - 3D depth */}
        <path d="M 48 68 L 48 88 C 48 88 90 102 90 102 C 90 102 132 88 132 88 L 132 68 C 132 68 90 84 90 84 C 90 84 48 68 48 68 Z" fill="url(#capSideGrad)"/>

        {/* Cap side shadow */}
        <path d="M 48 88 C 48 88 90 102 90 102 C 90 102 132 88 132 88 L 128 90 C 128 90 90 104 90 104 C 90 104 52 90 52 90 Z" fill="#08081a" opacity="0.4"/>

        {/* Band top highlight */}
        <path d="M 52 70 L 128 70" stroke="white" strokeWidth="0.6" opacity="0.12" strokeLinecap="round"/>

        {/* "A" letter on front of cap */}
        <text x="90" y="82" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="bold" fill="white" opacity="0.85" letterSpacing="1">A</text>

        {/* Gold button on top - 3D sphere */}
        <circle cx="90" cy="60" r="7" fill="url(#goldGrad)"/>
        <circle cx="88" cy="57" r="2.5" fill="white" opacity="0.5"/>
        <circle cx="92" cy="62" r="1.5" fill="white" opacity="0.2"/>

        {/* Tassel string - from button down to the right */}
        <path d="M 96 64 Q 120 68 138 82" stroke="url(#tasselString)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

        {/* Tassel bead */}
        <circle cx="140" cy="84" r="4" fill="#ffd700" stroke="#cc9900" strokeWidth="0.8"/>
        <circle cx="139" cy="82.5" r="1.5" fill="white" opacity="0.4"/>

        {/* Tassel threads hanging down */}
        <path d="M 137 87 L 134 102" stroke="url(#tasselThread)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 140 88 L 140 105" stroke="url(#tasselEnd)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 143 87 L 146 102" stroke="url(#tasselThread)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 141 88 L 143 100" stroke="url(#tasselEnd)" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Tassel thread tips */}
        <circle cx="134" cy="103" r="1.5" fill="#daa520"/>
        <circle cx="140" cy="106" r="1.8" fill="#d4485a"/>
        <circle cx="146" cy="103" r="1.5" fill="#daa520"/>
        <circle cx="143" cy="101" r="1.2" fill="#d4485a"/>

        {/* Subtle edge highlights on diamond */}
        <path d="M 90 28 L 12 62" stroke="white" strokeWidth="0.5" opacity="0.1"/>
        <path d="M 90 28 L 168 62" stroke="white" strokeWidth="0.5" opacity="0.12"/>
      </svg>
    </motion.div>
  );
}

/* ─── Feature Card Component ─── */
function FeatureCardItem({ card, index, visible, windowWidth }: { card: FeatureCard; index: number; visible: boolean; windowWidth: number }) {
  const getPositions = () => {
    if (windowWidth < 640) {
      return [
        { endX: -160, endY: -30 },
        { endX: 90, endY: -30 },
        { endX: -135, endY: 55 },
        { endX: 65, endY: 55 },
      ];
    }
    if (windowWidth < 1024) {
      return [
        { endX: -190, endY: -90 },
        { endX: 190, endY: -90 },
        { endX: -190, endY: 90 },
        { endX: 190, endY: 90 },
      ];
    }
    return [
      { endX: -320, endY: -110 },
      { endX: 280, endY: -110 },
      { endX: -320, endY: 110 },
      { endX: 280, endY: 110 },
    ];
  };
  const positions = getPositions();
  const pos = positions[index] || positions[0];

  return (
    <motion.div
      className="absolute z-[15]"
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
      animate={visible ? { opacity: 1, x: pos.endX, y: pos.endY, scale: 1 } : { opacity: 0, x: 0, y: 0, scale: 0.3 }}
      transition={{ duration: 0.5, delay: visible ? index * 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div className="w-[80px] sm:w-[130px] md:w-[150px] p-1.5 sm:p-3 rounded-2xl backdrop-blur-md border"
        style={{ background: "rgba(255, 255, 255, 0.95)", borderColor: `${card.color}30`, boxShadow: `0 6px 20px ${card.color}18` }}>
        <div className="text-sm sm:text-xl md:text-2xl mb-0.5 sm:mb-1">{card.icon}</div>
        <h4 className="text-[8px] sm:text-[11px] md:text-[13px] font-bold mb-0.5 sm:mb-1 leading-tight" style={{ color: card.color, fontFamily: "var(--font-display)" }}>{card.title}</h4>
        <p className="text-[7px] sm:text-[10px] leading-tight hidden sm:block" style={{ color: "#666" }}>{card.description}</p>
      </div>
    </motion.div>
  );
}

export default function HeroSliderHeader({
  showNavbar = true,
  children,
}: {
  showNavbar?: boolean;
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLanded, setIsLanded] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Hat Y position: starts hidden above, moves down to mascot head
  // Scroll 0-25% maps to hat position -300px (hidden) to 15px (on head)
  const hatY = useTransform(scrollYProgress, [0, 0.25], [-300, 15]);
  const springHatY = useSpring(hatY, { stiffness: 50, damping: 15 });

  // Check if hat has landed on head
  useEffect(() => {
    const unsubscribe = springHatY.on("change", (latest) => {
      const landed = latest >= 5 && latest <= 25;
      if (landed !== isLanded) {
        setIsLanded(landed);
        if (landed) {
          setTimeout(() => setShowCards(true), 200);
        } else {
          setShowCards(false);
        }
      }
    });
    return () => unsubscribe();
  }, [springHatY, isLanded]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      {/* Sticky hero container */}
      <div className="sticky top-0 h-screen w-full flex flex-col bg-[var(--color-background-primary)]">
        <NavbarSpacer />

        {/* ─── HERO SECTION ─── */}
        <div className="w-full relative flex-1 px-[16px] sm:px-[24px] md:px-[48px] xl:px-[64px] pb-0 overflow-visible">
          <FloatingDecorations />

          <div className="flex flex-col lg:flex-row items-center lg:items-center h-full">
            {/* Hero text */}
            <motion.div
              className="order-2 lg:order-1 flex flex-col items-start justify-center gap-4 sm:gap-5 lg:gap-6 relative z-10 w-full lg:w-[46%] xl:w-[42%] py-4 lg:py-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/logo_ateion.png" alt="Ateion"
                className={`h-[60px] sm:h-[90px] md:h-[120px] lg:h-[140px] w-auto object-contain transition-all duration-300 ${theme === "dark" ? "brightness-0 invert" : ""}`} />
              <p className="text-[14px] sm:text-[16px] md:text-[17px] leading-[1.6] max-w-[440px]"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}>
                Preparing future creators with the right capabilities for a limitless tomorrow.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <motion.button type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate("/playground")}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-[13px] sm:text-[14px] font-bold cursor-pointer transition-all"
                  style={{ background: "#7c3aed", color: "#ffffff", border: "none", fontFamily: "var(--font-body)" }}>
                  Explore Playground <ArrowRight size={16} strokeWidth={2.5} />
                </motion.button>
                <motion.button type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate("/gco")}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-[13px] sm:text-[14px] font-bold cursor-pointer transition-all border-2"
                  style={{ background: "transparent", color: "var(--color-text-primary)", borderColor: "var(--color-border-medium)", fontFamily: "var(--font-body)" }}>
                  Learn About GCO
                </motion.button>
              </div>
              <div className="flex flex-col gap-2 mt-2 sm:mt-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-body)" }}>
                  Trusted by Educators Worldwide
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {TRUST_ORGS.map((org, i) => (
                    <TrustImageCard key={org.id} org={org} index={i} />
                  ))}
                  <motion.button type="button" onClick={() => navigate("/policies")} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.85, duration: 0.3 }}
                    className="text-[11px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer ml-1"
                    style={{ fontFamily: "var(--font-body)" }}>
                    +8 More
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* ─── MASCOT AREA ─── */}
            <motion.div
              className="order-1 lg:order-2 relative flex justify-center items-end pointer-events-none z-[1] w-full lg:w-[54%] mb-6 lg:mb-0 lg:ml-[25%] overflow-visible"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Feature Cards - positioned relative to mascot area center */}
              <AnimatePresence>
                {showCards && (
                  <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none">
                    {featureCards.map((card, index) => (
                      <FeatureCardItem key={card.id} card={card} index={index} visible={showCards} windowWidth={windowWidth} />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Mascot container */}
              <div className="relative z-10 overflow-visible">
                {/* Background circle */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] xl:w-[400px] xl:h-[400px] rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(232,133,106,0.15) 0%, rgba(124,58,237,0.1) 100%)",
                    boxShadow: isLanded ? "0 0 60px rgba(124,58,237,0.25), 0 0 100px rgba(124,58,237,0.08)" : "0 0 40px rgba(232,133,106,0.1)",
                    transition: "box-shadow 0.5s ease",
                  }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Mascot + Hat */}
                <motion.div className="relative z-10" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  {/* Graduation Cap */}
                  <motion.div className="absolute z-20 pointer-events-none" style={{ top: springHatY, left: "50%", x: "-50%" }}>
                    <div className="w-[80px] sm:w-[140px] md:w-[160px] lg:w-[180px]">
                      <GraduationCap isLanded={isLanded} />
                    </div>
                  </motion.div>

                  {/* Mascot image */}
                  <img src={mascot} alt="Ateion Mascot"
                    className="w-[180px] sm:w-[260px] md:w-[320px] lg:w-[420px] xl:w-[500px] h-auto object-contain"
                    style={{
                      filter: isLanded ? "drop-shadow(0 10px 30px rgba(124,58,237,0.25))" : "drop-shadow(0 5px 20px rgba(0,0,0,0.08))",
                      transition: "filter 0.5s ease",
                    }} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {showNavbar && <SharedNavbar />}
      </div>
    </div>
  );
}
