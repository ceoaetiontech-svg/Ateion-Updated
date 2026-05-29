import React from "react";
import { motion } from "framer-motion";
import hero1 from "../../assets/hero/hero1.png";
import hero2 from "../../assets/hero/hero2.png";
import hero3 from "../../assets/hero/hero3.png";
import hero4 from "../../assets/hero/hero4.png";
import hero5 from "../../assets/hero/hero5.png";
import hero6 from "../../assets/hero/hero6.png";
import hero7 from "../../assets/hero/hero7.png";
import hero8 from "../../assets/hero/hero8.png";
import hero9 from "../../assets/hero/hero9.png";
import certificate from "../../assets/hero/certificate.jpg";
import SharedNavbar from "./SharedNavbar";

const itemClass =
  "h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] relative shrink-0 rounded-lg overflow-hidden shadow-sm transition-all duration-500";

export function Frame67() {
  const items = (
    <>
      <div className={`${itemClass} w-[280px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero1} />
      </div>
      <div className={`${itemClass} w-[420px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero2} />
      </div>
      <div className={`${itemClass} w-[380px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero3} />
      </div>
      <div className={`${itemClass} w-[350px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero4} />
      </div>
      <div className={`${itemClass} w-[360px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero8} />
      </div>
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1850] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="flex gap-[12px] items-end shrink-0"
        style={{ width: "max-content" }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}

export function Frame66() {
  const items = (
    <>
      <div className={`${itemClass} w-[400px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero5} />
      </div>
      <div className={`${itemClass} w-[320px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero6} />
      </div>
      <div className={`${itemClass} w-[380px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero7} />
      </div>
      <div className={`${itemClass} w-[420px]`}>
        <img alt="" className="w-full h-full object-cover" src={hero9} />
      </div>
      <div className={`${itemClass} w-[340px]`}>
        <img alt="" className="w-full h-full object-cover" src={certificate} />
      </div>
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-[12px] items-center shrink-0"
        style={{ width: "max-content" }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}

export default function HeroSliderHeader({
  showNavbar = true,
  children,
}: {
  showNavbar?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full bg-[var(--color-background-primary)]">
      {/* 1. Marquee Animation (Top) - Merged rows */}
      <div className="w-full pt-[80px] sm:pt-[100px] flex flex-col gap-[14px]">
        <Frame67 />
        <Frame66 />
      </div>

      {/* 2. Main Content (Below Marquee) */}
      <div className="w-full flex flex-col items-start pt-[60px] md:pt-[80px] pb-[80px]">
        {children}
      </div>

      {showNavbar && (
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <SharedNavbar />
        </div>
      )}
    </div>
  );
}
