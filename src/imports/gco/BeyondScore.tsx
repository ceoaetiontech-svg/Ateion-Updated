import React from "react";
import imgChild from "../../assets/beyond-child.png";
import imgPink from "../../assets/beyond-pink.png";
import imgCode from "../../assets/beyond-code.png";

export default function BeyondScoreClone() {
  const reportItems = [
    "Cognitive strengths mapping",
    "Behavioral analysis under pressure",
    "Adaptive reasoning index",
    "Ethical decision-making profile",
    "Blind spot insights",
    "Growth pathway recommendations",
  ];

  return (
    <div style={{ backgroundColor: "#000", fontFamily: "'Manrope', sans-serif", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>

      {/* --- HERO SECTION --- */}
      <section style={{
        padding: "40px 5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {/* The large dark card containing hero content */}
        <div style={{
          position: "relative",
          maxWidth: "1400px",
          width: "100%",
          background: "linear-gradient(135deg, rgba(15,15,18,1) 0%, rgba(10,10,20,1) 50%, rgba(30,20,60,1) 100%)",
          borderRadius: "40px",
          padding: "80px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
        }}>

          {/* subtle glow inside the card */}
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
          <div style={{ flex: "0 0 45%", position: "relative", zIndex: 1 }}>
            <h1 style={{
              fontFamily: "'OV Soge', sans-serif",
              color: "#fff",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: "600",
              letterSpacing: "-0.03em",
              margin: "0 0 10px 0",
              lineHeight: "1.1"
            }}>
              Beyond a Score
            </h1>
            <p style={{
              color: "#9ca3af",
              fontSize: "1.5rem",
              fontWeight: "400",
              margin: "0 0 50px 0"
            }}>
              A Strategic Intelligence Report
            </p>

            <div style={{ marginBottom: "50px" }}>
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
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
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
              padding: "12px 24px",
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
          <div style={{ flex: "0 0 50%", position: "relative", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1 }}>

            {/* Left Phone */}
            <div style={{
              position: "absolute",
              left: "0",
              top: "15%",
              width: "240px",
              height: "460px",
              background: "#111",
              borderRadius: "30px",
              border: "1px solid #2a2a2a",
              padding: "15px 18px",
              transform: "rotate(-8deg)",
              boxShadow: "-15px 25px 50px rgba(0,0,0,0.8)",
              zIndex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Moon and Hamburger Top Right */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "12px", color: "#888" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1H9M1 4H9M1 7H9" /></svg>
                </div>
              </div>

              <div style={{ height: "135px", background: "#151515", borderRadius: "15px", marginBottom: "15px", position: "relative", overflow: "hidden" }}>
                <img src={imgChild} alt="Cognitive strengths" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.8 }} />
                {/* Subtle placeholder simulating the grayscale child image */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: 'radial-gradient(circle at 40% 40%, rgba(60,60,60,0.4) 0%, rgba(20,20,20,0) 80%), linear-gradient(to bottom, rgba(30,30,30,0), #111 90%)' }} />
              </div>

              <p style={{ color: "#6b7280", fontSize: "0.55rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "6px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#60a5fa" }}>•</span> COGNITIVE STRENGTHS
              </p>
              <h4 style={{ fontFamily: "'OV Soge', sans-serif", color: "#e5e7eb", fontSize: "1.05rem", fontWeight: "500", margin: "0 0 10px 0", lineHeight: "1.2" }}>Cognitive strengths mapping</h4>
              <p style={{ color: "#6b7280", fontSize: "0.68rem", lineHeight: "1.5", flex: 1 }}>
                Discover behavioral and cognitive strengths under pressure. Uncover latent problem-solving pathways that standard tests miss.
              </p>

              {/* Pills at the bottom */}
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <div style={{ border: "1px solid #333", borderRadius: "20px", padding: "4px 10px", fontSize: "0.45rem", color: "#6b7280", letterSpacing: "0.05em", background: "rgba(0,0,0,0.5)" }}>STRENGTHS</div>
                <div style={{ border: "1px solid #333", borderRadius: "20px", padding: "4px 10px", fontSize: "0.45rem", color: "#6b7280", letterSpacing: "0.05em", background: "rgba(0,0,0,0.5)" }}>BEHAVIORS</div>
              </div>
            </div>

            {/* Right Phone */}
            <div style={{
              position: "absolute",
              right: "0",
              top: "20%",
              width: "240px",
              height: "460px",
              background: "#111",
              borderRadius: "30px",
              border: "1px solid #2a2a2a",
              padding: "20px 18px",
              transform: "rotate(8deg)",
              boxShadow: "15px 25px 50px rgba(0,0,0,0.8)",
              zIndex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Moon and Hamburger Top Right */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "12px", color: "#888" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1H9M1 4H9M1 7H9" /></svg>
                </div>
              </div>
              <p style={{ color: "#f43f5e", fontSize: "0.55rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#f43f5e" }}>•</span> GROWTH PATHWAYS
              </p>
              <h4 style={{ fontFamily: "'OV Soge', sans-serif", color: "#e5e7eb", fontSize: "1.1rem", fontWeight: "500", margin: "0 0 12px 0", lineHeight: "1.2" }}>Empower your <span style={{ color: "#f43f5e" }}>potential</span></h4>
              <p style={{ color: "#6b7280", fontSize: "0.68rem", lineHeight: "1.5", marginBottom: "25px" }}>
                Strategic recommendations tailored to your unique intelligence profile, underpinned by blind spot insights.
              </p>

              {/* Vibrant diagonal pills representation now replaced by actual image */}
              <div style={{ height: "150px", background: "#0c0c0e", borderRadius: "15px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgPink} alt="Growth Pathways" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
              </div>
            </div>

            {/* Center Phone */}
            <div style={{
              position: "absolute",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "250px",
              height: "500px",
              background: "#080808",
              borderRadius: "35px",
              border: "1px solid #333",
              padding: "20px 22px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Header icons - MOON AND MENU ON TOP LEFT */}
              <div style={{ display: "flex", justifyContent: "flex-start", gap: "8px", marginBottom: "15px", color: "#888" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1H9M1 4H9M1 7H9" /></svg>
                </div>
              </div>

              {/* Big Purple drawing area */}
              <div style={{ height: "175px", width: "100%", background: "#0e0e12", borderRadius: "20px", marginBottom: "20px", position: "relative", border: "1px solid #1f1f2a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={imgCode} alt="Code Editor" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.5 }} />
                {/* code/screen faint background effect */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), #000 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)' }}></div>

                {/* glowing shape drawing '9' overlay on darker background */}
                <svg width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 12px rgba(139, 92, 246, 0.8))", zIndex: 2 }}>
                  <defs>
                    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c4b5fd" />
                      <stop offset="50%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <path d="M 40 45 C 40 25, 70 25, 70 45 C 70 65, 40 65, 40 45 C 40 30, 20 60, 30 75 C 50 90, 80 80, 85 70" stroke="url(#neonGlow)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* ambient glow */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60px", height: "60px", background: "#8b5cf6", filter: "blur(35px)", opacity: 0.35, zIndex: 1 }}></div>
              </div>

              <p style={{ color: "#38bdf8", fontSize: "0.55rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#38bdf8" }}>•</span> ADAPTIVE INDEX
              </p>
              <h4 style={{ fontFamily: "'OV Soge', sans-serif", color: "#fff", fontSize: "1.1rem", fontWeight: "500", margin: "0 0 10px 0", lineHeight: "1.2" }}>Mapping the future of learning</h4>
              <p style={{ color: "#9ca3af", fontSize: "0.68rem", lineHeight: "1.5" }}>
                Our end-to-end approach offers a complete picture of the student journey, allowing us to create data-driven ethical profiles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- MIDDLE SECTION --- */}
      <section style={{ padding: "100px 5%", textAlign: "center", background: "#000", marginTop: "40px" }}>
        <h2 style={{ fontFamily: "'OV Soge', sans-serif", color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "500", letterSpacing: "-0.03em", margin: "0" }}>
          Blind spot insights
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "1rem", fontStyle: "italic", marginTop: "15px", fontWeight: "400" }}>
          Identifying overlooked variables and cognitive biases that may hinder optimal performance.
        </p>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer style={{ width: "100%", fontFamily: "'Manrope', sans-serif" }}>
        {/* Light section */}
        <div style={{ backgroundColor: "#FAF7EF", padding: "80px 10%", color: "#111" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>

            {/* Brand */}
            <div style={{ flex: "0 0 auto", minWidth: "250px" }}>
              <p style={{ fontWeight: "700", fontSize: "0.95rem", lineHeight: "1.6", margin: 0, color: "#111" }}>
                Jocata Financial Advisory &<br />Technology Services Pvt. Ltd.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                {/* LinkedIn */}
                <div style={{ width: "28px", height: "28px", border: "1px solid #d1d5db", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4b5563" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                {/* WhatsApp */}
                <div style={{ width: "28px", height: "28px", border: "1px solid #d1d5db", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4b5563" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.126.551 4.15 1.597 5.942L0 24l6.194-1.624C7.942 23.366 9.944 23.94 12.031 23.94c6.643 0 12.03-5.386 12.03-12.031S18.674 0 12.031 0zm.014 21.9A9.85 9.85 0 0 1 7.026 20.6l-.358-.212-3.664.96.977-3.575-.232-.37A9.886 9.886 0 0 1 2.164 11.91c0-5.463 4.444-9.907 9.886-9.907 5.441 0 9.884 4.444 9.884 9.907 0 5.464-4.443 9.9-9.889 9.9z" /></svg>
                </div>
                {/* X / Twitter */}
                <div style={{ width: "28px", height: "28px", border: "1px solid #d1d5db", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4b5563" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </div>
                {/* YouTube */}
                <div style={{ width: "28px", height: "28px", border: "1px solid #d1d5db", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4b5563" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186c-.23-.86-.908-1.538-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div style={{ flex: "0 0 auto", minWidth: "250px" }}>
              <p style={{ fontSize: "0.85rem", color: "#4b5563", lineHeight: "1.7", margin: "0 0 15px 0" }}>
                2nd Floor, Roxana Fortune,<br />Road no. 12, Banjara Hills,<br />Hyderabad, Telangana - 500034
              </p>
              <p style={{ fontSize: "0.85rem", color: "#4b5563", margin: "0 0 6px 0" }}>+91 40-23385581</p>
              <p style={{ fontSize: "0.85rem", color: "#4b5563", margin: 0 }}>msme@jocata.com</p>
            </div>

            {/* Links */}
            <div style={{ flex: "0 0 auto", minWidth: "200px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
                <li style={{ fontSize: "0.85rem", color: "#4b5563", cursor: "pointer" }}>Terms of Use</li>
                <li style={{ fontSize: "0.85rem", color: "#4b5563", cursor: "pointer" }}>Privacy Policy</li>
                <li style={{ fontSize: "0.85rem", color: "#4b5563", cursor: "pointer" }}>Data Collection &amp; Consent</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dark bottom bar */}
        <div style={{ backgroundColor: "#2d2844", padding: "20px 0", textAlign: "center", width: "100%" }}>
          <p style={{ fontSize: "0.75rem", color: "#d1d5db", margin: 0 }}>Copyright ©Atoion 2026. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}