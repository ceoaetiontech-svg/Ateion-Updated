import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import SharedNavbar from "../app/components/SharedNavbar";
import NavbarSpacer from "../app/components/NavbarSpacer";
import SharedFooter from "../app/components/SharedFooter";
import Skeleton from "../app/components/Skeleton";
import { allPolicies, regions, PolicyEntry } from "../data/policies";

// ─── All 12 policy images ─────────────────────────────────────────────────
import singaporeImg from "../assets/policies/singapore.png";
import finlandImg from "../assets/policies/finland.png";
import japanImg from "../assets/policies/japan.png";
import indiaImg from "../assets/gco/education-ministry-logo.jpg";
import uaeImg from "../assets/gco/logo-education.png";
import germanyImg from "../assets/policies/germany.png";
import usaImg from "../assets/policies/usa.png";
import ukImg from "../assets/policies/uk.png";
import southkoreaImg from "../assets/policies/southkorea.jpg";
import euImg from "../assets/policies/eu.png";
import unescoImg from "../assets/policies/unesco.jpg";
import wefImg from "../assets/policies/wef.jpg";

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
        boxShadow: hovered
          ? `0 20px 52px ${policy.accentColor}25, 0 6px 16px rgba(0,0,0,0.1)`
          : "var(--shadow-card)",
      }}
      className="clay-card bg-[var(--color-background-secondary)] overflow-hidden cursor-pointer relative flex flex-col transition-shadow duration-300"
      whileHover={{ scale: 1.03, y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/policy/${policy.id}`)}
    >
      {/* Policy logo image — full card top */}
      <div className="w-full aspect-square overflow-hidden bg-transparent shrink-0">
        {img ? (
          <img
            src={img}
            alt={`${policy.country} education policy`}
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
            className="w-full h-full object-contain object-center block transition-transform duration-400 ease-in-out"
          />
        ) : (
          <div
            style={{
              background: `${policy.accentColor}08`,
            }}
            className="w-full h-full flex items-center justify-center text-[4rem]"
          >
            {policy.flag}
          </div>
        )}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: `3px solid ${policy.accentColor}`,
        }}
        className="flex items-center gap-[10px] py-3 px-4 bg-transparent shrink-0"
      >
        <span
          style={{
            background: policy.accentColor,
          }}
          className="font-['Manrope',sans-serif] text-[0.62rem] font-extrabold tracking-[0.06em] text-white rounded-md py-1 px-2 shrink-0 leading-none"
        >
          {policy.code}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-['OV_Soge',sans-serif] text-[0.9rem] font-bold text-[var(--color-text-primary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis">
            {policy.country}
          </p>
          <p
            style={{
              color: policy.accentColor,
            }}
            className="font-['Manrope',sans-serif] text-[0.58rem] font-extrabold tracking-[0.1em] uppercase mt-0.5 mb-0"
          >
            {policy.frameworks.length} framework
            {policy.frameworks.length > 1 ? "s" : ""}
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
              borderTop: `3px solid ${policy.accentColor}`,
            }}
            className="absolute inset-0 rounded-[var(--radius-lg)] solid-hover-overlay pt-5 px-[18px] pb-[18px] flex flex-col overflow-hidden"
          >
            <p className="font-['Manrope',sans-serif] text-[0.58rem] font-extrabold tracking-[0.16em] uppercase text-[var(--color-text-tertiary)] m-0 mb-2">
              HOW ATEION ALIGNS
            </p>

            <p className="font-['Manrope',sans-serif] text-[0.76rem] text-[var(--color-text-secondary)] leading-[1.65] flex-1 m-0 mb-[14px]">
              {policy.frameworks[0].hoverMessage}
            </p>

            {/* Framework open buttons */}
            <div className="flex flex-col gap-[7px] mb-[14px]">
              {policy.frameworks.map((fw, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 py-2 px-[11px] bg-[var(--color-background-tertiary)] rounded-[10px]"
                >
                  <span className="font-['Manrope',sans-serif] text-[0.67rem] font-semibold text-[var(--color-text-secondary)] flex-1 leading-[1.3]">
                    {fw.name}
                  </span>
                  <button
                    style={{
                      background: policy.accentColor,
                    }}
                    className="font-['Manrope',sans-serif] text-[0.62rem] font-bold text-white border-none rounded-full py-[5px] px-[11px] cursor-pointer whitespace-nowrap shrink-0"
                    onClick={(e) => handleOpen(e, fw.policyLink)}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {policy.frameworks[0].tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: `1px solid ${policy.accentColor}38`,
                    background: `${policy.accentColor}0d`,
                    color: policy.accentColor,
                  }}
                  className="font-['Manrope',sans-serif] text-[0.6rem] font-bold py-[3px] px-[9px] rounded-full"
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
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

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
