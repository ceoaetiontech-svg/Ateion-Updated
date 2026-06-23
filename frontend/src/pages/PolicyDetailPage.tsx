import { Helmet } from "react-helmet-async";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { 
  ChevronLeft, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Check, 
  Heart, 
  Award, 
  ArrowRight, 
  ShieldCheck,
  Bot,
  Code,
  Globe,
  Trophy,
  Brain
} from "lucide-react";
import SharedNavbar from "../app/components/SharedNavbar";
import NavbarSpacer from "../app/components/NavbarSpacer";
import SharedFooter from "../app/components/SharedFooter";
import { allPolicies, PolicyFramework } from "../data/policies";

// Helper to match icons based on framework tags
const getFrameworkIcon = (tags: string[]) => {
  const ICON_MAP: Record<string, any> = {
    "AI": Bot,
    "Coding": Code,
    "STEM": Code,
    "Digital": Code,
    "Innovation": Sparkles,
    "Critical Thinking": Brain,
    "Skills": Trophy,
    "Mastery": Trophy,
    "Lifelong Learning": BookOpen,
    "Equity": ShieldCheck,
    "Sustainability": Globe,
    "Global Citizenship": Globe,
    "Future Skills": Award,
  };

  const matchedTag = tags.find(tag => ICON_MAP[tag]);
  return matchedTag ? ICON_MAP[matchedTag] : Compass;
};

// ─── Alignment bullet points ──────────────────────────────────────────────────
function AlignmentBullets({ text, color }: { text: string; color: string }) {
  const sentences = useMemo(() => {
    return text
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .slice(0, 4);
  }, [text]);

  return (
    <ul className="list-none p-0 m-0 space-y-4">
      {sentences.map((s, i) => (
        <li
          key={i}
          className="flex items-start gap-3.5 font-['Manrope',sans-serif] text-[14px] text-[var(--color-text-secondary)] leading-relaxed"
        >
          <div 
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
            style={{ 
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            <Check size={12} className="stroke-[3]" />
          </div>
          <span className="leading-snug pt-0.5">{s}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Single framework detail panel ───────────────────────────────────────────
function FrameworkPanel({
  fw,
  accentColor,
}: {
  fw: PolicyFramework;
  accentColor: string;
}) {
  const FrameworkIcon = useMemo(() => getFrameworkIcon(fw.tags), [fw.tags]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6 flex flex-col h-full"
    >
      {/* Policy description card */}
      <div className="rounded-[32px] border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)]/60 backdrop-blur-md p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300">
        <div
          style={{
            background: `${accentColor}10`,
            color: accentColor,
            borderColor: `${accentColor}25`,
          }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border"
        >
          <FrameworkIcon size={26} className="stroke-[1.75]" />
        </div>

        <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-3 leading-tight tracking-tight">
          {fw.name}
        </h3>

        <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6 font-medium">
          {fw.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border-light)]/40">
          {fw.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: `1px solid ${accentColor}35`,
                background: `${accentColor}0a`,
                color: accentColor,
              }}
              className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ateion Alignment card */}
      <div
        style={{
          borderLeft: `4px solid ${accentColor}`,
        }}
        className="rounded-[24px] border border-l-4 border-[var(--color-border-medium)] bg-[var(--color-background-secondary)]/60 backdrop-blur-md p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
      >
        <p
          style={{ color: accentColor }}
          className="text-[11px] font-black tracking-[0.18em] uppercase mb-4"
        >
          HOW ATEION ALIGNS
        </p>
        <AlignmentBullets text={fw.alignmentText} color={accentColor} />
      </div>

      {/* Open policy button */}
      <motion.a
        href={fw.policyLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: accentColor }}
        className="inline-flex items-center justify-center gap-2.5 text-[15px] font-bold text-white py-3.5 px-8 rounded-xl no-underline cursor-pointer transition-all hover:brightness-110 shadow-lg hover:shadow-xl self-start"
        whileTap={{ scale: 0.97 }}
      >
        <span>Read Official Policy</span>
        <ExternalLink size={15} />
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
        <NavbarSpacer />
        <div className="bg-[var(--color-background-primary)] min-h-screen flex flex-col items-center justify-center text-center px-6">
          <p className="text-6xl mb-4">🌍</p>
          <h1 className="text-3xl font-black text-[var(--color-text-primary)] mb-3 tracking-tight">
            Policy Not Found
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm">
            We couldn't find an education policy for "{id}".
          </p>
          <button
            onClick={() => navigate("/policies")}
            className="font-bold text-[15px] bg-[var(--color-text-primary)] text-[var(--color-background-primary)] rounded-full py-3.5 px-8 cursor-pointer"
          >
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
      <Helmet>
        <title>{policy.country} — Policy Details | Ateion</title>
        <meta name="description" content={`Learn about education policy alignment for ${policy.country} in the Ateion ecosystem.`} />
      </Helmet>
      <SharedNavbar />
      <NavbarSpacer />
      
      <div className="bg-[var(--color-background-primary)] min-h-screen overflow-x-hidden pb-20">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
          
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/policies")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-tertiary)] bg-transparent py-2 px-4 rounded-xl border border-[var(--color-border-light)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] cursor-pointer mb-8 transition-all duration-200"
            whileHover={{ x: -2 }}
          >
            <ChevronLeft size={16} />
            <span>All Policies</span>
          </motion.button>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Hero Detail & Tab Switcher */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
              
              {/* Flag + Heading Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="space-y-4"
              >
                <div className="text-7xl leading-none">{policy.flag}</div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    style={{
                      color: policy.accentColor,
                      background: `${policy.accentColor}0d`,
                      border: `1px solid ${policy.accentColor}30`,
                    }}
                    className="text-[10px] font-black uppercase tracking-widest rounded-md py-1 px-3"
                  >
                    {policy.region}
                  </span>
                  <span className="text-[11px] font-bold text-[var(--color-text-tertiary)]">
                    {policy.frameworks.length} Framework{policy.frameworks.length > 1 ? "s" : ""}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] leading-none tracking-tight">
                  {policy.country}
                </h1>

                <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed max-w-md font-medium">
                  {policy.frameworks[0].shortDescription}
                </p>
              </motion.div>

              {/* Vertical Tabs (Desktop) / Horizontal Tabs (Mobile) */}
              {policy.frameworks.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="flex lg:flex-col gap-2 bg-[var(--color-background-secondary)]/50 backdrop-blur-md p-2 rounded-[20px] border border-[var(--color-border-light)] shadow-sm overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory"
                >
                  {policy.frameworks.map((fw, i) => {
                    const isActive = activeTab === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`relative flex-1 lg:flex-initial text-left py-3 px-4 rounded-xl border-none cursor-pointer transition-all duration-200 snap-start shrink-0 min-w-[160px] lg:min-w-0 z-10 font-bold text-xs ${
                          isActive
                            ? "text-white"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-primary)]"
                        }`}
                        style={{
                          backgroundColor: isActive ? policy.accentColor : "transparent"
                        }}
                      >
                        <span className="relative z-10 block truncate">{fw.name}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Right Column: Active Framework details */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <FrameworkPanel
                  key={activeTab}
                  fw={fw}
                  accentColor={policy.accentColor}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Full-width bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 bg-[var(--color-background-secondary)]/60 backdrop-blur-md rounded-[32px] p-8 md:p-12 text-center shadow-lg border border-[var(--color-border-medium)] relative overflow-hidden"
          >
            <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--color-accent)]/10 to-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/5 to-[var(--color-accent)]/5 blur-3xl pointer-events-none" />

            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-[var(--color-accent)] mb-4 relative z-10">
              READY TO EXPERIENCE ATEION?
            </p>
            <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-3 leading-tight tracking-tight relative z-10">
              Assess Capabilities the Right Way
            </h2>
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed max-w-lg mx-auto mb-8 font-medium relative z-10">
              The Global Capability Olympiad measures thinking, not memory —
              built for the world's most forward-thinking education policies.
            </p>
            <div className="flex justify-center gap-4 flex-wrap relative z-10">
              <motion.button
                onClick={() => navigate("/contact")}
                className="font-bold text-[15px] bg-[var(--color-text-primary)] text-[var(--color-background-primary)] rounded-xl py-3.5 px-8 cursor-pointer shadow-md hover:brightness-110"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us
              </motion.button>
              <motion.button
                onClick={() => navigate("/gco")}
                className="font-bold text-[15px] bg-transparent text-[var(--color-text-primary)] border-2 border-[var(--color-border-dark)] rounded-xl py-3 px-8 cursor-pointer hover:bg-[var(--color-background-tertiary)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Explore GCO</span>
                <ArrowRight size={14} className="inline-block ml-1.5 -mt-0.5" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
      
      <SharedFooter />
    </>
  );
}
