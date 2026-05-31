import React from 'react';
import '../../styles/gco/index.css';
import '../../styles/gco/GCOComparison.css';

const comparisonData = [
  {
    feature: "Focus",
    traditional: "Subject-based",
    gco: "Scenario-based"
  },
  {
    feature: "Preparation",
    traditional: "Coaching dependent",
    gco: "Preparation-free"
  },
  {
    feature: "Evaluation",
    traditional: "One correct answer",
    gco: "Multiple reasoning paths"
  },
  {
    feature: "Ranking",
    traditional: "Local ranking",
    gco: "Globally normalized"
  },
  {
    feature: "Innovation",
    traditional: "Penalizes deviation",
    gco: "Rewards originality"
  }
];

const GCOComparison = () => {
  return (
    <section className="gco-comparison-section">
      <div className="gco-comparison-header">
        <h2 className="gco-comparison-title">What Makes GCO Different</h2>
        <p className="gco-comparison-subtitle">Traditional Exams vs Global Olympiad</p>
      </div>

      <div className="gco-comparison-grid">
        {/* Left Card - Traditional */}
        <div className="clay-card traditional-card">
          <div className="card-header-muted">
            <h3 className="traditional-title">Traditional</h3>
            <p className="traditional-subtitle">The Old Way</p>
          </div>
          <ul className="comparison-list">
            {comparisonData.map((item, index) => (
              <li key={`trad-${index}`} className="comparison-list-item muted-item">
                <div className="icon-cross">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <span>{item.traditional}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card - GCO */}
        <div className="glass-card modern-card">
          <div className="card-header-vibrant">
            <h3 className="modern-title">Global Olympiad</h3>
            <p className="modern-subtitle">The Future of Assessment</p>
          </div>
          <ul className="comparison-list">
            {comparisonData.map((item, index) => (
              <li key={`gco-${index}`} className="comparison-list-item vibrant-item">
                <div className="icon-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span>{item.gco}</span>
              </li>
            ))}
          </ul>
          
          <div className="modern-summary-box">
            <p className="gco-summary">
              GCO redefines assessment by valuing creativity, adaptability,
              and global fairness—empowering learners to showcase
              originality beyond traditional boundaries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GCOComparison;
