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
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: hovered
          ? `0 18px 48px ${policy.accentColor}22, 0 6px 14px rgba(0,0,0,0.09)`
          : "0 3px 10px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Logo image */}
      <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", background: "var(--color-background-secondary)", flexShrink: 0 }}>
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
        padding: "10px 13px",
        background: "var(--color-background-secondary)",
        borderTop: `3px solid ${policy.accentColor}`,
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.06em",
          color: "#fff", background: policy.accentColor,
          borderRadius: 5, padding: "3px 7px", flexShrink: 0, lineHeight: 1,
        }}>
          {policy.code}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'OV Soge', sans-serif",
            fontSize: "0.82rem", fontWeight: 700, color: "var(--color-text-primary)",
            margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {policy.country}
          </p>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.54rem", fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", color: policy.accentColor, margin: "2px 0 0",
          }}>
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
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.54rem", fontWeight: 800, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--color-text-subtle)", margin: "0 0 6px",
            }}>
              HOW ATEION ALIGNS
            </p>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
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
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", fontWeight: 600, color: "var(--color-text-secondary)", flex: 1, lineHeight: 1.3 }}>
                    {fw.name}
                  </span>
                  <button
                    style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                      color: "#fff", background: policy.accentColor, border: "none",
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
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.56rem", fontWeight: 700,
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
      padding: "0 5% 100px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", top: -80, right: -150,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,68,68,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "block",
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#fb4444", marginBottom: 18,
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
            fontFamily: "'OV Soge', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
            color: "var(--color-text-primary)", margin: "0 0 16px",
            lineHeight: 1.1, letterSpacing: "-0.025em",
          }}
        >
          Aligned With Global Education Policies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(0.88rem, 1.4vw, 1.05rem)",
            color: "var(--color-text-tertiary)", maxWidth: 520, margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Ateion's entire ecosystem is built in alignment with {allPolicies.length} leading national
          and international education frameworks across {new Set(allPolicies.map(p => p.region)).size} regions.
        </motion.p>
      </div>

      {/* ── 3 cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 28,
        maxWidth: 960,
        margin: "0 auto 52px",
      }}>
        {featuredPolicies.slice(0, 3).map((policy, index) => (
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", fontWeight: 700,
            color: "var(--color-background-primary)", background: "var(--color-text-primary)",
            border: "2px solid var(--color-text-primary)", borderRadius: 100,
            padding: "14px 38px", cursor: "pointer",
            transition: "background 0.28s ease, color 0.28s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fb4444";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#fb4444";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--color-text-primary)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-text-primary)";
          }}
        >
          Explore All Global Policies
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
