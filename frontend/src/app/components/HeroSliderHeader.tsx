import React from "react";
import { motion } from "framer-motion";
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
  {
    id: "singapore",
    name: "Ministry of Education",
    country: "Singapore",
    countryCode: "SGP",
    img: singaporeImg,
    link: "/policies",
  },
  {
    id: "finland",
    name: "Finnish Education",
    country: "Finland",
    countryCode: "FIN",
    img: finlandImg,
    link: "/policies",
  },
  {
    id: "japan",
    name: "MEXT Scholarship",
    country: "Japan",
    countryCode: "JPN",
    img: japanImg,
    link: "/policies",
  },
  {
    id: "india",
    name: "National Education Policy",
    country: "India",
    countryCode: "IND",
    img: indiaImg,
    link: "/policies",
  },
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
      <img
        src={org.img}
        alt={org.name}
        className="w-full h-full object-cover"
      />
    </motion.button>
  );
}

/* ─── "AT 81 / Playground" floating badge ─── */
function PlaygroundBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
      className="absolute bottom-8 right-4 md:right-8 z-20"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/90 backdrop-blur-md shadow-lg"
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-body)" }}>
            AT 81
          </span>
          <span className="text-[13px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
            Playground
          </span>
        </div>
        <div className="flex items-center justify-center w-[40px] h-[40px] rounded-xl bg-[#7c3aed]">
          <span className="text-[18px] font-black text-[#ffffff]" style={{ fontFamily: "var(--font-display)" }}>
            8
          </span>
          <span className="text-[12px] font-bold text-[#ffffff] -ml-0.5 -mt-2" style={{ fontFamily: "var(--font-display)" }}>
            1
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Decorative floating elements ─── */
function FloatingDecorations() {
  return (
    <>
      {/* Small purple dots */}
      <motion.div
        className="absolute top-[15%] left-[42%] w-2 h-2 rounded-full bg-[#7c5cbf] opacity-60"
        animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-[30%] w-1.5 h-1.5 rounded-full bg-[#7c5cbf] opacity-40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[25%] w-2 h-2 rounded-full bg-[#7c5cbf] opacity-50"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Small "x" marks */}
      <motion.div
        className="absolute top-[20%] left-[38%] text-[#7c5cbf] opacity-40 text-xs font-bold select-none"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ✕
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] right-[22%] text-[#7c5cbf] opacity-30 text-sm font-bold select-none"
        animate={{ rotate: [0, -90, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        ✕
      </motion.div>

      {/* Sparkle star */}
      <motion.div
        className="absolute top-[30%] left-[46%] text-[var(--color-accent)] opacity-70 text-lg select-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
    </>
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

  return (
    <div className="flex flex-col w-full bg-[var(--color-background-primary)] relative overflow-hidden">
      <NavbarSpacer />

      {/* ─── HERO SECTION: Text left + Mascot centered ─── */}
      <div className="w-full relative min-h-[480px] lg:min-h-[540px] px-[16px] sm:px-[24px] md:px-[48px] xl:px-[64px] pb-[20px] md:pb-[40px]">

        {/* Floating decorative elements */}
        <FloatingDecorations />

        {/* Mobile: column layout with mascot on top. Desktop: side by side */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center">

          {/* Hero text - below on mobile, left on desktop */}
          <motion.div
            className="order-2 lg:order-1 flex flex-col items-start justify-center gap-4 sm:gap-5 lg:gap-6 relative z-10 w-full lg:w-[46%] xl:w-[42%] py-4 lg:py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
          {/* Main headline */}
          <img
            src="/logo_ateion.png"
            alt="Ateion"
            className={`h-[60px] sm:h-[90px] md:h-[120px] lg:h-[140px] w-auto object-contain transition-all duration-300 ${
              theme === "dark" ? "brightness-0 invert" : ""
            }`}
          />

          {/* Subtitle */}
          <p
            className="text-[14px] sm:text-[16px] md:text-[17px] leading-[1.6] max-w-[440px]"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            Preparing future creators with the right capabilities for a limitless tomorrow.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/playground")}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-[13px] sm:text-[14px] font-bold cursor-pointer transition-all"
              style={{
                background: "#7c3aed",
                color: "#ffffff",
                border: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Explore Playground
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/gco")}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-[13px] sm:text-[14px] font-bold cursor-pointer transition-all border-2"
              style={{
                background: "transparent",
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border-medium)",
                fontFamily: "var(--font-body)",
              }}
            >
              Learn About GCO
            </motion.button>
          </div>

          {/* Trusted by — small image circles */}
          <div className="flex flex-col gap-2 mt-2 sm:mt-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-body)" }}>
              Trusted by Educators Worldwide
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {TRUST_ORGS.map((org, i) => (
                <TrustImageCard key={org.id} org={org} index={i} />
              ))}
              <motion.button
                type="button"
                onClick={() => navigate("/policies")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.85, duration: 0.3 }}
                className="text-[11px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer ml-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                +8 More
              </motion.button>
            </div>
          </div>
        </motion.div>

          {/* Mascot - on top on mobile, right on desktop */}
          <motion.div
            className="order-1 lg:order-2 relative flex justify-center items-end pointer-events-none z-[1] w-full lg:w-[54%] mb-6 lg:mb-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={mascot}
              alt="Ateion Mascot"
              className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[540px] xl:h-[540px] object-contain"
              style={{
                objectPosition: "center bottom",
              }}
            />
          </motion.div>

        </div>
      </div>

      {/* Optional children content */}
      {children && (
        <div className="w-full flex flex-col items-start pb-[20px] md:pb-[32px]">
          {children}
        </div>
      )}

      {showNavbar && <SharedNavbar />}
    </div>
  );
}
