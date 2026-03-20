import React from "react";
import "../../styles/gco/HeroSection.css";
import logoAteion from "../../assets/gco/Ateion-logo.png";
import logoEducation from "../../assets/gco/logo-education.png";
import logoPolicy from "../../assets/gco/logo-education-policy2020.jpg";

function HeroSection() {
  return (
    <section className="hero">
      <div className="overlay">
        <div className="navbar-box">
          <div className="navbar">
            <div className="logo">
              <img src={logoAteion} alt="GCO Logo" />
            </div>
            <ul className="nav-links">
              <li><a href="#about" className="nav-item">About us</a></li>
              <li><a href="#workshops" className="nav-item">Workshops ▼</a></li>
              <li><a href="#gco" className="nav-highlight">GCO</a></li>
              <li><a href="#learn" className="nav-item">Learn</a></li>
            </ul>
            <button className="btn-primary">Get Connected</button>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Global Capability Olympiad
          </h1>
          <p className="hero-subtitle">
            The Global Capability Olympiad is the world's first preparation-free,
            syllabus-free, AI-<br />integrated Master Olympiad designed to measure
            thinking, not memory.
          </p>

          <div className="hero-buttons">
            <button className="btn-secondary">Contact us</button>
            <button className="btn-black">Explore more</button>
          </div>

          <div className="aligned-with">
            <h3 className="aligned-title">Aligned with:</h3>
            <div className="logos">
              <img src={logoEducation} alt="Education Logo" />
              <img src={logoPolicy} alt="Education Policy 2020 Logo" />
              <img src={logoEducation} alt="Partner Logo" />
              <img src={logoPolicy} alt="Education Policy 2020 Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
