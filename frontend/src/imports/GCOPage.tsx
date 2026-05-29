import React, { useEffect } from "react";
import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";
import HeroSection from "./gco/HeroSection";
import Slide from "./gco/Slide";
import GCOComparison from "./gco/GCOComparison";
import TimelineSection from "./gco/TimelineSection";
import GCOQuestionSection from "./gco/GCOQuestionSection";
import BeyondScore from "./gco/BeyondScore";

import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";

const GCOPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SharedNavbar />
      <div id="gco-root" className="bg-[var(--color-background-primary)] w-full min-h-screen overflow-x-hidden relative">
        <main className="mt-[60px] md:mt-[60px]">
          <HeroSection />
          <Slide />
          <GCOComparison />
          <TimelineSection />
          <GCOQuestionSection />
          <BeyondScore />
        </main>
      </div>
      <SharedFooter />
    </>
  );
};

export default GCOPage;
