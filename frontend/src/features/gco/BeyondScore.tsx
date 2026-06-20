import React, { useEffect, useState } from "react";
import imgChild from "../../assets/beyond-child.webp";
import imgPink from "../../assets/beyond-pink.webp";
import imgCode from "../../assets/beyond-code.webp";

export default function BeyondScoreClone() {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
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
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = viewportWidth <= 1024;
  const isMobile = viewportWidth <= 768;
  const isSmallMobile = viewportWidth <= 480;

  const reportItems = [
    "Cognitive strengths mapping",
    "Behavioral analysis under pressure",
    "Adaptive reasoning index",
    "Ethical decision-making profile",
    "Blind spot insights",
    "Growth pathway recommendations",
  ];

  return (
    <div
      className="dark-section"
      style={{
        backgroundColor: "var(--color-background-black)",
        fontFamily: "var(--font-body)",
        minHeight: "100vh",
        color: "var(--color-background-secondary)",
        overflowX: "hidden",
      }}
    >
      {/* --- HERO SECTION --- */}
      <section
        style={{
          padding: isMobile
            ? "24px 16px 40px"
            : isTablet
              ? "32px 24px 56px"
              : "40px 5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: "var(--max-width)",
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(15,15,18,1) 0%, rgba(10,10,20,1) 50%, rgba(30,20,60,1) 100%)",
            borderRadius: isMobile ? "28px" : "40px",
            padding: isMobile
              ? "32px 20px"
              : isTablet
                ? "48px 32px"
                : "80px 60px",
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isTablet ? "stretch" : "center",
            gap: isMobile ? "28px" : isTablet ? "40px" : "40px",
            overflow: "hidden",
            boxShadow: "var(--shadow-clay)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "800px",
              height: "800px",
              background:
                "radial-gradient(circle, rgba(100, 70, 200, 0.25) 0%, rgba(0,0,0,0) 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Left Side Text */}
          <div
            style={{
              flex: "0 0 45%",
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: isTablet ? "100%" : "45%",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-inverse)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: "600",
                letterSpacing: "-0.05em",
                margin: "0 0 10px 0",
                lineHeight: "0.95",
              }}
            >
              Beyond a Score
            </h1>
            <p
              style={{
                color: "var(--color-text-muted-dark)",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: "400",
                margin: isMobile ? "0 0 28px 0" : "0 0 50px 0",
              }}
            >
              A Strategic Intelligence Report
            </p>

            <div style={{ marginBottom: isMobile ? "28px" : "50px" }}>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                EACH STUDENT RECEIVES:
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {reportItems.map((item) => (
                  <li
                    key={item}
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                      fontWeight: "500",
                      marginBottom: isMobile ? "14px" : "16px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="clay-button"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "var(--color-background-secondary)",
                padding: isSmallMobile ? "12px 18px" : "12px 24px",
                borderRadius: "100px",
                fontSize: "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              View intelligence report{" "}
              <span style={{ fontSize: "1.2rem" }}>→</span>
            </button>
          </div>

          {/* Right Side Mockups */}
          <div
            style={{
              flex: "0 0 50%",
              position: "relative",
              height: isTablet ? "auto" : "600px",
              display: "flex",
              justifyContent: isTablet ? "flex-start" : "center",
              alignItems: "center",
              zIndex: 1,
              width: "100%",
              overflow: isTablet ? "auto hidden" : "visible",
              paddingBottom: isTablet ? "8px" : "0",
            }}
          >
            {isTablet ? (
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "16px" : "20px",
                  width: "max-content",
                  padding: "8px 4px",
                }}
              >
                {[
                  {
                    title: "Cognitive strengths",
                    eyebrow: "COGNITIVE MAPPING",
                    eyebrowColor: "#E8856A",
                    description:
                      "Discover behavioral analysis under pressure. Uncover latent problem-solving pathways that standard tests miss.",
                    image: imgChild,
                    imageFirst: true,
                    accent: "#E8856A",
                  },
                  {
                    title: "Mapping the future of learning",
                    eyebrow: "ADAPTIVE INDEX",
                    eyebrowColor: "#C8C5DC",
                    description:
                      "Our end-to-end approach offers a complete picture of the student journey, allowing us to create data-driven ethical profiles.",
                    image: imgCode,
                    imageFirst: true,
                    accent: "#E8856A",
                  },
                  {
                    title: "Empower your potential",
                    eyebrow: "GROWTH PATHWAYS",
                    eyebrowColor: "#1A1833",
                    description:
                      "Strategic recommendations tailored to your unique intelligence profile, underpinned by blind spot insights.",
                    image: imgPink,
                    imageFirst: false,
                    accent: "#C8C5DC",
                  },
                ].map((phone, index) => (
                  <div
                    key={index}
                    className="clay-card"
                    style={{
                      width: isMobile ? "260px" : "290px",
                      minWidth: isMobile ? "260px" : "290px",
                      background:
                        "linear-gradient(180deg, var(--color-background-black) 0%, var(--color-background-black) 100%)",
                      borderRadius: "30px",
                      border: "1.5px solid rgba(255,255,255,0.08)",
                      padding: isMobile ? "18px 16px" : "20px 18px",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: isMobile ? "430px" : "470px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Report
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "var(--color-background-black)",
                          }}
                        />
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "var(--color-background-black)",
                          }}
                        />
                      </div>
                    </div>

                    {phone.imageFirst && (
                      <div
                        style={{
                          height: isMobile ? "150px" : "170px",
                          width: "100%",
                          borderRadius: "18px",
                          marginBottom: "18px",
                          position: "relative",
                          overflow: "hidden",
                          background: "var(--color-background-dark)",
                        }}
                      >
                        <img
                          src={phone.image}
                          alt={phone.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: phone.title.includes("future")
                              ? "contain"
                              : "cover",
                            objectPosition: "center",
                            position: "absolute",
                            inset: 0,
                          }}
                        />
                      </div>
                    )}

                    <p
                      style={{
                        color: phone.eyebrowColor,
                        fontSize: "0.62rem",
                        fontWeight: "800",
                        letterSpacing: "0.11em",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ color: phone.eyebrowColor }}>•</span>{" "}
                      {phone.eyebrow}
                    </p>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-primary)",
                        fontSize: "clamp(1.2rem, 2vw, 1.35rem)",
                        fontWeight: "500",
                        margin: "0 0 10px 0",
                        lineHeight: "1.15",
                      }}
                    >
                      {phone.title}
                    </h4>
                    <p
                      style={{
                        color: "var(--color-text-muted-dark)",
                        fontSize: "clamp(0.76rem, 1vw, 0.8rem)",
                        lineHeight: "1.65",
                        margin: 0,
                      }}
                    >
                      {phone.description}
                    </p>

                    {!phone.imageFirst && (
                      <div
                        style={{
                          height: isMobile ? "160px" : "180px",
                          width: "100%",
                          borderRadius: "18px",
                          marginTop: "auto",
                          position: "relative",
                          overflow: "hidden",
                          background: "var(--color-background-dark)",
                        }}
                      >
                        <img
                          src={phone.image}
                          alt={phone.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            position: "absolute",
                            inset: 0,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Left Phone */}
                <div
                  className="clay-card"
                  style={{
                    position: "absolute",
                    left: "2%",
                    top: "15%",
                    width: "240px",
                    height: "460px",
                    background: "var(--color-background-black)",
                    borderRadius: "30px",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                    padding: "16px 14px",
                    transform: "rotate(-10deg)",
                    zIndex: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                      marginBottom: "10px",
                      color: "var(--color-text-muted-dark)",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "var(--color-background-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "var(--color-background-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 10 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M1 1H9M1 4H9M1 7H9" />
                      </svg>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "145px",
                      width: "100%",
                      borderRadius: "15px",
                      marginBottom: "15px",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "var(--color-background-dark)",
                    }}
                  >
                    <img
                      src={imgChild}
                      alt="Cognitive strengths"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                        position: "absolute",
                        inset: 0,
                        opacity: 1,
                      }}
                    />
                  </div>

                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.55rem",
                      fontWeight: "800",
                      letterSpacing: "0.1em",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#E8856A" }}>•</span> COGNITIVE
                    MAPPING
                  </p>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      margin: "0 0 10px 0",
                      lineHeight: "1.15",
                    }}
                  >
                    Cognitive strengths
                  </h4>
                  <p
                    style={{
                      color: "var(--color-text-muted-dark)",
                      fontSize: "0.68rem",
                      lineHeight: "1.6",
                      flex: 1,
                    }}
                  >
                    Discover behavioral analysis under pressure. Uncover latent
                    problem-solving pathways that standard tests miss.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid var(--color-border-dark)",
                        borderRadius: "20px",
                        padding: "4px 10px",
                        fontSize: "0.45rem",
                        color: "var(--color-text-secondary)",
                        letterSpacing: "0.05em",
                        background: "rgba(0,0,0,0.5)",
                      }}
                    >
                      STRENGTHS
                    </div>
                    <div
                      style={{
                        border: "1px solid var(--color-border-dark)",
                        borderRadius: "20px",
                        padding: "4px 10px",
                        fontSize: "0.45rem",
                        color: "var(--color-text-secondary)",
                        letterSpacing: "0.05em",
                        background: "rgba(0,0,0,0.5)",
                      }}
                    >
                      BEHAVIORS
                    </div>
                  </div>
                </div>

                {/* Right Phone */}
                <div
                  className="clay-card"
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "20%",
                    width: "240px",
                    height: "460px",
                    background: "var(--color-background-black)",
                    borderRadius: "30px",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                    padding: "16px 14px",
                    transform: "rotate(10deg)",
                    zIndex: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                      marginBottom: "15px",
                      color: "var(--color-text-muted-dark)",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "var(--color-background-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "var(--color-background-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 10 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M1 1H9M1 4H9M1 7H9" />
                      </svg>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "var(--color-error)",
                      fontSize: "0.55rem",
                      fontWeight: "800",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "var(--color-error)" }}>•</span> GROWTH PATHWAYS
                  </p>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                      margin: "0 0 12px 0",
                      lineHeight: "1.15",
                    }}
                  >
                    Empower your
                    <br />
                    <span style={{ color: "var(--color-error)" }}>potential</span>
                  </h4>
                  <p
                    style={{
                      color: "var(--color-text-muted-dark)",
                      fontSize: "0.68rem",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    }}
                  >
                    Strategic recommendations tailored to your unique
                    intelligence profile, underpinned by blind spot insights.
                  </p>

                  <div
                    style={{
                      height: "175px",
                      width: "100%",
                      borderRadius: "15px",
                      flexShrink: 0,
                      background: "var(--color-background-dark)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "auto",
                      marginBottom: "5px",
                    }}
                  >
                    <img
                      src={imgPink}
                      alt="Growth Pathways"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectPosition: "center",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        opacity: 0.95,
                      }}
                    />
                  </div>
                </div>

                {/* Center Phone */}
                <div
                  className="clay-card"
                  style={{
                    position: "absolute",
                    top: "5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "255px",
                    height: "505px",
                    background: "var(--color-background-dark)",
                    borderRadius: "35px",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                    padding: "20px 18px",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "8px",
                      marginBottom: "20px",
                      color: "var(--color-text-muted-dark)",
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "var(--color-background-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "var(--color-background-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 10 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M1 1H9M1 4H9M1 7H9" />
                      </svg>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "210px",
                      flexShrink: 0,
                      width: "100%",
                      background: "var(--color-background-black)",
                      borderRadius: "20px",
                      marginBottom: "20px",
                      position: "relative",
                      border: "1px solid var(--color-background-black)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={imgCode}
                      alt="Code Editor"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "top center",
                        position: "absolute",
                        inset: 0,
                        opacity: 0.35,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 30%, var(--color-background-black) 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)",
                      }}
                    ></div>

                    <svg
                      width="140"
                      height="140"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        filter:
                          "drop-shadow(0 0 12px rgba(167, 139, 250, 0.9))",
                        position: "absolute",
                        zIndex: 2,
                      }}
                    >
                      <path
                        d="M 40 45 C 40 25, 70 25, 70 45 C 70 65, 40 65, 40 45 C 40 30, 20 60, 30 75 C 50 90, 80 80, 85 70"
                        stroke="var(--color-accent)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90px",
                        height: "90px",
                        background: "var(--color-text-link-hover)",
                        filter: "blur(45px)",
                        opacity: 0.5,
                        zIndex: 1,
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-info_light)",
                        fontSize: "0.55rem",
                        fontWeight: "800",
                        letterSpacing: "0.1em",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ color: "var(--color-info_light)" }}>•</span> ADAPTIVE INDEX
                    </p>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-inverse)",
                        fontSize: "1.4rem",
                        fontWeight: "500",
                        margin: "0 0 10px 0",
                        lineHeight: "1.15",
                      }}
                    >
                      Mapping the
                      <br />
                      future of learning
                    </h4>
                    <p
                      style={{
                        color: "var(--color-text-muted-dark)",
                        fontSize: "0.75rem",
                        lineHeight: "1.6",
                        flex: 1,
                      }}
                    >
                      Our end-to-end approach offers a complete picture of the
                      student journey, allowing us to create data-driven ethical
                      profiles.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- MIDDLE SECTION --- */}
      <section
        style={{
          padding: isMobile
            ? "48px 16px 64px"
            : isTablet
              ? "72px 24px 84px"
              : "100px 5%",
          textAlign: "center",
          background: "var(--color-background-black)",
          marginTop: isMobile ? "8px" : "40px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-inverse)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: "500",
            letterSpacing: "-0.05em",
            lineHeight: "1.1",
            margin: "0",
          }}
        >
          Blind spot insights
        </h2>
        <p
          style={{
            color: "var(--color-text-muted-dark)",
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            fontStyle: "italic",
            marginTop: "15px",
            fontWeight: "400",
            maxWidth: "720px",
            marginInline: "auto",
          }}
        >
          Identifying overlooked variables and cognitive biases that may hinder
          optimal performance.
        </p>
      </section>
    </div>
  );
}
