import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  StickyNote,
  Smile,
  Meh,
  Frown,
  Sparkles,
  BookOpen,
  Sun,
  Clock,
  PenLine,
  Quote,
  ChevronRight,
  Trash2,
  Heart,
  Brain,
  CloudMoon,
} from "lucide-react";
import { slideInItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";

const moods = [
  { label: "Great", icon: Sparkles, color: "#22c55e", bg: "rgba(34,197,94,0.12)", gradient: "from-emerald-400 to-emerald-600" },
  { label: "Good", icon: Smile, color: "#3b82f6", bg: "rgba(59,130,246,0.12)", gradient: "from-blue-400 to-blue-600" },
  { label: "Okay", icon: Meh, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", gradient: "from-amber-400 to-amber-600" },
  { label: "Tough", icon: Frown, color: "#ef4444", bg: "rgba(239,68,68,0.12)", gradient: "from-rose-400 to-rose-600" },
];

const prompts = [
  "What's one thing you learned today that you didn't know yesterday?",
  "What moment made you smile today?",
  "Describe a challenge you faced today and how you handled it.",
  "What's something you're grateful for right now?",
  "If you could redo one part of today, what would it be?",
  "What's a small win you had today?",
  "How did you help someone today, or how did someone help you?",
  "What's one thing you want to remember from today?",
];

const ACCENT_PILL = "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)";
const WALLPAPER = "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)";

export default function ReflectionPage() {
  const { selectedMood, setSelectedMood, notes, addNote, deleteNote } = usePlayground();
  const [text, setText] = useState("");
  const [promptIndex, setPromptIndex] = useState(() => Math.floor(Math.random() * prompts.length));
  const [saved, setSaved] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayReflections = useMemo(() =>
    notes.filter(n => n.createdAt.startsWith(new Date().toISOString().split("T")[0]) && n.courseId === 0),
    [notes]
  );

  const weekReflections = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return notes.filter(n => new Date(n.createdAt) >= weekAgo && n.courseId === 0).length;
  }, [notes]);

  const streak = useMemo(() => {
    let count = 0;
    const d = new Date();
    const reflectionDates = new Set(
      notes.filter(n => n.courseId === 0).map(n => n.createdAt.split("T")[0])
    );
    while (reflectionDates.has(d.toISOString().split("T")[0])) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [notes]);

  const handleSave = () => {
    if (!text.trim()) return;
    addNote({ courseId: 0, lessonId: 0, text: `[${selectedMood}] ${text.trim()}` });
    setText("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleNewPrompt = () => {
    let next: number;
    do { next = Math.floor(Math.random() * prompts.length); } while (next === promptIndex && prompts.length > 1);
    setPromptIndex(next);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Themed Header Banner */}
      <div
        className="relative overflow-hidden rounded-[32px] p-8 md:p-10 border border-[var(--color-border-light)]"
        style={{ background: `${WALLPAPER}, var(--color-background-secondary)` }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sun size={20} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                Daily Reflection
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              How are you feeling?
            </h2>
            <p className="text-sm flex items-center gap-2" style={{ color: "var(--color-text-secondary)" }}>
              <Clock size={14} />
              {today}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background)] shadow-sm">
              <Brain size={18} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                {streak} day streak
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background)] shadow-sm">
              <BookOpen size={18} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                {weekReflections} this week
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="show"
      >
        {/* Main Column */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Mood Selector */}
          <motion.div
            variants={slideInItem}
            custom={0}
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 md:p-8 shadow-sm"
          >
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <Smile size={20} style={{ color: "var(--color-accent)" }} />
              How are you feeling today?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moods.map((mood) => {
                const MoodIcon = mood.icon;
                const isActive = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300"
                    style={{
                      background: isActive ? mood.bg : "var(--color-background)",
                      border: `2px solid ${isActive ? mood.color : "var(--color-border-light)"}`,
                      boxShadow: isActive ? `0 4px 16px ${mood.color}33` : "none",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    <MoodIcon
                      size={32}
                      style={{ color: isActive ? mood.color : "var(--color-text-tertiary)" }}
                      className="transition-all duration-300"
                    />
                    <span
                      className="text-sm font-bold transition-colors duration-300"
                      style={{ color: isActive ? mood.color : "var(--color-text-tertiary)" }}
                    >
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Journal Prompt */}
          <motion.div
            variants={slideInItem}
            custom={1}
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <PenLine size={20} style={{ color: "var(--color-accent)" }} />
                Today's Prompt
              </h4>
              <button
                onClick={handleNewPrompt}
                className="text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "var(--color-accent)", background: "var(--color-accent) / 8" }}
              >
                Shuffle <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl mb-5 border-l-[3px]" style={{ borderLeftColor: "var(--color-accent)", background: "var(--color-accent) / 6" }}>
              <Quote size={18} style={{ color: "var(--color-accent)" }} className="shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                {prompts[promptIndex]}
              </p>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your reflection here..."
              rows={5}
              className="w-full border-2 rounded-xl p-4 text-sm leading-relaxed resize-none transition-all"
              style={{
                background: "var(--color-background)",
                borderColor: "var(--color-border-light)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--color-accent)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--color-border-light)"}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                {text.length} characters
              </span>
              <button
                onClick={handleSave}
                disabled={!text.trim()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: ACCENT_PILL }}
              >
                <Sparkles size={16} /> Save Reflection
              </button>
            </div>
          </motion.div>

          {/* Recent Reflections */}
          {todayReflections.length > 0 && (
            <motion.div
              variants={slideInItem}
              custom={2}
              className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 md:p-8 shadow-sm"
            >
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <Clock size={20} style={{ color: "var(--color-accent)" }} />
                Today's Reflections
              </h4>
              <div className="flex flex-col gap-3">
                {todayReflections.slice().reverse().map((ref) => {
                  const moodMatch = moods.find(m => ref.text.startsWith(`[${m.label}]`));
                  const displayText = ref.text.replace(/^\[(Great|Good|Okay|Tough)\]\s*/, "");
                  return (
                    <div
                      key={ref.id}
                      className="flex items-start gap-3 p-4 rounded-xl border"
                      style={{ borderColor: "var(--color-border-light)", background: "var(--color-background)" }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: moodMatch?.bg || "var(--color-accent) / 10" }}>
                        {moodMatch
                          ? <moodMatch.icon size={16} style={{ color: moodMatch.color }} />
                          : <Heart size={16} style={{ color: "var(--color-accent)" }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                          {displayText}
                        </p>
                        <p className="text-[11px] mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                          {new Date(ref.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteNote(ref.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 size={14} style={{ color: "var(--color-text-tertiary)" }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Mood Streak */}
          <motion.div
            variants={slideInItem}
            custom={3}
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 shadow-sm"
          >
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <CloudMoon size={16} style={{ color: "var(--color-accent)" }} />
              Reflection Streak
            </h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl font-bold" style={{ color: "var(--color-accent)" }}>{streak}</div>
              <div className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                {streak === 0 ? "Start your streak today!" :
                 streak === 1 ? "day in a row" : "days in a row"}
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: Math.max(streak, 1) }, (_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: i < streak ? "var(--color-accent)" : "var(--color-border-light)",
                    color: i < streak ? "#fff" : "var(--color-text-tertiary)",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Summary */}
          <motion.div
            variants={slideInItem}
            custom={4}
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 shadow-sm"
          >
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <BookOpen size={16} style={{ color: "var(--color-accent)" }} />
              Weekly Summary
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>This week</span>
                <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{weekReflections} reflections</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: "var(--color-border-light)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((weekReflections / 7) * 100, 100)}%`, background: ACCENT_PILL }}
                />
              </div>
              <p className="text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>
                {weekReflections >= 7 ? "Perfect week! 🎉" :
                 `Reflect on ${7 - weekReflections} more day${7 - weekReflections > 1 ? "s" : ""} for a perfect week.`}
              </p>
            </div>
          </motion.div>

          {/* Mood History */}
          <motion.div
            variants={slideInItem}
            custom={5}
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 shadow-sm"
          >
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <Brain size={16} style={{ color: "var(--color-accent)" }} />
              All Reflections
            </h4>
            {notes.filter(n => n.courseId === 0).length === 0 ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CloudMoon size={28} style={{ color: "var(--color-text-tertiary)" }} />
                <p className="text-xs mt-2" style={{ color: "var(--color-text-tertiary)" }}>No reflections yet</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                  Start journaling above to build your history.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {notes.filter(n => n.courseId === 0).slice().reverse().slice(0, 5).map((ref) => {
                  const moodMatch = moods.find(m => ref.text.startsWith(`[${m.label}]`));
                  const displayText = ref.text.replace(/^\[(Great|Good|Okay|Tough)\]\s*/, "");
                  return (
                    <div key={ref.id} className="flex items-start gap-2 p-2.5 rounded-lg"
                      style={{ background: "var(--color-background)" }}>
                      {moodMatch && <moodMatch.icon size={14} style={{ color: moodMatch.color }} className="shrink-0 mt-0.5" />}
                      <div className="min-w-0">
                        <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--color-text-primary)" }}>
                          {displayText}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                          {new Date(ref.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl backdrop-blur-md text-white text-sm font-bold shadow-2xl flex items-center gap-2"
            style={{ background: ACCENT_PILL }}
          >
            <Sparkles size={16} className="text-white/80" />
            Reflection saved!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
