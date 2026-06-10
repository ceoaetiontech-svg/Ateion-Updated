import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { allPolicies, featuredPolicies, PolicyEntry } from "../../data/policies";

// ── All 12 policy images ───────────────────────────────────────────────────
import singaporeImg  from "../../assets/policies/singapore.png";
import finlandImg    from "../../assets/policies/finland.png";
import japanImg      from "../../assets/policies/japan.png";
import indiaImg      from "../../assets/gco/education-ministry-logo.jpg";
import uaeImg        from "../../assets/gco/logo-education.png";
import germanyImg    from "../../assets/policies/germany.png";
import usaImg        from "../../assets/policies/usa.png";
import ukImg         from "../../assets/policies/uk.png";
import southkoreaImg from "../../assets/policies/southkorea.jpg";
import euImg         from "../../assets/policies/eu.png";
import unescoImg     from "../../assets/policies/unesco.jpg";
import wefImg        from "../../assets/policies/wef.jpg";

const policyImages: Record<string, string> = {
  singapore:  singaporeImg,
  finland:    finlandImg,
  japan:      japanImg,
  india:      indiaImg,
  uae:        uaeImg,
  germany:    germanyImg,
  usa:        usaImg,
  uk:         ukImg,
  southkorea: southkoreaImg,
  eu:         euImg,
  unesco:     unescoImg,
  wef:        wefImg,
};

// ── Mini policy card ───────────────────────────────────────────────────────
function MiniPolicyCard({ policy, index }: { policy: PolicyEntry; index: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const img = policyImages[policy.id];

  const handleOpenFramework = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.055, ease: "easeOut" }}
      whileHover={{ scale: 1.04, y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/policy/${policy.id}`)}
      className="clay-card"
      style={{
        background: "var(--color-background-secondary)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1.5px solid var(--color-border-light)",
      }}
    >
      {/* Logo image */}
      <div style={{ width: "100%", height: 140, overflow: "hidden", background: "var(--color-background-secondary)", flexShrink: 0 }} className="sm:h-[180px]">
        {img ? (
          <img
            src={img}
            alt={`${policy.country} education policy`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3rem", background: `${policy.accentColor}08`,
          }}>
            {policy.flag}
          </div>
        )}
      </div>

      {/* Bottom strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 12px",
        background: "var(--color-background-secondary)",
        borderTop: `3px solid ${policy.accentColor}`,
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.06em",
          color: "var(--color-background-secondary)", background: policy.accentColor,
          borderRadius: 5, padding: "3px 7px", flexShrink: 0, lineHeight: 1,
        }}>
          {policy.code}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            color: "var(--color-text-primary)", margin: 0, lineHeight: 1.3,
          }} className="text-[13px] sm:text-[14px] lg:text-[0.82rem]">
            {policy.country}
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", color: policy.accentColor, margin: "2px 0 0",
          }} className="text-[10px] sm:text-[0.54rem]">
            {policy.frameworks.length} framework{policy.frameworks.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute", inset: 0, borderRadius: 16,
              background: "var(--color-background-secondary)", borderTop: `3px solid ${policy.accentColor}`,
              padding: "16px 14px 14px",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.54rem", fontWeight: 800, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--color-text-subtle)", margin: "0 0 6px",
            }}>
              HOW ATEION ALIGNS
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem", color: "var(--color-text-secondary)", lineHeight: 1.6,
              flex: 1, margin: "0 0 10px",
            }}>
              {policy.frameworks[0].hoverMessage}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 10 }}>
              {policy.frameworks.map((fw, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 6, padding: "6px 9px", background: "var(--color-background-tertiary)", borderRadius: 8,
                }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600, color: "var(--color-text-secondary)", flex: 1, lineHeight: 1.3 }}>
                    {fw.name}
                  </span>
                  <button
                    className="clay-button"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700,
                      color: "var(--color-background-secondary)", background: policy.accentColor,
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 100, padding: "4px 9px", cursor: "pointer",
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}
                    onClick={(e) => handleOpenFramework(e, fw.policyLink)}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {policy.frameworks[0].tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-body)", fontSize: "0.56rem", fontWeight: 700,
                  padding: "2px 7px", borderRadius: 100,
                  border: `1px solid ${policy.accentColor}38`,
                  background: `${policy.accentColor}0d`, color: policy.accentColor,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── HomePolicySection ──────────────────────────────────────────────────────
export default function HomePolicySection() {
  const navigate = useNavigate();

  return (
    <section style={{
      background: "var(--color-background-primary)",
      padding: "0 5% 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", top: -80, right: -150,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 32 }} className="sm:mb-[52px]">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 14,
          }}
        >
          GLOBAL POLICY ALIGNMENT
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
            color: "var(--color-text-primary)", margin: "0 0 20px",
            lineHeight: 0.95, letterSpacing: "-0.05em",
          }}
        >
          Aligned With Global Education Policies
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}
        >
          <div style={{ width: 40, height: 3, borderRadius: "999px", background: "var(--color-accent)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "999px", background: "var(--color-primary_light)" }} />
          <div style={{ width: 40, height: 3, borderRadius: "999px", background: "var(--color-accent)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.88rem, 1.4vw, 1.05rem)",
            color: "var(--color-text-tertiary)", maxWidth: 520, margin: "24px auto 0",
            lineHeight: 1.8,
          }}
        >
          Ateion's entire ecosystem is built in alignment with {allPolicies.length} leading national
          and international education frameworks across {new Set(allPolicies.map(p => p.region)).size} regions.
        </motion.p>
      </div>

      {/* ── 4 cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7 max-w-[960px] mx-auto mb-6 sm:mb-8 lg:mb-[52px]">
        {featuredPolicies.slice(0, 4).map((policy, index) => (
          <MiniPolicyCard key={policy.id} policy={policy} index={index} />
        ))}
      </div>

      {/* ── Explore All CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <motion.button
          onClick={() => navigate("/policies")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="clay-button"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 700,
            color: "var(--color-background-primary)", background: "var(--color-text-primary)",
            border: "1.5px solid var(--color-text-primary)", borderRadius: 100,
            padding: "14px 38px", cursor: "pointer",
            boxShadow: "0 0 0 rgba(232,133,106,0)",
            transition: "box-shadow 0.4s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,133,106,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 rgba(232,133,106,0)";
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Explore All Global Policies
          </motion.span>
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            whileHover={{ x: 3, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "inline-block" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
