import React from "react";

export default function GCOQuestionSection() {
  const cards = [
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "15px" }}>
          {/* Scales of Justice */}
          <path d="M12 3v18" />
          <path d="M9 21h6" />
          <path d="M5 7v1" />
          <path d="M19 7v1" />
          <path d="M2 13h6L5 7z" />
          <path d="M16 13h6L19 7z" />
          <path d="M5 7h14" />
        </svg>
      ),
      title: "Ethical reasoning",
      description: "Assessing moral implications, fairness, and potential biases in proposed technical solutions.",
    },
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "15px" }}>
          {/* Systems Thinking / Org Chart */}
          <rect x="10" y="3" width="4" height="4" rx="0.5" />
          <path d="M12 7v4" />
          <path d="M6 11h12" />
          <path d="M6 11v4" />
          <path d="M18 11v4" />
          <rect x="4" y="15" width="4" height="4" rx="0.5" />
          <path d="M12 11v4" />
          <rect x="10" y="15" width="4" height="4" rx="0.5" />
          <rect x="16" y="15" width="4" height="4" rx="0.5" />
        </svg>
      ),
      title: "Systems thinking",
      description: "Understanding how different parts of a complex system interact and influence each other.",
    },
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "15px" }}>
          {/* Trade-off Awareness / Opposing Arrows */}
          <path d="M17 8H3" />
          <path d="M7 4L3 8l4 4" />
          <path d="M7 16h14" />
          <path d="M17 12l4 4-4 4" />
        </svg>
      ),
      title: "Trade-off awareness",
      description: "Balancing competing priorities and acknowledging necessary compromises in strategy.",
    },
    {
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "15px" }}>
          {/* Adaptive Judgment / Compass */}
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7l-2 5 2 5 2-5 2-5z" transform="rotate(45 12 12)" />
        </svg>
      ),
      title: "Adaptive judgment",
      description: "Making informed decisions and adjusting strategies as new information becomes available.",
    }
  ];

  return (
    <section style={{
      backgroundColor: "#FAF8F2",
      padding: "100px 5%",
      fontFamily: "'Manrope', sans-serif",
      color: "#111827",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        maxWidth: "1350px",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "80px",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Left Content */}
        <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
          <h2 style={{
            fontFamily: "'OVSoge', sans-serif",
            fontSize: "clamp(3rem, 4.5vw, 4.2rem)",
            fontWeight: "600",
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
            margin: "0 0 25px 0",
            color: "#0a0f1c"
          }}>
            Experience a<br />GCO Question
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "#6b7280",
            margin: "0 0 40px 0",
            fontWeight: "400"
          }}>
            A city plans to use AI-powered surveillance for crime prevention. What ethical, social, and technical factors should be considered before implementation?
          </p>
          <button style={{
            backgroundColor: "#fa4f54",
            color: "#ffffff",
            border: "none",
            borderRadius: "100px",
            padding: "16px 36px",
            fontSize: "1.05rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(250, 79, 84, 0.4)",
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
            fontFamily: "'Manrope', sans-serif"
          }}>
            Start Assessment
          </button>
        </div>

        {/* Right Grid */}
        <div style={{
          flex: "1 1 600px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          maxWidth: "800px"
        }}>
          {cards.map((card, index) => (
            <div key={index} style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "45px 40px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <div style={{ color: "#111827" }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: "'OV Soge', sans-serif",
                fontSize: "1.55rem",
                fontWeight: "600",
                margin: "0",
                color: "#0a0f1c",
                letterSpacing: "-0.01em"
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                color: "#4b5563",
                margin: "0"
              }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}