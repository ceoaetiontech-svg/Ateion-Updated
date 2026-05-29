import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";
import { allPolicies, regions, PolicyEntry } from "../data/policies";

// ─── All 12 policy images ─────────────────────────────────────────────────
import singaporeImg  from "../assets/policies/singapore.png";
import finlandImg    from "../assets/policies/finland.png";
import japanImg      from "../assets/policies/japan.png";
import indiaImg      from "../assets/gco/education-ministry-logo.jpg";
import uaeImg        from "../assets/gco/logo-education.png";
import germanyImg    from "../assets/policies/germany.png";
import usaImg        from "../assets/policies/usa.png";
import ukImg         from "../assets/policies/uk.png";
import southkoreaImg from "../assets/policies/southkorea.jpg";
import euImg         from "../assets/policies/eu.png";
import unescoImg     from "../assets/policies/unesco.jpg";
import wefImg        from "../assets/policies/wef.jpg";

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

// ─── Individual card ──────────────────────────────────────────────────────────
function PolicyGridCard({ policy }: { policy: PolicyEntry }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleOpen = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener noreferrer");
  };

  const img = policyImages[policy.id];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        background: "var(--color-background-secondary)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-border-light)",
        boxShadow: hovered
          ? `0 20px 52px ${policy.accentColor}25, 0 6px 16px rgba(0,0,0,0.1)`
          : "var(--shadow-card)",
        transition: "box-shadow 0.3s ease",
      }}
      whileHover={{ scale: 1.03, y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/policy/${policy.id}`)}
    >
      {/* Policy logo image — full card top */}
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
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
            background: `${policy.accentColor}08`,
          }}>
            {policy.flag}
          </div>
        )}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px",
          background: "var(--color-background-secondary)",
          borderTop: `3px solid ${policy.accentColor}`,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: "#fff",
            background: policy.accentColor,
            borderRadius: 6,
            padding: "4px 8px",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {policy.code}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'OV Soge', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {policy.country}
          </p>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: policy.accentColor,
            margin: "2px 0 0",
          }}>
            {policy.frameworks.length} framework{policy.frameworks.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              background: "var(--color-background-secondary)",
              borderTop: `3px solid ${policy.accentColor}`,
              padding: "20px 18px 18px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#bbb",
              margin: "0 0 8px",
            }}>
              HOW ATEION ALIGNS
            </p>

            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.76rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              flex: 1,
              margin: "0 0 14px",
            }}>
              {policy.frameworks[0].hoverMessage}
            </p>

            {/* Framework open buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
              {policy.frameworks.map((fw, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "8px 11px",
                    background: "var(--color-background-tertiary)",
                    borderRadius: 10,
                  }}
                >
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.67rem",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    flex: 1,
                    lineHeight: 1.3,
                  }}>
                    {fw.name}
                  </span>
                  <button
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "#fff",
                      background: policy.accentColor,
                      border: "none",
                      borderRadius: 100,
                      padding: "5px 11px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    onClick={(e) => handleOpen(e, fw.policyLink)}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {policy.frameworks[0].tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: 100,
                    border: `1px solid ${policy.accentColor}38`,
                    background: `${policy.accentColor}0d`,
                    color: policy.accentColor,
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
  );
}

// ─── PoliciesPage ──────────────────────────────────────────────────────────────
export default function PoliciesPage() {
  const [search, setSearch]           = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allPolicies.filter((p) => {
      const matchSearch =
        q === "" ||
        p.country.toLowerCase().includes(q) ||
        p.frameworks.some(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.tags.some((t) => t.toLowerCase().includes(q))
        );
      const matchRegion = activeRegion === "All" || p.region === activeRegion;
      return matchSearch && matchRegion;
    });
  }, [search, activeRegion]);

  return (
    <>
      <SharedNavbar />

      <div style={{ background: "var(--color-background-primary)", minHeight: "100vh", overflowX: "hidden", paddingTop: 60 }}>

        {/* ── Hero header ── */}
        <section style={{ padding: "80px 5% 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,68,68,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#fb4444", marginBottom: 18 }}
          >
            GLOBAL POLICY ALIGNMENT
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ fontFamily: "'OV Soge', sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 20px", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            Ateion's Global Policy Alignment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }}
            style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "var(--color-text-secondary)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}
          >
            Ateion's entire startup ecosystem is aligned with leading national and international education frameworks across the world.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
            style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}
          >
            {[
              { num: `${allPolicies.length}`, label: "Countries" },
              { num: `${allPolicies.reduce((a, p) => a + p.frameworks.length, 0)}`, label: "Frameworks" },
              { num: `${regions.length - 1}`, label: "Regions" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'OV Soge', sans-serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--color-text-primary)", margin: 0, lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", color: "#aaa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: "8px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Search + filters ── */}
        <section style={{ padding: "0 5% 52px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ maxWidth: 860, margin: "0 auto" }}
          >
            {/* Search bar */}
            <div style={{ position: "relative", marginBottom: 18 }}>
              <svg style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search countries, frameworks, or tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "15px 18px 15px 48px",
                  background: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)", borderRadius: 14,
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.92rem", color: "var(--color-text-primary)",
                  outline: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#fb4444"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(251,68,68,0.10)"; }}
                onBlur={(e) =>  { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
              />
            </div>

            {/* Region filter pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  style={{
                    fontFamily: "'Manrope', sans-serif", fontSize: "0.76rem", fontWeight: 700,
                    padding: "8px 18px", borderRadius: 100,
                    border: activeRegion === region ? "1.5px solid var(--color-text-primary)" : "1.5px solid var(--color-border-medium)",
                    background: activeRegion === region ? "var(--color-text-primary)" : "var(--color-background-secondary)",
                    color: activeRegion === region ? "var(--color-background-primary)" : "var(--color-text-tertiary)",
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                >
                  {region}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Cards grid ── */}
        <section style={{ padding: "0 5% 100px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: "3rem", marginBottom: 16 }}>🌍</p>
                <p style={{ fontFamily: "'OV Soge', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>No policies found</p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem", color: "#999" }}>Try a different search term or region filter.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                  gap: 22,
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((policy) => (
                    <PolicyGridCard key={policy.id} policy={policy} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <SharedFooter />
    </>
  );
}
