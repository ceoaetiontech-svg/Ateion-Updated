/**
 * Homepage.tsx — Ateion Landing Page
 *
 * Sections (top to bottom):
 *  1. HeroHeaderSection       — full-bleed image slider + headline
 *  2. HeroFeatureCardsRow     — capability card + global-aligned card + red card
 *  3. EducationStatusWrapper  — "Education is not broken" clay card + ticker
 *  4. GlobalPresenceMapSection — stats counters + dot-map
 *  5. HomePolicySection       — global policy alignment cards
 *  6. EcosystemSection        — "Ateion as an Ecosystem" (redesigned)
 *  7. FAQSectionContainer     — accordion FAQ
 *  8. SharedFooter
 */

import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import svgPaths from "./svg-paths";
import logo from "../assets/logo.png";
import imgRectangle9 from "../assets/e54e08242e5e8cea29c382ba6bc82218d425f28e.png";
import imgImage9 from "../assets/3aab4451afd875f66a83eb26e0ca2d6f58abce98.png";
import imgImage7 from "../assets/e985b07ea1f916546c05a06ca93558ef62ecc870.png";
import imgImage13 from "../assets/a440209918fa81a1c528e2e95290d4f1f12546e7.png";
import HeroSliderHeader from "../app/components/HeroSliderHeader";
import DotMap from "../components/DotMap";
import SharedFooter from "../app/components/SharedFooter";
import SharedNavbar from "../app/components/SharedNavbar";

import EcosystemSection from "../features/home/EcosystemSection";
import HomePolicySection from "../features/home/HomePolicySection";

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
      <div className="w-full px-[16px] sm:px-[24px] md:px-[64px]">
        <HeroFeatureCardsRow />
      </div>
    </div>
  );
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
   FEATURE CARDS (capability + global + red)
───────────────────────────────────────────── */
const capabilityMessages = [
  {
    title: "Because marks measure memory.",
    highlight: "Capability measures the future.",
  },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % capabilityMessages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clay-card bg-[var(--color-background-secondary)] flex h-[420px] items-start p-[32px] relative w-full overflow-hidden rounded-[24px] shadow-lg">

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center h-full max-w-[800px]"
        >
          <p className="text-[26px] font-medium leading-[1.3] text-[var(--color-text-primary)]">
            {capabilityMessages[current].title}

            <span className="block mt-3 text-[34px] font-extrabold italic text-[var(--color-primary)]">
              {capabilityMessages[current].highlight}
            </span>
          </p>

          <p className="mt-8 text-[18px] leading-[1.7] text-[var(--color-text-secondary)]">
            Ateion is the world's leading Capability-First Education ecosystem,
            integrating AI literacy, innovation, and measurable readiness into modern schooling.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      <div className="absolute bottom-6 left-6 flex gap-2">
        {capabilityMessages.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-[var(--color-accent)]" : "w-2 bg-[var(--color-border-dark)]"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
function PurpleCapabilityCardOuter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const handleFirstClick = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-10">

      {/* ── CAPABILITY CARD (CENTER) ── */}
      <div className="w-full flex justify-center px-[16px] sm:px-[24px] md:px-0">
        <div className="w-full">
          <PurpleCapabilityCardInner />
        </div>
      </div>

      {/* ── VIDEO (BELOW CARD) ── */}
      <div className="w-full flex justify-center px-[16px] sm:px-[24px] md:px-0">
        <div className="w-full h-[550px] rounded-[24px] overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            controls
            playsInline
            className="w-full h-full object-cover"
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = 1.5;
            }}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </div>
  );
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
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <PurpleCapabilityCardOuter />
      <HeroMetricsRow />
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL PRESENCE MAP
───────────────────────────────────────────── */
function GlobalPresenceMapSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center relative bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] pt-10 sm:pt-14 pb-0 overflow-hidden rounded-[32px] mx-[16px] sm:mx-[24px] md:mx-[64px] max-w-[calc(100%-32px)] md:max-w-[calc(100%-128px)] mx-auto my-12 shadow-sm">
      <div className="z-10 text-center mb-8 sm:mb-12 px-4 relative">
        <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[var(--color-text-primary)] mb-4 tracking-[-0.03em] leading-[1.1]" style={{ fontFamily: "var(--font-display)" }}>
          Our Global Reach
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg font-medium">
          Connecting capability-based education ecosystems across multiple continents.
        </p>
      </div>
      <div className="w-full max-w-[1400px] relative px-0 aspect-[2/1] sm:aspect-[2.2/1] md:aspect-[2.5/1]">
        <DotMap />
      </div>
    </div>
  );
}/* ─────────────────────────────────────────────
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

  useEffect(() => {
    const timer = setInterval(() => setIdx((prev) => (prev + 1) % tickerWords.length), 2000);
    return () => clearInterval(timer);
  }, []);

  // The active word lives at position `tickerWords.length + idx` so it sits in the middle of the visible window
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
    <div className="w-full px-[16px] sm:px-[24px] md:px-[64px]">
      <div
        style={{
          padding: "32px 16px 32px 24px",
          background: "#FFD9C9",
          borderRadius: 13,
          border: "1.5px solid rgba(255,255,255,0.45)",
        }}
        className="clay-card content-stretch flex flex-col items-center justify-center w-full dark:!bg-[#1E293B]"
      >
        <div
          className="content-stretch flex flex-col gap-[24px] sm:gap-[32px] items-start relative shrink-0 w-full"
          style={{ maxWidth: 800 }}
        >
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center justify-between relative shrink-0 w-full gap-[24px]">
            <div className="relative shrink-0" style={{ width: "50%" }}>
              <p
                className="font-bold relative leading-[1.15] not-italic text-[28px] lg:text-[36px] xl:text-[42px]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.01em",
                  color: "var(--color-text-primary)",
                }}
              >
                Education is<br />
                Not broken.<br />
                Its measurement<br />
                System is :
              </p>
            </div>
            <div
              className="flex justify-end xl:justify-start"
              style={{ width: "45%" }}
            >
              <VerticalTicker />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden flex flex-col gap-[16px] items-start w-full">
            <p
              className="font-bold relative leading-[1.25] not-italic text-[28px] sm:text-[32px] md:text-[36px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.01em",
                color: "var(--color-text-primary)",
              }}
            >
              Education is<br />
              Not broken.<br />
              Its measurement<br />
              System is :
            </p>
            <div className="w-full flex justify-start">
              <VerticalTicker />
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="w-full mt-[4px] sm:mt-[12px]">
            <p
              className="h-auto leading-[1.3] not-italic relative shrink-0 w-full flex-1"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
              }}
            >
              <span className="text-[18px] sm:text-[22px] md:text-[24px]">
                Ateion replaces memory-based validation with{" "}
              </span>
              <br className="hidden sm:block" />
              <span
                className="italic text-[28px] sm:text-[36px] md:text-[42px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                }}
              >
                Capability-based intelligence.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Education is not broken — one-liner + description */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-[32px] sm:mt-[48px] gap-[24px] sm:gap-[64px] pb-[24px] sm:pb-[32px]">
          <p className="font-bold leading-[0.95] tracking-[-0.05em] text-[28px] sm:text-[36px] md:text-[48px] flex-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            Education is not broken.
          </p>
          <p className="leading-relaxed text-[16px] sm:text-[18px] text-[var(--color-text-muted)] flex-1" style={{ fontFamily: "var(--font-body)" }}>
            <span>{`Its measurement system is `}</span>
            <span className="font-bold">outdated.</span>
            <span>{` Ateion replaces memory-based validation with `}</span>
            <span className="font-bold italic">capability-based intelligence.</span>
          </p>
        </div>
      </FadeIn>

      {/* Quote cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[24px] w-full mt-[32px] sm:mt-[48px]">
        {gridItems.map((item, i) => (
          <motion.a
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="clay-card min-h-[200px] sm:min-h-[240px] md:min-h-[260px] p-[28px] sm:p-[32px] flex flex-col justify-between group"
            style={{ background: i % 2 === 0 ? "var(--color-background-secondary)" : "rgba(200,197,220,0.15)" }}
          >
            <div>
              <span className="text-[28px] sm:text-[32px] leading-[0] align-top mr-1" style={{ color: cardAccents[i] }}>&ldquo;</span>
              <p className="inline text-[20px] sm:text-[24px] md:text-[28px] font-medium text-[var(--color-text-primary)] leading-[1.1] group-hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                {item.title}
              </p>
              <span className="text-[28px] sm:text-[32px] leading-[0] align-bottom ml-1" style={{ color: cardAccents[i] }}>&rdquo;</span>
            </div>
            <div className="mt-[20px] sm:mt-[24px] flex flex-col gap-[6px]">
              <span className="text-[11px] sm:text-[12px] font-bold opacity-40 uppercase tracking-[0.12em]" style={{ color: cardAccents[i], fontFamily: "var(--font-body)" }}>
                Source
              </span>
              <span className="text-[14px] sm:text-[15px] font-semibold text-[var(--color-text-primary)] opacity-80" style={{ fontFamily: "var(--font-body)" }}>
                {item.source}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
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
        <span className="flex-[1_0_0] font-semibold leading-[1.35] max-w-[700px] not-italic relative text-[var(--color-text-primary)] text-[17px] sm:text-[19px] md:text-[21px] transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: "var(--font-alt)" }}>
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
    <div className="flex flex-col items-center w-full px-[16px] sm:px-[24px] md:px-[64px]">
      <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full max-w-[1044px]">
        {/* Title */}
        <p className="font-bold leading-[0.95] tracking-[-0.05em] text-[28px] sm:text-[36px] md:text-[44px] text-[var(--color-text-primary)] text-center" style={{ fontFamily: "var(--font-display)" }}>
          Your Common Questions Answered
        </p>
        <div className="flex items-center gap-3">
          <div className="w-[40px] sm:w-[60px] h-[3px] rounded-full" style={{ background: "var(--color-accent)" }} />
          <div className="w-[8px] h-[8px] rounded-full" style={{ background: "var(--color-primary_light)" }} />
          <div className="w-[40px] sm:w-[60px] h-[3px] rounded-full" style={{ background: "var(--color-accent)" }} />
        </div>
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
    <div className="bg-[var(--color-background-primary)] w-full min-h-screen overflow-x-hidden flex flex-col gap-[40px] sm:gap-[60px] md:gap-[80px]" data-name="Homepage">
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
      <section>
        <HeroHeaderSection />
      </section>

      {/* 3. Education is not broken — clay card + ticker */}
      <section>
        <EducationStatusWrapper />
      </section>

      {/* 4. Global Presence Map */}
      <section>
        <GlobalPresenceMapSection />
      </section>

      {/* 5. Global Policy Alignment */}
      <section>
        <HomePolicySection />
      </section>

      {/* 6. Ecosystem — redesigned */}
      <section>
        <EcosystemSection />
      </section>

      {/* 7. FAQ */}
      <section>
        <FAQSectionContainer />
      </section>

      {/* 7. Footer */}
      <SharedFooter />
    </div>
  );
}
