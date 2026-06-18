import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { allPolicies, featuredPolicies, PolicyEntry } from "../../data/policies";

// ── All 12 policy images ───────────────────────────────────────────────────
import singaporeImg  from "../../assets/policies/singapore.webp";
import finlandImg    from "../../assets/policies/finland.webp";
import japanImg      from "../../assets/policies/japan.webp";
import indiaImg      from "../../assets/gco/education-ministry-logo.webp";
import uaeImg        from "../../assets/gco/logo-education.webp";
import germanyImg    from "../../assets/policies/germany.webp";
import usaImg        from "../../assets/policies/usa.webp";
import ukImg         from "../../assets/policies/uk.webp";
import southkoreaImg from "../../assets/policies/southkorea.webp";
import euImg         from "../../assets/policies/eu.webp";
import unescoImg     from "../../assets/policies/unesco.webp";
import wefImg        from "../../assets/policies/wef.webp";

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
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1.5px solid var(--color-border-light)",
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
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        padding: "16px 20px",
        background: "var(--color-background-secondary)",
        borderTop: `3px solid ${policy.accentColor}`,
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.06em",
          color: "#fff", background: policy.accentColor,
          borderRadius: 8, padding: "5px 12px", lineHeight: 1,
        }}>
          {policy.code}
        </span>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.98rem", fontWeight: 700, color: "var(--color-text-primary)",
          lineHeight: 1.2, marginTop: 4,
        }}>
          {policy.country}
        </span>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--color-text-secondary)",
          whiteSpace: "nowrap",
        }}>
          {policy.frameworks.length} FRAMEWORK{policy.frameworks.length > 1 ? "S" : ""}
        </span>
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
              position: "absolute", inset: 0, borderRadius: 20,
              background: "var(--color-background-secondary)", borderTop: `3px solid ${policy.accentColor}`,
              padding: "22px 20px 20px",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--color-text-tertiary)", margin: "0 0 8px",
            }}>
              HOW ATEION ALIGNS
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.6,
              flex: 1, margin: "0 0 12px",
            }}>
              {policy.frameworks[0].hoverMessage}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              {policy.frameworks.map((fw, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 8, padding: "8px 12px", background: "var(--color-background-tertiary)", borderRadius: 10,
                }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, color: "var(--color-text-secondary)", flex: 1, lineHeight: 1.3 }}>
                    {fw.name}
                  </span>
                  <button
                    className="clay-button"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "0.64rem", fontWeight: 700,
                      color: "#fff", background: policy.accentColor,
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 100, padding: "5px 11px", cursor: "pointer",
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}
                    onClick={(e) => handleOpenFramework(e, fw.policyLink)}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {policy.frameworks[0].tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700,
                  padding: "3px 9px", borderRadius: 100,
                  border: `1px solid ${policy.accentColor}38`,
                  background: `${policy.accentColor}0d`, color: "var(--color-text-secondary)",
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
      padding: "0 5% 0",
      position: "relative",
    }}>


      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
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
      <div className="home-policy-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 28,
        maxWidth: 1200,
        margin: "0 auto 0",
      }}>
        {featuredPolicies.map((policy, index) => (
          <MiniPolicyCard key={policy.id} policy={policy} index={index} />
        ))}
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .home-policy-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .home-policy-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          /* Scale down card padding and font sizes to fit side-by-side on mobile */
          .home-policy-grid .clay-card > div:nth-child(2) {
            padding: 10px 8px !important;
            gap: 2px !important;
          }
          .home-policy-grid .clay-card > div:nth-child(2) > span:nth-child(1) {
            font-size: 0.55rem !important;
            padding: 3px 8px !important;
            border-radius: 4px !important;
          }
          .home-policy-grid .clay-card > div:nth-child(2) > span:nth-child(2) {
            font-size: 0.75rem !important;
            margin-top: 2px !important;
          }
          .home-policy-grid .clay-card > div:nth-child(2) > span:nth-child(3) {
            font-size: 0.5rem !important;
          }
        }
      `}</style>

      {/* ── Explore All CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ display: "flex", justifyContent: "center", marginTop: 52, paddingBottom: 32 }}
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
