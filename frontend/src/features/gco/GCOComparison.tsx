import React from "react";
import { motion } from "framer-motion";
import "../../styles/gco/GCOComparison.css";

const comparisonData = [
  {
    feature: "Focus",
    traditional: "Subject-based",
    gco: "Scenario-based",
  },
  {
    feature: "Preparation",
    traditional: "Coaching dependent",
    gco: "Preparation-free",
  },
  {
    feature: "Evaluation",
    traditional: "One correct answer",
    gco: "Multiple reasoning paths",
  },
  {
    feature: "Ranking",
    traditional: "Local ranking",
    gco: "Globally normalized",
  },
  {
    feature: "Innovation",
    traditional: "Penalizes deviation",
    gco: "Rewards originality",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

const gcoItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

const GCOComparison = () => {
  return (
    <section className="gco-comparison-section">
      <div className="gco-comparison-header">
        <motion.h2
          className="gco-comparison-title"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          What Makes GCO Different
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div style={{ width: 40, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-primary_light)" }} />
          <div style={{ width: 40, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
        </motion.div>

        <motion.p
          className="gco-comparison-subtitle"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
        >
          Traditional Exams vs Global Olympiad
        </motion.p>
      </div>

      <div className="gco-comparison-grid">
        {/* Left Card - Traditional */}
        <motion.div
          className="traditional-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
        >
          <div className="card-header-muted">
            <h3 className="traditional-title">Traditional</h3>
            <p className="traditional-subtitle">The Old Way</p>
          </div>
          <motion.ul
            className="comparison-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {comparisonData.map((item, index) => (
              <motion.li
                key={`trad-${index}`}
                className="comparison-list-item muted-item"
                variants={itemVariants}
              >
                <div className="icon-cross">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <span>{item.traditional}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right Card - GCO */}
        <motion.div
          className="modern-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ y: -4 }}
        >
          <div className="card-header-vibrant">
            <h3 className="modern-title">Global Olympiad</h3>
            <p className="modern-subtitle">The Future of Assessment</p>
          </div>
          <motion.ul
            className="comparison-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {comparisonData.map((item, index) => (
              <motion.li
                key={`gco-${index}`}
                className="comparison-list-item vibrant-item"
                variants={gcoItemVariants}
              >
                <div className="icon-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>{item.gco}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="modern-summary-box"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="gco-summary">
              GCO redefines assessment by valuing creativity, adaptability, and
              global fairness—empowering learners to showcase originality beyond
              traditional boundaries.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GCOComparison;
