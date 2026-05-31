import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Scale, Network, ArrowLeftRight, Compass } from "lucide-react";

export default function GCOQuestionSection() {

  const navigate = useNavigate();

  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined"
      ? window.innerWidth
      : 1200
  );

  useEffect(() => {

    let ticking = false;

    const handleResize = () => {

      if (ticking) return;

      requestAnimationFrame(() => {

        setViewportWidth(window.innerWidth);

        ticking = false;

      });

      ticking = true;

    };

    window.addEventListener(
      "resize",
      handleResize,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  const isMobile = viewportWidth <= 768;

  const isSmallMobile = viewportWidth <= 480;

  const cards = [
    {
      icon: (
        <Scale size={46} strokeWidth={1.5} className="text-[var(--color-text-primary)] mb-[15px]" />
      ),
      title: "Ethical reasoning",
      description:
        "Assessing moral implications, fairness, and potential biases in proposed technical solutions.",
    },

    {
      icon: (
        <Network size={46} strokeWidth={1.5} className="text-[var(--color-text-primary)] mb-[15px]" />
      ),
      title: "Systems thinking",
      description:
        "Understanding how different parts of a complex system interact and influence each other.",
    },

    {
      icon: (
        <ArrowLeftRight size={46} strokeWidth={1.5} className="text-[var(--color-text-primary)] mb-[15px]" />
      ),
      title: "Trade-off awareness",
      description:
        "Balancing competing priorities and acknowledging necessary compromises in strategy.",
    },

    {
      icon: (
        <Compass size={46} strokeWidth={1.5} className="text-[var(--color-text-primary)] mb-[15px]" />
      ),
      title: "Adaptive judgment",
      description:
        "Making informed decisions and adjusting strategies as new information becomes available.",
    },
  ];

  return (

    <section
      style={{
        backgroundColor: "var(--color-background-primary)",
        padding: isMobile
          ? "60px 20px"
          : "100px 5%",
        fontFamily: "'Manrope', sans-serif",
        color: "var(--color-text-primary)",
        minHeight: isMobile
          ? "auto"
          : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <div
        style={{
          maxWidth: "1350px",
          width: "100%",
          display: "flex",
          flexDirection: isMobile
            ? "column"
            : "row",
          gap: isMobile ? "40px" : "80px",
          alignItems: isMobile
            ? "stretch"
            : "center",
          justifyContent: "space-between",
        }}
      >

        {/* LEFT SIDE */}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: isMobile
              ? "100%"
              : "500px",
            textAlign: isMobile
              ? "center"
              : "left",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile
              ? "center"
              : "flex-start",
          }}
        >

          <h2
            style={{
              fontFamily:
                "'OV Soge', sans-serif",
              fontSize: isMobile
                ? "clamp(1.85rem, 9vw, 2.8rem)"
                : "clamp(3rem, 4.5vw, 4.2rem)",
              fontWeight: "600",
              lineHeight: isMobile
                ? "1.15"
                : "1.05",
              letterSpacing: "-0.04em",
              margin: isMobile
                ? "0 0 16px 0"
                : "0 0 25px 0",
              color: "var(--color-text-primary)",
            }}
          >
            Experience a
            <br />
            GCO Question
          </h2>

          <p
            style={{
              fontFamily:
                "'Manrope', sans-serif",
              fontSize: isMobile
                ? "0.95rem"
                : "1.05rem",
              lineHeight: isMobile
                ? "1.65"
                : "1.7",
              color: "var(--color-text-tertiary)",
              margin: isMobile
                ? "0 0 24px 0"
                : "0 0 40px 0",
              fontWeight: "400",
              maxWidth: isMobile
                ? "100%"
                : "none",
            }}
          >
            A city plans to use AI-powered
            surveillance for crime prevention.
            What ethical, social, and technical
            factors should be considered before
            implementation?
          </p>

          <button
            type="button"
            aria-label="Start the GCO capability assessment"
            onClick={() =>
              navigate("/assessment-demo")
            }
            className="clay-button"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-white)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              padding: isSmallMobile
                ? "14px 22px"
                : isMobile
                ? "15px 28px"
                : "16px 36px",
              fontSize: isMobile
                ? "0.95rem"
                : "1.05rem",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily:
                "'Manrope', sans-serif",
              width: isSmallMobile
                ? "100%"
                : "auto",
              maxWidth: isSmallMobile
                ? "320px"
                : "none",
            }}
          >
            Start Assessment
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            flex: "1 1 600px",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile
              ? "20px"
              : "32px",
            maxWidth: isMobile
              ? "100%"
              : "800px",
            width: "100%",
          }}
        >

          {cards.map((card, index) => (

            <div
              key={index}
              className="clay-card"
              style={{
                backgroundColor: "var(--color-background-secondary)",
                borderRadius: isMobile
                  ? "16px"
                  : "20px",
                padding: isSmallMobile
                  ? "22px 18px"
                  : isMobile
                  ? "26px 22px"
                  : "45px 40px",
                display: "flex",
                flexDirection: "column",
                gap: isMobile
                  ? "10px"
                  : "10px",
              }}
            >

              <div style={{ color: "var(--color-text-primary)" }}>
                {card.icon}
              </div>

              <h3
                style={{
                  fontFamily:
                    "'OV Soge', sans-serif",
                  fontSize: isMobile
                    ? "1.35rem"
                    : "1.55rem",
                  fontWeight: "600",
                  margin: "0",
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                  fontSize: isMobile
                    ? "0.92rem"
                    : "0.95rem",
                  lineHeight: isMobile
                    ? "1.65"
                    : "1.6",
                  color: "var(--color-text-tertiary)",
                  margin: "0",
                }}
              >
                {card.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}