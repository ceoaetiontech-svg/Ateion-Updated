import React from "react";

const marqueeStyles = `
@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.marquee-wrapper {
  -webkit-mask: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}
.marquee-track {
  animation: marquee-left linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
.marquee-card {
  transition: transform 0.3s ease;
}
.marquee-card:hover {
  transform: scale(1.03);
  z-index: 2;
}
`;

import doorPeachnight from "../../assets/hero/door-peachnight.jpeg";
import learnerPurple from "../../assets/hero/learner-purple.jpeg";
import meetingsWhitepurple from "../../assets/hero/meetings-whitepurple.jpeg";
import onlineWorkshopPurple from "../../assets/hero/online-workshop-purple.jpeg";
import peachFixit from "../../assets/hero/peach-fixit.jpeg";
import seesawPurplepeach from "../../assets/hero/seesaw-purplepeach.jpeg";
import strengthsPurple from "../../assets/hero/strengths-purple.jpeg";
import viewskyPeach from "../../assets/hero/viewsky-peach.jpeg";
import wateringPurple from "../../assets/hero/watering-purple.jpeg";
import yogaPurple from "../../assets/hero/yoga-purple.jpeg";
import certificate from "../../assets/hero/certificate.jpg";
import SharedNavbar from "./SharedNavbar";
import NavbarSpacer from "./NavbarSpacer";

function MarqueeTrack({
  children,
  duration,
  direction = "left",
  align = "end",
}: {
  children: React.ReactNode;
  duration: number;
  direction?: "left" | "right";
  align?: "end" | "center";
}) {
  return (
    <div className="marquee-wrapper overflow-hidden relative w-full">
      <div
        className={`marquee-track flex gap-[12px] shrink-0 ${align === "end" ? "items-end" : "items-center"}`}
        style={{
          width: "max-content",
          animationDuration: `${duration}s`,
          animationName: direction === "right" ? "marquee-right" : "marquee-left",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

function Item({ src, alt, width }: { src: string; alt: string; width?: string }) {
  return (
    <div
      className={`marquee-card h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] relative shrink-0 rounded-[12px] overflow-hidden cursor-pointer ${width || "w-[360px]"}`}
    >
      <img
        alt={alt}
        src={src}
        className="w-full h-full object-cover"
        loading="lazy"
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
}

export function Frame67() {
  return (
    <MarqueeTrack duration={50} direction="right" align="end">
      <Item src={doorPeachnight} alt="" width="w-[280px]" />
      <Item src={learnerPurple} alt="" width="w-[420px]" />
      <Item src={meetingsWhitepurple} alt="" width="w-[380px]" />
      <Item src={onlineWorkshopPurple} alt="" width="w-[350px]" />
      <Item src={peachFixit} alt="" width="w-[360px]" />
    </MarqueeTrack>
  );
}

export function Frame66() {
  return (
    <MarqueeTrack duration={35} direction="left" align="center">
      <Item src={seesawPurplepeach} alt="" width="w-[400px]" />
      <Item src={strengthsPurple} alt="" width="w-[320px]" />
      <Item src={viewskyPeach} alt="" width="w-[380px]" />
      <Item src={wateringPurple} alt="" width="w-[420px]" />
      <Item src={yogaPurple} alt="" width="w-[350px]" />
      <Item src={certificate} alt="" width="w-[340px]" />
    </MarqueeTrack>
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
      <style>{marqueeStyles}</style>
      <NavbarSpacer />
      {/* 1. Content Above */}
      <div className="w-full flex flex-col items-start pb-[20px] md:pb-[32px]">
        {children}
      </div>

      {/* 2. Marquee Animation Below */}
      <div className="w-full flex flex-col gap-[14px] pb-[20px] md:pb-[40px]">
        <Frame67 />
        <Frame66 />
      </div>

      {showNavbar && <SharedNavbar />}
    </div>
  );
}
