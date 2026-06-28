import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import GCONavbar from "../app/components/GCONavbar";
import SharedFooter from "../app/components/SharedFooter";
import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";
import "../styles/gco/pill-navbar.css";
import "../styles/gco/VolunteerRegistration.css";

const roles = [
  {
    title: "1. Outreach & Relationship Managers",
    description: "Connect schools, colleges and institutions to GCO across the country.",
  },
  {
    title: "2. Sponsorship Squad",
    description: "Build corporate relationships and drive sponsorship campaigns.",
  },
  {
    title: "3. Marketing Team",
    description: "Create content, run campaigns, and grow GCO's voice online and offline.",
  },
  {
    title: "4. Business Analysts",
    description: "Research, analyse data and support strategic planning.",
  },
  {
    title: "5. Project Managers",
    description: "Coordinate cross-functional teams, track timelines and ensure execution.",
  },
  {
    title: "6. Assessment Design Team",
    description: "Design case studies, evaluation rubrics and exam frameworks.",
  },
  {
    title: "7. Web Developers",
    description: "Build the GCO platform. Front-end, back-end or full-stack. Shape the digital home of India's first capability Olympiad.",
  },
];

const VolunteerRegistrationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Register as Volunteer | GCO - Ateion</title>
        <meta name="description" content="Join the Global Capability Olympiad as a volunteer. Choose your role and contribute to India's first capability Olympiad." />
      </Helmet>
      <GCONavbar />
      <div id="gco-root" className="ateion-metallic-bg min-h-screen w-full relative">
        <div id="gco-background-pattern" />

        <section className="volunteer-hero">
          <div className="volunteer-hero-overlay">
            <motion.h1
              className="volunteer-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Register as Volunteer
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 80,
                height: 4,
                borderRadius: 4,
                background: "var(--color-accent)",
                margin: "0 auto 24px",
                transformOrigin: "center",
              }}
            />

            <motion.p
              className="volunteer-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              Join the movement. Pick a role that matches your passion and skills.
            </motion.p>
          </div>
        </section>

        <section className="volunteer-roles-section">
          <div className="volunteer-roles-list">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                className="volunteer-role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  const subject = encodeURIComponent(`Volunteer Application: ${role.title}`);
                  window.location.href = `mailto:volunteer@ateion.com?subject=${subject}`;
                }}
              >
                <div className="volunteer-role-accent" />
                <div className="volunteer-role-content">
                  <span className="volunteer-role-title">{role.title}</span>
                  <span className="volunteer-role-desc">{role.description}</span>
                </div>
                <div className="volunteer-role-arrow">→</div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <SharedFooter />
    </>
  );
};

export default VolunteerRegistrationPage;
