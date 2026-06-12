import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smile, Heart, Brain, Activity, Wind, Clock, ChevronRight,
  Lightbulb, Target, Sparkles, Zap, ShieldCheck, PlayCircle,
  PauseCircle, RotateCcw, Plus, CheckCircle2, Flame, Trophy,
  Star, PenLine, Trash2
} from "lucide-react";
import { usePlayground } from "../shared/PlaygroundContext";
import { useInterval } from "../../../app/components/hooks/use-interval";

type TabId = "mental-health" | "stress" | "confidence";
type BreathPhase = "inhale" | "hold" | "exhale" | "rest";
type PowerPoseStep = "ready" | "posing" | "done";

// ── Breathing engine ──────────────────────────────────────────
const PATTERNS: Record<string, { label: string; seq: [BreathPhase, number][]; desc: string; color: string }> = {
  "4-7-8": {
    label: "4-7-8 Calm",
    seq: [["inhale",4],["hold",7],["exhale",8]],
    desc: "Rapidly reduces anxiety. Use before sleep or stressful situations.",
    color: "var(--color-info)",
  },
  "box": {
    label: "Box Breathing",
    seq: [["inhale",4],["hold",4],["exhale",4],["rest",4]],
    desc: "Used by Navy SEALs for stress control and sharp focus.",
    color: "var(--color-success)",
  },
  "2-1-4": {
    label: "Quick Reset",
    seq: [["inhale",2],["hold",1],["exhale",4]],
    desc: "Fast calming technique — works in under 2 minutes.",
    color: "var(--color-accent)",
  },
};

const PHASE_LABEL: Record<BreathPhase, string> = {
  inhale: "Breathe In",
  hold: "Hold",
  exhale: "Breathe Out",
  rest: "Rest",
};

function BreathingExercise() {
  const [patternKey, setPatternKey] = useState("4-7-8");
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const pattern = PATTERNS[patternKey];
  const [phase, duration] = pattern.seq[phaseIdx];
  const progress = elapsed / duration;

  const [powerPoseOpen, setPowerPoseOpen] = useState(false);
  const [powerPoseStep, setPowerPoseStep] = useState<PowerPoseStep>("ready");
  const [powerPoseSeconds, setPowerPoseSeconds] = useState(120);

  useEffect(() => {
  if (powerPoseStep !== "posing") return;
  if (powerPoseSeconds <= 0) {
    setPowerPoseStep("done");
    return;
  }
  const t = setTimeout(() => setPowerPoseSeconds(s => s - 1), 1000);
  return () => clearTimeout(t);
}, [powerPoseStep, powerPoseSeconds]);

  const tick = useCallback(() => {
    setElapsed(prev => {
      const [, dur] = pattern.seq[phaseIdx];
      if (prev + 1 >= dur) {
        setPhaseIdx(pi => {
          const next = (pi + 1) % pattern.seq.length;
          if (next === 0) setCycles(c => c + 1);
          return next;
        });
        return 0;
      }
      return prev + 1;
    });
  }, [pattern, phaseIdx]);

  useInterval(tick, running ? 1000 : null);

  const reset = () => {
    setRunning(false);
    setPhaseIdx(0);
    setElapsed(0);
    setCycles(0);
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="flex flex-col gap-6">
      {/* Pattern selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(PATTERNS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => { setPatternKey(key); reset(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              patternKey === key
                ? "text-white border-transparent shadow-md"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-border-medium)]"
            }`}
            style={patternKey === key ? { background: p.color, borderColor: p.color } : {}}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Circle */}
        <div className="relative w-44 h-44 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-border-light)" strokeWidth="6" />
            <motion.circle
              cx="60" cy="60" r="54"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              stroke={pattern.color}
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 0.9, ease: "linear" }}
            />
          </svg>
          {/* Pulsing inner circle */}
          <motion.div
            className="absolute inset-6 rounded-full"
            style={{ background: pattern.color + "18" }}
            animate={running ? {
              scale: phase === "inhale" ? [1, 1.15] : phase === "exhale" ? [1.15, 1] : 1,
            } : { scale: 1 }}
            transition={{ duration: duration * 0.9, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-bold" style={{ color: pattern.color }}>
              {duration - elapsed}
            </span>
            <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">
              {running ? PHASE_LABEL[phase] : "Ready"}
            </span>
          </div>
        </div>

        {/* Controls + info */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{pattern.label}</p>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{pattern.desc}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-xs font-bold text-[var(--color-text-secondary)] flex items-center gap-1.5">
              <Flame size={13} style={{ color: pattern.color }} /> {cycles} cycle{cycles !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {pattern.seq.map(([ph, dur], i) => (
                <span key={i} className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  running && phaseIdx === i
                    ? "text-white border-transparent"
                    : "bg-[var(--color-background-secondary)] border-[var(--color-border-light)] text-[var(--color-text-tertiary)]"
                }`} style={running && phaseIdx === i ? { background: pattern.color, borderColor: pattern.color } : {}}>
                  {PHASE_LABEL[ph]} {dur}s
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRunning(r => !r)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
              style={{ background: pattern.color }}
            >
              {running ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] transition-all"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stress trigger log ─────────────────────────────────────────
type TriggerSeverity = "High" | "Medium" | "Low";
interface Trigger { id: number; title: string; severity: TriggerSeverity; date: string; }

function StressTriggerLog() {
  const [triggers, setTriggers] = useState<Trigger[]>([
    { id: 1, title: "Upcoming React Exam", severity: "High", date: "Today" },
    { id: 2, title: "Job Interview Prep", severity: "Medium", date: "Yesterday" },
    { id: 3, title: "Project Deadline", severity: "Low", date: "3 days ago" },
  ]);
  const [adding, setAdding] = useState(false);
  const [input, setInput] = useState("");
  const [sev, setSev] = useState<TriggerSeverity>("Medium");

  const add = () => {
    if (!input.trim()) return;
    setTriggers(prev => [{ id: Date.now(), title: input.trim(), severity: sev, date: "Just now" }, ...prev]);
    setInput(""); setAdding(false);
  };

  const sevColor: Record<TriggerSeverity, string> = {
    High: "var(--color-accent)",
    Medium: "var(--color-warning)",
    Low: "var(--color-success)",
  };

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
        <Target size={16} className="text-[var(--color-success)]" /> Stress Triggers
      </h4>
      <AnimatePresence>
        {triggers.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center justify-between p-3 bg-[var(--color-background-primary)] rounded-xl border border-[var(--color-border-light)] group"
          >
            <div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">{t.title}</p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{t.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: sevColor[t.severity] + "18", color: sevColor[t.severity] }}>
                {t.severity}
              </span>
              <button onClick={() => setTriggers(prev => prev.filter(x => x.id !== t.id))}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/10 text-[var(--color-text-tertiary)] hover:text-red-500">
                <Trash2 size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 p-3 bg-[var(--color-background-secondary)] rounded-xl border border-[var(--color-border-light)]">
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && add()}
              placeholder="What's stressing you?"
              className="bg-[var(--color-background-primary)] border border-[var(--color-border-light)] focus:border-[var(--color-accent)] px-3 py-2 rounded-lg text-sm focus:outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
            />
            <div className="flex items-center gap-2">
              {(["High","Medium","Low"] as TriggerSeverity[]).map(s => (
                <button key={s} onClick={() => setSev(s)}
                  className="px-3 py-1 rounded-lg text-xs font-bold transition-all border"
                  style={sev === s ? { background: sevColor[s] + "20", color: sevColor[s], borderColor: sevColor[s] + "40" } : { borderColor: "var(--color-border-light)", color: "var(--color-text-tertiary)" }}>
                  {s}
                </button>
              ))}
              <button onClick={add} className="ml-auto px-3 py-1 rounded-lg text-xs font-bold text-white bg-[var(--color-accent)]">Add</button>
              <button onClick={() => setAdding(false)} className="px-3 py-1 rounded-lg text-xs font-bold text-[var(--color-text-tertiary)] border border-[var(--color-border-light)]">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!adding && (
        <button onClick={() => setAdding(true)}
          className="w-full py-2.5 border border-dashed border-[var(--color-border-medium)] rounded-xl text-xs font-bold text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center gap-1.5">
          <Plus size={13} /> Log New Trigger
        </button>
      )}
    </div>
  );
}

// ── Affirmations ───────────────────────────────────────────────
const AFFIRMATIONS = [
  "I am capable of mastering complex concepts through persistence.",
  "Every challenge I face is an opportunity to grow stronger.",
  "I trust my ability to figure things out, one step at a time.",
  "My potential is not fixed — it expands with every effort I make.",
  "I am worthy of success, and I'm actively building toward it.",
  "Mistakes are data. I learn, adjust, and keep moving forward.",
  "I bring unique value that no one else can replicate.",
  "Hard things become easy with practice. I embrace the hard.",
];

function ConfidenceTab() {
  const [affIdx, setAffIdx] = useState(0);
  const [wins, setWins] = useState<{ id: number; text: string; date: string }[]>([
    { id: 1, text: "Completed 3 React lessons in one sitting", date: "Today" },
    { id: 2, text: "Debugged a tricky TypeScript error", date: "Yesterday" },
    { id: 3, text: "Helped a classmate understand hooks", date: "2 days ago" },
  ]);
  const [winInput, setWinInput] = useState("");
  const [addingWin, setAddingWin] = useState(false);

  const [powerPoseOpen, setPowerPoseOpen] = useState(false);
  const [powerPoseStep, setPowerPoseStep] = useState<PowerPoseStep>("ready");
  const [powerPoseSeconds, setPowerPoseSeconds] = useState(120);


  useEffect(() => {
  if (powerPoseStep !== "posing") return;
  if (powerPoseSeconds <= 0) {
    setPowerPoseStep("done");
    return;
  }
  const t = setTimeout(() => setPowerPoseSeconds(s => s - 1), 1000);
  return () => clearTimeout(t);
  }, [powerPoseStep, powerPoseSeconds]);

  const nextAff = () => setAffIdx(i => (i + 1) % AFFIRMATIONS.length);

  const addWin = () => {
    if (!winInput.trim()) return;
    setWins(prev => [{ id: Date.now(), text: winInput.trim(), date: "Just now" }, ...prev]);
    setWinInput(""); setAddingWin(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Affirmation card */}
      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-2xl p-6 min-h-[200px] flex flex-col justify-between"
          style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-warning))" }}>
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <ShieldCheck size={160} />
          </div>
          <div className="relative z-10">
            <span className="px-2.5 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Daily Affirmation
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={affIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-bold text-white mt-4 leading-snug"
              >
                "{AFFIRMATIONS[affIdx]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <button onClick={nextAff}
            className="relative z-10 self-start mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all backdrop-blur-md flex items-center gap-1.5">
            <Sparkles size={13} /> Next Affirmation
          </button>  

          <button className="shrink-0 px-3 py-2 rounded-xl bg-[var(--color-warning)]/15 text-[var(--color-warning)] text-xs font-bold hover:bg-[var(--color-warning)]/25 transition-colors">
          Try
          </button> 


        </div>

        {/* Power posing */}
        <div className="p-5 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-warning)]/15 flex items-center justify-center shrink-0">
            <Zap size={22} className="text-[var(--color-warning)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--color-text-primary)]">Power Posing</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">2 mins before interviews. Raises testosterone, lowers cortisol.</p>
          </div>
          {/* <button className="shrink-0 px-3 py-2 rounded-xl bg-[var(--color-warning)]/15 text-[var(--color-warning)] text-xs font-bold hover:bg-[var(--color-warning)]/25 transition-colors">
            Try
          </button> */}

          <button onClick={() => setPowerPoseOpen(true)} className="shrink-0 px-3 py-2 rounded-xl bg-[var(--color-warning)]/15 text-[var(--color-warning)] text-xs font-bold hover:bg-[var(--color-warning)]/25 transition-colors">
          Try
          </button>


          {/* Power Posing Modal */}
          {powerPoseOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => { setPowerPoseOpen(false); setPowerPoseStep("ready"); setPowerPoseSeconds(120); }}>
              <div className="bg-[var(--color-background-primary)] rounded-2xl p-6 max-w-sm w-full mx-4 border border-[var(--color-border-light)]"
                onClick={e => e.stopPropagation()}>

                {powerPoseStep === "ready" && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-warning)]/15 flex items-center justify-center">
                      <Zap size={32} className="text-[var(--color-warning)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Power Posing</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Stand tall. Feet shoulder-width apart. Hands on hips or raised in a V. Hold for 2 minutes.
                      Research shows this raises testosterone and lowers cortisol.
                    </p>
                    <button onClick={() => setPowerPoseStep("posing")}
                      className="w-full py-3 rounded-xl bg-[var(--color-warning)] text-white font-bold text-sm">
                      Start 2-Minute Timer
                    </button>
                  </div>
                )}

                {powerPoseStep === "posing" && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-warning)]/15 flex items-center justify-center">
                      <span className="text-3xl font-bold text-[var(--color-warning)]">
                        {Math.floor(powerPoseSeconds / 60)}:{String(powerPoseSeconds % 60).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">Hold your pose — you've got this!</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Chin up. Chest out. Own the room.</p>
                    <button onClick={() => { setPowerPoseOpen(false); setPowerPoseStep("ready"); setPowerPoseSeconds(120); }}
                      className="text-xs text-[var(--color-text-tertiary)] underline">
                      Cancel
                    </button>
                  </div>
                )}

                {powerPoseStep === "done" && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-success)]/15 flex items-center justify-center">
                      <ShieldCheck size={32} className="text-[var(--color-success)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">You're ready! 💪</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Your body chemistry has shifted. Walk in with confidence.
                    </p>
                    <button onClick={() => { setPowerPoseOpen(false); setPowerPoseStep("ready"); setPowerPoseSeconds(120); }}
                      className="w-full py-3 rounded-xl bg-[var(--color-success)] text-white font-bold text-sm">
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Small wins log */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Trophy size={16} className="text-[var(--color-warning)]" /> Small Wins Log
          </h4>
          <span className="text-[10px] font-bold text-[var(--color-text-tertiary)] bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] px-2 py-0.5 rounded-full">
            {wins.length} wins
          </span>
        </div>

        <AnimatePresence>
          {wins.slice(0, 5).map(w => (
            <motion.div key={w.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              className="flex items-start gap-3 p-3 bg-[var(--color-background-secondary)] rounded-xl border border-[var(--color-border-light)] group">
              <CheckCircle2 size={15} className="text-[var(--color-success)] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text-primary)] font-medium">{w.text}</p>
                <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{w.date}</p>
              </div>
              <button onClick={() => setWins(p => p.filter(x => x.id !== w.id))}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/10 text-[var(--color-text-tertiary)] hover:text-red-500">
                <Trash2 size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {addingWin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="flex gap-2">
              <input autoFocus value={winInput} onChange={e => setWinInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addWin()}
                placeholder="What did you accomplish?"
                className="flex-1 bg-[var(--color-background-primary)] border border-[var(--color-border-light)] focus:border-[var(--color-success)] px-3 py-2 rounded-xl text-sm focus:outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]" />
              <button onClick={addWin} className="px-3 py-2 rounded-xl bg-[var(--color-success)] text-white text-xs font-bold">Add</button>
              <button onClick={() => setAddingWin(false)} className="px-3 py-2 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-xs font-bold">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {!addingWin && (
          <button onClick={() => setAddingWin(true)}
            className="w-full py-2.5 border border-dashed border-[var(--color-border-medium)] rounded-xl text-xs font-bold text-[var(--color-text-secondary)] hover:border-[var(--color-success)] hover:text-[var(--color-success)] transition-colors flex items-center justify-center gap-1.5">
            <Plus size={13} /> Log a Win
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function GrowthMindsetPage() {
  const { selectedMood, setSelectedMood } = usePlayground();
  const [activeTab, setActiveTab] = useState<TabId>("mental-health");

  const TABS = [
    { id: "mental-health" as TabId, label: "Mental Health", icon: Brain },
    { id: "stress" as TabId, label: "Stress Management", icon: Wind },
    { id: "confidence" as TabId, label: "Confidence", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group" style={{ fontFamily: "var(--font-display)" }}>
          <Lightbulb size={28} className="text-[var(--color-accent)] group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)]">
            Growth & Well-being
          </span>
        </h3>
        <button className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-background-tertiary)] transition shadow-sm flex items-center gap-2">
          <Heart size={16} className="text-[var(--color-accent)]" /> Talk to a Counselor
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex space-x-1 p-1 bg-[var(--color-background-secondary)]/50 rounded-xl border border-[var(--color-border-light)] w-full overflow-x-auto hide-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === id
                ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border-light)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-primary)]/50"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >

          {/* ── MENTAL HEALTH ── */}
          {activeTab === "mental-health" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood picker */}
              <div className="bg-[var(--color-background-primary)] p-6 rounded-2xl border border-[var(--color-border-light)]">
                <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                  <Smile className="text-[var(--color-warning)]" size={18} /> How are you feeling today?
                </h4>
                <div className="flex justify-between gap-2 mb-5">
                  {[
                    { id: "Stressed", emoji: "😫", color: "var(--color-accent)" },
                    { id: "Okay",     emoji: "😐", color: "var(--color-warning)" },
                    { id: "Good",     emoji: "😊", color: "var(--color-info)" },
                    { id: "Great",    emoji: "🤩", color: "var(--color-success)" },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMood(m.id)}
                      className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                        selectedMood === m.id
                          ? "shadow-md -translate-y-1 border-transparent"
                          : "border-[var(--color-border-light)] hover:border-opacity-40 hover:bg-[var(--color-background-secondary)]"
                      }`}
                      style={selectedMood === m.id ? { background: m.color + "15", borderColor: m.color } : {}}
                    >
                      {selectedMood === m.id && <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: m.color }} />}
                      <span className={`text-3xl transition-all duration-300 ${selectedMood === m.id ? "scale-125 -translate-y-0.5" : "group-hover:scale-110"}`}>{m.emoji}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold" style={selectedMood === m.id ? { color: m.color } : { color: "var(--color-text-tertiary)" }}>
                        {m.id}
                      </span>
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedMood && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="mb-4">
                      <p className="text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">What's contributing?</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Studies","Health","Sleep","Social","Coding","Hobbies"].map(tag => (
                          <button key={tag} className="px-3 py-1 text-[11px] font-bold rounded-full border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background-primary)] transition-all">
                            +{tag}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <p className="text-xs font-bold text-[var(--color-text-primary)] mb-1.5 flex items-center gap-1.5">
                    <Brain size={13} className="text-[var(--color-accent)]" /> AI Insight
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {selectedMood === "Stressed" && "Take a deep breath. Try Box Breathing below — 4 rounds takes under 2 minutes and measurably reduces cortisol."}
                    {selectedMood === "Okay" && "You're steady. A quick mindfulness session could elevate your focus and energy for the rest of the day."}
                    {selectedMood === "Good" && "Consistent 'Good' mood tracking is having a positive impact on your stress baselines. Keep it up."}
                    {selectedMood === "Great" && "Excellent headspace for tackling hard problems today. This is prime learning state — use it."}
                    {!selectedMood && "Select a mood to get a personalised insight based on your current state."}
                  </p>
                </div>
              </div>

              {/* Quick exercises */}
              <div className="bg-[var(--color-background-secondary)] p-6 rounded-2xl border border-[var(--color-border-light)]">
                <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                  <Activity size={18} className="text-[var(--color-info)]" /> Quick Relief Exercises
                </h4>
                <div className="flex flex-col gap-3">
                  {[
                    { title: "Box Breathing", desc: "3 mins · Reduce anxiety", icon: Wind, color: "var(--color-info)" },
                    { title: "Guided Meditation", desc: "10 mins · Regain focus", icon: Smile, color: "var(--color-success)" },
                    { title: "Gratitude Journal", desc: "5 mins · Evening reflection", icon: Heart, color: "var(--color-accent)" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: item.color + "15", color: item.color }}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--color-text-primary)]">{item.title}</p>
                            <p className="text-[10px] text-[var(--color-text-tertiary)] flex items-center gap-1 mt-0.5">
                              <Clock size={9} /> {item.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── STRESS ── */}
          {activeTab === "stress" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--color-background-primary)] p-6 rounded-2xl border border-[var(--color-border-light)]">
                <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                  <Wind size={16} className="text-[var(--color-info)]" /> Breathing Exercise
                </h4>
                <BreathingExercise />
              </div>
              <div className="bg-[var(--color-background-secondary)] p-6 rounded-2xl border border-[var(--color-border-light)]">
                <StressTriggerLog />
              </div>
            </div>
          )}

          {/* ── CONFIDENCE ── */}
          {activeTab === "confidence" && <ConfidenceTab />}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
