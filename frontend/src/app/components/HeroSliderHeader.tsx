import React from "react";

import mascot from "../../assets/mascott.png";
import SharedNavbar from "./SharedNavbar";
import NavbarSpacer from "./NavbarSpacer";

export default function HeroSliderHeader({
  showNavbar = true,
  children,
}: {
  showNavbar?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full bg-[var(--color-background-primary)]">
      <NavbarSpacer />
      {/* 1. Content Above */}
      <div className="w-full flex flex-col items-start pb-[20px] md:pb-[32px]">
        {children}
      </div>

      {/* 2. Centered Mascot */}
      <div className="w-full flex justify-center items-end pb-[20px] md:pb-[40px]">
        <img
          src={mascot}
          alt="Ateion Mascot"
          className="w-[400px] h-[400px] md:w-[580px] md:h-[580px] translate-x-0 md:translate-x-[80px] -translate-y-[10px]"
          style={{
            objectPosition: "center bottom",
            objectFit: "contain",
          }}
        />
      </div>

      {showNavbar && <SharedNavbar />}
    </div>
  );
}
