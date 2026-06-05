import { motion } from "framer-motion";
import { Smile, Heart, Brain, Activity, Wind, Clock, ChevronRight } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";

interface MentalHealthViewProps {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
}

export default function MentalHealthPage({ selectedMood, setSelectedMood }: MentalHealthViewProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Smile size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Mental Health & Support</span>
        </h3>

        <button className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-background-tertiary)] transition shadow-sm flex items-center gap-2">
          <Heart size={16} className="text-[var(--color-accent)]" /> 
          Talk to a Counselor
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* A. Mood Check-in (Fully Interactive & Professionalized) */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <Smile className="text-[var(--color-warning)]" size={20} />
            How are you feeling today?
          </h4>
          <div className="flex justify-between items-center gap-3 mb-6">
            {/* Stressed Button */}
            <button
              onClick={() => setSelectedMood("Stressed")}
              className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                selectedMood === "Stressed"
                  ? "border-[var(--color-accent)] bg-gradient-to-b from-[var(--color-accent)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                  : "border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-background-secondary)]"
              }`}
            >
              {selectedMood === "Stressed" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)]"></div>}
              <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Stressed" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>😫</span>
              <span className={`text-xs uppercase tracking-widest ${selectedMood === "Stressed" ? "font-bold text-[var(--color-accent)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                Stressed
              </span>
            </button>

            {/* Okay Button */}
            <button
              onClick={() => setSelectedMood("Okay")}
              className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                selectedMood === "Okay"
                  ? "border-[var(--color-warning)] bg-gradient-to-b from-[var(--color-warning)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                  : "border-[var(--color-border-light)] hover:border-[var(--color-warning)]/40 hover:bg-[var(--color-background-secondary)]"
              }`}
            >
              {selectedMood === "Okay" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-warning)]"></div>}
              <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Okay" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>😐</span>
              <span className={`text-xs uppercase tracking-widest ${selectedMood === "Okay" ? "font-bold text-[var(--color-warning)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                Okay
              </span>
            </button>

            {/* Good Button */}
            <button
              onClick={() => setSelectedMood("Good")}
              className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                selectedMood === "Good"
                  ? "border-[var(--color-info)] bg-gradient-to-b from-[var(--color-info)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                  : "border-[var(--color-border-light)] hover:border-[var(--color-info)]/40 hover:bg-[var(--color-background-secondary)]"
              }`}
            >
              {selectedMood === "Good" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-info)]"></div>}
              <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Good" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>😊</span>
              <span className={`text-xs uppercase tracking-widest ${selectedMood === "Good" ? "font-bold text-[var(--color-info)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                Good
              </span>
            </button>

            {/* Great Button */}
            <button
              onClick={() => setSelectedMood("Great")}
              className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                selectedMood === "Great"
                  ? "border-[var(--color-success)] bg-gradient-to-b from-[var(--color-success)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                  : "border-[var(--color-border-light)] hover:border-[var(--color-success)]/40 hover:bg-[var(--color-background-secondary)]"
              }`}
            >
              {selectedMood === "Great" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-success)]"></div>}
              <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Great" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>🤩</span>
              <span className={`text-xs uppercase tracking-widest ${selectedMood === "Great" ? "font-bold text-[var(--color-success)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                Great
              </span>
            </button>
          </div>

          {/* NEW FEATURE: Contextual Tags (Slides down when any mood is active) */}
          <div className={`transition-all duration-500 overflow-hidden ${selectedMood ? "max-h-40 opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"}`}>
            <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">
              What's contributing to your mood?
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Studies",
                "Health",
                "Sleep",
                "Social",
                "Coding",
                "Hobbies",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 text-xs font-bold rounded-full border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background-primary)] transition-all"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC AI Insight Box */}
          <div className="p-5 bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] rounded-2xl border border-[var(--color-border-light)] mt-auto relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)] opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500"></div>
            <p className="text-sm font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <Brain size={16} className="text-[var(--color-accent)]" /> AI Insight
            </p>
            <p className="text-[13px] font-medium text-[var(--color-text-secondary)] leading-relaxed min-h-[40px]">
              {selectedMood === "Stressed" &&
                "Take a deep breath. It looks like you're feeling overwhelmed. Consider trying the Box Breathing exercise below to recenter yourself."}
              {selectedMood === "Okay" &&
                "You're doing alright! A quick Mindfulness Practice could help elevate your focus and energy for the rest of the day."}
              {selectedMood === "Good" &&
                'Your mood has been consistently "Good"! Keeping up with your daily reflections is having a positive impact on your stress levels.'}
              {selectedMood === "Great" &&
                "Fantastic! You're in a great headspace to tackle challenging new concepts today. Keep that momentum going!"}
              {!selectedMood &&
                "Select a mood above to generate a real-time mental well-being insight based on your day."}
            </p>
          </div>
        </motion.div>

        {/* B. Recommended Exercises */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col bg-[var(--color-background-secondary)]">
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <Activity size={20} className="text-[var(--color-info)]" />
            Quick Relief Exercises
          </h4>
          <div className="flex flex-col gap-4">
            {/* Exercise 1 */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-info)]/40 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-info)]/10 text-[var(--color-info)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wind size={22} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">
                    Box Breathing
                  </p>
                  <p className="text-xs font-medium text-[var(--color-text-tertiary)] flex items-center gap-1">
                    <Clock size={10} /> 3 mins • Reduce anxiety
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center group-hover:bg-[var(--color-info)] group-hover:text-white text-[var(--color-text-tertiary)] transition-colors">
                <ChevronRight size={16} />
              </div>
            </div>

            {/* Exercise 2 */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-success)]/40 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Smile size={22} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">
                    Guided Meditation
                  </p>
                  <p className="text-xs font-medium text-[var(--color-text-tertiary)] flex items-center gap-1">
                    <Clock size={10} /> 10 mins • Regain focus
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center group-hover:bg-[var(--color-success)] group-hover:text-white text-[var(--color-text-tertiary)] transition-colors">
                <ChevronRight size={16} />
              </div>
            </div>

            {/* Exercise 3 */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart size={22} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">
                    Gratitude Journal
                  </p>
                  <p className="text-xs font-medium text-[var(--color-text-tertiary)] flex items-center gap-1">
                    <Clock size={10} /> 5 mins • Evening reflection
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white text-[var(--color-text-tertiary)] transition-colors">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
