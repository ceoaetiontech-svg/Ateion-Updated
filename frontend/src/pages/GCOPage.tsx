import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";

import Slide from "../features/gco/Slide";
import GCOComparison from "../features/gco/GCOComparison";
import TimelineSection from "../features/gco/TimelineSection";
import GCOQuestionSection from "../features/gco/GCOQuestionSection";

import PolicyAlignmentSection from "../features/gco/PolicyAlignmentSection";

import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";

const GCOPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Global Capability Olympiad | Ateion</title>
        <meta name="description" content="The world's first preparation-free, syllabus-free, AI-integrated Master Olympiad designed to measure thinking, not memory." />
      </Helmet>
      <SharedNavbar />
      <div
        id="gco-root"
        className="bg-[var(--color-background-primary)] w-full min-h-screen overflow-x-hidden relative"
      >
        <main className="mt-[60px] md:mt-[60px]">

          <section className="hero">
            <div className="hero-overlay">
              <div className="hero-content">
                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Global Capability Olympiad
                </motion.h1>

                {/* Decorative accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: 80,
                    height: 4,
                    borderRadius: 4,
                    background: "var(--color-accent)",
                    margin: "0 auto 24px",
                    transformOrigin: "center",
                  }}
                />

                <motion.p
                  className="hero-subtitle mb-8 md:mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                >
                  The Global Capability Olympiad is the world&apos;s first
                  preparation-free, syllabus-free, AI-integrated Master Olympiad
                  designed to measure thinking, not memory.
                </motion.p>

                <motion.div
                  className="hero-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <button
                    type="button"
                    className="clay-button"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 700,
                      color: "var(--color-text-primary)", background: "var(--color-background-secondary)",
                      border: "1.5px solid var(--color-border-light)", borderRadius: 100,
                      padding: "14px 32px", cursor: "pointer",
                      boxShadow: "0 0 0 rgba(232,133,106,0)",
                      transition: "box-shadow 0.4s ease, transform 0.3s ease",
                    }}
                    onClick={() => window.location.href = "/contact"}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,133,106,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 0 rgba(232,133,106,0)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Contact us
                  </button>
                  <button
                    type="button"
                    className="clay-button"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 700,
                      color: "var(--color-background-primary)", background: "var(--color-text-primary)",
                      border: "1.5px solid var(--color-text-primary)", borderRadius: 100,
                      padding: "14px 32px", cursor: "pointer",
                      boxShadow: "0 0 0 rgba(232,133,106,0)",
                      transition: "box-shadow 0.4s ease, transform 0.3s ease",
                    }}
                    onClick={() => window.location.href = "/gco"}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,133,106,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 0 rgba(232,133,106,0)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Explore more
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
          <PolicyAlignmentSection />
          <Slide />
          <GCOComparison />
          <TimelineSection />
          <GCOQuestionSection />

        </main>
      </div>
      <SharedFooter />
    </>
  );
};

export default GCOPage;
