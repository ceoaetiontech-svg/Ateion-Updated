import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ImageTrail } from "../../app/components/ui/image-trail";

import trail2 from "../../assets/gco/trail-images/olympiad-students-2.png";
import trail4 from "../../assets/gco/trail-images/olympiad-students-4.png";
import trail5 from "../../assets/gco/trail-images/olympiad-students-5.png";
import "../../styles/gco/HeroSection.css";
import "../../styles/fonts.css";

function useIsMouseInSection(sectionRef: React.RefObject<HTMLElement>) {
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setIsInside(inside);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sectionRef]);

  return isInside;
}

function HeroSection() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const trailZoneRef = useRef<HTMLDivElement>(null);
  const isMouseInSection = useIsMouseInSection(heroRef);
  const [disableTrail, setDisableTrail] = useState(false);

  const images = [trail2, trail4, trail5];

  return (
    <section className="hero" ref={heroRef}>
      {/* ─── Upper part: text + buttons + logos ─── */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1
            className="hero-title"
            style={{ fontFamily: "'OV Soge', sans-serif" }}
          >
            Global Capability Olympiad
          </h1>

          <p className="hero-subtitle mb-8 md:mb-12">
            The Global Capability Olympiad is the world&apos;s first
            preparation-free, syllabus-free, AI-integrated Master Olympiad
            designed to measure thinking, not memory.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/contact")}
              onMouseEnter={() => setDisableTrail(true)}
              onMouseLeave={() => setDisableTrail(false)}
            >
              Contact us
            </button>
            <button
              type="button"
              className="btn-black"
              onClick={() => navigate("/gco")}
              onMouseEnter={() => setDisableTrail(true)}
              onMouseLeave={() => setDisableTrail(false)}
            >
              Explore more
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom zone: ImageTrail ─── */}
      <div className="hero-trail-zone" ref={trailZoneRef}>
        <ImageTrail
          containerRef={trailZoneRef}
          disabled={!isMouseInSection || disableTrail}
        >
          {images.map((url, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-24 h-24"
            >
              <img
                src={url}
                alt=""
                className="object-cover absolute inset-0 w-full h-full"
                aria-hidden="true"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
    </section>
  );
}

export default HeroSection;
