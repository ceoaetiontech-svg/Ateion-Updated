import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { ImageTrail } from "../../app/components/ui/image-trail";
import Navbar from "../../app/components/Navbar";
import "../../styles/gco/HeroSection.css";
import logoEducation from "../../assets/gco/logo-education.png";
import logoPolicy from "../../assets/gco/logo-education-policy2020.jpg";

function HeroSection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const images = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=300&fit=crop",
  ];

  return (
    <section className="hero" ref={ref}>
      <ImageTrail containerRef={ref}>
        {images.map((url, index) => (
          <div
            key={index}
            className="flex relative overflow-hidden w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32"
          >
            <img
              src={url}
              alt={`Trail image ${index + 1}`}
              className="object-cover absolute inset-0 hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </ImageTrail>
      <div className="overlay">
        <div className="hero-content">
          <h1 className="hero-title" style={{marginTop: "150px"}}>
            Global Capability Olympiad
          </h1>
          <p className="hero-subtitle">
            The Global Capability Olympiad is the world's first preparation-free,
            syllabus-free, AI-integrated Master Olympiad designed to measure
            thinking, not memory.
          </p>

          <div className="hero-buttons">
            <button className="btn-secondary" onClick={() => navigate('/contact')}>Contact us</button>
            <button className="btn-black" onClick={() => navigate('/gco')}>Explore more</button>
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
