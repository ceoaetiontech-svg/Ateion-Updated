import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Target, Sun, Moon } from "lucide-react";
import { useTheme } from "../app/components/ThemeProvider";
import SharedFooter from "../app/components/SharedFooter";

const questions = [
  {
    question: "Which of the following best represents capability-first education?",
    options: [
      "A. Memorizing answers for exams",
      "B. Applying knowledge to real-world problems",
      "C. Repeating textbook definitions",
      "D. Learning only through lectures",
    ],
  },
  {
    question: "What is the most important skill in collaborative innovation?",
    options: [
      "A. Working alone",
      "B. Avoiding communication",
      "C. Team problem solving",
      "D. Memorizing theory",
    ],
  },
  {
    question: "Why is systems thinking important in modern education?",
    options: [
      "A. It ignores real-world problems",
      "B. It helps understand connected systems",
      "C. It focuses only on marks",
      "D. It replaces creativity",
    ],
  },
];

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.45, 0.32, 0.9] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function AssessmentDemoPage() {
  const { theme, toggleTheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [direction, setDirection] = useState(0);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectOption = (option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: option });
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "var(--color-background-primary)" }}
    >
      {/* ── Floating Orbs ── */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "700px", height: "700px", top: "-180px", right: "-150px",
          background: "radial-gradient(circle, rgba(232,133,106,0.2) 0%, rgba(232,133,106,0.08) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "550px", height: "550px", bottom: "0%", left: "-120px",
          background: "radial-gradient(circle, rgba(200,197,220,0.15) 0%, rgba(232,133,106,0.06) 40%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "500px", height: "500px", top: "35%", left: "60%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(232,133,106,0.12) 0%, rgba(200,197,220,0.06) 40%, transparent 70%)",
          filter: "blur(150px)",
        }}
      />

      <div className="relative z-10 pt-[100px] pb-[80px] px-[20px] md:px-[60px]">
        {/* Theme Toggle */}
        <div className="max-w-[900px] mx-auto mb-4 flex justify-end">
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{
              backgroundColor: "rgba(232,133,106,0.08)",
              border: "1px solid rgba(232,133,106,0.15)",
              color: "var(--color-accent)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        <motion.div
          className="max-w-[900px] mx-auto rounded-3xl p-[30px] md:p-[50px] clay-card"
          style={{
            backgroundColor: "var(--color-background-secondary)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.45, 0.32, 0.9] }}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold mb-2 tracking-wider" style={{ color: "var(--color-accent)" }}>
                Global Capability Olympiad
              </p>
              <h1 className="text-[clamp(28px,4vw,40px)] font-bold font-['OV_Soge'] leading-none" style={{ color: "var(--color-text-primary)" }}>
                Assessment Demo
              </h1>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm shrink-0"
              style={{
                backgroundColor: "rgba(232,133,106,0.08)",
                border: "1px solid rgba(232,133,106,0.15)",
                color: "var(--color-accent)",
              }}
            >
              <Clock size={16} />
              15:00
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: "var(--color-text-tertiary)" }}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--color-text-tertiary)" }}>
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {questions.map((_, idx) => {
                const isDone = idx < currentQuestion && selectedAnswers[idx];
                const isCurrent = idx === currentQuestion;
                return (
                  <div
                    key={idx}
                    className="rounded-full transition-all duration-300"
                    style={{
                      height: 10,
                      width: isCurrent ? 32 : 10,
                      backgroundColor: isDone
                        ? "var(--color-accent)"
                        : isCurrent
                          ? "rgba(232,133,106,0.2)"
                          : "var(--color-border-light)",
                      border: isCurrent ? "2px solid var(--color-accent)" : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* QUESTION */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                style={{ backgroundColor: "rgba(232,133,106,0.1)", color: "var(--color-accent)" }}
              >
                {currentQuestion + 1}
              </div>
              <h2 className="text-xl font-semibold leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                {questions[currentQuestion].question}
              </h2>
            </div>
          </div>

          {/* OPTIONS */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              className="flex flex-col gap-3"
              custom={direction}
              variants={{
                initial: (d: number) => ({ opacity: 0, x: d * 60 }),
                animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.21, 0.45, 0.32, 0.9] } },
                exit: (d: number) => ({ opacity: 0, x: d * -60, transition: { duration: 0.25 } }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === option;
                return (
                  <motion.button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className="w-full text-left rounded-2xl p-4 md:p-5 font-semibold transition-all duration-200 flex items-center gap-4 group"
                    style={{
                      backgroundColor: isSelected
                        ? "rgba(232,133,106,0.1)"
                        : "rgba(0,0,0,0.02)",
                      border: isSelected
                        ? "1.5px solid var(--color-accent)"
                        : "1px solid var(--color-border-light)",
                      color: isSelected
                        ? "var(--color-accent)"
                        : "var(--color-text-secondary)",
                      boxShadow: isSelected
                        ? "0 0 24px rgba(232,133,106,0.12)"
                        : "none",
                    }}
                    whileHover={!isSelected ? {
                      backgroundColor: "rgba(232,133,106,0.06)",
                      borderColor: "var(--color-accent)",
                      color: "var(--color-accent)",
                      scale: 1.01,
                    } : {}}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200"
                      style={{
                        backgroundColor: isSelected ? "var(--color-accent)" : "var(--color-border-light)",
                        color: isSelected ? "#fff" : "var(--color-text-tertiary)",
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option.replace(/^[A-D]\.\s*/, "")}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Target size={16} className="text-[var(--color-accent)]" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* NAV BUTTONS */}
          <div className="flex items-center justify-between mt-10">
            <motion.button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "transparent",
                border: "1px solid var(--color-border-light)",
                color: "var(--color-text-secondary)",
              }}
              whileHover={currentQuestion > 0 ? { backgroundColor: "rgba(232,133,106,0.06)", borderColor: "var(--color-accent)", color: "var(--color-accent)" } : {}}
              whileTap={{ scale: 0.97 }}
            >
              <ChevronLeft size={18} />
              Previous
            </motion.button>

            <motion.button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(232,133,106,0.25)",
              }}
              whileHover={currentQuestion < questions.length - 1 ? { scale: 1.03, boxShadow: "0 6px 28px rgba(232,133,106,0.35)" } : {}}
              whileTap={{ scale: 0.97 }}
            >
              Next Question
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <SharedFooter />
    </div>
  );
}
