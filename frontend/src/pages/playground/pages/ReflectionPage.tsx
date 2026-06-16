import { motion } from "framer-motion";
import { StickyNote, Smile, Meh, Frown, Sparkles, BookOpen } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";

const moods = [
  { label: "Great", icon: Sparkles, color: "var(--color-success)" },
  { label: "Good", icon: Smile, color: "var(--color-info)" },
  { label: "Okay", icon: Meh, color: "var(--color-warning)" },
  { label: "Tough", icon: Frown, color: "var(--color-accent)" },
];

export default function ReflectionPage() {
  const { selectedMood, setSelectedMood } = usePlayground();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <StickyNote size={28} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)]">Daily Reflection</span>
        </h3>
      </div>

      <p className="text-sm text-[var(--color-text-secondary)]">{today}</p>

      <motion.div
        className="flex flex-col gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUpItem}
          className="bg-[var(--color-background-secondary)] rounded-3xl p-8 border border-[var(--color-border-light)]"
        >
          <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
            <Smile size={24} className="text-[var(--color-accent)]" />
            How are you feeling today?
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {moods.map((mood) => {
              const MoodIcon = mood.icon;
              const isActive = selectedMood === mood.label;
              return (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-lg scale-105"
                      : "border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-accent)]/30 hover:shadow-md"
                  }`}
                >
                  <MoodIcon
                    size={36}
                    style={{ color: isActive ? mood.color : "var(--color-text-tertiary)" }}
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                  <span
                    className={`text-sm font-bold ${
                      isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]"
                    }`}
                  >
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          className="bg-[var(--color-background-secondary)] rounded-3xl p-8 border border-[var(--color-border-light)]"
        >
          <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
            <BookOpen size={24} className="text-[var(--color-accent)]" />
            Today's Prompt
          </h4>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
            What's one thing you learned today that you didn't know yesterday?
          </p>
          <textarea
            placeholder="Write your reflection here..."
            rows={4}
            className="w-full bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] rounded-2xl p-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all resize-none"
          />
          <button className="mt-4 bg-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2">
            <Sparkles size={16} /> Save Reflection
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
