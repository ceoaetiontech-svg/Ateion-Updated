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

import doorPeachnight from "../../assets/hero/door-peachnight.webp";
import learnerPurple from "../../assets/hero/learner-purple.webp";
import meetingsWhitepurple from "../../assets/hero/meetings-whitepurple.webp";
import onlineWorkshopPurple from "../../assets/hero/online-workshop-purple.webp";
import peachFixit from "../../assets/hero/peach-fixit.webp";
import seesawPurplepeach from "../../assets/hero/seesaw-purplepeach.webp";
import strengthsPurple from "../../assets/hero/strengths-purple.webp";
import viewskyPeach from "../../assets/hero/viewsky-peach.webp";
import wateringPurple from "../../assets/hero/watering-purple.webp";
import yogaPurple from "../../assets/hero/yoga-purple.webp";
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

const ITEM_ASPECT_RATIOS: Record<string, string> = {
  "w-[280px]": "280 / 200",
  "w-[320px]": "320 / 200",
  "w-[350px]": "350 / 200",
  "w-[360px]": "360 / 200",
  "w-[380px]": "380 / 200",
  "w-[400px]": "400 / 200",
  "w-[420px]": "420 / 200",
};

function Item({ src, alt, width }: { src: string; alt: string; width?: string }) {
  const cls = width || "w-[360px]";
  return (
    <div
      className={`marquee-card h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] relative shrink-0 rounded-[12px] overflow-hidden cursor-pointer ${cls}`}
      style={{ aspectRatio: ITEM_ASPECT_RATIOS[cls] || "360 / 200" }}
    >
      <img
        alt={alt}
        src={src}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
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
