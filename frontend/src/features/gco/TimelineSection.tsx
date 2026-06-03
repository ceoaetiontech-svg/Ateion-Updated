import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, FileText, Lightbulb, FileCheck } from "lucide-react";
import "../../styles/gco/TimelineSection.css";

interface TimelineStep {
  number: number;
  icon: React.ReactNode;
  text: string;
  side: "left" | "right";
}

const timelineSteps: TimelineStep[] = [
  {
    number: 1,
    icon: <BookOpen className="timeline-icon-svg" />,
    text: "Students face unfamiliar real-world scenarios.",
    side: "right",
  },
  {
    number: 2,
    icon: <FileText className="timeline-icon-svg" />,
    text: "There is no syllabus to prepare from.",
    side: "left",
  },
  {
    number: 3,
    icon: <Lightbulb className="timeline-icon-svg" />,
    text: "AI evaluates reasoning pathways — not memory.",
    side: "right",
  },
  {
    number: 4,
    icon: <FileCheck className="timeline-icon-svg" />,
    text: "Students receive a Strategic Capability Report.",
    side: "left",
  },
];

function TimelineStepComponent({
  step,
  index,
  isLast,
}: {
  step: TimelineStep;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      <div className="timeline-step timeline-step-desktop" style={{ marginBottom: isLast ? 0 : undefined }}>
        <motion.div
          className={`timeline-content-side timeline-left ${step.side === "left" ? "text-side" : "icon-side"}`}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {step.side === "left" ? (
            <div className="timeline-text-card">
              <p className="timeline-text text-right">{step.text}</p>
            </div>
          ) : (
            <motion.div
              className="timeline-icon-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: -6 }}
            >
              {step.icon}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="timeline-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.6, delay: 0 }}
          whileHover={{ scale: 1.15 }}
        >
          <span className="timeline-number">{step.number}</span>
        </motion.div>

        <motion.div
          className={`timeline-content-side timeline-right ${step.side === "right" ? "text-side" : "icon-side"}`}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {step.side === "right" ? (
            <div className="timeline-text-card">
              <p className="timeline-text text-left">{step.text}</p>
            </div>
          ) : (
            <motion.div
              className="timeline-icon-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 6 }}
            >
              {step.icon}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="timeline-step-mobile"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        style={{ marginBottom: isLast ? 0 : undefined }}
      >
        <div className="timeline-circle timeline-circle-mobile">
          <span className="timeline-number">{step.number}</span>
        </div>
        <div className="timeline-mobile-card">
          <div className="timeline-icon-container timeline-icon-container-mobile">
            {step.icon}
          </div>
          <p className="timeline-text timeline-text-mobile">{step.text}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      requestAnimationFrame(() => {
        if (lineRef.current) {
          const element = lineRef.current;
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;

          const scrollProgress = Math.max(
            0,
            Math.min(1, (windowHeight * 0.8 - elementTop) / elementHeight),
          );
          setLineHeight(scrollProgress * 100);
        }
        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-header-wrapper">
          <motion.div
            className="timeline-title-bar timeline-title-bar-top"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.h1
            className="timeline-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How GCO Works?
          </motion.h1>
          <motion.div
            className="timeline-title-bar timeline-title-bar-bottom"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          />
        </div>

        <div className="timeline-relative">
          <div
            ref={lineRef}
            className="timeline-line-bg"
            style={{
              height: `${(timelineSteps.length - 1) * (isMobile ? 164 : 200)}px`,
            }}
          />

          <motion.div
            className="timeline-line-fill"
            style={{
              height: `${(timelineSteps.length - 1) * (isMobile ? 164 : 200)}px`,
              scaleY: lineHeight / 100,
              transformOrigin: "top",
              backgroundColor: "var(--color-accent)",
            }}
          />

          <div className="timeline-steps-wrapper">
            {timelineSteps.map((step, index) => (
              <TimelineStepComponent key={index} step={step} index={index} isLast={index === timelineSteps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
