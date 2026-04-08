import React, { useEffect, useState } from "react";
import imgChild from "../../assets/beyond-child.png";
import imgPink from "../../assets/beyond-pink.png";
import imgCode from "../../assets/beyond-code.png";

export default function BeyondScoreClone() {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = viewportWidth <= 1024;
  const isMobile = viewportWidth <= 768;
  const isSmallMobile = viewportWidth <= 480;
  const imgChildNew = imgChild;
  const imgPinkNew = imgPink;
  const imgCodeNew = imgCode;

  const reportItems = [
    "Cognitive strengths mapping",
    "Behavioral analysis under pressure",
    "Adaptive reasoning index",
    "Ethical decision-making profile",
    "Blind spot insights",
    "Growth pathway recommendations",
  ];

  return (
    <div className="dark-section" style={{ backgroundColor: "#000", fontFamily: "'Manrope', sans-serif", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>

      {/* --- HERO SECTION --- */}
      <section style={{
        padding: isMobile ? "24px 16px 40px" : isTablet ? "32px 24px 56px" : "40px 5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div style={{
          position: "relative",
          maxWidth: "1400px",
          width: "100%",
          background: "linear-gradient(135deg, rgba(15,15,18,1) 0%, rgba(10,10,20,1) 50%, rgba(30,20,60,1) 100%)",
          borderRadius: isMobile ? "28px" : "40px",
          padding: isMobile ? "32px 20px" : isTablet ? "48px 32px" : "80px 60px",
          display: "flex",
          flexDirection: isTablet ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isTablet ? "stretch" : "center",
          gap: isMobile ? "28px" : isTablet ? "40px" : "40px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
        }}>

          <div style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(100, 70, 200, 0.25) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none",
            zIndex: 0
          }} />

          {/* Left Side Text */}
          <div style={{ flex: "0 0 45%", position: "relative", zIndex: 1, width: "100%", maxWidth: isTablet ? "100%" : "45%" }}>
            <h1 style={{
              fontFamily: "'OVSoge', sans-serif",
              color: "#fff",
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.4rem)" : "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: "600",
              letterSpacing: "-0.03em",
              margin: "0 0 10px 0",
              lineHeight: "1.1"
            }}>
              Beyond a Score
            </h1>
            <p style={{
              color: "#9ca3af",
              fontSize: isMobile ? "1.05rem" : isTablet ? "1.2rem" : "1.5rem",
              fontWeight: "400",
              margin: isMobile ? "0 0 28px 0" : "0 0 50px 0"
            }}>
              A Strategic Intelligence Report
            </p>

            <div style={{ marginBottom: isMobile ? "28px" : "50px" }}>
              <p style={{
                color: "#6b7280",
                fontSize: "0.75rem",
                fontWeight: "700",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                EACH STUDENT RECEIVES:
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {reportItems.map((item) => (
                  <li key={item} style={{
                    color: "#d1d5db",
                    fontSize: isMobile ? "0.92rem" : "0.95rem",
                    fontWeight: "500",
                    marginBottom: isMobile ? "14px" : "16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px"
                  }}>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L1 9" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button style={{
              background: "transparent",
              border: "1px solid #374151",
              color: "#fff",
              padding: isSmallMobile ? "12px 18px" : "12px 24px",
              borderRadius: "100px",
              fontSize: "0.9rem",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease"
            }}>
              View intelligence report <span style={{ fontSize: "1.2rem" }}>→</span>
            </button>
          </div>

          {/* Right Side Mockups */}
          <div style={{
            flex: "0 0 50%",
            position: "relative",
            height: isTablet ? "auto" : "600px",
            display: "flex",
            justifyContent: isTablet ? "flex-start" : "center",
            alignItems: "center",
            zIndex: 1,
            width: "100%",
            overflow: isTablet ? "auto hidden" : "visible",
            paddingBottom: isTablet ? "8px" : "0"
          }}>
            {isTablet ? (
              <div style={{
                display: "flex",
                gap: isMobile ? "16px" : "20px",
                width: "max-content",
                padding: "8px 4px"
              }}>
                {[{
                  title: "Cognitive strengths",
                  eyebrow: "COGNITIVE MAPPING",
                  eyebrowColor: "#60a5fa",
                  description: "Discover behavioral analysis under pressure. Uncover latent problem-solving pathways that standard tests miss.",
                  image: imgChildNew,
                  imageFirst: true,
                  accent: "#60a5fa"
                }, {
                  title: "Mapping the future of learning",
                  eyebrow: "ADAPTIVE INDEX",
                  eyebrowColor: "#38bdf8",
                  description: "Our end-to-end approach offers a complete picture of the student journey, allowing us to create data-driven ethical profiles.",
                  image: imgCodeNew,
                  imageFirst: true,
                  accent: "#c4b5fd"
                }, {
                  title: "Empower your potential",
                  eyebrow: "GROWTH PATHWAYS",
                  eyebrowColor: "#f43f5e",
                  description: "Strategic recommendations tailored to your unique intelligence profile, underpinned by blind spot insights.",
                  image: imgPinkNew,
                  imageFirst: false,
                  accent: "#f43f5e"
                }].map((phone, index) => (
                  <div key={index} style={{
                    width: isMobile ? "260px" : "290px",
                    minWidth: isMobile ? "260px" : "290px",
                    background: "linear-gradient(180deg, #0d0d12 0%, #09090c 100%)",
                    borderRadius: "30px",
                    border: "1px solid #262631",
                    padding: isMobile ? "18px 16px" : "20px 18px",
                    boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: isMobile ? "430px" : "470px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", color: "#7b8190" }}>
                      <div style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Report</div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#18181f" }} />
                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#18181f" }} />
                      </div>
                    </div>

                    {phone.imageFirst && (
                      <div style={{ height: isMobile ? "150px" : "170px", width: "100%", borderRadius: "18px", marginBottom: "18px", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
                        <img src={phone.image} alt={phone.title} style={{ width: "100%", height: "100%", objectFit: phone.title.includes("future") ? "contain" : "cover", objectPosition: "center", position: "absolute", inset: 0, opacity: phone.title.includes("future") ? 0.42 : 0.95 }} />
                      </div>
                    )}

                    <p style={{ color: phone.eyebrowColor, fontSize: "0.62rem", fontWeight: "800", letterSpacing: "0.11em", marginBottom: "8px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: phone.eyebrowColor }}>•</span> {phone.eyebrow}
                    </p>
                    <h4 style={{ fontFamily: "'OVSoge', sans-serif", color: "#f3f4f6", fontSize: isMobile ? "1.2rem" : "1.35rem", fontWeight: "500", margin: "0 0 10px 0", lineHeight: "1.15" }}>
                      {phone.title}
                    </h4>
                    <p style={{ color: "#8a93a1", fontSize: isMobile ? "0.76rem" : "0.8rem", lineHeight: "1.65", margin: 0 }}>
                      {phone.description}
                    </p>

                    {!phone.imageFirst && (
                      <div style={{ height: isMobile ? "160px" : "180px", width: "100%", borderRadius: "18px", marginTop: "auto", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
                        <img src={phone.image} alt={phone.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", position: "absolute", inset: 0, opacity: 0.95 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
            <>
            {/* Left Phone */}
            <div style={{
              position: "absolute",
              left: "2%",
              top: "15%",
              width: "240px",
              height: "460px",
              background: "#111",
              borderRadius: "30px",
              border: "1px solid #2a2a2a",
              padding: "16px 14px",
              transform: "rotate(-10deg)",
              boxShadow: "-15px 25px 50px rgba(0,0,0,0.8)",
              zIndex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "10px", color: "#888" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1H9M1 4H9M1 7H9" /></svg>
                </div>
              </div>

              <div style={{ height: "145px", width: "100%", borderRadius: "15px", marginBottom: "15px", position: "relative", overflow: "hidden", flexShrink: 0, background: "#0a0a0a" }}>
                <img src={imgChildNew} alt="Cognitive strengths" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", inset: 0, opacity: 1 }} />
              </div>

              <p style={{ color: "#6b7280", fontSize: "0.55rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "6px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#60a5fa" }}>•</span> COGNITIVE MAPPING
              </p>
              <h4 style={{ fontFamily: "'OVSoge', sans-serif", color: "#e5e7eb", fontSize: "1.25rem", fontWeight: "500", margin: "0 0 10px 0", lineHeight: "1.15" }}>Cognitive strengths</h4>
              <p style={{ color: "#8a93a1", fontSize: "0.68rem", lineHeight: "1.6", flex: 1 }}>
                Discover behavioral analysis under pressure. Uncover latent problem-solving pathways that standard tests miss.
              </p>

              <div style={{ display: "flex", gap: "8px", marginTop: "12px", marginBottom: "10px" }}>
                <div style={{ border: "1px solid #333", borderRadius: "20px", padding: "4px 10px", fontSize: "0.45rem", color: "#6b7280", letterSpacing: "0.05em", background: "rgba(0,0,0,0.5)" }}>STRENGTHS</div>
                <div style={{ border: "1px solid #333", borderRadius: "20px", padding: "4px 10px", fontSize: "0.45rem", color: "#6b7280", letterSpacing: "0.05em", background: "rgba(0,0,0,0.5)" }}>BEHAVIORS</div>
              </div>
            </div>

            {/* Right Phone */}
            <div style={{
              position: "absolute",
              right: "2%",
              top: "20%",
              width: "240px",
              height: "460px",
              background: "#111",
              borderRadius: "30px",
              border: "1px solid #2a2a2a",
              padding: "16px 14px",
              transform: "rotate(10deg)",
              boxShadow: "15px 25px 50px rgba(0,0,0,0.8)",
              zIndex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "15px", color: "#888" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1H9M1 4H9M1 7H9" /></svg>
                </div>
              </div>

              <p style={{ color: "#f43f5e", fontSize: "0.55rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#f43f5e" }}>•</span> GROWTH PATHWAYS
              </p>
              <h4 style={{ fontFamily: "'OVSoge', sans-serif", color: "#e5e7eb", fontSize: "1.3rem", fontWeight: "500", margin: "0 0 12px 0", lineHeight: "1.15" }}>Empower your<br /><span style={{ color: "#f43f5e" }}>potential</span></h4>
              <p style={{ color: "#8a93a1", fontSize: "0.68rem", lineHeight: "1.6", marginBottom: "20px" }}>
                Strategic recommendations tailored to your unique intelligence profile, underpinned by blind spot insights.
              </p>

              <div style={{ height: "175px", width: "100%", borderRadius: "15px", flexShrink: 0, background: "#0a0a0a", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "auto", marginBottom: "5px" }}>
                <img src={imgPinkNew} alt="Growth Pathways" style={{ width: "100%", height: "100%", objectPosition: "center", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.95 }} />
              </div>
            </div>

            {/* Center Phone */}
            <div style={{
              position: "absolute",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "255px",
              height: "505px",
              background: "#080808",
              borderRadius: "35px",
              border: "1px solid #333",
              padding: "20px 18px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ display: "flex", justifyContent: "flex-start", gap: "8px", marginBottom: "20px", color: "#888" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1H9M1 4H9M1 7H9" /></svg>
                </div>
              </div>

              <div style={{ height: "210px", flexShrink: 0, width: "100%", background: "#0e0e12", borderRadius: "20px", marginBottom: "20px", position: "relative", border: "1px solid #1f1f2a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={imgCodeNew} alt="Code Editor" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top center", position: "absolute", inset: 0, opacity: 0.35 }} />
                <div style={{ position: "absolute", inset: 0, backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, #000 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)' }}></div>

                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 12px rgba(167, 139, 250, 0.9))", position: "absolute", zIndex: 2 }}>
                  <path d="M 40 45 C 40 25, 70 25, 70 45 C 70 65, 40 65, 40 45 C 40 30, 20 60, 30 75 C 50 90, 80 80, 85 70" stroke="#c4b5fd" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90px", height: "90px", background: "#8b5cf6", filter: "blur(45px)", opacity: 0.5, zIndex: 1 }}></div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
                <p style={{ color: "#38bdf8", fontSize: "0.55rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#38bdf8" }}>•</span> ADAPTIVE INDEX
                </p>
                <h4 style={{ fontFamily: "'OVSoge', sans-serif", color: "#fff", fontSize: "1.4rem", fontWeight: "500", margin: "0 0 10px 0", lineHeight: "1.15" }}>Mapping the<br />future of learning</h4>
                <p style={{ color: "#8a93a1", fontSize: "0.75rem", lineHeight: "1.6", flex: 1 }}>
                  Our end-to-end approach offers a complete picture of the student journey, allowing us to create data-driven ethical profiles.
                </p>
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      </section>

      {/* --- MIDDLE SECTION --- */}
      <section style={{ padding: isMobile ? "48px 16px 64px" : isTablet ? "72px 24px 84px" : "100px 5%", textAlign: "center", background: "#000", marginTop: isMobile ? "8px" : "40px" }}>
        <h2 style={{ fontFamily: "'OVSoge', sans-serif", color: "#fff", fontSize: isMobile ? "clamp(1.9rem, 9vw, 2.5rem)" : "clamp(2rem, 4vw, 3rem)", fontWeight: "500", letterSpacing: "-0.03em", margin: "0" }}>
          Blind spot insights
        </h2>
        <p style={{ color: "#9ca3af", fontSize: isMobile ? "0.95rem" : "1rem", fontStyle: "italic", marginTop: "15px", fontWeight: "400", maxWidth: "720px", marginInline: "auto" }}>
          Identifying overlooked variables and cognitive biases that may hinder optimal performance.
        </p>
      </section>
    </div>
  );
}
