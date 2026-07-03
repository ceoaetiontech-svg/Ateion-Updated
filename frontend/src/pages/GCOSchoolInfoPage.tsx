import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import GCONavbar from "../app/components/GCONavbar";
import SharedFooter from "../app/components/SharedFooter";
import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";
import "../styles/gco/pill-navbar.css";
import "../styles/gco/VolunteerRegistration.css";

/* ── Colour theme ──────────────────────────────────────── */
const THEME = {
  primary:   "#2DBBB0",          // teal
  secondary: "#4A8FE3",          // sky blue
  gradient:  "linear-gradient(135deg, #2DBBB0 0%, #4A8FE3 100%)",
  shadow:    "rgba(45,187,176,0.32)",
  barLine:   "#2DBBB0",
  barDot:    "#4A8FE3",
};

/* ── What You'll Gain ──────────────────────────────────── */
const BENEFITS = [
  { emoji: "🏫", name: "Official School Partner",          desc: "Become a recognized GCO Partner School" },
  { emoji: "🏆", name: "School Excellence Recognition",   desc: "Awards for outstanding participation and performance" },
  { emoji: "📜", name: "Partnership Certificate",          desc: "Official recognition for your institution" },
  { emoji: "👨‍🏫", name: "Teacher Development",            desc: "Access to workshops, training, and mentorship" },
  { emoji: "📊", name: "Student Performance Insights",    desc: "Comprehensive reports to track student capabilities" },
  { emoji: "🚀", name: "Future Collaboration Opportunities", desc: "Priority access to upcoming GCO initiatives and programs" },
  { emoji: "🌍", name: "National Visibility",              desc: "Showcase your school's achievements on a national platform" },
  { emoji: "🎁", name: "Exclusive Resources",              desc: "Access to educational toolkits, event materials, and premium resources" },
];

/* ── FAQ data ───────────────────────────────────────────── */
const FAQS = [
  { q: "How does my school benefit from partnering with GCO?",
    a: "By partnering with GCO, your school gains national-level recognition, access to innovative assessments, teacher development programmes, detailed student performance insights, and exclusive educational resources — all at no cost to your institution." },
  { q: "Is there a cost for schools to partner with GCO?",
    a: "GCO's school partnership programme is designed to be accessible. Registration is free for schools. Any additional programme-specific details will be shared during onboarding." },
  { q: "How many students can participate from our school?",
    a: "There is no fixed cap on the number of students. Schools are encouraged to enrol as many eligible students as possible to maximise impact and recognition." },
  { q: "How do we officially register our school?",
    a: "Click the 'Register as School' button above and complete the school registration form. Our team will reach out within a few business days to guide you through the onboarding process." },
  { q: "What support does GCO provide to partner schools?",
    a: "GCO provides partner schools with dedicated onboarding support, promotional materials, student participation guides, teacher briefings, and access to post-olympiad performance reports." },
  { q: "Will teachers receive any training or support?",
    a: "Yes. GCO's Teacher Development programme includes workshops, training sessions, and mentorship resources to help educators align their approach with capability-based learning." },
  { q: "How are student results shared with the school?",
    a: "Schools receive a consolidated performance dashboard and individual Skill Assessment Reports for each participating student — giving you meaningful insight into your students' real-world capabilities." },
  { q: "What happens after our school registers?",
    a: "After registration, a GCO representative will contact your institution to complete onboarding, provide all necessary resources, share student registration links, and answer any school-specific questions." },
  { q: "Will our school receive any public recognition?",
    a: "Yes. Partner schools are listed as Official GCO Partner Schools and may receive School Excellence Recognition Awards based on student participation and performance at the national level." },
  { q: "Can schools from any city or state in India participate?",
    a: "Absolutely. GCO is a nationwide initiative and welcomes schools from all cities, towns, and states across India. There are no geographic restrictions for partnership." },
];

/* ── FAQ accordion card ─────────────────────────────────── */
function FaqCard({ question, answer, isOpen, toggle, index }: {
  question: string; answer: string; isOpen: boolean; toggle: () => void; index: number;
}) {
  const id = `school-faq-${index}`;
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
export default function GCOSchoolInfoPage() {
  const navigate = useNavigate();
  const [openStates, setOpenStates] = useState<boolean[]>(FAQS.map(() => false));
  const toggle = (i: number) => setOpenStates(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Register as School | GCO – Ateion</title>
        <meta name="description" content="Partner with GCO to provide your students with meaningful learning experiences, national-level recognition, and future-ready opportunities." />
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
              }}>School</span>
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
              The Global Capability Olympiad (GCO) invites schools to become part of a nationwide
              movement that empowers students with future-ready skills. Partner with GCO to provide
              your students with meaningful learning experiences, national-level recognition, and
              opportunities that go beyond traditional academics.
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
                onClick={() => navigate("/gco/register-school")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 30px", borderRadius: 100, border: "none",
                  background: THEME.gradient, color: "#fff",
                  fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 700,
                  cursor: "pointer", boxShadow: `0 4px 24px ${THEME.shadow}`, marginBottom: 28,
                }}>
                Register as School
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
