import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";
import { allPolicies, PolicyFramework } from "../data/policies";

// ─── Alignment bullet points ──────────────────────────────────────────────────
function AlignmentBullets({ text, color }: { text: string; color: string }) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 3);
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {sentences.map((s, i) => (
        <li key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14,
          fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem",
          color: "var(--color-text-secondary)", lineHeight: 1.7,
        }}>
          <span style={{
            marginTop: 6, flexShrink: 0, width: 8, height: 8,
            borderRadius: "50%", background: color, display: "block",
          }} />
          {s}
        </li>
      ))}
    </ul>
  );
}

// ─── Single framework detail panel ───────────────────────────────────────────
function FrameworkPanel({ fw, accentColor }: { fw: PolicyFramework; accentColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
    >
      {/* Policy description card */}
      <div style={{
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border-light)",
        borderRadius: 20, padding: "32px 30px", marginBottom: 24,
        boxShadow: "var(--shadow-card)",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: `${accentColor}10`, border: `1px solid ${accentColor}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20, fontSize: "0.65rem",
          fontFamily: "'Manrope', sans-serif", fontWeight: 700,
          color: "var(--color-text-subtle)", letterSpacing: "0.08em",
          textTransform: "uppercase", flexDirection: "column", gap: 4,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke={accentColor} strokeWidth="1.5" opacity={0.5}>
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          Logo
        </div>

        <h3 style={{
          fontFamily: "'OV Soge', sans-serif", fontSize: "1.5rem", fontWeight: 700,
          color: "var(--color-text-primary)", margin: "0 0 12px", lineHeight: 1.2,
        }}>
          {fw.name}
        </h3>

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: "0.92rem",
          color: "var(--color-text-tertiary)", lineHeight: 1.75, margin: "0 0 20px",
        }}>
          {fw.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {fw.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", fontWeight: 700,
              padding: "4px 12px", borderRadius: 100,
              border: `1px solid ${accentColor}35`,
              background: `${accentColor}0c`, color: accentColor,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ateion Alignment card */}
      <div style={{
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border-light)",
        borderRadius: 20, padding: "32px 30px", marginBottom: 24,
        boxShadow: "var(--shadow-card)",
        borderLeft: `4px solid ${accentColor}`,
      }}>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", fontWeight: 800,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: accentColor, marginBottom: 16,
        }}>
          HOW ATEION ALIGNS
        </p>
        <AlignmentBullets text={fw.alignmentText} color={accentColor} />
      </div>

      {/* Open policy button */}
      <motion.a
        href={fw.policyLink} target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem", fontWeight: 700,
          color: "#fff", background: accentColor, border: "none",
          borderRadius: 100, padding: "13px 30px",
          textDecoration: "none", cursor: "pointer",
        }}
        whileHover={{ scale: 1.04, opacity: 0.9 }} whileTap={{ scale: 0.97 }}
      >
        Read Official Policy
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        <div style={{
          background: "var(--color-background-primary)",
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          paddingTop: 60, fontFamily: "'Manrope', sans-serif", textAlign: "center",
        }}>
          <p style={{ fontSize: "4rem", marginBottom: 16 }}>🌍</p>
          <h1 style={{
            fontFamily: "'OV Soge', sans-serif", fontSize: "2.2rem", fontWeight: 700,
            color: "var(--color-text-primary)", marginBottom: 12,
          }}>
            Policy Not Found
          </h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: 32 }}>
            We couldn't find a policy for "{id}".
          </p>
          <button onClick={() => navigate("/policies")} style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.9rem",
            background: "var(--color-text-primary)", color: "var(--color-background-primary)",
            border: "none", borderRadius: 100, padding: "13px 30px", cursor: "pointer",
          }}>
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
      <div style={{
        background: "var(--color-background-primary)",
        minHeight: "100vh", overflowX: "hidden", paddingTop: 60,
      }}>
        {/* ── Hero ── */}
        <section style={{ padding: "72px 5% 64px", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: -80, right: -100, width: 500, height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${policy.accentColor}14 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/policies")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", fontWeight: 700,
              color: "var(--color-text-tertiary)", background: "transparent",
              border: "1.5px solid var(--color-border-medium)",
              borderRadius: 100, padding: "8px 18px", cursor: "pointer",
              marginBottom: 48, transition: "border-color 0.2s, color 0.2s",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Policies
          </motion.button>

          {/* Flag + Country + Region */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }} style={{ maxWidth: 800 }}
          >
            <div style={{ fontSize: "4.5rem", lineHeight: 1, marginBottom: 20 }}>
              {policy.flag}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", fontWeight: 800,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: policy.accentColor, background: `${policy.accentColor}0d`,
                border: `1px solid ${policy.accentColor}30`,
                borderRadius: 100, padding: "4px 12px",
              }}>
                {policy.region}
              </span>
              <span style={{
                fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--color-text-subtle)",
              }}>
                {policy.frameworks.length} Framework{policy.frameworks.length > 1 ? "s" : ""}
              </span>
            </div>

            <h1 style={{
              fontFamily: "'OV Soge', sans-serif",
              fontSize: "clamp(2.6rem, 6vw, 4.5rem)", fontWeight: 700,
              color: "var(--color-text-primary)", margin: "0 0 16px",
              lineHeight: 1.05, letterSpacing: "-0.03em",
            }}>
              {policy.country}
            </h1>

            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "var(--color-text-tertiary)", lineHeight: 1.8, maxWidth: 560, margin: 0,
            }}>
              {policy.frameworks[0].shortDescription}
            </p>
          </motion.div>
        </section>

        {/* ── Content ── */}
        <section style={{ padding: "0 5% 100px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>

            {/* Framework tabs */}
            {policy.frameworks.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                style={{
                  display: "flex", gap: 8, marginBottom: 32,
                  background: "var(--color-background-secondary)",
                  padding: 6, borderRadius: 14,
                  border: "1px solid var(--color-border-light)",
                  boxShadow: "var(--shadow-xs)", flexWrap: "wrap",
                }}
              >
                {policy.frameworks.map((fw, i) => (
                  <button key={i} onClick={() => setActiveTab(i)} style={{
                    flex: 1, minWidth: 140,
                    fontFamily: "'Manrope', sans-serif", fontSize: "0.78rem", fontWeight: 700,
                    padding: "10px 16px", borderRadius: 10, border: "none",
                    background: activeTab === i ? policy.accentColor : "transparent",
                    color: activeTab === i ? "#fff" : "var(--color-text-muted)",
                    cursor: "pointer", transition: "all 0.22s ease",
                    lineHeight: 1.3, textAlign: "left",
                  }}>
                    {fw.name}
                  </button>
                ))}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <FrameworkPanel key={activeTab} fw={fw} accentColor={policy.accentColor} />
            </AnimatePresence>

            {/* ── CTA Section ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{
                marginTop: 56,
                background: "var(--color-background-secondary)",
                borderRadius: 24, padding: "48px 40px", textAlign: "center",
                boxShadow: "var(--shadow-card)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <p style={{
                fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", fontWeight: 800,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--color-primary)", marginBottom: 16,
              }}>
                READY TO EXPERIENCE ATEION?
              </p>
              <h2 style={{
                fontFamily: "'OV Soge', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
                color: "var(--color-text-primary)", margin: "0 0 12px",
                lineHeight: 1.15, letterSpacing: "-0.02em",
              }}>
                Assess Capabilities the Right Way
              </h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif", fontSize: "0.92rem",
                color: "var(--color-text-tertiary)", lineHeight: 1.75,
                maxWidth: 460, margin: "0 auto 32px",
              }}>
                The Global Capability Olympiad measures thinking, not memory — built for the world's most forward-thinking education policies.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                <motion.button
                  onClick={() => navigate("/contact")}
                  style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.88rem",
                    background: "var(--color-text-primary)", color: "var(--color-background-primary)",
                    border: "2px solid var(--color-text-primary)",
                    borderRadius: 100, padding: "13px 30px", cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Contact Us
                </motion.button>
                <motion.button
                  onClick={() => navigate("/gco")}
                  style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.88rem",
                    background: "transparent", color: "var(--color-text-primary)",
                    border: "2px solid var(--color-border-dark)",
                    borderRadius: 100, padding: "13px 30px", cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
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
