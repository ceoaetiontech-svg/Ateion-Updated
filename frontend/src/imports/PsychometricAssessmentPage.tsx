import { useState } from "react";
import jsPDF from "jspdf";
const scenarios = [
  "You are inside a spaceship and suddenly lose communication with Earth. What do you do?",
  "Your team is arguing during an important mission. How will you handle it?",
  "You discover a hidden planet with unknown life forms. What is your first action?",
  "Resources are running low. How will you prioritize survival?",
  "An AI system disagrees with your decision. What will you do?",
  "You must choose between mission success and team safety. Explain your choice.",
];

export default function PsychometricAssessmentPage() {
  const [round, setRound] = useState(1);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (round === 6) {
        setFinished(true);
      } else {
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

    doc.text(
      "30-Day Roadmap: Practice leadership exercises and critical thinking tasks.",
      20,
      130,
    );

    doc.save("Psychometric_Report.pdf");
  };
  if (finished) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Psychometric Report</h1>

          <div className="space-y-4">
            <p>
              <strong>Archetype Name:</strong> Strategic Explorer
            </p>
            <p>
              <strong>Strengths:</strong> Leadership, Curiosity, Problem Solving
            </p>
            <p>
              <strong>Growth Areas:</strong> Patience, Delegation
            </p>
            <p>
              <strong>Learning Style:</strong> Experiential Learning
            </p>
            <p>
              <strong>Decision Making Style:</strong> Analytical
            </p>
            <p>
              <strong>Estimated Cognitive Index:</strong> 87 / 100
            </p>
            <p>
              <strong>30-Day Roadmap:</strong> Practice leadership exercises and
              critical thinking tasks.
            </p>
          </div>

          <button
            onClick={downloadPDF}
            className="mt-6 px-5 py-3 bg-red-500 text-white rounded-lg"
          >
            Download PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Round {round} of 6</h2>

        <div className="bg-blue-50 p-5 rounded-lg mb-6">
          <p className="font-semibold">AI Scenario</p>
          <p className="mt-2">{scenarios[round - 1]}</p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full border rounded-lg p-4 h-40"
        />

        {loading && (
          <div className="mt-4 text-blue-500 font-semibold">
            AI is thinking...
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

