import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import GCONavbar from "../../app/components/GCONavbar";
import SharedFooter from "../../app/components/SharedFooter";
import "../../styles/gco/index.css";
import "../../styles/gco/fonts.css";
import "../../styles/gco/theme.css";
import "../../styles/gco/pill-navbar.css";
import "../../styles/gco/VolunteerRegistration.css";

/* ── Colour theme ──────────────────────────────────────── */
const THEME = {
  primary:   "#E8856A",          // coral
  secondary: "#9B8EC4",          // lavender
  gradient:  "linear-gradient(135deg, #E8856A 0%, #9B8EC4 100%)",
  shadow:    "rgba(232,133,106,0.35)",
  barLine:   "#E8856A",
  barDot:    "#9B8EC4",
};

/* ── What You'll Gain ──────────────────────────────────── */
const BENEFITS = [
  { emoji: "📚", name: "Hands-on Learning",               desc: "Real-world challenges & practical skills" },
  { emoji: "🏅", name: "Official Participation Certificate", desc: "Recognized proof of your achievement" },
  { emoji: "🏆", name: "Olympiad Achievement Badge",      desc: "Showcase your accomplishments" },
  { emoji: "💡", name: "Skill Assessment Report",         desc: "Understand your strengths and growth areas" },
  { emoji: "👨‍🏫", name: "Expert Mentorship",              desc: "Learn from industry professionals" },
  { emoji: "🚀", name: "Internship & Career Opportunities", desc: "Access future learning and career pathways" },
  { emoji: "🌍", name: "National Recognition",            desc: "Compete with students from across India" },
  { emoji: "🎁", name: "Exclusive Student Resources",     desc: "Premium learning materials, workshops & community access" },
];

/* ── FAQ data ───────────────────────────────────────────── */
const FAQS = [
  { q: "What is the Global Capability Olympiad (GCO)?",
    a: "The Global Capability Olympiad (GCO) is India's first preparation-free, syllabus-free, AI-integrated Olympiad designed to assess real-world thinking, creativity, and problem-solving abilities — not rote memorisation." },
  { q: "Who can participate in GCO?",
    a: "GCO is open to students studying in schools and colleges across India. There are no strict eligibility barriers — if you're curious and willing to think, GCO is for you." },
  { q: "Is there a registration fee?",
    a: "Registration details including fees (if any) will be communicated during the official registration process. Early registration may qualify for special benefits." },
  { q: "What skills or subjects are tested?",
    a: "GCO does not follow a fixed syllabus. It tests real-world capabilities such as critical thinking, logical reasoning, creativity, communication, and situational problem-solving — skills that matter in the real world." },
  { q: "How do I register for GCO?",
    a: "Click the 'Register as Student' button above and fill in your details through the registration form. You will receive a confirmation and further instructions via email." },
  { q: "Can I participate from any school or city?",
    a: "Yes! GCO is a nationwide initiative. Students from any school, city or state across India can participate." },
  { q: "What certificates will I receive?",
    a: "All participants receive an Official Participation Certificate. High performers receive Olympiad Achievement Badges and may qualify for additional recognition, mentorship opportunities, and internship pathways." },
  { q: "How and when are results announced?",
    a: "Results are announced digitally through the GCO platform after assessment completion. You will receive your individual Skill Assessment Report showing your strengths and growth areas." },
  { q: "Is there an age limit to participate?",
    a: "GCO is designed for school and college students. Specific age/grade eligibility details will be shared during registration. Most categories welcome students from Grade 6 onwards." },
  { q: "What opportunities does GCO unlock for me?",
    a: "Performing well at GCO can open doors to expert mentorships, internships, national-level recognition, exclusive learning resources, and access to a community of future leaders across India." },
];

/* ── FAQ accordion card ─────────────────────────────────── */
function FaqCard({ question, answer, isOpen, toggle, index }: {
  question: string; answer: string; isOpen: boolean; toggle: () => void; index: number;
}) {
  const id = `student-faq-${index}`;
  return (
    <motion.div layout className={`volunteer-role-card ${isOpen ? "volunteer-role-card-open" : ""}`}>
      <motion.div
        className="volunteer-role-accent"
        animate={{ background: isOpen ? THEME.primary : "var(--color-border-light)" }}
        transition={{ duration: 0.3 }}
      />
      <button type="button" id={`btn-${id}`} onClick={toggle}
        aria-expanded={isOpen} aria-controls={id} className="volunteer-role-btn">
        <span className="volunteer-role-title">{question}</span>
        <motion.div
          className={`volunteer-role-arrow ${isOpen ? "volunteer-role-arrow-open" : ""}`}
          animate={{ rotate: isOpen ? 90 : 0, background: isOpen ? THEME.primary : undefined }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:8,
            borderRadius:100, flexShrink:0, background:"var(--color-background-tertiary)",
            boxShadow:"var(--shadow-clay-button)", border:"1px solid rgba(255,255,255,0.25)" }}
        >
          <ChevronRight size={20} className={isOpen ? "text-white" : "text-[var(--color-text-primary)]"} strokeWidth={1.7} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div id={id} role="region" aria-labelledby={`btn-${id}`}
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
            <div className="volunteer-role-desc"><p>{answer}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function GCOStudentInfoPage() {
  const navigate = useNavigate();
  const [openStates, setOpenStates] = useState<boolean[]>(FAQS.map(() => false));
  const toggle = (i: number) => setOpenStates(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Register as Student | GCO – Ateion</title>
        <meta name="description" content="Join the Global Capability Olympiad as a student. Discover, develop, and showcase your real-world capabilities beyond traditional academics." />
      </Helmet>
      <GCONavbar />

      <div id="gco-root" className="ateion-metallic-bg min-h-screen w-full relative">
        <div id="gco-background-pattern" />

        {/* ── Hero ── */}
        <section className="volunteer-hero">
          <div className="volunteer-hero-overlay">
            <motion.h1
              className="volunteer-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ WebkitTextFillColor: "var(--color-text-primary)" }}>Register as </span>
              <span style={{
                background: THEME.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Student</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 80, height: 4, borderRadius: 4, background: THEME.primary,
                margin: "0 auto 24px", transformOrigin: "center" }}
            />

            <motion.p className="volunteer-subtitle"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>
              The Global Capability Olympiad (GCO) is designed to help students discover, develop,
              and showcase their real-world capabilities beyond traditional academics. Join thousands
              of learners, participate in exciting challenges, gain industry exposure, and unlock
              opportunities that prepare you for the future.
            </motion.p>
          </div>
        </section>

        {/* ── What You'll Gain ── */}
        <section style={{ padding: "0 5% 20px", position: "relative", zIndex: 10 }}>
          <div className="volunteer-benefits">
            <div className="volunteer-benefits-header">

              {/* CTA Button — above the title */}
              <motion.button type="button"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/gco/register-student")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 30px", borderRadius: 100, border: "none",
                  background: THEME.gradient, color: "#fff",
                  fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 700,
                  cursor: "pointer", boxShadow: `0 4px 24px ${THEME.shadow}`, marginBottom: 28,
                }}>
                Register as Student
                <ChevronRight size={17} />
              </motion.button>

              <motion.h2 className="volunteer-benefits-title"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
                What You'll{" "}
                <span style={{ color: THEME.secondary }}>Gain</span>
              </motion.h2>
              <motion.div className="volunteer-benefits-bar"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}>
                <div className="volunteer-benefits-bar-line" style={{ background: THEME.primary }} />
                <div className="volunteer-benefits-bar-dot" style={{ background: THEME.secondary }} />
                <div className="volunteer-benefits-bar-line" style={{ background: THEME.primary }} />
              </motion.div>
            </div>

            <div className="volunteer-benefits-grid">
              {BENEFITS.map((b, i) => (
                <motion.div key={b.name} className="volunteer-benefit-card"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}>
                  <div className="volunteer-benefit-emoji">{b.emoji}</div>
                  <p className="volunteer-benefit-name">{b.name}</p>
                  <p style={{ fontSize:"0.72rem", color:"var(--color-text-muted)", textAlign:"center",
                    lineHeight:1.45, margin:0, fontFamily:"var(--font-alt)" }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="volunteer-roles-section">
          <div className="volunteer-roles-header">
            <motion.h2 className="volunteer-roles-header-title"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
              Frequently Asked Questions
            </motion.h2>
            <motion.div className="volunteer-roles-header-bar"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}>
              <div className="volunteer-roles-header-bar-line" style={{ background: THEME.primary }} />
              <div className="volunteer-roles-header-bar-dot" style={{ background: THEME.secondary }} />
              <div className="volunteer-roles-header-bar-line" style={{ background: THEME.primary }} />
            </motion.div>
          </div>

          <div className="volunteer-roles-list">
            {FAQS.map((faq, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}>
                <FaqCard question={faq.q} answer={faq.a}
                  isOpen={openStates[index]} toggle={() => toggle(index)} index={index} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <SharedFooter />
    </>
  );
}
