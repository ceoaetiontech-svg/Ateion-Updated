import React, { useEffect } from "react";
import HeroSection from "./gco/HeroSection";
import Slide from "./gco/Slide";
import GCOComparison from "./gco/GCOComparison";
import TimelineSection from "./gco/TimelineSection";
import Navbar from "../app/components/Navbar";
import SharedFooter from "./SharedFooter";

import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";

const GCOPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f7f3eb] w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="-mt-[80px]">
        <HeroSection />
        <Slide />
        <GCOComparison />
        <TimelineSection />
      </main>
      <div className="shared-navbar-spacer" />
      <SharedFooter />
    </div>
  );
};

export default GCOPage;
