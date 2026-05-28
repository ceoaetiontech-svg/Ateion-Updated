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

    <div className="min-h-screen bg-[#f7f3eb] overflow-x-hidden">

      {/* NAVBAR */}
      <SharedNavbar />

      {/* PAGE */}
      <div className="pt-[140px] pb-[80px] px-[20px] md:px-[60px]">

        <div className="max-w-[900px] mx-auto bg-white rounded-[30px] p-[30px] md:p-[50px] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

          {/* TOP */}
          <div className="flex items-center justify-between mb-[40px]">

            <div>

              <p className="text-[14px] text-gray-500 mb-2">
                Global Capability Olympiad
              </p>

              <h1
                className="text-[32px] md:text-[46px] font-bold text-black"
                style={{
                  fontFamily:
                    "'OV Soge', sans-serif",
                }}
              >
                Assessment Demo
              </h1>

            </div>

            <div className="bg-[#fb4444] text-white px-5 py-3 rounded-full font-semibold">
              15:00
            </div>

          </div>

          {/* QUESTION */}
          <div className="mb-[40px]">

            <p className="text-[18px] text-gray-500 mb-4">
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </p>

            <h2 className="text-[24px] font-semibold text-black leading-[1.5]">

              {
                questions[currentQuestion]
                  .question
              }

            </h2>

          </div>

          {/* OPTIONS */}
          <div className="flex flex-col gap-[20px]">

            {questions[
              currentQuestion
            ].options.map(
              (option, index) => (

                <button
                  key={index}
                  onClick={() =>
                    handleSelectOption(option)
                  }
                  className={`w-full text-left border rounded-[18px] p-[20px] transition font-medium

                  ${
                    selectedAnswers[
                      currentQuestion
                    ] === option
                      ? "border-[#fb4444] bg-[#fff1f1] text-[#fb4444]"
                      : "border-gray-200 hover:border-[#fb4444] hover:bg-[#fff5f5]"
                  }
                  `}
                >
                  {option}
                </button>

              )
            )}

          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-between mt-[50px]">

            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={
                currentQuestion ===
                questions.length - 1
              }
              className="bg-[#fb4444] hover:bg-[#ff5a5a] text-white px-8 py-3 rounded-full font-semibold transition disabled:opacity-40"
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