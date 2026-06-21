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
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/policy/${policy.id}`)}
      className="group relative flex flex-col rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
    >
      {/* Logo area with accent gradient background */}
      <div
        className="w-full aspect-[4/3] relative flex items-center justify-center overflow-hidden shrink-0"
        style={{ background: `${policy.accentColor}12` }}
      >
        {/* Decorative corner gradient */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle, ${policy.accentColor}30 0%, transparent 70%)`,
          }}
        />

        {img ? (
          <img
            src={img}
            alt={`${policy.country} education policy`}
            className="w-3/5 h-3/5 object-contain object-center block transition-transform duration-500 group-hover:scale-110 relative z-10"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl relative z-10">
            {policy.flag}
          </div>
        )}

        {/* Flag badge top-right */}
        <div
          className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-md backdrop-blur-md border text-[10px] font-extrabold uppercase tracking-wider shadow-sm"
          style={{
            backgroundColor: `${policy.accentColor}cc`,
            borderColor: `${policy.accentColor}88`,
            color: "#fff",
          }}
        >
          {policy.flag} {policy.code}
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
            style={{
              color: policy.accentColor,
              backgroundColor: `${policy.accentColor}15`,
            }}
          >
            {policy.region}
          </div>
          <span className="text-[10px] font-bold text-[var(--color-text-tertiary)]">
            {policy.frameworks.length} framework{policy.frameworks.length > 1 ? "s" : ""}
          </span>
        </div>

        <h3
          className="text-base font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight mb-1"
        >
          {policy.country}
        </h3>

        <p className="text-xs text-[var(--color-text-tertiary)] font-medium leading-relaxed line-clamp-2">
          {policy.frameworks[0].hoverMessage}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Framework tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3.5 border-t border-[var(--color-border-light)]/60">
          {policy.frameworks.slice(0, 2).map((fw) => (
            <span
              key={fw.name}
              className="text-[9px] font-bold px-2 py-0.5 rounded-md"
              style={{
                color: policy.accentColor,
                backgroundColor: `${policy.accentColor}10`,
              }}
            >
              {fw.name}
            </span>
          ))}
          {policy.frameworks.length > 2 && (
            <span className="text-[9px] font-bold text-[var(--color-text-tertiary)] px-1.5">
              +{policy.frameworks.length - 2}
            </span>
          )}
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
            className="absolute inset-0 rounded-3xl flex flex-col overflow-hidden"
            style={{ background: "var(--color-background-secondary)" }}
          >
            {/* Accent top bar */}
            <div className="h-1 w-full shrink-0" style={{ background: policy.accentColor }} />

            <div className="flex-1 p-5 flex flex-col overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] mb-2">
                HOW ATEION ALIGNS
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3 line-clamp-2">
                {policy.frameworks[0].hoverMessage}
              </p>

              <div className="flex flex-col gap-2 mb-3">
                {policy.frameworks.map((fw, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl"
                    style={{ background: "var(--color-background-tertiary)" }}
                  >
                    <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] flex-1 leading-tight line-clamp-1">
                      {fw.name}
                    </span>
                    <button
                      className="shrink-0 text-[10px] font-bold text-white rounded-full px-3 py-1 cursor-pointer transition-all hover:brightness-110 whitespace-nowrap border border-white/15"
                      style={{ background: policy.accentColor }}
                      onClick={(e) => handleOpenFramework(e, fw.policyLink)}
                    >
                      Open →
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {policy.frameworks[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      border: `1px solid ${policy.accentColor}38`,
                      background: `${policy.accentColor}0d`,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
