import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useNavigate } from "react-router";
import { X, ExternalLink, Globe, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SharedNavbar from "../app/components/SharedNavbar";
import NavbarSpacer from "../app/components/NavbarSpacer";
import SharedFooter from "../app/components/SharedFooter";
import Skeleton from "../app/components/Skeleton";
import { allPolicies, regions, PolicyEntry } from "../data/policies";

// ─── All 12 policy images ─────────────────────────────────────────────────
import singaporeImg from "../assets/policies/singapore.webp";
import finlandImg from "../assets/policies/finland.webp";
import japanImg from "../assets/policies/japan.webp";
import indiaImg from "../assets/gco/education-ministry-logo.webp";
import uaeImg from "../assets/gco/logo-education.webp";
import germanyImg from "../assets/policies/germany.webp";
import usaImg from "../assets/policies/usa.webp";
import ukImg from "../assets/policies/uk.webp";
import southkoreaImg from "../assets/policies/southkorea.webp";
import euImg from "../assets/policies/eu.webp";
import unescoImg from "../assets/policies/unesco.webp";
import wefImg from "../assets/policies/wef.webp";

const policyImages: Record<string, string> = {
  singapore: singaporeImg,
  finland: finlandImg,
  japan: japanImg,
  india: indiaImg,
  uae: uaeImg,
  germany: germanyImg,
  usa: usaImg,
  uk: ukImg,
  southkorea: southkoreaImg,
  eu: euImg,
  unesco: unescoImg,
  wef: wefImg,
};

// ─── Individual card ──────────────────────────────────────────────────────────
function PolicyGridCard({
  policy,
  isMobile,
  onOpenDrawer,
}: {
  policy: PolicyEntry;
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
    <motion.div
        layout
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
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
  );
}

// ─── PoliciesPage ──────────────────────────────────────────────────────────────
export default function PoliciesPage() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allPolicies.filter((p) => {
      const matchSearch =
        q === "" ||
        p.country.toLowerCase().includes(q) ||
        p.frameworks.some(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.tags.some((t) => t.toLowerCase().includes(q)),
        );
      const matchRegion = activeRegion === "All" || p.region === activeRegion;
      return matchSearch && matchRegion;
    });
  }, [search, activeRegion]);

  return (
    <>
      <Helmet>
        <title>Policies & Legal | Ateion</title>
        <meta name="description" content="Read the Terms of Service, Privacy Policy, and other legal documents for the Ateion ecosystem." />
      </Helmet>
      <SharedNavbar />
      <NavbarSpacer />

      <div className="bg-[var(--color-background-primary)] min-h-screen overflow-x-hidden">
        {/* ── Hero header ── */}
        <section className="py-20 px-[5%] pb-16 text-center relative overflow-hidden">
          <div
            style={{
              background:
                "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
            }}
            className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          />

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block font-['Manrope',sans-serif] text-[0.68rem] font-extrabold tracking-[0.22em] uppercase text-[var(--color-accent)] mb-[18px]"
          >
            GLOBAL POLICY ALIGNMENT
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-['OV_Soge',sans-serif] text-[clamp(2.4rem,5vw,4rem)] font-bold text-[var(--color-text-primary)] m-0 mb-5 leading-[0.95] tracking-[-0.05em]"
          >
            Ateion's Global Policy Alignment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="font-['Manrope',sans-serif] text-[clamp(0.95rem,1.5vw,1.1rem)] text-[var(--color-text-secondary)] max-w-[520px] mx-auto mb-10 leading-[1.8]"
          >
            Ateion's entire startup ecosystem is aligned with leading national
            and international education frameworks across the world.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex justify-center gap-12 flex-wrap"
          >
            {[
              { num: `${allPolicies.length}`, label: "Countries" },
              {
                num: `${allPolicies.reduce((a, p) => a + p.frameworks.length, 0)}`,
                label: "Frameworks",
              },
              { num: `${regions.length - 1}`, label: "Regions" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-['OV_Soge',sans-serif] text-[2.2rem] font-bold text-[var(--color-accent)] m-0 leading-none">
                  {s.num}
                </p>
                <p className="font-['Manrope',sans-serif] text-[0.68rem] text-[var(--color-text-tertiary)] font-bold uppercase tracking-[0.12em] mt-2 mb-0">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Search + filters ── */}
        <section className="px-[5%] pb-[52px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-[860px] mx-auto"
          >
            {/* Search bar */}
            <div className="relative mb-[18px]">
              <svg
                className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search countries, frameworks, or tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="clay-input w-full py-[15px] pr-[18px] pl-[48px] font-['Manrope',sans-serif] text-[0.92rem] text-[var(--color-text-primary)] outline-none transition-all duration-200 box-border focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_var(--color-primary_light)]"
              />
            </div>

            {/* Region filter pills */}
            <div className="flex gap-2 flex-wrap">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  style={{
                    border:
                      activeRegion === region
                        ? "1.5px solid var(--color-text-primary)"
                        : "1.5px solid var(--color-border-medium)",
                    background:
                      activeRegion === region
                        ? "var(--color-text-primary)"
                        : "var(--color-background-secondary)",
                    color:
                      activeRegion === region
                        ? "var(--color-background-primary)"
                        : "var(--color-text-tertiary)",
                  }}
                  className="clay-button font-['Manrope',sans-serif] text-[0.76rem] font-bold py-2 px-[18px] cursor-pointer transition-all duration-200"
                >
                  {region}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Cards grid ── */}
        <section className="px-[5%] pb-[100px]">
          <div className="max-w-[var(--max-width)] mx-auto">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-[3rem] mb-4">🌍</p>
                <p className="font-['OV_Soge',sans-serif] text-[1.4rem] font-bold text-[var(--color-text-primary)] mb-2">
                  No policies found
                </p>
                <p className="font-['Manrope',sans-serif] text-[0.88rem] text-[var(--color-text-tertiary)]">
                  Try a different search term or region filter.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid gap-[22px]"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                }}
              >
                <AnimatePresence mode="popLayout">
                  {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={`skeleton-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Skeleton className="w-full aspect-[4/5] rounded-[var(--radius-lg)]" />
                        </motion.div>
                      ))
                    : filtered.map((policy) => (
                        <PolicyGridCard
                          key={policy.id}
                          policy={policy}
                          isMobile={isMobile}
                          onOpenDrawer={setActivePolicy}
                        />
                      ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </div>

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

      <SharedFooter />
    </>
  );
}
