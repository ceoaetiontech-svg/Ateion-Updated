/**
 * ============================================================================
 * ATEION SHARED FOOTER
 * ============================================================================
 * Primary footer used across all pages (Homepage, GCO, Contact)
 * ============================================================================
 */

import React from "react";
import svgPaths from "../../imports/svg-paths";
import imgGcoLogo from "../../assets/a440209918fa81a1c528e2e95290d4f1f12546e7.png";

const footerTextClass =
  "text-[14px] text-[var(--color-text-muted)] font-lato leading-[1.4]";

const footerLinkClass =
  `${footerTextClass} cursor-pointer hover:text-[var(--color-text-primary)] transition-colors`;

function SocialIcon({
  svgPath,
  href,
  size = "w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]",
}: {
  svgPath: string;
  href?: string;
  size?: string;
}) {

  const IconContainer = href ? "a" : "div";

  const linkProps = href
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <IconContainer
      {...linkProps}
      className={`${size} cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center`}
    >
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 22.2726 22.2726"
      >
        <path
          d={svgPath}
          fill="var(--color-text-primary)"
          fillOpacity="0.7"
        />
      </svg>
    </IconContainer>
  );
}

function FooterSocialLinks() {
  return (
    <div className="flex gap-[18px] items-center">

      {/* LINKEDIN */}
      <SocialIcon
        svgPath={svgPaths.peb98800}
        href="https://www.linkedin.com/company/ateion/"
        size="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px]"
      />

      {/* X / TWITTER ICON */}
      <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center">
        <img
          src={imgGcoLogo}
          alt="Twitter / X"
          className="w-full h-full object-cover social-png-icon"
        />
      </div>

      {/* MAIL ICON */}
      <a
        href="mailto:destiny@ateion.info?subject=Hello%20Ateion"
        className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] rounded-full bg-black flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 6H20V18H4V6Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M4 7L12 13L20 7"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </a>

    </div>
  );
}

function FooterBrand() {
  return (
    <div className="flex flex-col gap-[16px] sm:gap-[24px] items-start">

      <p className="font-bold text-[18px] text-[var(--color-text-primary)] font-lato">
        Ateion Pvt. Ltd.
      </p>

      <FooterSocialLinks />

    </div>
  );
}

function FooterContact() {
  return (
    <div className="flex flex-col gap-[10px] sm:gap-[12px] items-start">

      <p className={footerTextClass}>
        PCMC , Pune , Maharashtra - 500034
      </p>

      <p className={footerTextClass}>
        +91 93569 76878
      </p>

      <a
        href="mailto:destiny@ateion.info?subject=Hello%20Ateion"
        className={footerLinkClass}
      >
        destiny@ateion.info
      </a>

    </div>
  );
}

function FooterLegal() {
  return (
    <div className="flex flex-col gap-[12px] sm:gap-[16px] items-start">

      <p className={footerLinkClass}>
        Terms of Use
      </p>

      <p className={footerLinkClass}>
        Privacy Policy
      </p>

      <p className={footerLinkClass}>
        Data Collection & Consent
      </p>

    </div>
  );
}

function FooterMain() {
  return (
    <div className="bg-[var(--color-background-primary)] w-full py-[32px] sm:py-[40px] md:py-[48px]">

      <div className="flex flex-col sm:flex-row items-start justify-between w-full max-w-[1240px] mx-auto px-[24px] sm:px-[32px] md:px-[64px] gap-[32px] sm:gap-[48px] md:gap-[64px]">

        <div className="flex-[1] min-w-0 w-full sm:w-auto">
          <FooterBrand />
        </div>

        <div className="flex-[1] min-w-0 w-full sm:w-auto">
          <FooterContact />
        </div>

        <div className="flex-[1] min-w-0 w-full sm:w-auto">
          <FooterLegal />
        </div>

      </div>

    </div>
  );
}

function FooterCopyright() {
  return (
    <div className="bg-[#1e1632] h-[56px] sm:h-[64px] w-full flex items-center justify-center px-[24px] sm:px-[32px]">

      <p className="text-[12px] sm:text-[14px] text-[#ffffff]/80 text-center font-lato">
        Copyright ©Ateion 2026. All Rights Reserved.
      </p>

    </div>
  );
}

export default function SharedFooter() {
  return (
    <footer className="w-full">
      <FooterMain />
      <FooterCopyright />
    </footer>
  );
}