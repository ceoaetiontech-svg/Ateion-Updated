import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { featuredPolicies, PolicyEntry } from "../../data/policies";

// ─── Policy images (all featured countries) ────────────────────────────────────
import singaporeImg from "../../assets/policies/singapore.png";
import finlandImg from "../../assets/policies/finland.png";
import japanImg from "../../assets/policies/japan.png";
import indiaImg from "../../assets/gco/education-ministry-logo.jpg";
import uaeImg from "../../assets/gco/logo-education.png";

import "../../styles/gco/PolicyAlignment.css";

const policyImages: Record<string, string> = {
  singapore: singaporeImg,
  finland: finlandImg,
  japan: japanImg,
  india: indiaImg,
  uae: uaeImg,
};

// ─── PolicyCard ────────────────────────────────────────────────────────────────
function PolicyCard({ policy, index }: { policy: PolicyEntry; index: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleOpenFramework = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <div
      className="policy-card-float"
      style={
        {
          "--float-dur": `${3.6 + index * 0.35}s`,
          "--float-delay": `${index * 0.45}s`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="policy-card"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.09, ease: "easeOut" }}
        whileHover={{ scale: 1.04, y: -8 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => navigate(`/policy/${policy.id}`)}
        style={{
          boxShadow: hovered
            ? `0 24px 60px ${policy.accentColor}28, 0 8px 24px rgba(0,0,0,0.12)`
            : "0 4px 16px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* ── Full-card policy image ── */}
        <div className="policy-card-img-wrap">
          <img
            src={policyImages[policy.id]}
            alt={`${policy.country} education policy`}
            className="policy-card-img"
          />
        </div>

        {/* ── Bottom country strip ── */}
        <div
          className="policy-card-strip"
          style={{ borderTop: `3px solid ${policy.accentColor}` }}
        >
          <span
            className="policy-strip-code"
            style={{
              background: policy.accentColor,
              color: "var(--color-background-secondary)",
            }}
          >
            {policy.code}
          </span>
          <div className="policy-strip-text">
            <span className="policy-strip-country">{policy.country}</span>
            <span
              className="policy-strip-fw"
              style={{ color: policy.accentColor }}
            >
              {policy.frameworks.length} framework
              {policy.frameworks.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── Hover overlay (slides up from bottom) ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="policy-card-overlay"
              style={{ borderTop: `3px solid ${policy.accentColor}` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <p className="policy-overlay-eyebrow">HOW ATEION ALIGNS</p>
              <p className="policy-overlay-message">
                {policy.frameworks[0].hoverMessage}
              </p>

              <div className="policy-overlay-frameworks">
                {policy.frameworks.map((fw, i) => (
                  <div key={i} className="policy-framework-row">
                    <span className="policy-framework-row-name">{fw.name}</span>
                    <button
                      className="policy-open-btn"
                      style={{ background: policy.accentColor }}
                      onClick={(e) => handleOpenFramework(e, fw.policyLink)}
                    >
                      Open →
                    </button>
                  </div>
                ))}
              </div>

              <div className="policy-overlay-tags">
                {policy.frameworks[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="policy-tag"
                    style={{
                      color: policy.accentColor,
                      borderColor: `${policy.accentColor}38`,
                      background: `${policy.accentColor}0d`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── PolicyAlignmentSection ────────────────────────────────────────────────────
export default function PolicyAlignmentSection() {
  const navigate = useNavigate();

  return (
    <section className="policy-alignment-section">
      {/* ── Header ── */}
      <div className="policy-section-header">
        <motion.span
          className="policy-eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          GLOBAL POLICY ALIGNMENT
        </motion.span>

        <motion.h2
          className="policy-section-title"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Aligned With Global Education Policies
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 40, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-primary_light)" }} />
          <div style={{ width: 40, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
        </motion.div>

        <motion.p
          className="policy-section-subtitle"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          Our ecosystem supports future-ready education frameworks across the
          world.
        </motion.p>
      </div>

      {/* ── Cards ── */}
      <div className="policy-cards-grid">
        {featuredPolicies.map((policy, index) => (
          <PolicyCard key={policy.id} policy={policy} index={index} />
        ))}
      </div>

      {/* ── Explore All button ── */}
      <motion.div
        className="explore-all-wrapper"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.48 }}
      >
        <motion.button
          className="explore-all-btn"
          onClick={() => navigate("/policies")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore All Global Policies
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
