import React from 'react';
import '../../styles/gco/CircleHero.css';

const CircleHero = () => {
  return (
    <section className="circle-hero-container">
      <div className="circle-hero-left">
        <p className="circle-hero-number">(01)</p>
        <h1 className="circle-hero-title">
          Global Capability<br />
          Olympiad
        </h1>
        <div className="circle-hero-tags">
          <span>Brand Strategy</span>
          <span>Brand Framing</span>
          <span>Tagline</span>
        </div>
        <button className="circle-hero-btn">
          View More →
        </button>
      </div>

      <div className="circle-hero-right">
        <div className="center-circle ateion">
          <h3>Ateion</h3>
        </div>
        <div className="center-circle gco">
          <h3>GCO</h3>
        </div>
        <div className="center-circle workshop">
          <p>Workshops</p>
        </div>
        <div className="center-circle kronos">
          <p>Kronos</p>
        </div>
        <div className="center-circle vouch">
          <p>Vouch</p>
        </div>
      </div>
    </section>
  );
};

export default CircleHero;
