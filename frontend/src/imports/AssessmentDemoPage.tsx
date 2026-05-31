import { useState } from "react";

import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";

export default function AssessmentDemoPage() {

  const questions = [

    {
      question:
        "Which of the following best represents capability-first education?",

      options: [
        "A. Memorizing answers for exams",
        "B. Applying knowledge to real-world problems",
        "C. Repeating textbook definitions",
        "D. Learning only through lectures",
      ],
    },

    {
      question:
        "What is the most important skill in collaborative innovation?",

      options: [
        "A. Working alone",
        "B. Avoiding communication",
        "C. Team problem solving",
        "D. Memorizing theory",
      ],
    },

    {
      question:
        "Why is systems thinking important in modern education?",

      options: [
        "A. It ignores real-world problems",
        "B. It helps understand connected systems",
        "C. It focuses only on marks",
        "D. It replaces creativity",
      ],
    },

  ];

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswers, setSelectedAnswers] =
    useState<{ [key: number]: string }>({});

  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }

  };

  const previousQuestion = () => {

    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }

  };

  const handleSelectOption = (
    option: string
  ) => {

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: option,
    });

  };

  return (

    <div className="min-h-screen overflow-x-hidden relative" style={{ background: "var(--color-background-primary)" }}>

      {/* ── Floating Blurred Orbs with liquid glass animation ── */}
      <div
        className="pointer-events-none absolute rounded-full liquid-glass-orb"
        style={{
          width: "700px",
          height: "700px",
          top: "-180px",
          right: "-150px",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 35%, transparent) 0%, color-mix(in srgb, var(--color-info) 20%, transparent) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full liquid-glass-orb"
        style={{
          width: "550px",
          height: "550px",
          bottom: "0%",
          left: "-120px",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-info) 30%, transparent) 0%, color-mix(in srgb, var(--color-primary) 15%, transparent) 40%, transparent 70%)",
          filter: "blur(140px)",
          animationDelay: "-3s",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full liquid-glass-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "35%",
          left: "60%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 25%, transparent) 0%, color-mix(in srgb, var(--color-info) 12%, transparent) 40%, transparent 70%)",
          filter: "blur(150px)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full liquid-glass-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "12%",
          left: "8%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-info) 25%, transparent) 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 50%, transparent 70%)",
          filter: "blur(100px)",
          animationDelay: "-9s",
        }}
      />

      {/* NAVBAR */}
      <SharedNavbar />

      {/* PAGE */}
      <div className="relative z-10 pt-[140px] pb-[80px] px-[20px] md:px-[60px]">

        {/* ── Liquid Glass Card ── */}
        <div
          className="max-w-[900px] mx-auto p-[30px] md:p-[50px] liquid-glass-card"
          style={{
            background: "var(--color-background-secondary)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >

          {/* TOP */}
          <div className="flex items-center justify-between mb-[40px]">

            <div>

              <p style={{ color: "var(--color-text-tertiary)", fontSize: "14px", marginBottom: "8px", letterSpacing: "0.5px" }}>
                Global Capability Olympiad
              </p>

              <h1
                style={{
                  fontFamily: "'OV Soge', sans-serif",
                  fontSize: "clamp(32px, 5vw, 46px)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.1,
                }}
              >
                Assessment Demo
              </h1>

            </div>

            {/* ── Timer Pill ── */}
            <div
              className="px-5 py-3 rounded-full font-semibold flex-shrink-0"
              style={{
                background: "var(--color-primary_light)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid var(--color-border-medium)",
                color: "var(--color-text-secondary)",
                letterSpacing: "1px",
              }}
            >
              15:00
            </div>

          </div>

          {/* QUESTION */}
          <div className="mb-[40px]">

            <p style={{ fontSize: "18px", color: "var(--color-text-tertiary)", marginBottom: "8px" }}>
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </p>

            {/* ── Progress Dots ── */}
            <div className="flex items-center gap-[10px] mb-[24px]">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentQuestion ? "28px" : "10px",
                    height: "10px",
                    background:
                      idx === currentQuestion
                        ? "var(--color-primary)"
                        : idx < currentQuestion && selectedAnswers[idx]
                          ? "color-mix(in srgb, var(--color-primary) 50%, transparent)"
                          : "var(--color-border-light)",
                    border: idx === currentQuestion ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border-light)",
                    boxShadow: idx === currentQuestion ? "0 0 16px color-mix(in srgb, var(--color-primary) 40%, transparent)" : "none",
                  }}
                />
              ))}
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.5 }}>

              {
                questions[currentQuestion]
                  .question
              }

            </h2>

          </div>

          {/* OPTIONS */}
          <div className="flex flex-col gap-[16px]">

            {questions[
              currentQuestion
            ].options.map(
              (option, index) => {

                const isSelected =
                  selectedAnswers[currentQuestion] === option;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleSelectOption(option)
                    }
                    className="w-full text-left rounded-[18px] p-[20px] font-medium transition-all duration-300"
                    style={{
                      background: isSelected
                        ? "color-mix(in srgb, var(--color-primary) 18%, var(--color-background-secondary))"
                        : "color-mix(in srgb, var(--color-text-primary) 4%, var(--color-background-secondary))",
                      border: isSelected
                        ? "1.5px solid color-mix(in srgb, var(--color-primary) 60%, transparent)"
                        : "1px solid var(--color-border-light)",
                      color: isSelected ? "var(--color-primary)" : "var(--color-text-secondary)",
                      boxShadow: isSelected
                        ? "0 0 20px color-mix(in srgb, var(--color-primary) 15%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-primary) 15%, transparent)"
                        : "inset 0 1px 0 var(--color-border-light)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.border = "1px solid var(--color-border-medium)";
                        e.currentTarget.style.background = "color-mix(in srgb, var(--color-text-primary) 7%, var(--color-background-secondary))";
                        e.currentTarget.style.boxShadow = "0 0 16px color-mix(in srgb, var(--color-primary) 8%, transparent)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.border = "1px solid var(--color-border-light)";
                        e.currentTarget.style.background = "color-mix(in srgb, var(--color-text-primary) 4%, var(--color-background-secondary))";
                        e.currentTarget.style.boxShadow = "inset 0 1px 0 var(--color-border-light)";
                      }
                    }}
                  >
                    {option}
                  </button>
                );

              }
            )}

          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-between mt-[50px]">

            {/* ── Previous Button ── */}
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-full font-medium transition-all duration-200 disabled:opacity-30"
              style={{
                background: "color-mix(in srgb, var(--color-text-primary) 6%, var(--color-background-secondary))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--color-border-light)",
                color: "var(--color-text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "color-mix(in srgb, var(--color-primary) 15%, var(--color-background-secondary))";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.color = "var(--color-primary)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "color-mix(in srgb, var(--color-text-primary) 6%, var(--color-background-secondary))";
                e.currentTarget.style.borderColor = "var(--color-border-light)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              Previous
            </button>

            {/* ── Next Button ── */}
            <button
              onClick={nextQuestion}
              disabled={
                currentQuestion ===
                questions.length - 1
              }
              className="px-8 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-30"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-white)",
                border: "1px solid var(--color-border-medium)",
                boxShadow: "0 0 28px color-mix(in srgb, var(--color-primary) 35%, transparent), 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.boxShadow = "0 0 40px color-mix(in srgb, var(--color-primary) 50%, transparent), 0 6px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)";
                  e.currentTarget.style.background = "var(--color-primary-hover)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 28px color-mix(in srgb, var(--color-primary) 35%, transparent), 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)";
                e.currentTarget.style.background = "var(--color-primary)";
              }}
            >
              Next Question
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <SharedFooter />

    </div>

  );
}
