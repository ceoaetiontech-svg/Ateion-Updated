import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Scale, Network, ArrowLeftRight, Compass } from "lucide-react";

export default function GCOQuestionSection() {
  const navigate = useNavigate();

  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    let ticking = false;
    const handleResize = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth <= 768;
  const isSmallMobile = viewportWidth <= 480;

  const cards = [
    {
      icon: <Scale size={46} strokeWidth={1.5} className="text-[var(--color-accent)] mb-[15px]" />,
      title: "Ethical reasoning",
      description: "Assessing moral implications, fairness, and potential biases in proposed technical solutions.",
    },
    {
      icon: <Network size={46} strokeWidth={1.5} className="text-[var(--color-accent)] mb-[15px]" />,
      title: "Systems thinking",
      description: "Understanding how different parts of a complex system interact and influence each other.",
    },
    {
      icon: <ArrowLeftRight size={46} strokeWidth={1.5} className="text-[var(--color-accent)] mb-[15px]" />,
      title: "Trade-off awareness",
      description: "Balancing competing priorities and acknowledging necessary compromises in strategy.",
    },
    {
      icon: <Compass size={46} strokeWidth={1.5} className="text-[var(--color-accent)] mb-[15px]" />,
      title: "Adaptive judgment",
      description: "Making informed decisions and adjusting strategies as new information becomes available.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--color-background-primary)",
        padding: isMobile ? "60px 20px" : "80px 5%",
        fontFamily: "var(--font-body)",
        color: "var(--color-text-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1350,
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 48 : 80,
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── LEFT SIDE ── */}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: isMobile ? "100%" : 500,
            textAlign: isMobile ? "center" : "left",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              margin: isMobile ? "0 0 16px 0" : "0 0 10px 0",
              color: "var(--color-text-primary)",
            }}
          >
            Experience a
            <br />
            GCO Question
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
          >
            <div style={{ width: 40, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
            <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-primary_light)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              padding: "24px 28px",
              background: "var(--color-background-secondary)",
              borderRadius: 20,
              borderLeft: "4px solid var(--color-accent)",
              border: "1.5px solid var(--color-border-light)",
              borderLeftWidth: 4,
              borderLeftColor: "var(--color-accent)",
              marginBottom: 28,
              width: "100%",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              &ldquo;A city plans to use AI-powered surveillance for crime prevention.
              What ethical, social, and technical factors should be considered
              before implementation?&rdquo;
            </p>
          </motion.div>

          <motion.button
            type="button"
            aria-label="Start the GCO capability assessment"
            onClick={() => navigate("/assessment-demo")}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="clay-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "var(--color-accent)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.2)",
              padding: isSmallMobile ? "14px 22px" : isMobile ? "15px 28px" : "16px 36px",
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              width: isSmallMobile ? "100%" : "auto",
              maxWidth: isSmallMobile ? 320 : "none",
              borderRadius: 100,
              boxShadow: "0 0 0 rgba(232,133,106,0)",
              transform: "scale(1)",
              transition: "transform 0.25s ease, box-shadow 0.4s ease, gap 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,133,106,0.35)";
              e.currentTarget.style.gap = "14px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(232,133,106,0)";
              e.currentTarget.style.gap = "10px";
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
          >
            <span>Start Assessment</span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{
                display: "inline-block",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(3px, -3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* ── RIGHT SIDE ── */}
        <div
          style={{
            flex: "1 1 600px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? 20 : 32,
            maxWidth: isMobile ? "100%" : 800,
            width: "100%",
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="clay-card"
              whileHover={{ y: -6 }}
              style={{
                background: "var(--color-background-secondary)",
                borderRadius: 20,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1.5px solid var(--color-border-light)",
                position: "relative",
                transition: "border-color 0.3s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,133,106,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-light)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 18,
                  fontFamily: "var(--font-display)",
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  opacity: 0.15,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Colored left accent bar */}
              <div
                style={{
                  width: "100%",
                  height: 4,
                  background: index % 2 === 0
                    ? "linear-gradient(90deg, var(--color-accent), var(--color-primary_light))"
                    : "linear-gradient(90deg, var(--color-primary_light), var(--color-accent))",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  padding: isSmallMobile ? "22px 18px" : isMobile ? "26px 22px" : "32px 32px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  flex: 1,
                }}
              >
                {/* Icon container — animates on hover */}
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: index % 2 === 0
                      ? "rgba(232,133,106,0.1)"
                      : "rgba(200,197,220,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ color: "var(--color-accent)", transform: "scale(0.85)" }}>
                    {card.icon}
                  </div>
                </motion.div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.85rem, 1vw, 0.93rem)",
                    lineHeight: isMobile ? 1.65 : 1.7,
                    color: "var(--color-text-tertiary)",
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
