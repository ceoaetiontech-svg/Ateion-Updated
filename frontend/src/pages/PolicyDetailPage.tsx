import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";
import { allPolicies, PolicyFramework } from "../data/policies";

// ─── Alignment bullet points ──────────────────────────────────────────────────
function AlignmentBullets({ text, color }: { text: string; color: string }) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .slice(0, 3);
  return (
    <ul className="list-none p-0 m-0">
      {sentences.map((s, i) => (
        <li
          key={i}
          className="flex items-start gap-3 mb-[14px] font-['Manrope',sans-serif] text-[0.88rem] text-[var(--color-text-secondary)] leading-[1.7]"
        >
          <span
            style={{ background: color }}
            className="mt-[6px] shrink-0 w-2 h-2 rounded-full block"
          />
          {s}
        </li>
      ))}
    </ul>
  );
}

// ─── Single framework detail panel ───────────────────────────────────────────
function FrameworkPanel({
  fw,
  accentColor,
}: {
  fw: PolicyFramework;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      {/* Policy description card */}
      <div className="clay-card bg-[var(--color-background-secondary)] py-8 px-[30px] mb-6">
        <div
          style={{
            background: `${accentColor}10`,
            border: `1px solid ${accentColor}25`,
          }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-[0.65rem] font-['Manrope',sans-serif] font-bold text-[var(--color-text-subtle)] tracking-[0.08em] uppercase flex-col gap-1"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            opacity={0.5}
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          Logo
        </div>

        <h3 className="font-['OV_Soge',sans-serif] text-[1.5rem] font-bold text-[var(--color-text-primary)] m-0 mb-3 leading-[1.2]">
          {fw.name}
        </h3>

        <p className="font-['Manrope',sans-serif] text-[0.92rem] text-[var(--color-text-tertiary)] leading-[1.75] m-0 mb-5">
          {fw.description}
        </p>

        <div className="flex flex-wrap gap-[6px]">
          {fw.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: `1px solid ${accentColor}35`,
                background: `${accentColor}0c`,
                color: accentColor,
              }}
              className="font-['Manrope',sans-serif] text-[0.65rem] font-bold py-1 px-3 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ateion Alignment card */}
      <div
        style={{
          borderLeft: `4px solid ${accentColor}`,
        }}
        className="clay-card bg-[var(--color-background-secondary)] py-8 px-[30px] mb-6"
      >
        <p
          style={{ color: accentColor }}
          className="font-['Manrope',sans-serif] text-[0.65rem] font-extrabold tracking-[0.18em] uppercase mb-4"
        >
          HOW ATEION ALIGNS
        </p>
        <AlignmentBullets text={fw.alignmentText} color={accentColor} />
      </div>

      {/* Open policy button */}
      <motion.a
        href={fw.policyLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: accentColor }}
        className="clay-button inline-flex items-center gap-[10px] font-['Manrope',sans-serif] text-[0.88rem] font-bold text-white border-none py-[13px] px-[30px] no-underline cursor-pointer"
        whileHover={{ scale: 1.04, opacity: 0.9 }}
        whileTap={{ scale: 0.97 }}
      >
        Read Official Policy
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </motion.a>
    </motion.div>
  );
}

// ─── PolicyDetailPage ─────────────────────────────────────────────────────────
export default function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const policy = allPolicies.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState(0);

  if (!policy) {
    return (
      <>
        <SharedNavbar />
        <div className="bg-[var(--color-background-primary)] min-h-screen flex flex-col items-center justify-center pt-[60px] font-['Manrope',sans-serif] text-center">
          <p className="text-6xl mb-4">🌍</p>
          <h1 className="font-['OV_Soge',sans-serif] text-[2.2rem] font-bold text-[var(--color-text-primary)] mb-3">
            Policy Not Found
          </h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            We couldn't find a policy for "{id}".
          </p>
          <button
            onClick={() => navigate("/policies")}
            className="font-['Manrope',sans-serif] font-bold text-[0.9rem] bg-[var(--color-text-primary)] text-[var(--color-background-primary)] border-none rounded-full py-[13px] px-[30px] cursor-pointer"
          >
            ← Back to All Policies
          </button>
        </div>
        <SharedFooter />
      </>
    );
  }

  const fw = policy.frameworks[activeTab];

  return (
    <>
      <SharedNavbar />
      <div className="bg-[var(--color-background-primary)] min-h-screen overflow-x-hidden pt-[60px]">
        {/* ── Hero ── */}
        <section className="pt-[72px] pb-16 px-[5%] relative overflow-hidden">
          <div
            style={{
              background: `radial-gradient(circle, ${policy.accentColor}14 0%, transparent 70%)`,
            }}
            className="absolute -top-20 -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          />

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/policies")}
            className="clay-button inline-flex items-center gap-2 font-['Manrope',sans-serif] text-[0.8rem] font-bold text-[var(--color-text-tertiary)] bg-transparent py-2 px-[18px] cursor-pointer mb-12 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Policies
          </motion.button>

          {/* Flag + Country + Region */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="max-w-[800px]"
          >
            <div className="text-[4.5rem] leading-none mb-5">{policy.flag}</div>

            <div className="flex items-center gap-[14px] mb-4 flex-wrap">
              <span
                style={{
                  color: policy.accentColor,
                  background: `${policy.accentColor}0d`,
                  border: `1px solid ${policy.accentColor}30`,
                }}
                className="font-['Manrope',sans-serif] text-[0.62rem] font-extrabold tracking-[0.16em] uppercase rounded-full py-1 px-3"
              >
                {policy.region}
              </span>
              <span className="font-['Manrope',sans-serif] text-[0.62rem] font-extrabold tracking-[0.12em] uppercase text-[var(--color-text-subtle)]">
                {policy.frameworks.length} Framework
                {policy.frameworks.length > 1 ? "s" : ""}
              </span>
            </div>

            <h1 className="font-['OV_Soge',sans-serif] text-[clamp(2.6rem,6vw,4.5rem)] font-bold text-[var(--color-text-primary)] m-0 mb-4 leading-[0.95] tracking-[-0.05em]">
              {policy.country}
            </h1>

            <p className="font-['Manrope',sans-serif] text-[clamp(0.95rem,1.5vw,1.1rem)] text-[var(--color-text-tertiary)] leading-[1.8] max-w-[560px] m-0">
              {policy.frameworks[0].shortDescription}
            </p>
          </motion.div>
        </section>

        {/* ── Content ── */}
        <section className="px-[5%] pb-[100px]">
          <div className="max-w-[800px] mx-auto">
            {/* Framework tabs */}
            {policy.frameworks.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="flex gap-2 mb-8 bg-[var(--color-background-secondary)] p-1.5 rounded-[14px] border border-[var(--color-border-light)] shadow-[var(--shadow-xs)] flex-wrap"
              >
                {policy.frameworks.map((fw, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    style={{
                      background:
                        activeTab === i ? policy.accentColor : "transparent",
                      color:
                        activeTab === i ? "var(--color-background-secondary)" : "var(--color-text-muted)",
                    }}
                    className="flex-1 min-w-[140px] font-['Manrope',sans-serif] text-[0.78rem] font-bold py-2.5 px-4 rounded-[10px] border-none cursor-pointer transition-all duration-[0.22s] ease-in-out leading-[1.3] text-left"
                  >
                    {fw.name}
                  </button>
                ))}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <FrameworkPanel
                key={activeTab}
                fw={fw}
                accentColor={policy.accentColor}
              />
            </AnimatePresence>

            {/* ── CTA Section ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-14 bg-[var(--color-background-secondary)] rounded-[24px] py-12 px-10 text-center shadow-[var(--shadow-card)] border border-[var(--color-border-light)]"
            >
              <p className="font-['Manrope',sans-serif] text-[0.65rem] font-extrabold tracking-[0.18em] uppercase text-[var(--color-accent)] mb-4">
                READY TO EXPERIENCE ATEION?
              </p>
              <h2 className="font-['OV_Soge',sans-serif] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[var(--color-text-primary)] m-0 mb-3 leading-[1.15] tracking-[-0.02em]">
                Assess Capabilities the Right Way
              </h2>
              <p className="font-['Manrope',sans-serif] text-[0.92rem] text-[var(--color-text-tertiary)] leading-[1.75] max-w-[460px] mx-auto mb-8">
                The Global Capability Olympiad measures thinking, not memory —
                built for the world's most forward-thinking education policies.
              </p>
              <div className="flex justify-center gap-[14px] flex-wrap">
                <motion.button
                  onClick={() => navigate("/contact")}
                  className="font-['Manrope',sans-serif] font-bold text-[0.88rem] bg-[var(--color-text-primary)] text-[var(--color-background-primary)] border-2 border-[var(--color-text-primary)] rounded-full py-[13px] px-[30px] cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Us
                </motion.button>
                <motion.button
                  onClick={() => navigate("/gco")}
                  className="font-['Manrope',sans-serif] font-bold text-[0.88rem] bg-transparent text-[var(--color-text-primary)] border-2 border-[var(--color-border-dark)] rounded-full py-[13px] px-[30px] cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore GCO →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <SharedFooter />
    </>
  );
}
