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
import RedIntelligenceCard from "./home/RedIntelligenceCard";
import EcosystemSection from "./home/EcosystemSection";
import HomePolicySection from "./home/HomePolicySection";

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




function HeroTextBlock() {
  return (
    <div className="w-full flex flex-col items-start justify-center px-[16px] pt-0 sm:px-[24px] md:px-[64px] gap-[16px] sm:gap-[20px] min-h-[25vh] md:min-h-[30vh] z-[100]">
      <p
        className="leading-[0.96] not-italic text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] text-[var(--color-text-primary)] font-bold"
        style={{ fontFamily: "'OV Soge', sans-serif" }}
      >
        Reimagining Education
      </p>

    </div>
  );
}

function HeroHeaderSection() {
  return (
    <div className="flex flex-col items-start w-full bg-[var(--color-background-primary)]">
      <HeroSliderHeader>
        <div className="flex flex-col gap-[40px] md:gap-[60px] w-full items-start">
          <HeroTextBlock />
          <div className="w-full px-[16px] sm:px-[24px] md:px-[64px]">
            <HeroFeatureCardsRow />
          </div>
        </div>
      </HeroSliderHeader>
    </div>
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
    <div className="clay-card bg-white border border-blue-100 flex h-[420px] items-start p-[32px] relative w-full overflow-hidden rounded-[24px] shadow-lg">

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center h-full"
        >
          <p className="text-[26px] font-medium leading-[1.3] text-black">
            {capabilityMessages[current].title}

            <span className="block mt-3 text-[34px] font-extrabold italic text-blue-500">
              {capabilityMessages[current].highlight}
            </span>
          </p>

          <p className="mt-8 text-[18px] leading-[1.7] text-black/80">
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
              i === current ? "w-8 bg-blue-500" : "w-2 bg-gray-300"
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
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[650px]">
          <PurpleCapabilityCardInner />
        </div>
      </div>

      {/* ── VIDEO (BELOW CARD) ── */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px] h-[550px] rounded-[24px] overflow-hidden shadow-xl">
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



/* ─────────────────────────────────────────────
   EDUCATION STATUS GRID
───────────────────────────────────────────── */

const gridItems = [
  {
    title: "“Degrees Are Rising. Job Readiness Isn’t.”",
    source: "World Economic Forum",
    link: "https://www.weforum.org/reports/the-future-of-jobs-report-2023/"
  },
  {
    title: "“High Scores. Low Thinking.”",
    source: "Harvard Graduate School of Education",
    link: "https://www.gse.harvard.edu/ideas/usable-knowledge/18/07/why-we-need-rethink-learning"
  },
  {
    title: "“Education Moves in Years. The World Moves in Weeks.”",
    source: "McKinsey & Company",
    link: "https://www.mckinsey.com/industries/education/our-insights/how-technology-is-shaping-learning"
  },
  {
    title: "“Students Are Being Trained for a World That No Longer Exists.”",
    source: "Stanford AI Index",
    link: "https://aiindex.stanford.edu/report/"
  },
  {
    title: "“The World Is Moving Beyond Marks. Most Schools Aren’t.”",
    source: "OECD (PISA & Education Trends)",
    link: "https://www.oecd.org/education/global-competence/"
  },
  {
    title: "“What If Exams Measured Thinking Instead of Memory?”",
    source: "OECD Future of Education & Skills 2030",
    link: "https://www.oecd.org/education/2030-project/"
  }
];

function EducationStatusWrapper() {
  return (
    <div className="w-full px-[16px] sm:px-[24px] md:px-[64px]">
      <FadeIn>
        <div className="flex flex-col gap-[16px] sm:gap-[24px] items-start w-full">
          {/* Header row */}
          <div className="content-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between not-italic relative shrink-0 text-[var(--color-text-primary)] w-full py-[24px] sm:py-[48px] gap-[24px] sm:gap-[64px]">
            <p className="font-bold leading-tight relative shrink-0 text-[28px] sm:text-[36px] md:text-[48px] flex-1" style={{ fontFamily: "'OV Soge', sans-serif" }}>
              Education is not broken.
            </p>
            <p className="font-['Inter',sans-serif] leading-relaxed relative shrink-0 text-[16px] sm:text-[18px] text-[var(--color-text-muted)] flex-1">
              <span>{`Its measurement system is `}</span>
              <span className="font-bold">outdated.</span>
              <span>{` Ateion replaces memory-based validation with `}</span>
              <span className="font-bold italic">capability-based intelligence.</span>
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[24px] w-full">
            {gridItems.map((item, i) => (
              <motion.a
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className="clay-card hover:shadow-[var(--shadow-clay-hover)] transition-all duration-300 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] p-[28px] sm:p-[32px] flex flex-col justify-between group"
              >
                <p className="text-[22px] sm:text-[26px] md:text-[30px] font-medium text-[var(--color-text-primary)] leading-[1.05] group-hover:text-[var(--color-primary-hover)] transition-colors" style={{ fontFamily: "'OV Soge', sans-serif", letterSpacing: "-0.01em" }}>
                  {item.title}
                </p>
                <div className="mt-[20px] sm:mt-[24px] flex flex-col gap-[6px]">
                  <span className="text-[12px] sm:text-[13px] font-bold text-[var(--color-text-primary)] opacity-50 uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Source
                  </span>
                  <span className="text-[15px] sm:text-[16px] font-semibold text-[var(--color-text-primary)] opacity-80" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {item.source}
                  </span>
                </div>
              </motion.a>
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
  const answerId = `faq-answer-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;
  const buttonId = `faq-button-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="clay-faq mb-[12px] relative overflow-hidden">
      <button
        type="button"
        id={buttonId}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="w-full content-stretch flex items-center justify-between px-[20px] sm:px-[32px] py-[20px] sm:py-[28px] relative text-left group"
      >
        <span className="flex-[1_0_0] font-semibold leading-[1.35] max-w-[700px] not-italic relative text-[var(--color-text-primary)] text-[18px] sm:text-[20px] md:text-[22px] transition-colors group-hover:text-[var(--color-primary)]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
          {question}
        </span>
        <div className={`bg-[var(--color-background-tertiary)] content-stretch flex items-center p-[6px] sm:p-[8px] relative rounded-[100px] shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`} aria-hidden="true">
          <ChevronRight size={20} className="text-[var(--color-text-primary)]" strokeWidth={1.7} />
        </div>
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
              <p className="leading-relaxed text-[15px] sm:text-[16px] text-[var(--color-text-muted)] max-w-[750px]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
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
        <p className="leading-[1.19] not-italic text-[24px] sm:text-[28px] md:text-[32px] text-[var(--color-text-primary)] text-center" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
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
    <div className="bg-[var(--color-background-primary)] w-full min-h-screen overflow-x-hidden flex flex-col gap-[80px] sm:gap-[100px] md:gap-[120px]" data-name="Homepage">

      {/* 1 & 2. Unified Hero Branding + Capability Cards */}
      <section>
        <HeroHeaderSection />
      </section>

     
      {/* 4. Education is not broken */}
      <section>
        <EducationStatusWrapper />
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
