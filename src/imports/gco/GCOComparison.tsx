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
        <p className="gco-comparison-subtitle">Traditional Exams vs GCO</p>
      </div>

      <div className="gco-comparison-container">
        {/* Left Card - Traditional */}
        <div className="gco-card-traditional">
          <h3 className="gco-card-title">Traditional</h3>
          <ul className="gco-list">
            {comparisonData.map((item, index) => (
              <li key={`trad-${index}`} className="gco-list-item">
                <div className="gco-icon-traditional">×</div>
                <span>{item.traditional}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card - GCO */}
        <div className="gco-card-modern-container">
          <div className="gco-card-modern">
            <div className="gco-card-modern-content">
              <h3 className="gco-card-title">GCO</h3>
              <ul className="gco-list">
                {comparisonData.map((item, index) => (
                  <li key={`gco-${index}`} className="gco-list-item">
                    <div className="gco-icon-modern"></div>
                    <span>{item.gco}</span>
                  </li>
                ))}
              </ul>
              
              <p className="gco-summary">
                GCO redefines assessment by valuing creativity, adaptability,
                and global fairness empowering learners to showcase
                originality beyond traditional boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GCOComparison;
