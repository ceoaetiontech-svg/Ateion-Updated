import React from "react";
import { useNavigate } from "react-router";
import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <SharedNavbar />
      <div className="bg-[var(--color-background-primary)] w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-accent-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[var(--color-error)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 text-center clay-card p-12 max-w-lg mx-auto bg-[var(--color-background-secondary)] rounded-3xl shadow-xl border border-[var(--color-border-light)]">
          <h1 className="text-8xl font-black text-[var(--color-primary)] mb-4 tracking-[-0.05em] leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>404</h1>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Page Not Found</h2>
          <p className="text-[var(--color-text-muted)] mb-8 text-lg">
            Oops! The page you're looking for seems to have wandered off the syllabus.
          </p>
          
          <button 
            onClick={() => navigate("/")}
            className="btn-primary w-full sm:w-auto"
          >
            Return to Homepage
          </button>
        </div>
      </div>
      <SharedFooter />
    </>
  );
}
