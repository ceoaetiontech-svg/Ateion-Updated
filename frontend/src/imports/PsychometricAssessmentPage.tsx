import { useState } from "react";
import jsPDF from "jspdf";
import { Brain, ArrowRight, Download, CheckCircle2, ShieldCheck } from "lucide-react";

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
      130
    );

    doc.save("Psychometric_Report.pdf");
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[var(--color-background-primary)] flex flex-col justify-center items-center p-4 sm:p-8 animate-fade-in relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary)] opacity-10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary)] opacity-10 blur-[100px] pointer-events-none"></div>
        
        <div className="clay-card bg-[var(--color-background-secondary)] p-8 md:p-12 rounded-3xl w-full max-w-3xl z-10 border border-[var(--color-border-light)] shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <ShieldCheck size={120} className="text-[var(--color-primary)]" />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
               <CheckCircle2 className="text-emerald-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">Psychometric Report</h1>
              <p className="text-[var(--color-text-secondary)] mt-1 font-medium">Your cognitive assessment is complete.</p>
            </div>
          </div>

          <div className="space-y-4 mb-10 bg-[var(--color-background-primary)] p-6 rounded-2xl border border-[var(--color-border-medium)]">
            <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Archetype Name:</strong>
              <span className="text-[var(--color-text-primary)] font-semibold text-lg text-[var(--color-primary)]">Strategic Explorer</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)] mt-1">Strengths:</strong>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-sm font-semibold">Leadership</span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-lg text-sm font-semibold">Curiosity</span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-lg text-sm font-semibold">Problem Solving</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)] mt-1">Growth Areas:</strong>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-sm font-semibold">Patience</span>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-sm font-semibold">Delegation</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Learning Style:</strong>
              <span className="text-[var(--color-text-primary)] font-medium">Experiential Learning</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Decision Making Style:</strong>
              <span className="text-[var(--color-text-primary)] font-medium">Analytical</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)]">Cognitive Index:</strong>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2.5 bg-[var(--color-border-medium)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[87%] rounded-full"></div>
                </div>
                <span className="text-[var(--color-text-primary)] font-bold">87 / 100</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-[var(--color-border-light)] last:border-0">
              <strong className="w-48 text-[var(--color-text-secondary)] shrink-0">30-Day Roadmap:</strong>
              <span className="text-[var(--color-text-primary)] font-medium">Practice leadership exercises and critical thinking tasks.</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-[var(--shadow-button)]"
            >
              <Download size={18} />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] flex flex-col justify-center items-center p-4 sm:p-8 animate-fade-in relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 opacity-10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500 opacity-10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-3xl z-10 flex flex-col gap-6">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)] flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
               <Brain size={20} />
             </div>
             Scenario {round} of 6
           </h2>
           <div className="w-32 sm:w-48 h-2 bg-[var(--color-background-secondary)] rounded-full overflow-hidden border border-[var(--color-border-light)]">
             <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(round / 6) * 100}%` }}
             ></div>
           </div>
        </div>

        {/* Main Card */}
        <div className="clay-card bg-[var(--color-background-secondary)] rounded-3xl p-6 sm:p-10 shadow-xl border border-[var(--color-border-light)]">
          
          <div className="bg-[var(--color-background-primary)] p-6 rounded-2xl mb-8 border border-[var(--color-border-medium)] shadow-inner relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
            <p className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-tertiary)] mb-2 flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" /> AI Scenario Generator
            </p>
            <p className="text-lg md:text-xl font-medium text-[var(--color-text-primary)] leading-relaxed">
              {scenarios[round - 1]}
            </p>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your strategic decision here..."
            className="clay-input w-full rounded-2xl p-5 h-40 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all shadow-inner text-base md:text-lg"
            disabled={loading}
          />

          <div className="mt-8 flex items-center justify-between min-h-[48px]">
            <div>
              {loading && (
                <div className="flex items-center gap-3 text-blue-500 font-semibold animate-pulse">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                  Analyzing Response...
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !answer.trim()}
              className={`
                px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[var(--shadow-button)]
                ${(!answer.trim() || loading) 
                  ? 'bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)] cursor-not-allowed shadow-none border border-[var(--color-border-light)]' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {round === 6 ? 'Finalize Assessment' : 'Submit & Continue'}
              {!loading && answer.trim() && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
