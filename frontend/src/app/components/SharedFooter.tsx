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

const footerTextClass = "text-[13px] sm:text-[14px] text-[rgba(0,0,0,0.6)] font-lato";
const footerLinkClass = `${footerTextClass} cursor-pointer hover:text-black transition-colors`;

function SocialIcon({ svgPath }: { svgPath: string }) {
  return (
    <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] cursor-pointer hover:opacity-70 transition-opacity">
      <svg className="w-full h-full" fill="none" viewBox="0 0 22.2726 22.2726">
        <path d={svgPath} fill="black" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

function FooterSocialLinks() {
  return (
    <div className="flex gap-[12px] sm:gap-[16px] items-center">
      <SocialIcon svgPath={svgPaths.peb98800} />
      <SocialIcon svgPath={svgPaths.p7943900} />
      <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] cursor-pointer hover:opacity-70 transition-opacity">
        <img src={imgGcoLogo} alt="YouTube" className="w-full h-full object-cover" />
      </div>
      <SocialIcon svgPath={svgPaths.p13c87470} />
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="flex flex-col gap-[16px] sm:gap-[24px] items-start">
      <p className="font-bold text-[16px] sm:text-[18px] text-black font-lato">Ateion Pvt. Ltd.</p>
      <FooterSocialLinks />
    </div>
  );
}

function FooterContact() {
  return (
    <div className="flex flex-col gap-[10px] sm:gap-[12px] items-start">
      <p className={`${footerTextClass} leading-[1.4]`}>
        PCMC , Pune , Maharashtra - 500034
      </p>
      <p className={footerTextClass}>+91 93569 76878</p>
      <p className="text-[13px] sm:text-[14px] text-[rgba(0,0,0,0.6)] font-inter">destiny@ateion.com</p>
    </div>
  );
}

function FooterLegal() {
  return (
    <div className="flex flex-col gap-[12px] sm:gap-[16px] items-start">
      <p className={footerLinkClass}>Terms of Use</p>
      <p className={footerLinkClass}>Privacy Policy</p>
      <p className={footerLinkClass}>Data Collection & Consent</p>
    </div>
  );
}

function FooterMain() {
  return (
    <div className="bg-[#f7f3eb] w-full py-[32px] sm:py-[40px] md:py-[48px]">
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
      <p className="text-[12px] sm:text-[14px] text-white/80 text-center font-lato">
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
