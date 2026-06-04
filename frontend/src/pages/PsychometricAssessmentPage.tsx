import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { Brain, ArrowRight, Download, CheckCircle2, ShieldCheck, Zap, Target, Lightbulb } from "lucide-react";

const scenarios = [
  "You are inside a spaceship and suddenly lose communication with Earth. What do you do?",
  "Your team is arguing during an important mission. How will you handle it?",
  "You discover a hidden planet with unknown life forms. What is your first action?",
  "Resources are running low. How will you prioritize survival?",
  "An AI system disagrees with your decision. What will you do?",
  "You must choose between mission success and team safety. Explain your choice.",
];

const featureCards = [
  {
    icon: Target,
    color: "purple",
    title: "No Right or Wrong",
    desc: "Respond authentically to each scenario. The AI measures your thinking process, not rote knowledge.",
  },
  {
    icon: Lightbulb,
    color: "blue",
    title: "6 Unique Scenarios",
    desc: "You will be placed in high-stakes hypothetical situations requiring leadership and critical thinking.",
  },
  {
    icon: Zap,
    color: "emerald",
    title: "Instant AI Analysis",
    desc: "Receive a comprehensive PDF report detailing your archetype, strengths, and a 30-day growth roadmap.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function BackgroundGlows() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-primary_light)] opacity-10 blur-3xl" />
    </div>
  );
}

function AccentBars() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-14 h-[3px] rounded-full bg-[var(--color-accent)] mb-5"
      style={{ transformOrigin: "center" }}
    />
  );
}

export default function PsychometricAssessmentPage() {
  const [round, setRound] = useState(1);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [prevRound, setPrevRound] = useState(1);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (round === 6) {
        setFinished(true);
      } else {
        setPrevRound(round);
        setRound(round + 1);
        setAnswer("");
      }
    }, 1500);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Psychometric Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Archetype Name: Strategic Explorer", 20, 40);
    doc.text("Strengths: Leadership, Curiosity, Problem Solving", 20, 55);
    doc.text("Growth Areas: Patience, Delegation", 20, 70);
    doc.text("Learning Style: Experiential Learning", 20, 85);
    doc.text("Decision Making Style: Analytical", 20, 100);
    doc.text("Estimated Cognitive Index: 87 / 100", 20, 115);
    doc.text("30-Day Roadmap: Practice leadership exercises and critical thinking tasks.", 20, 130);
    doc.save("Psychometric_Report.pdf");
  };

  // ─── RESULTS SCREEN ──────────────────────────────────────────────
  if (finished) {
    return (
      <motion.div
        className="min-h-screen bg-[var(--color-background-primary)] flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <BackgroundGlows />

        <motion.div
          className="clay-card bg-[var(--color-background-secondary)] p-8 md:p-12 rounded-3xl w-full max-w-3xl z-10 border border-[var(--color-border-light)] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <ShieldCheck size={120} className="text-[var(--color-accent)]" />
          </div>

          <motion.div
            className="flex items-center gap-4 mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <CheckCircle2 className="text-emerald-500" size={32} />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">Psychometric Report</h1>
              <p className="text-[var(--color-text-secondary)] mt-1 font-medium">Your cognitive assessment is complete.</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 mb-10 bg-[var(--color-background-primary)] p-6 rounded-2xl border border-[var(--color-border-medium)]"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Archetype Name:</strong>
              <span className="text-[var(--color-accent)] font-bold text-lg">Strategic Explorer</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)] mt-1">Strengths:</strong>
              <div className="flex flex-wrap gap-2">
                {["Leadership", "Curiosity", "Problem Solving"].map((s, i) => (
                  <motion.span
                    key={s}
                    className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-sm font-semibold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)] mt-1">Growth Areas:</strong>
              <div className="flex flex-wrap gap-2">
                {["Patience", "Delegation"].map((g, i) => (
                  <motion.span
                    key={g}
                    className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-sm font-semibold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    {g}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Learning Style:</strong>
              <span className="text-[var(--color-text-primary)] font-medium">Experiential Learning</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Decision Making Style:</strong>
              <span className="text-[var(--color-text-primary)] font-medium">Analytical</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Cognitive Index:</strong>
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-1 max-w-[200px] h-2.5 bg-[var(--color-border-medium)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--color-accent)] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "87%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
                <span className="text-[var(--color-accent)] font-bold">87 / 100</span>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start py-3 last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)] shrink-0">30-Day Roadmap:</strong>
              <span className="text-[var(--color-text-primary)] font-medium">Practice leadership exercises and critical thinking tasks.</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={downloadPDF}
              className="group px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(232,133,106,0.3)] hover:shadow-[0_6px_24px_rgba(232,133,106,0.45)] hover:scale-[1.03] active:scale-[0.97]"
            >
              <Download size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Download PDF Report
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // ─── LANDING SCREEN ──────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <motion.div
        className="min-h-screen bg-[var(--color-background-primary)] flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <BackgroundGlows />

        <motion.div
          className="w-full max-w-4xl z-10 flex flex-col gap-8 items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <div className="w-20 h-20 rounded-3xl bg-[var(--color-accent-light)] flex items-center justify-center border border-[var(--color-border-light)] shadow-[0_0_30px_var(--color-accent-light)] mb-6 mx-auto">
              <motion.div
                animate={{ rotate: [0, -6, 6, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain size={40} className="text-[var(--color-accent)]" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AccentBars />
            <h1 className="text-4xl md:text-5xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)] mb-4 leading-[0.95] tracking-[-0.05em]">
              AI-Driven Cognitive Assessment
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto font-medium">
              Discover your cognitive archetype, decision-making style, and leadership strengths through 6 strategic scenarios.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4"
            variants={containerVariants}
          >
            {featureCards.map((card) => (
              <motion.div
                key={card.title}
                className="clay-card bg-[var(--color-background-secondary)] p-6 rounded-2xl border border-[var(--color-border-light)] shadow-md text-left flex flex-col items-start group cursor-default"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className="p-3 rounded-xl mb-4"
                  style={{ backgroundColor: `var(--color-${card.color}-500)/10` }}
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <card.icon size={24} className="text-[var(--color-accent)]" />
                </motion.div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{card.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <button
              onClick={() => setHasStarted(true)}
              className="group px-10 py-4 bg-[var(--color-accent)] text-white rounded-xl font-bold flex items-center gap-3 transition-all duration-300 shadow-[0_4px_16px_rgba(232,133,106,0.3)] hover:shadow-[0_8px_28px_rgba(232,133,106,0.45)] hover:scale-[1.03] active:scale-[0.97] text-lg"
            >
              Start Assessment
              <ArrowRight size={20} className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-4 font-medium">Estimated time: 5-8 minutes</p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // ─── QUESTION SCREEN ─────────────────────────────────────────────
  return (
    <motion.div
      className="min-h-screen bg-[var(--color-background-primary)] flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <BackgroundGlows />

      <div className="w-full max-w-3xl z-10 flex flex-col gap-6">
        {/* Progress Header */}
        <motion.div
          className="flex items-center justify-between px-2"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center border border-[var(--color-border-light)] text-[var(--color-accent)]">
              <Brain size={20} />
            </div>
            Scenario {round} of 6
          </h2>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  step <= round
                    ? "bg-[var(--color-accent)] scale-100"
                    : "bg-[var(--color-background-tertiary)] scale-75"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="clay-card bg-[var(--color-background-secondary)] rounded-3xl p-6 sm:p-10 shadow-xl border border-[var(--color-border-light)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={round}
              className="bg-[var(--color-background-primary)] p-6 rounded-2xl mb-8 border border-[var(--color-border-medium)] shadow-inner relative overflow-hidden"
              initial={{ opacity: 0, x: round > prevRound ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: round > prevRound ? -40 : 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--color-accent)]" />
              <p className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-tertiary)] mb-2 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[var(--color-accent)]" /> AI Scenario Generator
              </p>
              <p className="text-lg md:text-xl font-medium text-[var(--color-text-primary)] leading-relaxed">
                {scenarios[round - 1]}
              </p>
            </motion.div>
          </AnimatePresence>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your strategic decision here..."
            className="clay-input w-full rounded-2xl p-5 h-40 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary_light)] resize-none transition-all shadow-inner text-base md:text-lg"
            disabled={loading}
          />

          <div className="mt-8 flex items-center justify-between min-h-[48px]">
            <div>
              {loading && (
                <motion.div
                  className="flex items-center gap-3 text-[var(--color-accent)] font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
                  Analyzing Response...
                </motion.div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !answer.trim()}
              className={`
                group px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300
                ${(!answer.trim() || loading)
                  ? 'bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)] cursor-not-allowed border border-[var(--color-border-light)]'
                  : 'bg-[var(--color-accent)] text-white shadow-[0_4px_16px_rgba(232,133,106,0.3)] hover:shadow-[0_8px_28px_rgba(232,133,106,0.45)] hover:scale-[1.03] active:scale-[0.97]'
                }
              `}
            >
              {round === 6 ? 'Finalize Assessment' : 'Submit & Continue'}
              {!loading && answer.trim() && (
                <ArrowRight size={18} className="transition-all duration-300 group-hover:translate-x-0.5" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
