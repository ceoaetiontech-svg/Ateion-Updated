/**
 * Homepage.tsx — Ateion Landing Page
 *
 * Sections (top to bottom):
 *  1. HeroHeaderSection       — full-bleed image slider + headline
 *  2. HeroFeatureCardsRow     — capability card + global-aligned card + red card
 *  3. GlobalPresenceMapSection — stats counters + dot-map
 *  4. EducationStatusWrapper  — "Education is not broken" grid
 *  5. EcosystemSection        — "Ateion as an Ecosystem" (redesigned)
 *  6. FAQSectionContainer     — accordion FAQ
 *  7. SharedFooter
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import svgPaths from "./svg-paths";
import logo from "../assets/logo.png";
import imgRectangle9 from "../assets/e54e08242e5e8cea29c382ba6bc82218d425f28e.png";
import imgImage9 from "../assets/3aab4451afd875f66a83eb26e0ca2d6f58abce98.png";
import imgImage7 from "../assets/e985b07ea1f916546c05a06ca93558ef62ecc870.png";
import imgImage13 from "../assets/a440209918fa81a1c528e2e95290d4f1f12546e7.png";
import DotMap from "../components/DotMap";
import SharedFooter from "../app/components/SharedFooter";
import SharedNavbar from "../app/components/SharedNavbar";
import RedIntelligenceCard from "./home/RedIntelligenceCard";
import EcosystemSection from "./home/EcosystemSection";

/* ─────────────────────────────────────────────
   UTILITY COMPONENTS
───────────────────────────────────────────── */

/** Animated counter that counts up when scrolled into view */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setCount(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/** Fade-in + slide-up on scroll */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HERO SLIDER BACKGROUND STRIPS
───────────────────────────────────────────── */

function Frame67() {
  const items = (
    <>
      <div className="bg-[#d9d9d9] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] shrink-0 w-[229px]" />
      <div className="bg-[#4aa0e0] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] shrink-0 w-[454px]" />
      <div className="bg-[#9dc5dc] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] shrink-0 w-[454px]" />
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1191] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-[12px] items-end shrink-0"
        style={{ width: "max-content" }}
      >
        {items}{items}
      </motion.div>
    </div>
  );
}

function Frame66() {
  const items = (
    <>
      <div className="h-[150px] sm:h-[170px] md:h-[190px] lg:h-[210px] relative shrink-0 w-[229px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#af0101] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[363.5%] left-0 max-w-none top-[-81%] w-[561.27%]" src={imgRectangle9} />
          </div>
        </div>
      </div>
      <div className="h-[150px] sm:h-[170px] md:h-[190px] lg:h-[210px] relative shrink-0 w-[326px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#eee] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[358.13%] left-[-74.47%] max-w-none top-[-77.83%] w-[388.97%]" src={imgRectangle9} />
          </div>
        </div>
      </div>
      <div className="bg-[#101010] h-[150px] sm:h-[170px] md:h-[190px] lg:h-[210px] shrink-0 w-[332px]" />
      <div className="h-[150px] sm:h-[170px] md:h-[190px] lg:h-[210px] relative shrink-0 w-[332px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#b9a38e] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[370.92%] left-[-283.94%] max-w-none top-[-82.14%] w-[387.79%]" src={imgRectangle9} />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1291] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-[12px] items-center shrink-0"
        style={{ width: "max-content" }}
      >
        {items}{items}
      </motion.div>
    </div>
  );
}

function Frame65() {
  const items = (
    <>
      <div className="bg-gradient-to-b from-[#cdcdcd] h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] shrink-0 to-[98.358%] to-[rgba(175,175,175,0)] w-[166px]" />
      <div className="bg-gradient-to-b from-[#cdcdcd] from-[9.884%] h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] shrink-0 to-[93.649%] to-[rgba(175,175,175,0)] w-[248px]" />
      <div className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] shrink-0 w-[255px]" style={{ backgroundImage: "linear-gradient(179.755deg, rgb(205, 205, 205) 5.9207%, rgba(175, 175, 175, 0) 88.453%)" }} />
      <div className="bg-gradient-to-b from-[#cdcdcd] from-[2.152%] h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] shrink-0 to-[95.353%] to-[rgba(175,175,175,0)] w-[255px]" />
      <div className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] shrink-0 w-[255px]" style={{ backgroundImage: "linear-gradient(179.748deg, rgb(205, 205, 205) 12.486%, rgba(175, 175, 175, 0) 97.032%)" }} />
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1239] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="flex gap-[8px] items-center shrink-0"
        style={{ width: "max-content" }}
      >
        {items}{items}
      </motion.div>
    </div>
  );
}

function HeroSliderImages() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] md:gap-[12px] lg:gap-[16px] items-start left-0 top-0 w-full overflow-hidden">
      <Frame67 />
      <Frame66 />
      <Frame65 />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */

function LogoContainer() {
  return (
    <div className="flex items-center gap-[4px] relative shrink-0">
      <img src={logo} alt="Ateion Logo" className="h-[60px] object-contain w-auto" />
      <svg className="block w-[17px] h-[16px]" fill="none" viewBox="0 0 17.2333 16.3101">
        <path d={svgPaths.p3a430600} fill="#D4CFC5" />
      </svg>
    </div>
  );
}

function HeroSliderHeader() {
  return (
    <div className="relative w-full h-[72vh] md:h-[60vh] overflow-hidden">
      <div className="absolute inset-0 content-stretch flex flex-col items-start">
        <HeroSliderImages />
      </div>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <SharedNavbar />
      </div>
    </div>
  );
}

function ExploreButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.04, backgroundColor: "#c92e2e" }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-[8px] bg-[#e03a3a] text-white rounded-full border-none cursor-pointer shadow-[0_8px_28px_rgba(224,58,58,0.3)]"
      style={{
        padding: "clamp(10px,1.4vh,14px) clamp(18px,2vw,26px) clamp(10px,1.4vh,14px) clamp(14px,1.6vw,20px)",
        fontFamily: "'Outfit', sans-serif",
        fontSize: "clamp(12px, 1vw, 14px)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        transition: "background 0.2s",
      }}
    >
      Explore more
    </motion.button>
  );
}

function HeroTextBlock() {
  return (
    <div className="w-full flex flex-col items-start justify-center px-[16px] pt-[10px] sm:px-[24px] md:px-[64px] gap-[16px] sm:gap-[20px] h-[25vh] md:h-[40vh] z-[100]">
      <p
        className="leading-[0.96] not-italic text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] text-black font-bold"
        style={{ fontFamily: "'OV Soge', sans-serif" }}
      >
        Reimagining Education
      </p>
      <ExploreButton />
    </div>
  );
}

function HeroHeaderSection() {
  return (
    <div className="flex flex-col items-start w-full h-screen bg-[#f7f3eb]">
      <HeroSliderHeader />
      <HeroTextBlock />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE CARDS (capability + global + red)
───────────────────────────────────────────── */

function PurpleCapabilityCardInner() {
  return (
    <div className="bg-[#e6e6e6] flex h-[400px] sm:h-[450px] md:h-[504px] items-start p-[24px] sm:p-[32px] md:p-[40px] relative rounded-[13px] sm:rounded-[20px] shrink-0 w-full md:w-[32%] lg:w-[28%] md:max-w-none">
      <div className="flex flex-col gap-[24px] sm:gap-[32px] items-start justify-center relative shrink-0 w-full md:max-w-[300px]">
        <p className="font-['Inter',sans-serif] leading-[1.4] text-[16px] sm:text-[18px] text-black">
          Because <strong>marks</strong> measure memory.<br />
          <strong className="font-['IBM Plex Sans',sans-serif] italic text-[18px] sm:text-[20px]">Capability</strong>{" "}
          <strong className="font-['IBM Plex Sans',sans-serif] italic">measures the future.</strong>
        </p>
        <p className="font-['Inter',sans-serif] leading-[1.6] text-[13px] sm:text-[14px] text-black w-full">
          Ateion is the world's leading Capability-First Education ecosystem integrating AI literacy, innovation, and measurable readiness into modern schooling.
        </p>
      </div>
    </div>
  );
}

function PurpleCapabilityCardOuter() {
  return (
    <div className="flex flex-col items-start justify-start relative shrink-0 w-full px-[16px] sm:px-[24px] md:px-0">
      <div className="content-stretch flex flex-col md:flex-row items-stretch relative shrink-0 w-full gap-[16px] sm:gap-[24px]">
        <div className="bg-[#aa9dff] h-[350px] sm:h-[400px] md:h-auto flex-1 w-full rounded-[13px] sm:rounded-[20px] shrink-0 md:shrink" />
        <PurpleCapabilityCardInner />
      </div>
    </div>
  );
}

function GlobalAlignedBlackCard() {
  return (
    <div className="bg-[#202020] content-stretch flex items-start pb-[24px] sm:pb-[32px] pt-[24px] sm:pt-[32px] px-[24px] sm:px-[32px] relative rounded-[13px] sm:rounded-[20px] shrink-0 md:shrink w-full md:w-[45%] lg:w-[40%]">
      <div className="flex flex-col gap-6 p-4 rounded-2xl shadow-sm w-full max-w-4xl">
        <div className="content-stretch flex flex-col gap-[16px] sm:gap-[24px] items-start relative shrink-0 w-full max-w-[260px]">
          <p className="leading-[normal] min-w-full not-italic relative shrink-0 text-[28px] sm:text-[36px] text-white w-[min-content]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Globally Aligned with</p>
        </div>
        <div className="flex flex-row gap-4 items-end w-full">
          <div className="w-1/2">
            <img alt="" className="w-full h-auto rounded-2xl object-contain" src={imgImage9} />
          </div>
          <div className="w-1/2">
            <img alt="" className="w-full h-auto rounded-2xl object-contain" src={imgImage7} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroMetricsRow() {
  return (
    <div className="flex flex-col items-start justify-start relative shrink-0 w-full px-[16px] sm:px-[24px] md:px-0">
      <div className="flex flex-col md:flex-row gap-[16px] sm:gap-[24px] items-stretch relative shrink-0 w-full">
        <GlobalAlignedBlackCard />
        <RedIntelligenceCard />
      </div>
    </div>
  );
}

function HeroFeatureCardsRow() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <PurpleCapabilityCardOuter />
      <HeroMetricsRow />
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL PRESENCE MAP + COUNTERS
───────────────────────────────────────────── */

function GlobalPresenceMapSection() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      {/* Section heading */}
      <div className="w-full flex justify-center mb-6 sm:mb-8 md:mb-10 px-4">
        <p className="font-semibold leading-tight text-[32px] sm:text-[40px] md:text-[48px] text-black text-center" style={{ fontFamily: "'OV Soge', sans-serif" }}>Global Presence</p>
      </div>

      {/* Dark stats + map block */}
      <div className="dark-section bg-black h-auto relative shrink-0 w-full py-[40px] sm:py-[56px] md:py-[80px]">
        <div className="content-stretch flex flex-col items-center relative size-full px-[16px] sm:px-[24px] md:px-[40px]">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[32px] sm:gap-[48px] md:gap-[64px] items-center relative shrink-0 w-full max-w-[1280px] mx-auto">

              {/* Counters */}
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full mb-[32px] sm:mb-[48px] md:mb-[64px]">
                <div className="content-stretch flex flex-col gap-[28px] sm:gap-[40px] md:gap-[48px] items-center relative shrink-0 w-full max-w-[1200px]">
                  <FadeIn>
                    <div className="flex items-center justify-center relative shrink-0 mb-6 sm:mb-8 px-4">
                      <p className="font-semibold not-italic opacity-90 relative text-[28px] sm:text-[32px] md:text-[36px] text-center text-white tracking-wide" style={{ fontFamily: "'OV Soge', sans-serif" }}>
                        Powered by Proven Numbers
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col sm:flex-row items-center justify-center sm:justify-around relative shrink-0 w-full gap-[28px] sm:gap-[12px] py-[12px] sm:py-[24px]">
                      {[
                        { value: 200, suffix: "+", label: "Partner Institutions" },
                        { value: 50000, suffix: "+", label: "Students Empowered" },
                        { value: 193, suffix: "+", label: "Global Alliances" },
                      ].map(({ value, suffix, label }) => (
                        <motion.div
                          key={label}
                          whileHover={{ y: -8, transition: { duration: 0.3 } }}
                          className="content-stretch flex flex-col items-center justify-center relative shrink-0 px-4"
                        >
                          <p className="font-['DM Sans',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[42px] sm:text-[48px] md:text-[54px]">
                            <Counter value={value} suffix={suffix} />
                          </p>
                          <p className="font-['Inter',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[16px] sm:text-[18px] mt-[8px] sm:mt-[12px] text-center">{label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Dot map */}
              <div
                className="relative shrink-0 w-full overflow-x-auto md:overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#050505] min-h-[260px] sm:min-h-[360px] md:min-h-[500px]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .map-scroll::-webkit-scrollbar { width: 0; height: 0; }
                `}</style>
                <div className="map-scroll absolute inset-0 scale-[1.08] sm:scale-[1] origin-center flex items-center justify-center">
                  <DotMap />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EDUCATION STATUS GRID
───────────────────────────────────────────── */

function EducationStatusWrapper() {
  return (
    <div className="w-full px-[16px] sm:px-[24px] md:px-[64px]">
      <FadeIn>
        <div className="flex flex-col gap-[16px] sm:gap-[24px] items-start w-full">
          {/* Header row */}
          <div className="content-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between not-italic relative shrink-0 text-black w-full py-[24px] sm:py-[48px] gap-[24px] sm:gap-[64px]">
            <p className="leading-tight relative shrink-0 text-[28px] sm:text-[36px] md:text-[48px] flex-1" style={{ fontFamily: "'OV Soge', sans-serif" }}>
              Education is not broken.
            </p>
            <p className="font-['Inter',sans-serif] leading-relaxed relative shrink-0 text-[16px] sm:text-[18px] text-[rgba(0,0,0,0.7)] flex-1">
              <span>{`Its measurement system is `}</span>
              <span className="font-bold">outdated.</span>
              <span>{` Ateion replaces memory-based validation with `}</span>
              <span className="font-bold italic">capability-based intelligence.</span>
            </p>
          </div>

          {/* Placeholder image grid */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {[0, 1].map((row) => (
              <div key={row} className="content-stretch flex flex-col sm:flex-row gap-[12px] sm:gap-[20px] items-center relative shrink-0 w-full">
                {[0, 1, 2].map((col) => (
                  <div key={col} className="bg-[#d9d9d9] h-[200px] sm:h-[280px] md:h-[335px] shrink-0 flex-1" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────── */

const faqData = [
  {
    question: "What is Ateion?",
    answer: "Ateion is a pioneering education technology ecosystem dedicated to bridging the gap between traditional rote learning and real-world capability. We focus on AI literacy, innovation, and measurable readiness, providing students with the tools they need to thrive in a rapidly evolving global landscape.",
  },
  {
    question: "How is Ateion different from traditional education systems?",
    answer: "Unlike traditional systems that often prioritize memorization and standardized testing, Ateion emphasizes 'Capability-First' education. We integrate advanced AI tools, project-based learning, and global competency frameworks to ensure students are not just learning facts, but developing actionable skills.",
  },
  {
    question: "Who can partner with Ateion?",
    answer: "We partner with forward-thinking K-12 schools, universities, educational institutions, and corporate organizations globally. If you are committed to future-proofing education and empowering the next generation with AI-driven capabilities, we invite you to connect with us.",
  },
  {
    question: "What is the Global Capability Olympiad (GCO)?",
    answer: "The GCO is our flagship global competition that evaluates students based on their real-world problem-solving abilities and AI proficiency rather than academic recall. It serves as a benchmark for world-class capability and innovation among students worldwide.",
  },
  {
    question: "How are capabilities measured?",
    answer: "Capabilities are measured through our proprietary assessment framework that tracks innovation, problem-solving, digital literacy, and collaborative skills. We use real-time data and AI-driven insights to provide a comprehensive profile of a student's readiness for the future.",
  },
  {
    question: "How can institutions get connected?",
    answer: "Institutions can get connected by visiting our 'Get Connected' section or reaching out via email at destiny@ateion.com. Our team will guide you through the partnership process, from initial workshops to full ecosystem integration.",
  },
];

function FAQItem({ question, answer, isOpen, toggle }: { question: string; answer: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="bg-[#f7f3eb] mb-[12px] relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(25,33,61,0.04)] overflow-hidden transition-all duration-300 border border-[rgba(0,0,0,0.03)] hover:shadow-[0px_8px_30px_0px_rgba(25,33,61,0.08)]">
      <button
        onClick={toggle}
        className="w-full content-stretch flex items-center justify-between px-[20px] sm:px-[32px] py-[20px] sm:py-[28px] relative text-left group"
      >
        <p className="flex-[1_0_0] font-semibold leading-[1.35] max-w-[700px] not-italic relative text-[#1a1a1a] text-[18px] sm:text-[20px] md:text-[22px] transition-colors group-hover:text-[#fb4444]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
          {question}
        </p>
        <div className={`bg-[#e7e3dd] content-stretch flex items-center p-[6px] sm:p-[8px] relative rounded-[100px] shadow-[0px_1px_2px_0px_rgba(25,33,61,0.07)] shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}>
          <div className="overflow-clip relative shrink-0 size-[18px] sm:size-[20px]">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[12px] items-center justify-center left-[calc(50%+1px)] top-1/2 w-[6px]">
              <div className="-scale-y-100 flex-none">
                <div className="h-[12px] relative w-[6px]">
                  <div className="absolute inset-[-7.14%_-14.29%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                      <path d={svgPaths.p1487cd00} stroke="#1C1B1B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-[20px] sm:px-[32px] pb-[20px] sm:pb-[32px] pt-[8px]">
              <p className="leading-relaxed text-[15px] sm:text-[16px] text-[rgba(0,0,0,0.7)] max-w-[750px]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSectionContainer() {
  const [openStates, setOpenStates] = useState<boolean[]>(faqData.map((_, i) => i === 0));

  const toggle = (index: number) => {
    setOpenStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center w-full px-[16px] sm:px-[24px] md:px-[64px] py-[40px] sm:py-[60px] mb-[40px] sm:mb-[60px]">
      <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full max-w-[1044px]">
        {/* Title */}
        <p className="leading-[1.19] not-italic text-[24px] sm:text-[28px] md:text-[32px] text-black text-center" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
          Your Common Questions Answered
        </p>
        {/* Accordion */}
        <div className="content-stretch flex flex-col items-stretch relative shrink-0 w-full max-w-[900px]">
          {faqData.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} isOpen={openStates[i]} toggle={() => toggle(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT PAGE COMPONENT
───────────────────────────────────────────── */

export default function Homepage() {
  return (
    <div className="bg-[#f7f3eb] w-full min-h-screen overflow-x-hidden" data-name="Homepage">

      {/* 1. Hero slider + headline */}
      <HeroHeaderSection />

      {/* 2. Capability / global-aligned / red intelligence cards */}
      <div className="flex flex-col gap-[40px] sm:gap-[60px] items-center w-full mt-[40px]">
        <div className="w-full px-[16px] sm:px-[24px] md:px-[64px]">
          <HeroFeatureCardsRow />
        </div>

        {/* 3. Global presence stats + map */}
        <GlobalPresenceMapSection />
      </div>

      {/* 4. Education is not broken */}
      <div className="mt-[40px] sm:mt-[60px]">
        <EducationStatusWrapper />
      </div>

      {/* 5. Ecosystem — redesigned */}
      <EcosystemSection />

      {/* 6. FAQ */}
      <FAQSectionContainer />

      {/* 7. Footer */}
      <SharedFooter />
    </div>
  );
}
