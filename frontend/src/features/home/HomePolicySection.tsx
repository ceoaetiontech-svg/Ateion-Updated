import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useNavigate } from "react-router";
import { X, ExternalLink, Globe, ArrowRight } from "lucide-react";
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
function MiniPolicyCard({
  policy,
  index,
  isMobile,
  onOpenDrawer,
}: {
  policy: PolicyEntry;
  index: number;
  isMobile: boolean;
  onOpenDrawer: (policy: PolicyEntry) => void;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const img = policyImages[policy.id];

  const handleOpenFramework = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.055, ease: "easeOut" }}
        whileHover={isMobile ? undefined : { y: -8 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={(e) => {
          if (isMobile) {
            e.preventDefault();
            e.stopPropagation();
            onOpenDrawer(policy);
          } else {
            navigate(`/policy/${policy.id}`);
          }
        }}
        className="group relative flex flex-col rounded-[32px] border bg-[var(--color-background-secondary)]/60 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          boxShadow: hovered
            ? `0 20px 40px ${policy.accentColor}25, 0 1px 3px rgba(0,0,0,0.05)`
            : "0 8px 30px rgba(0, 0, 0, 0.04)",
          borderColor: hovered ? `${policy.accentColor}70` : "var(--color-border-medium)",
        }}
      >
        {/* Logo area with accent gradient background */}
        <div
          className="w-full aspect-[4/3] relative flex items-center justify-center overflow-hidden shrink-0 border-b border-[var(--color-border-light)]/40"
          style={{ background: `linear-gradient(135deg, ${policy.accentColor}12 0%, ${policy.accentColor}04 100%)` }}
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
              className="w-3/5 h-3/5 object-contain object-center block transition-transform duration-500 group-hover:scale-105 relative z-10"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl relative z-10">
              {policy.flag}
            </div>
          )}

          {/* Flag badge top-right */}
          <div
            className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-lg backdrop-blur-md border text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5"
            style={{
              backgroundColor: `${policy.accentColor}cc`,
              borderColor: `${policy.accentColor}88`,
              color: "#fff",
            }}
          >
            <span>{policy.flag}</span>
            <span>{policy.code}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor: `${policy.accentColor}12`,
                  borderColor: `${policy.accentColor}30`,
                }}
              >
                {policy.region}
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-[var(--color-text-tertiary)]">
                <Globe size={12} className="shrink-0" />
                {policy.frameworks.length} framework{policy.frameworks.length > 1 ? "s" : ""}
              </span>
            </div>

            <h3
              className="text-[22px] font-black text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight tracking-tight line-clamp-1"
            >
              {policy.country}
            </h3>

            <p className="text-[13px] text-[var(--color-text-secondary)] font-medium leading-relaxed line-clamp-2">
              {policy.frameworks[0].hoverMessage}
            </p>
          </div>

          {/* Framework tags */}
          <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[var(--color-border-light)]/60">
            {policy.frameworks.slice(0, 2).map((fw) => (
              <span
                key={fw.name}
                className="text-[9px] font-extrabold px-2.5 py-1 rounded-md border"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor: `${policy.accentColor}0e`,
                  borderColor: `${policy.accentColor}25`,
                }}
              >
                {fw.name}
              </span>
            ))}
            {policy.frameworks.length > 2 && (
              <span className="text-[10px] font-extrabold text-[var(--color-text-tertiary)] px-1.5 pt-0.5">
                +{policy.frameworks.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Hover overlay (Desktop only) */}
        <AnimatePresence>
          {hovered && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 rounded-[32px] flex flex-col overflow-hidden z-20 border border-[var(--color-accent)]/30 shadow-2xl"
              style={{ background: "var(--color-background-secondary)" }}
            >
              {/* Accent top bar */}
              <div className="h-1.5 w-full shrink-0" style={{ background: policy.accentColor }} />

              <div className="flex-1 p-6 flex flex-col overflow-hidden">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] mb-2">
                  HOW ATEION ALIGNS
                </p>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2 font-medium">
                  {policy.frameworks[0].hoverMessage}
                </p>

                <div className="flex flex-col gap-2.5 mb-4 overflow-y-auto custom-scrollbar">
                  {policy.frameworks.map((fw, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[var(--color-border-light)]/40 bg-[var(--color-background-tertiary)]/30"
                    >
                      <span className="text-[12px] font-bold text-[var(--color-text-primary)] flex-1 leading-snug line-clamp-1">
                        {fw.name}
                      </span>
                      <button
                        className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-extrabold text-white rounded-lg px-3 py-1.5 cursor-pointer transition-all hover:brightness-110 whitespace-nowrap border border-white/10"
                        style={{ background: policy.accentColor }}
                        onClick={(e) => handleOpenFramework(e, fw.policyLink)}
                      >
                        <span>Open</span>
                        <ExternalLink size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {policy.frameworks[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-extrabold px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: `${policy.accentColor}30`,
                        background: `${policy.accentColor}0a`,
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
    </>
  );
}

// ── HomePolicySection ──────────────────────────────────────────────────────
export default function HomePolicySection() {
  const navigate = useNavigate();
  const [activePolicy, setActivePolicy] = useState<PolicyEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (activePolicy && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePolicy, isMobile]);

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
        {featuredPolicies.slice(0, isMobile ? 2 : 4).map((policy, index) => (
          <MiniPolicyCard
            key={policy.id}
            policy={policy}
            index={index}
            isMobile={isMobile}
            onOpenDrawer={setActivePolicy}
          />
        ))}
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .home-policy-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .home-policy-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            max-width: 400px;
            margin: 0 auto;
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

      {/* Mobile Bottom Sheet Drawer */}
      {createPortal(
        <AnimatePresence>
          {activePolicy && isMobile && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePolicy(null);
                }}
                className="fixed inset-0 bg-black/60 z-[9999] backdrop-blur-sm"
              />
              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                drag="y"
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 350 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(e, info) => {
                  if (info.offset.y > 110 || info.velocity.y > 450) {
                    setActivePolicy(null);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="fixed bottom-4 left-4 right-4 max-h-[80vh] max-w-md mx-auto bg-[var(--color-background-secondary)]/95 backdrop-blur-md rounded-[32px] border border-[var(--color-border-medium)] z-[10000] overflow-y-auto px-6 pb-8 pt-4 flex flex-col shadow-2xl"
              >
                {/* Drag Handle indicator */}
                <div
                  className="w-12 h-1.5 bg-[var(--color-border-medium)] rounded-full mx-auto mb-5 shrink-0 cursor-grab active:cursor-grabbing"
                  onPointerDown={(e) => dragControls.start(e)}
                  style={{ touchAction: "none" }}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[18px]">{activePolicy.flag}</span>
                      <span
                        className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                        style={{
                          color: activePolicy.accentColor,
                          backgroundColor: `${activePolicy.accentColor}15`,
                        }}
                      >
                        {activePolicy.region}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[var(--color-text-primary)] leading-tight">
                      {activePolicy.country}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActivePolicy(null)}
                    className="w-8 h-8 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="overflow-y-auto mb-6 pr-1 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] mb-2">
                    HOW ATEION ALIGNS
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
                    {activePolicy.frameworks[0].hoverMessage}
                  </p>

                  <h4 className="text-xs font-black uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                    Framework Alignment
                  </h4>

                  <div className="flex flex-col gap-3 mb-5">
                    {activePolicy.frameworks.map((fw, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-2 p-3.5 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-tertiary)]/50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xs font-extrabold text-[var(--color-text-primary)] leading-snug">
                            {fw.name}
                          </span>
                          <button
                            className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-white rounded-lg px-2.5 py-1.5 cursor-pointer transition-all hover:brightness-110"
                            style={{ background: activePolicy.accentColor }}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(fw.policyLink, "_blank", "noopener noreferrer");
                            }}
                          >
                            <span>Open</span>
                            <ExternalLink size={10} />
                          </button>
                        </div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                          {fw.shortDescription || fw.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <h4 className="text-xs font-black uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                    Key Directives
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activePolicy.frameworks[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${activePolicy.accentColor}30`,
                          background: `${activePolicy.accentColor}08`,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActivePolicy(null);
                    navigate(`/policy/${activePolicy.id}`);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-[15px] font-bold transition-all shadow-md cursor-pointer mt-auto shrink-0"
                  style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                >
                  <span>View Full Alignment Details</span>
                  <ArrowRight size={15} />
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
