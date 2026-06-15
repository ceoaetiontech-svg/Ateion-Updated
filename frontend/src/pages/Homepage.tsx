/**
 * Homepage.tsx — Ateion Landing Page
 *
 * Sections (top to bottom):
 * 1. HeroHeaderSection       — full-bleed image slider + headline
 * 2. HeroFeatureCardsRow     — capability card + global-aligned card + red card
 * 3. HomePolicySection       — global policy alignment cards
 * 4. EcosystemSection        — "Ateion as an Ecosystem" (redesigned)
 * 5. GlobalPresenceMapSection — stats counters + dot-map
 * 6. EducationStatusWrapper  — "Education is not broken" clay card + ticker
 * 7. FAQSectionContainer     — accordion FAQ
 * 8. SharedFooter
 */

import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import svgPaths from "./svg-paths";
import logo from "../assets/logo.webp";
import imgRectangle9 from "../assets/eba887f3bcae20b7a5611026256348307e65c2c4.webp";
import imgImage9 from "../assets/3aab4451afd875f66a83eb26e0ca2d6f58abce98.webp";
import imgImage7 from "../assets/e985b07ea1f916546c05a06ca93558ef62ecc870.webp";
import imgImage13 from "../assets/a440209918fa81a1c528e2e95290d4f1f12546e7.webp";
import { useInterval } from "../app/components/hooks/use-interval";
import HeroSliderHeader from "../app/components/HeroSliderHeader";
import DotMap from "../components/DotMap";
import SharedFooter from "../app/components/SharedFooter";
import SharedNavbar from "../app/components/SharedNavbar";


import HomePolicySection from "../features/home/HomePolicySection";
import EcosystemSection from "../features/home/EcosystemSection";

/* ─────────────────────────────────────────────
   UTILITY COMPONENTS
───────────────────────────────────────────── */

/** Animated counter that counts up when scrolled into view */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  return <span ref={ref} className="text-[var(--color-accent)]">{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   HERO SLIDER BACKGROUND STRIPS
───────────────────────────────────────────── */

function HeroHeaderSection() {
  return (
    <div className="flex flex-col items-start w-full bg-[var(--color-background-primary)]">
      <HeroSliderHeader />
    <div className="w-full px-[16px] sm:px-[24px] md:px-[64px] pt-6 sm:pt-8">
        <HeroFeatureCardsRow />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE CARDS (capability + global + red)
───────────────────────────────────────────── */
const capabilityMessages = [
  {
    title: "Degrees don't guarantee readiness.",
    highlight: "Capability does.",
  },
  {
    title: "The world rewards problem-solvers.",
    highlight: "Not memorisers.",
  },
  {
    title: "Education should create thinkers.",
    highlight: "Not test-takers.",
  },
];

function PurpleCapabilityCardInner() {
  const [current, setCurrent] = useState(0);

  useInterval(() => {
    setCurrent((prev) => (prev + 1) % capabilityMessages.length);
  }, 3500);

  return (
    <div
      className="clay-card flex h-full items-start p-[20px] sm:p-[24px] md:p-[32px] relative w-full overflow-hidden"
      style={{
        background: "var(--color-background-secondary)",
        borderRadius: 20,
        border: "1px solid var(--color-border-light)",
        boxShadow: "var(--shadow-clay)",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: "linear-gradient(180deg, var(--color-accent), rgba(232,133,106,0.2))",
          borderRadius: "0 3px 3px 0",
        }}
      />

      {/* Corner glow */}
      <div
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,133,106,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.21, 0.45, 0.32, 0.9] }}
          className="flex flex-col justify-center h-full relative z-10"
        >
          <p className="text-[20px] sm:text-[24px] md:text-[26px] font-medium leading-[1.35]" style={{ color: "var(--color-text-primary)" }}>
            {capabilityMessages[current].title}

            <span className="block mt-2 sm:mt-3 text-[24px] sm:text-[30px] md:text-[34px] font-extrabold italic" style={{ color: "var(--color-accent)" }}>
              {capabilityMessages[current].highlight}
            </span>
          </p>

          <p className="mt-4 sm:mt-6 md:mt-8 text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6] sm:leading-[1.7]" style={{ color: "var(--color-text-secondary)" }}>
            Ateion is the world&apos;s leading Capability-First Education ecosystem,
            integrating AI literacy, innovation, and measurable readiness into modern schooling.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-7 flex gap-2">
        {capabilityMessages.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              height: 8,
              width: i === current ? 28 : 8,
              backgroundColor: i === current ? "var(--color-accent)" : "var(--color-border-dark)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PurpleCapabilityCardOuter() {
  return <PurpleCapabilityCardInner />;
}

function HeroMetricsRow() {
  return (
    <div className="flex flex-col items-start justify-start relative shrink-0 w-full px-[16px] sm:px-[24px] md:px-0">
      <div className="flex flex-col md:flex-row gap-[16px] sm:gap-[24px] items-stretch relative shrink-0 w-full">
      </div>
    </div>
  );
}

function HeroFeatureCardsRow() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.25 } },
      }}
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
    >
      {/* Section heading */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full flex flex-col items-center gap-3 pt-4 sm:pt-6 lg:pt-12"
      >
        <p
          className="font-bold leading-[1.1] tracking-[-0.04em] text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Reimagining Education
        </p>
        <div className="w-[180px] h-[4px] rounded-full mx-auto" style={{ background: "linear-gradient(90deg, #6B46C1 0%, #F6AD55 100%)" }} />
      </motion.div>

      <div className="w-full mt-4 sm:mt-6">
        <HomePolicySection />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL PRESENCE MAP
───────────────────────────────────────────── */
function GlobalPresenceMapSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center relative bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] pt-6 sm:pt-8 pb-0 overflow-hidden">
      {/* Decorative top accent */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[3px] rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
      />

      <div className="z-10 text-center mb-8 sm:mb-12 px-4 relative">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-[40px] sm:w-[60px] h-[2px] rounded-full" style={{ background: "var(--color-accent)" }} />
          <span
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-body)" }}
          >
            Global Footprint
          </span>
          <div className="w-[40px] sm:w-[60px] h-[2px] rounded-full" style={{ background: "var(--color-accent)" }} />
        </div>
        <h2 className="font-bold text-[var(--color-text-primary)] mb-4 tracking-[-0.03em] leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 52px)" }}>
          Our <span style={{ color: "var(--color-accent)" }}>Global</span> Reach
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-[15px] sm:text-[17px] font-medium leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Connecting capability-based education ecosystems across multiple continents.
        </p>
      </div>

      {/* ── STAT COUNTERS ── */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-4 sm:gap-y-6 mb-8 sm:mb-10 md:mb-14 px-4 w-full max-w-[var(--max-width)]">
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold tracking-[-0.02em] text-[clamp(28px,4vw,40px)]" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            <Counter value={12} suffix="+" />
          </span>
          <span className="text-[13px] sm:text-[14px] font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>Countries</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold tracking-[-0.02em] text-[clamp(28px,4vw,40px)]" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            <Counter value={200} suffix="+" />
          </span>
          <span className="text-[13px] sm:text-[14px] font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>Institutions</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold tracking-[-0.02em] text-[clamp(28px,4vw,40px)]" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            <Counter value={50} suffix="K+" />
          </span>
          <span className="text-[13px] sm:text-[14px] font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>Students</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold tracking-[-0.02em] text-[clamp(28px,4vw,40px)]" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            <Counter value={98} suffix="%" />
          </span>
          <span className="text-[13px] sm:text-[14px] font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>Satisfaction</span>
        </div>
      </div>

      <div className="w-full max-w-[var(--max-width)] relative px-0 aspect-[2/1] sm:aspect-[2.2/1] md:aspect-[2.5/1]">
        <DotMap />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EDUCATION STATUS GRID
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   EDUCATION STATUS WRAPPER — clay card with ticker
───────────────────────────────────────────── */

const cardAccents = [
  "#E8856A",
  "#C8C5DC",
  "#E8856A",
  "#C8C5DC",
  "#E8856A",
  "#C8C5DC",
];

const gridItems = [
  {
    title: "Degrees Are Rising. Job Readiness Isn't.",
    source: "World Economic Forum",
    link: "https://www.weforum.org/reports/the-future-of-jobs-report-2023/"
  },
  {
    title: "High Scores. Low Thinking.",
    source: "Harvard Graduate School of Education",
    link: "https://www.gse.harvard.edu/ideas/usable-knowledge/18/07/why-we-need-rethink-learning"
  },
  {
    title: "Education Moves in Years. The World Moves in Weeks.",
    source: "McKinsey & Company",
    link: "https://www.mckinsey.com/industries/education/our-insights/how-technology-is-shaping-learning"
  },
  {
    title: "Students Are Being Trained for a World That No Longer Exists.",
    source: "Stanford AI Index",
    link: "https://aiindex.stanford.edu/report/"
  },
  {
    title: "The World Is Moving Beyond Marks. Most Schools Aren't.",
    source: "OECD (PISA & Education Trends)",
    link: "https://www.oecd.org/education/global-competence/"
  },
  {
    title: "What If Exams Measured Thinking Instead of Memory?",
    source: "OECD Future of Education & Skills 2030",
    link: "https://www.oecd.org/education/2030-project/"
  }
];

const tickerWords = ["Inefficient", "Outdated", "Deprecated", "Stagnant"];
const TICKER_REPEAT = 3;
const WORD_H = 70;
const VISIBLE = 3;
const tickerItems = Array.from({ length: TICKER_REPEAT }, () => tickerWords).flat();

function VerticalTicker() {
  const [idx, setIdx] = useState(0);

  useInterval(() => setIdx((prev) => (prev + 1) % tickerWords.length), 2000);

  const activePos = tickerWords.length + idx;
  const offsetY = activePos * WORD_H;
  const centerOffset = ((VISIBLE - 1) * WORD_H) / 2;

  return (
    <div
      style={{
        height: VISIBLE * WORD_H,
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <motion.div
        animate={{ y: -(offsetY - centerOffset) }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {tickerItems.map((word, i) => {
          const dist = Math.abs(i - activePos);
          const isActive = dist === 0;
          const isAdjacent = dist === 1;
          const fontSize = isActive
            ? "clamp(32px, 4vw, 52px)"
            : "clamp(24px, 3vw, 38px)";
          const opacity = isActive ? 1 : isAdjacent ? 0.35 : 0;
          const scale = isActive ? 1 : 0.88;

          return (
            <p
              key={`${word}-${i}`}
              style={{
                height: WORD_H,
                display: "flex",
                alignItems: "center",
                fontSize,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
                margin: 0,
                padding: 0,
                transformOrigin: "left center",
                opacity,
                transform: `scale(${scale})`,
                color: isActive
                  ? "var(--color-text-primary)"
                  : "var(--color-text-muted)",
                transition: "color 0.4s ease, opacity 0.4s ease",
              }}
            >
              {word}
            </p>
          );
        })}
      </motion.div>
    </div>
  );
}

export function EducationStatusWrapper() {
  return (
    <div className="w-full px-[16px] sm:px-[24px] md:px-[64px] pt-6 sm:pt-8">
      {/* ─── MAIN CLAY CARD ─── */}
      <div
        style={{
          padding: "28px 20px",
          background: "var(--color-background-secondary)",
          borderRadius: 20,
          border: "1px solid var(--color-border-light)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)",
          position: "relative",
          overflow: "hidden",
        }}
        className="clay-card content-stretch flex flex-col items-center justify-center w-full transition-shadow duration-300 sm:p-[32px_28px_32px_28px] md:p-[40px_32px_40px_32px]"
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,133,106,0.08), 0 2px 8px rgba(0,0,0,0.04)"}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)"}
      >
        {/* Coral accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            background: "linear-gradient(180deg, var(--color-accent), rgba(232,133,106,0.3))",
            borderRadius: "0 3px 3px 0",
          }}
        />

        {/* Subtle corner glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,133,106,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="content-stretch flex flex-col gap-[24px] sm:gap-[28px] items-start relative shrink-0 w-full"
          style={{ maxWidth: 800 }}
        >
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center justify-between relative shrink-0 w-full gap-[24px]">
            <div className="relative shrink-0" style={{ width: "50%" }}>
              <p
                className="font-bold relative leading-[1.15] not-italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(30px, 4vw, 44px)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                }}
              >
                Education is<br />
                Not broken.<br />
                Its measurement<br />
                System is <span style={{ color: "var(--color-accent)" }}>:</span>
              </p>
            </div>
            <div className="flex justify-end xl:justify-start" style={{ width: "45%" }}>
              <VerticalTicker />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden flex flex-col gap-[16px] items-start w-full">
            <p
              className="font-bold relative leading-[1.25] not-italic"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 5vw, 36px)",
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
              }}
            >
              Education is<br />
              Not broken.<br />
              Its measurement<br />
              System is <span style={{ color: "var(--color-accent)" }}>:</span>
            </p>
            <div className="w-full flex justify-start">
              <VerticalTicker />
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="w-full mt-[8px] sm:mt-[16px] pt-[16px] sm:pt-[20px]" style={{ borderTop: "1px solid var(--color-border-light)" }}>
            <p
              className="leading-[1.4] relative shrink-0 w-full flex-1"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
              }}
            >
              <span className="text-[16px] sm:text-[20px] md:text-[22px] font-medium">
                Ateion replaces memory-based validation with{" "}
              </span>
              <br className="hidden sm:block" />
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 4vw, 42px)",
                  color: "var(--color-accent)",
                }}
              >
                Capability-based intelligence.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ─── ONE-LINER + DESCRIPTION ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-[32px] sm:mt-[48px] gap-[20px] sm:gap-[64px] pb-[24px] sm:pb-[32px]">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-1 h-12 rounded-full shrink-0 mt-1" style={{ backgroundColor: "var(--color-accent)" }} />
            <p className="font-bold leading-[0.95] tracking-[-0.04em] text-[clamp(28px,5vw,48px)]" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              Education is not broken.
            </p>
          </div>
          <p className="leading-relaxed text-[15px] sm:text-[17px] text-[var(--color-text-muted)] flex-1" style={{ fontFamily: "var(--font-body)" }}>
            <span>{`Its measurement system is `}</span>
            <span className="font-bold" style={{ color: "var(--color-accent)" }}>outdated.</span>
            <span>{` Ateion replaces memory-based validation with `}</span>
            <span className="font-bold italic" style={{ color: "var(--color-accent)" }}>capability-based intelligence.</span>
          </p>
        </div>
      </motion.div>

      {/* ─── QUOTE CARDS ─── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[24px] w-full mt-[32px] sm:mt-[48px]"
      >
        {gridItems.map((item, i) => (
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="clay-card min-h-[200px] sm:min-h-[240px] md:min-h-[260px] p-[28px] sm:p-[32px] flex flex-col justify-between group"
            style={{ background: "var(--color-background-secondary)", position: "relative", overflow: "hidden" }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "var(--color-accent)" }}
            />
            <div>
              <span className="text-[28px] sm:text-[32px] leading-[0] align-top mr-1" style={{ color: cardAccents[i] }}>&ldquo;</span>
              <p className="inline text-[20px] sm:text-[22px] md:text-[26px] font-medium text-[var(--color-text-primary)] leading-[1.15] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                {item.title}
              </p>
              <span className="text-[28px] sm:text-[32px] leading-[0] align-bottom ml-1" style={{ color: cardAccents[i] }}>&rdquo;</span>
            </div>
            <div className="mt-[20px] sm:mt-[24px] pt-[16px] sm:pt-[20px]" style={{ borderTop: "1px solid var(--color-border-light)" }}>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: cardAccents[i], fontFamily: "var(--font-body)" }}>
                Source
              </span>
              <p className="text-[13px] sm:text-[14px] font-semibold mt-1.5" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}>
                {item.source}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────── */

const faqData = [
  {
    question: "What is Ateion?",
    answer: "Ateion is a pioneering education technology ecosystem dedicated to bridging the gap between traditional rote learning and real-world capability. We focus on AI literacy, innovation, and skills development."
  },
  {
    question: "How is Ateion different from traditional education systems?",
    answer: "Unlike traditional systems that often prioritize memorization and standardized testing, Ateion emphasizes 'Capability-First' education. We integrate advanced AI tools and project-based learning."
  },
  {
    question: "Who can partner with Ateion?",
    answer: "We partner with forward-thinking K-12 schools, universities, educational institutions, and corporate organizations globally. If you are committed to future-proofing education, get in touch."
  },
  {
    question: "What is the Global Capability Olympiad (GCO)?",
    answer: "The GCO is our flagship global competition that evaluates students based on their real-world problem-solving abilities and AI proficiency rather than academic recall. It serves as a true benchmark."
  },
  {
    question: "How are capabilities measured?",
    answer: "Capabilities are measured through our proprietary assessment framework that tracks innovation, problem-solving, digital literacy, and collaborative skills. We use real-time data metrics."
  },
  {
    question: "How can institutions get connected?",
    answer: "Institutions can get connected by visiting our 'Get Connected' section or reaching out via email at destiny@ateion.com. Our team will guide you through the entire partnership process."
  },
];

function FAQItem({ question, answer, isOpen, toggle }: { question: string; answer: string; isOpen: boolean; toggle: () => void }) {
  const answerId = `faq-answer-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;
  const buttonId = `faq-button-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-[20px] mb-[12px]"
      style={{
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border-light)",
        boxShadow: isOpen ? "0 4px 20px rgba(232,133,106,0.1)" : "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      {/* Accent left bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-r-full"
        animate={{
          background: isOpen ? "var(--color-accent)" : "var(--color-border-light)",
        }}
        transition={{ duration: 0.3 }}
      />

      <button
        type="button"
        id={buttonId}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="w-full content-stretch flex items-center justify-between px-[20px] sm:px-[32px] py-[20px] sm:py-[28px] relative text-left group"
      >
        <span className="flex-[1_0_0] font-semibold leading-[1.35] max-w-[700px] not-italic relative text-[var(--color-text-primary)] text-[17px] sm:text-[19px] md:text-[21px] transition-colors duration-200">
          {question}
        </span>
        <motion.div
          className="flex items-center justify-center p-[6px] sm:p-[8px] rounded-full shrink-0"
          animate={{
            rotate: isOpen ? 90 : 0,
            background: isOpen ? "var(--color-accent)" : "var(--color-background-tertiary)",
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <ChevronRight size={20} className={isOpen ? "text-white" : "text-[var(--color-text-primary)]"} strokeWidth={1.7} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-[20px] sm:px-[32px] pb-[20px] sm:pb-[32px] pt-[8px]">
              <p className="leading-relaxed text-[15px] sm:text-[16px] text-[var(--color-text-muted)] max-w-[750px]" style={{ fontFamily: "var(--font-alt)" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="flex flex-col items-center w-full px-[16px] sm:px-[24px] md:px-[64px] pt-6 sm:pt-8"
    >
      <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full max-w-[1044px]">
        {/* Title */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-bold leading-[0.95] tracking-[-0.05em] text-[28px] sm:text-[36px] md:text-[44px] text-[var(--color-text-primary)] text-center" style={{ fontFamily: "var(--font-display)" }}>
            Your Common Questions Answered
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-[40px] sm:w-[60px] h-[3px] rounded-full" style={{ background: "var(--color-accent)" }} />
            <div className="w-[8px] h-[8px] rounded-full" style={{ background: "var(--color-primary_light)" }} />
            <div className="w-[40px] sm:w-[60px] h-[3px] rounded-full" style={{ background: "var(--color-accent)" }} />
          </div>
        </motion.div>
        {/* Accordion */}
        <div className="content-stretch flex flex-col items-stretch relative shrink-0 w-full max-w-[900px]">
          {faqData.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <FAQItem question={item.question} answer={item.answer} isOpen={openStates[i]} toggle={() => toggle(i)} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ROOT PAGE COMPONENT
───────────────────────────────────────────── */

export default function Homepage() {
  return (
    <div className="ateion-metallic-bg w-full min-h-screen flex flex-col" data-name="Homepage">
      <Helmet>
        <title>Ateion — Reimagining Education with Capability-Based Learning</title>
        <meta name="description" content="Ateion is a capability-based education ecosystem that replaces memory-based assessment with real-world measurable skills." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ateion",
              "url": "https://ateion.com",
              "logo": "https://ateion.com/og-image.png",
              "description": "A capability-based education ecosystem replacing memory-based assessment with real-world measurable skills."
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Global Capability Olympiad",
              "description": "The world's first preparation-free, AI-integrated master olympiad.",
              "provider": {
                "@type": "Organization",
                "name": "Ateion",
                "sameAs": "https://ateion.com"
              }
            }
          `}
        </script>
      </Helmet>

      {/* 1 & 2. Unified Hero Branding + Capability Cards */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <HeroHeaderSection />
      </motion.section>

      {/* 4. Ateion ecosystem */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <EcosystemSection />
      </motion.section>

      {/* 5. Global Presence Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GlobalPresenceMapSection />
      </motion.section>

      {/* 6. Education is not broken — clay card + ticker */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}
      >
        <EducationStatusWrapper />
      </motion.section>

      {/* 7. FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 500px" }}
      >
        <FAQSectionContainer />
      </motion.section>

      {/* 8. Footer */}
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "auto 400px" }}>
        <SharedFooter />
      </div>
    </div>
  );
}
