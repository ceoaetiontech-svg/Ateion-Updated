import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import svgPaths from "./svg-1lr6hhp4h8";
import logo from "../assets/logo.png";
import imgRectangle9 from "../assets/e54e08242e5e8cea29c382ba6bc82218d425f28e.png";
import imgImage9 from "../assets/3aab4451afd875f66a83eb26e0ca2d6f58abce98.png";
import imgImage7 from "../assets/e985b07ea1f916546c05a06ca93558ef62ecc870.png";
import imgImage13 from "../assets/a440209918fa81a1c528e2e95290d4f1f12546e7.png";
import DotMap from "../components/DotMap";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // easeOutQuart
        onUpdate: (v) => setCount(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.45, 0.32, 0.9],
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function VerticalTicker() {
  const words = ["Inefficient", "Outdated", "Deprecated", "Stagnant"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="h-[140px] overflow-hidden relative w-full flex items-center">
      {/* Visual Indicator Line */}
      <div className="absolute left-0 w-[2px] h-[40px] bg-[#fb4444] rounded-full z-10" />

      <motion.div
        animate={{ y: -index * 44 + 48 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col relative pl-[16px]"
      >
        {words.map((word, i) => (
          <motion.p
            key={i}
            animate={{
              color: i === index ? "#ffffff" : "#000000",
              opacity: i === index ? 1 : 0.25,
              scale: i === index ? 1.1 : 0.9,
              x: i === index ? 0 : -5
            }}
            transition={{ duration: 0.8 }}
            className="font-['Outfit:Semi_Bold',sans-serif] text-[36px] h-[44px] flex items-center shrink-0 whitespace-nowrap origin-left"
          >
            {word}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

function Frame67() {
  const items = (
    <>
      <div className="bg-[#d9d9d9] h-[189px] shrink-0 w-[229px]" />
      <div className="bg-[#4aa0e0] h-[194px] shrink-0 w-[454px]" />
      <div className="bg-[#9dc5dc] h-[194px] shrink-0 w-[454px]" />
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1191] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-[12px] items-end shrink-0"
        style={{ width: 'max-content' }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}

function Frame66() {
  const items = (
    <>
      <div className="h-[201px] relative shrink-0 w-[229px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#af0101] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[363.5%] left-0 max-w-none top-[-81%] w-[561.27%]" src={imgRectangle9} />
          </div>
        </div>
      </div>
      <div className="h-[201px] relative shrink-0 w-[326px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#eee] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[358.13%] left-[-74.47%] max-w-none top-[-77.83%] w-[388.97%]" src={imgRectangle9} />
          </div>
        </div>
      </div>
      <div className="bg-[#101010] h-[201px] shrink-0 w-[332px]" />
      <div className="h-[201px] relative shrink-0 w-[332px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#b9a38e] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[370.92%] left-[-283.94%] max-w-none top-[-82.14%] w-[387.79%]" src={imgRectangle9} />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1291] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-[12px] items-center shrink-0"
        style={{ width: 'max-content' }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}

function Frame65() {
  const items = (
    <>
      <div className="bg-gradient-to-b from-[#cdcdcd] h-[238px] shrink-0 to-[98.358%] to-[rgba(175,175,175,0)] w-[166px]" />
      <div className="bg-gradient-to-b from-[#cdcdcd] from-[9.884%] h-[238px] shrink-0 to-[93.649%] to-[rgba(175,175,175,0)] w-[248px]" />
      <div className="h-[238px] shrink-0 w-[255px]" style={{ backgroundImage: "linear-gradient(179.755deg, rgb(205, 205, 205) 5.9207%, rgba(175, 175, 175, 0) 88.453%)" }} />
      <div className="bg-gradient-to-b from-[#cdcdcd] from-[2.152%] h-[238px] shrink-0 to-[95.353%] to-[rgba(175,175,175,0)] w-[255px]" />
      <div className="h-[238px] shrink-0 w-[255px]" style={{ backgroundImage: "linear-gradient(179.748deg, rgb(205, 205, 205) 12.486%, rgba(175, 175, 175, 0) 97.032%)" }} />
    </>
  );

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        animate={{ x: [0, -1239] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="flex gap-[8px] items-center shrink-0"
        style={{ width: 'max-content' }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-0 top-0 w-[1280px]">
      <Frame67 />
      <Frame66 />
      <Frame65 />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 h-[31.799px] ml-0 mt-0 relative row-1 w-[36.971px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.9784 31.7993">
        <g id="Group">
          <path d={svgPaths.p3509f200} id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0731498" />
          <path d={svgPaths.p4fe3b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0731498" />
          <path d={svgPaths.p4fe3b00} id="Vector_3" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0794042" />
          <g id="Vector_4" />
          <path d={svgPaths.p4fe3b00} id="Vector_5" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0620969" />
          <path d={svgPaths.pac99c80} fill="var(--fill-0, black)" id="Vector_6" opacity="0.48" />
          <path d={svgPaths.p2555a648} id="Vector_7" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0620969" />
          <path d={svgPaths.p4fe3b00} id="Vector_8" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0620969" />
          <g id="Group_2" opacity="0.5">
            <path d={svgPaths.pfce1600} fill="var(--fill-0, black)" id="Vector_9" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0365749" />
            <path d={svgPaths.p3e59c800} fill="var(--fill-0, black)" id="Vector_10" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0365749" />
            <path d={svgPaths.p30aae00} fill="var(--fill-0, black)" id="Vector_11" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0365749" />
            <path d={svgPaths.p16c912c0} fill="var(--fill-0, black)" id="Vector_12" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p3646e400} fill="var(--fill-0, black)" id="Vector_13" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p21bcac00} fill="var(--fill-0, black)" id="Vector_14" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.pa72e600} fill="var(--fill-0, black)" id="Vector_15" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p31604700} fill="var(--fill-0, black)" id="Vector_16" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p1a63aec0} fill="var(--fill-0, black)" id="Vector_17" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.pfa356c0} fill="var(--fill-0, black)" id="Vector_18" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p51ea100} fill="var(--fill-0, black)" id="Vector_19" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p141bda00} fill="var(--fill-0, black)" id="Vector_20" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <path d={svgPaths.p2f11f000} fill="var(--fill-0, black)" id="Vector_21" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0356313" />
            <g id="Vector_22">
              <path d={svgPaths.p2a200000} fill="var(--fill-0, black)" />
              <path d={svgPaths.p2a200000} stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            </g>
            <path d={svgPaths.p1de50f00} fill="var(--fill-0, black)" id="Vector_23" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.p28f45c00} fill="var(--fill-0, black)" id="Vector_24" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.p607ac80} fill="var(--fill-0, black)" id="Vector_25" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.pa72e600} fill="var(--fill-0, black)" id="Vector_26" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.p2f11f000} fill="var(--fill-0, black)" id="Vector_27" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.p36fe1180} id="Vector_28" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.p30692400} id="Vector_29" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
            <path d={svgPaths.p29d8f4fe} id="Vector_30" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0579347" />
          </g>
          <path d={svgPaths.p44b6400} id="Vector_31" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="0.0794042" />
          <path d={svgPaths.p10f6b380} fill="var(--fill-0, black)" id="Vector_32" />
          <path d={svgPaths.p15164280} fill="var(--fill-0, black)" id="Subtract" />
          <path d={svgPaths.p1ea20600} fill="var(--fill-0, black)" id="Subtract_2" />
          <path d={svgPaths.p17010d00} fill="var(--fill-0, #D4CFC5)" id="Subtract_3" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group />
    </div>
  );
}

function Group4() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group4 />
      <div className="col-1 h-[16.31px] ml-[4.03px] mt-[13.85px] relative row-1 w-[17.233px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2333 16.3101">
          <path d={svgPaths.p3a430600} fill="var(--fill-0, #D4CFC5)" id="Vector 464" />
        </svg>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <img 
        src={logo} 
        alt="Ateion Logo" 
        className="h-[60px] object-contain w-auto transform transition-transform hover:scale-105"
      />
    </div>
  );
}


// Frame8 and Frame7 merged into Frame9

function Frame9() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[rgba(227,227,227,0.72)] content-stretch flex h-[32px] items-center justify-center px-[20px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[rgba(200,200,200,0.85)] transition-colors"
    >
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#292929] text-[12px] whitespace-nowrap">About Us</p>
    </motion.div>
  );
}

// Frame2 merged into Frame3

function Frame3() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[rgba(227,227,227,0.72)] content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[18px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[rgba(200,200,200,0.85)] transition-colors"
    >
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#292929] text-[12px] whitespace-nowrap">Workshops</p>
      <div className="flex items-center justify-center relative shrink-0 opacity-80 group-hover:translate-y-0.5 transition-transform">
        <div className="flex-none rotate-180">
          <div className="relative size-[8px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.06516 7.25">
              <path d={svgPaths.p3367e500} fill="var(--fill-0, #292929)" id="Polygon 1" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useNavigate } from "react-router";

function Frame5() {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/gco')}
      className="bg-[rgba(227,227,227,0.72)] content-stretch flex h-[32px] items-center justify-center px-[20px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[rgba(200,200,200,0.85)] transition-colors"
    >
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#292929] text-[12px] whitespace-nowrap">Global Olympiad</p>
    </motion.div>
  );
}

function Frame6() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[rgba(227,227,227,0.72)] content-stretch flex h-[32px] items-center justify-center px-[20px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[rgba(200,200,200,0.85)] transition-colors"
    >
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#292929] text-[12px] whitespace-nowrap">Resources</p>
    </motion.div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame9 />
      <Frame3 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

// Frame1 merged into Frame11

function Frame11() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(251, 68, 68, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#fb4444] content-stretch flex h-[36px] items-center justify-center px-[20px] relative rounded-full shrink-0 group cursor-pointer hover:bg-[#ff5555] transition-all"
    >
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[13px] text-white whitespace-nowrap">Get Connected</p>
    </motion.div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex items-center justify-between px-[24px] py-[20px] relative shrink-0 w-full max-w-[1280px] mx-auto z-50">
      <div className="flex flex-1 items-center justify-start">
        <Group5 />
      </div>
      <div className="flex-[2] flex items-center justify-center">
        <Frame10 />
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Frame11 />
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="h-[665px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative size-full">
        <Frame68 />
        <Frame69 />
      </div>
    </div>
  );
}


// Frame merged into Frame4

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Explore more</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#fb4444] content-stretch flex flex-col h-[45px] items-center justify-center pl-[46px] pr-[49px] py-[15px] relative rounded-[154px] shrink-0 w-[172px]">
      <Frame />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[22px] pl-[58px] relative shrink-0 w-[972px]">
      <p className="font-['OV_Soge:Semi_Bold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[61.65px] text-black w-[min-content]">Reimagining Education</p>
      <Frame4 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame70 />
      <Frame43 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[133px] items-start not-italic relative shrink-0 text-black w-[232px]">
      <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[0] min-w-full relative shrink-0 text-[0px] w-[min-content]">
        <span className="leading-[normal] text-[24px]">{`Because `}</span>
        <span className="font-['SF_Pro_Display:Bold',sans-serif] leading-[normal] text-[24px]">{`marks `}</span>
        <span className="leading-[normal] text-[24px]">measure memory.</span>
        <span className="font-['IBM_Plex_Sans:SemiBold_Italic',sans-serif] italic leading-[normal] text-[24px]">{` `}</span>
        <span className="font-['SF_Pro_Display:Bold',sans-serif] leading-[normal] text-[32px]">Capability</span>
        <span className="leading-[normal] text-[24px]">{` `}</span>
        <span className="font-['IBM_Plex_Sans:Bold_Italic',sans-serif] italic leading-[normal] text-[24px]">measures the future.</span>
      </p>
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[normal] relative shrink-0 text-[20px] w-[190px] whitespace-pre-wrap">{`Ateion is the world’s leading Capability-First Education ecosystem  integrating AI literacy, innovation, and measurable readiness into modern schooling.`}</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[#dadada] content-stretch flex h-[504px] items-start pb-[31px] pl-[17px] pt-[18px] relative rounded-[15px] shrink-0 w-[249px]">
      <Frame46 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div className="bg-[#aa9dff] h-[504px] rounded-bl-[13px] rounded-tl-[13px] shrink-0 w-[918px]" />
      <Frame47 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col gap-[26px] items-start relative shrink-0 w-[262px]">
      <p className="font-['OV_Soge:Medium',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[36px] text-white tracking-[0.72px] w-[min-content]">Globally Aligned with</p>
      <div className="h-[186px] relative rounded-[16px] shrink-0 w-[251px]" data-name="image 9">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage9} />
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame54 />
      <div className="h-[312px] relative rounded-[9px] shrink-0 w-[221px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgImage7} />
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="bg-[#202020] content-stretch flex flex-col h-[377px] items-start pb-[32px] pt-[33px] px-[31px] relative rounded-[19px] shrink-0 w-[561px]">
      <Frame55 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="h-[132px] relative shrink-0 w-[235px]">
      <p className="absolute font-['OV_Soge:Semi_Bold',sans-serif] leading-[normal] left-0 not-italic text-[24px] text-black top-0 w-[235px]">Education is not broken. Its measurement system is :</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col font-['OV_Soge:Semi_Bold',sans-serif] gap-[4px] items-start justify-end leading-[normal] not-italic pt-[65px] relative shrink-0 w-[229px]">
      <p className="bg-clip-text h-[38px] relative shrink-0 text-[39.568px] text-[transparent] w-full" style={{ backgroundImage: "linear-gradient(0.837884deg, rgb(0, 0, 0) 26.631%, rgba(102, 102, 102, 0.32) 78.356%)" }}>
        Inefficient
      </p>
      <p className="h-[41px] relative shrink-0 text-[39.568px] text-white w-full">Outdated</p>
      <p className="h-[38px] relative shrink-0 text-[36.324px] text-black w-full">Deprecated</p>
      <p className="bg-clip-text h-[42px] relative shrink-0 text-[39.568px] text-[transparent] w-full" style={{ backgroundImage: "linear-gradient(180.833deg, rgb(0, 0, 0) 15.485%, rgba(102, 102, 102, 0.32) 73.42%)" }}>
        Stagnant
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame50 />
      <Frame49 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[511px]">
      <Frame51 />
      <p className="font-['SF_Pro_Display:Medium',sans-serif] h-[87px] leading-[0] not-italic relative shrink-0 text-[0px] text-black w-full">
        <span className="leading-[33px] text-[20px]">{`Ateion replaces memory-based validation with `}</span>
        <span className="font-['IBM_Plex_Sans:Bold_Italic',sans-serif] italic leading-[33px] text-[36px]">Capability-based intelligence.</span>
      </p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-[#ff6b6b] content-stretch flex flex-col h-[377px] items-start pb-[9px] pl-[51px] pr-[25px] pt-[33px] relative rounded-[19px] shrink-0 w-[587px]">
      <Frame52 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[19px] items-center relative shrink-0 w-full">
      <Frame56 />
      <Frame53 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0 w-[1167px]">
      <Frame48 />
      <Frame57 />
    </div>
  );
}

function Text() {
  return (
    <div className="flex items-center justify-center relative shrink-0" data-name="text">
      <p className="font-['Outfit:Semi_Bold',sans-serif] font-semibold not-italic opacity-90 relative text-[36px] text-center text-white tracking-wide whitespace-nowrap">
        Powered by Proven Numbers
      </p>
    </div>
  );
}

function Frame27() {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="content-stretch flex flex-col items-center justify-center relative shrink-0"
    >
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[54px]">
        <Counter value={200} suffix="+" />
      </p>
      <p className="font-['Inter:Medium',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[18px] mt-[8px]">Partner Institutions</p>
    </motion.div>
  );
}

function Frame29() {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="content-stretch flex flex-col items-center justify-center relative shrink-0"
    >
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[54px]">
        <Counter value={50000} suffix="+" />
      </p>
      <p className="font-['Inter:Medium',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[18px] mt-[8px]">Students Empowered</p>
    </motion.div>
  );
}

function Frame28() {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="content-stretch flex flex-col items-center justify-center relative shrink-0"
    >
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[54px]">
        <Counter value={193} suffix="+" />
      </p>
      <p className="font-['Inter:Medium',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[18px] mt-[8px]">Global Alliances</p>
    </motion.div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center justify-around relative shrink-0 w-full py-[16px]">
      <Frame27 />
      <Frame29 />
      <Frame28 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
      <FadeIn>
        <Text />
      </FadeIn>
      <FadeIn delay={0.2}>
        <Frame30 />
      </FadeIn>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame60 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-col gap-[33px] items-center relative shrink-0 w-full">
      <Frame42 />
      <div className="aspect-[1280/450] relative shrink-0 w-full bg-[#050505]">
        <div className="absolute inset-0 scale-[0.92] origin-center flex items-center justify-center">
          <DotMap />
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame61 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-black h-auto relative shrink-0 w-full py-[80px]">
      <div className="content-stretch flex flex-col items-center relative size-full">
        <Frame59 />
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame62 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame71 />
      <Frame64 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col gap-[45px] items-center relative shrink-0 w-full">
      <Frame58 />
      <Frame63 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-center justify-between not-italic relative shrink-0 text-black w-full max-w-[1280px] mx-auto px-[64px] py-[48px] gap-[64px]">
      <p className="font-['Outfit:Semi_Bold',sans-serif] leading-tight relative shrink-0 text-[48px] flex-1">
        Education is not broken.
      </p>
      <p className="font-['Inter:Regular',sans-serif] leading-relaxed relative shrink-0 text-[18px] text-[rgba(0,0,0,0.7)] flex-1">
        <span>{`Its measurement system is `}</span>
        <span className="font-bold">outdated.</span>
        <span>{` Ateion replaces memory-based validation with `}</span>
        <span className="font-bold italic">capability-based intelligence.</span>
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 w-[382px]" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 w-[384px]" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 w-[382px]" />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 w-[382px]" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 w-[384px]" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 w-[382px]" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame39 />
      <Frame40 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[24px] items-start ml-0 mt-0 relative row-1 w-[1188px]">
      <Frame44 />
      <Frame41 />
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <FadeIn>
        <Frame73 />
      </FadeIn>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center relative shrink-0 w-full">
      <Frame72 />
      <Group6 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 pb-[16px] top-0 w-[111px]">
      <p className="font-['DM_Sans:ExtraLight',sans-serif] font-extralight h-[22px] leading-[31.5px] relative shrink-0 text-[#272424] text-[14px] text-center w-[94px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Brand Strategy
      </p>
      <div className="h-[21px] mb-[-16px] relative rounded-[30px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#272424] border-[0.5px] border-solid inset-[-0.25px] pointer-events-none rounded-[30.25px]" />
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[121px] pb-[16px] top-px w-[124px]">
      <p className="font-['DM_Sans:ExtraLight',sans-serif] font-extralight h-[21px] leading-[31.5px] relative shrink-0 text-[#272424] text-[14px] text-center w-[124px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Brand Naming
      </p>
      <div className="h-[21px] mb-[-16px] relative rounded-[30px] shrink-0 w-[124px]">
        <div aria-hidden="true" className="absolute border-[#272424] border-[0.5px] border-solid inset-[-0.25px] pointer-events-none rounded-[30.25px]" />
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 pb-[16px] top-[35px] w-[124px]">
      <p className="font-['DM_Sans:ExtraLight',sans-serif] font-extralight h-[21px] leading-[31.5px] relative shrink-0 text-[#272424] text-[14px] text-center w-[124px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`Tagline `}</p>
      <div className="h-[21px] mb-[-16px] relative rounded-[30px] shrink-0 w-[110px]">
        <div aria-hidden="true" className="absolute border-[#272424] border-[0.5px] border-solid inset-[-0.25px] pointer-events-none rounded-[30.25px]" />
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="h-[61px] relative shrink-0 w-[370px]">
      <Frame33 />
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Semi_Bold',sans-serif] leading-[1.19] not-italic relative shrink-0 text-[40px] text-black tracking-[0.4px] w-[544px]">Global Capability Olympiad</p>
      <Frame31 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:Light',sans-serif] font-light leading-[2] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        (01)
      </p>
      <Frame36 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[32px] items-start ml-0 mt-0 relative row-1 w-[392px]">
      <Frame37 />
      <div className="h-[51px] relative shrink-0 w-[168px]" data-name="view more">
        <div className="absolute bg-[#161616] inset-0 rounded-[30px]" />
        <p className="absolute font-['Outfit:Medium',sans-serif] inset-[27.27%_35.12%_14.55%_11.31%] leading-[31.5px] not-italic text-[16px] text-white tracking-[0.16px] whitespace-nowrap">View More</p>
        <div className="absolute flex inset-[20%_12.95%_15.8%_66.07%] items-center justify-center">
          <div className="flex-none h-[25.498px] rotate-[145.49deg] w-[25.24px]">
            <div className="relative size-full">
              <div className="absolute inset-[-1.97%_-0.29%_-2.43%_-4.32%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.8037 25.3201">
                  <path d={svgPaths.p17967a28} id="Vector 3" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[287px] place-items-start relative row-1">
      <Frame38 />
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[336.118px] ml-[482.28px] mt-[79.07px] relative row-1 w-[212.218px]">
        <div className="absolute inset-[0_0_-0.13%_-0.19%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.806 336.735">
            <path d={svgPaths.p242fe600} id="Vector 467" stroke="var(--stroke-0, black)" strokeWidth="0.880415" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[497.69px] mt-[137.18px] relative row-1 size-[272.929px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 272.929 272.929">
          <circle cx="136.464" cy="136.464" fill="var(--fill-0, #1E1632)" id="Ellipse 4335" r="136.464" />
        </svg>
      </div>
      <div className="col-1 ml-[385.88px] mt-[414.51px] relative row-1 size-[248.277px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Ellipse 4336" />
        </svg>
      </div>
      <div className="col-1 ml-[385.88px] mt-[414.51px] relative row-1 size-[248.277px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 248.277 248.277">
          <circle cx="124.138" cy="124.138" id="Ellipse 4337" r="123.698" stroke="var(--stroke-0, black)" strokeWidth="0.880415" />
        </svg>
      </div>
      <div className="col-1 ml-[691.38px] mt-[369.61px] relative row-1 size-[248.277px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 248.277 248.277">
          <circle cx="124.138" cy="124.138" id="Ellipse 4337" r="123.698" stroke="var(--stroke-0, black)" strokeWidth="0.880415" />
        </svg>
      </div>
      <div className="col-1 ml-[824.32px] mt-[57.94px] relative row-1 size-[333.677px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 333.677 333.677">
          <circle cx="166.839" cy="166.839" id="Ellipse 4339" r="166.398" stroke="var(--stroke-0, black)" strokeWidth="0.880415" />
        </svg>
      </div>
      <div className="col-1 ml-[223px] mt-0 relative row-1 size-[274.689px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 274.689 274.689">
          <circle cx="137.345" cy="137.345" fill="var(--fill-0, #FF595B)" id="Ellipse 4340" r="137.345" />
        </svg>
      </div>
      <div className="col-1 h-[125.899px] ml-[560.64px] mt-[390.74px] relative row-1 w-[71.754px]">
        <div className="absolute inset-[-0.39%_-0.72%_-0.41%_-0.61%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.7077 126.898">
            <path d={svgPaths.p3505a800} fill="var(--stroke-0, black)" id="Vector 465" />
          </svg>
        </div>
      </div>
      <div className="col-1 h-[294.499px] ml-[402.61px] mt-[108.13px] relative row-1 w-[471.022px]">
        <div className="absolute inset-[-0.61%_0_-1%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 471.903 299.228">
            <path d={svgPaths.p3938fb80} fill="var(--stroke-0, black)" id="Vector 466" />
          </svg>
        </div>
      </div>
      <div className="col-1 h-[178.284px] ml-[697.98px] mt-[280.69px] relative row-1 w-[84.96px]">
        <div className="absolute inset-[0_-0.48%_0_-0.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.8082 178.495">
            <path d={svgPaths.pe1a2a00} id="Vector 468" stroke="var(--stroke-0, black)" strokeWidth="0.880415" />
          </svg>
        </div>
      </div>
      <p className="col-1 font-['Outfit:Semi_Bold',sans-serif] leading-[normal] ml-[546.87px] mt-[208.5px] not-italic relative row-1 text-[21.13px] text-white whitespace-nowrap">Ateion</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] leading-[normal] ml-[547.87px] mt-[248.11px] not-italic relative row-1 text-[12.326px] text-white w-[192.811px]">From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH Ateion is building the infrastructure for a capability-based future.</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] leading-[normal] ml-[434.15px] mt-[513.61px] not-italic relative row-1 text-[14.087px] text-black w-[162.195px]">{`From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH `}</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] leading-[normal] ml-[740.52px] mt-[472.56px] not-italic relative row-1 text-[14.087px] text-black w-[162.195px]">{`From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH `}</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] leading-[normal] ml-[879.69px] mt-[205.24px] not-italic relative row-1 text-[14.087px] text-black w-[162.195px]">{`From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH `}</p>
      <p className="col-1 font-['Inter:Regular',sans-serif] leading-[normal] ml-[289px] mt-[126px] not-italic relative row-1 text-[14.087px] text-black w-[162.195px]">{`From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH `}</p>
      <p className="col-1 font-['Outfit:Bold',sans-serif] leading-[normal] ml-[289px] mt-[86px] not-italic relative row-1 text-[32px] text-black whitespace-nowrap">GCO</p>
      <p className="col-1 font-['Outfit:Bold',sans-serif] leading-[normal] ml-[434px] mt-[485px] not-italic relative row-1 text-[19.93px] text-black whitespace-nowrap">Kronos</p>
      <p className="col-1 font-['Outfit:Bold',sans-serif] leading-[normal] ml-[876.15px] mt-[182.08px] not-italic relative row-1 text-[16.71px] text-black w-[106.53px]">Workshops</p>
      <p className="col-1 font-['Outfit:Bold',sans-serif] leading-[normal] ml-[735.28px] mt-[445.33px] not-italic relative row-1 text-[19.93px] text-black whitespace-nowrap">Vouch</p>
      <Group2 />
      <p className="col-1 font-['Outfit:Semi_Bold',sans-serif] ml-[721px] mt-[5px] not-italic opacity-90 relative row-1 text-[36px] text-black w-[396px]">
        <span className="leading-[39px]">Ateion as a</span>
        <span className="font-['IBM_Plex_Sans:SemiBold_Italic',sans-serif] italic leading-[39px]">{` Ecosystem`}</span>
      </p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="col-1 font-['Outfit:Semi_Bold',sans-serif] leading-[1.19] ml-0 mt-0 not-italic relative row-1 text-[32px] text-black text-center whitespace-nowrap">Your Common Questions Answered</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] max-w-[650px] min-h-px min-w-px not-italic relative text-[#170f49] text-[20px]">What is Ateion?</p>
      <button className="bg-[#e7e3dd] content-stretch cursor-pointer flex items-center p-[7px] relative rounded-[100px] shadow-[0px_0.5px_1px_0px_rgba(25,33,61,0.07)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[20.418px]" data-name="Line Rounded/Chevron Right">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[11.91px] items-center justify-center left-[calc(50%+0.91px)] top-1/2 w-[5.955px]">
            <div className="-scale-y-100 flex-none">
              <div className="h-[11.91px] relative w-[5.955px]" data-name="Chevron Right">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                    <path d={svgPaths.p1487cd00} id="Chevron Right" stroke="var(--stroke-0, #1C1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] max-w-[650px] min-h-px min-w-px not-italic relative text-[#170f49] text-[20px]">How is Ateion different from traditional education systems?</p>
      <button className="bg-[#e7e3dd] content-stretch cursor-pointer flex items-center p-[7px] relative rounded-[100px] shadow-[0px_0.5px_1px_0px_rgba(25,33,61,0.07)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[20.418px]" data-name="Line Rounded/Chevron Right">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[11.91px] items-center justify-center left-[calc(50%+0.91px)] top-1/2 w-[5.955px]">
            <div className="-scale-y-100 flex-none">
              <div className="h-[11.91px] relative w-[5.955px]" data-name="Chevron Right">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                    <path d={svgPaths.p1487cd00} id="Chevron Right" stroke="var(--stroke-0, #1C1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] max-w-[650px] min-h-px min-w-px not-italic relative text-[#170f49] text-[20px]">Who can partner with Ateion?</p>
      <button className="bg-[#e7e3dd] content-stretch cursor-pointer flex items-center p-[7px] relative rounded-[100px] shadow-[0px_0.5px_1px_0px_rgba(25,33,61,0.07)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[20.418px]" data-name="Line Rounded/Chevron Right">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[11.91px] items-center justify-center left-[calc(50%+0.91px)] top-1/2 w-[5.955px]">
            <div className="-scale-y-100 flex-none">
              <div className="h-[11.91px] relative w-[5.955px]" data-name="Chevron Right">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                    <path d={svgPaths.p1487cd00} id="Chevron Right" stroke="var(--stroke-0, #1C1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] max-w-[650px] min-h-px min-w-px not-italic relative text-[#170f49] text-[20px]">What is the Global Capability Olympiad (GCO)?</p>
      <button className="bg-[#e7e3dd] content-stretch cursor-pointer flex items-center p-[7px] relative rounded-[100px] shadow-[0px_0.5px_1px_0px_rgba(25,33,61,0.07)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[20.418px]" data-name="Line Rounded/Chevron Right">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[11.91px] items-center justify-center left-[calc(50%+0.91px)] top-1/2 w-[5.955px]">
            <div className="-scale-y-100 flex-none">
              <div className="h-[11.91px] relative w-[5.955px]" data-name="Chevron Right">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                    <path d={svgPaths.p1487cd00} id="Chevron Right" stroke="var(--stroke-0, #1C1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] max-w-[650px] min-h-px min-w-px not-italic relative text-[#170f49] text-[20px]">How are capabilities measured?</p>
      <button className="bg-[#e7e3dd] content-stretch cursor-pointer flex items-center p-[7px] relative rounded-[100px] shadow-[0px_0.5px_1px_0px_rgba(25,33,61,0.07)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[20.418px]" data-name="Line Rounded/Chevron Right">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[11.91px] items-center justify-center left-[calc(50%+0.91px)] top-1/2 w-[5.955px]">
            <div className="-scale-y-100 flex-none">
              <div className="h-[11.91px] relative w-[5.955px]" data-name="Chevron Right">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                    <path d={svgPaths.p1487cd00} id="Chevron Right" stroke="var(--stroke-0, #1C1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] max-w-[650px] min-h-px min-w-px not-italic relative text-[#170f49] text-[20px]">How can institutions get connected?</p>
      <button className="bg-[#e7e3dd] content-stretch cursor-pointer flex items-center p-[7px] relative rounded-[100px] shadow-[0px_0.5px_1px_0px_rgba(25,33,61,0.07)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[20.418px]" data-name="Line Rounded/Chevron Right">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[11.91px] items-center justify-center left-[calc(50%+0.91px)] top-1/2 w-[5.955px]">
            <div className="-scale-y-100 flex-none">
              <div className="h-[11.91px] relative w-[5.955px]" data-name="Chevron Right">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                    <path d={svgPaths.p1487cd00} id="Chevron Right" stroke="var(--stroke-0, #1C1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-[835px]">
      <div className="bg-[#f7f3eb] mb-[-8px] relative rounded-[16px] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.06)] shrink-0 w-full" data-name="Accordions">
        <div className="content-stretch flex items-start px-[32px] py-[26px] relative w-full">
          <Heading />
        </div>
      </div>
      <div className="bg-[#f7f3eb] mb-[-8px] relative rounded-[16px] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.06)] shrink-0 w-full" data-name="Accordions">
        <div className="content-stretch flex items-start px-[32px] py-[26px] relative w-full">
          <Heading1 />
        </div>
      </div>
      <div className="bg-[#f7f3eb] mb-[-8px] relative rounded-[16px] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.06)] shrink-0 w-full" data-name="Accordions">
        <div className="content-stretch flex items-start px-[32px] py-[26px] relative w-full">
          <Heading2 />
        </div>
      </div>
      <div className="bg-[#f7f3eb] mb-[-8px] relative rounded-[16px] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.06)] shrink-0 w-full" data-name="Accordions">
        <div className="content-stretch flex items-start px-[32px] py-[26px] relative w-full">
          <Heading3 />
        </div>
      </div>
      <div className="bg-[#f7f3eb] mb-[-8px] relative rounded-[16px] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.06)] shrink-0 w-full" data-name="Accordions">
        <div className="content-stretch flex items-start px-[32px] py-[26px] relative w-full">
          <Heading4 />
        </div>
      </div>
      <div className="bg-[#f7f3eb] mb-[-8px] relative rounded-[16px] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.06)] shrink-0 w-full" data-name="Accordions">
        <div className="content-stretch flex items-start px-[32px] py-[26px] relative w-full">
          <Heading5 />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[1044.984px]">
      <Group1 />
      <Frame45 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center relative shrink-0 w-full max-w-[1160px] mx-auto py-[80px]">
      <Group7 />
      <Frame32 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center relative shrink-0 w-full">
      <Frame74 />
      <Frame75 />
    </div>
  );
}

function Frame25() {
  return <div className="h-[84.45px] overflow-clip shrink-0 w-[143.844px]" />;
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lato:Bold',sans-serif] font-bold leading-tight not-italic relative shrink-0 text-[18px] text-black">Ateion Pvt. Ltd.</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[22.273px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[22.273px]" data-name="react-icons/ri/RiLinkedinFill">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2726 22.2726">
          <g id="Group">
            <g id="Vector" />
            <path d={svgPaths.peb98800} fill="var(--fill-0, black)" fillOpacity="0.7" id="Vector_2" />
          </g>
        </svg>
      </div>
      <div className="relative shrink-0 size-[22.273px]" data-name="react-icons/si/SiWhatsapp">
        <div className="absolute inset-[0_0.24%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.1669 22.2727">
            <path d={svgPaths.p7943900} fill="var(--fill-0, black)" fillOpacity="0.7" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[18.561px]" data-name="image 13">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
      </div>
      <div className="relative shrink-0 size-[22.273px]" data-name="react-icons/si/SiYoutube">
        <div className="absolute inset-[14.77%_0]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2726 15.6929">
            <path d={svgPaths.p13c87470} fill="var(--fill-0, black)" fillOpacity="0.7" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[37.121px] items-start relative shrink-0">
      <Frame24 />
      <Frame14 />
    </div>
  );
}

function Original() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Original">
      <Frame19 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Lato:Regular',sans-serif] h-[68.674px] leading-[1.3] not-italic relative shrink-0 text-[15.78px] text-[rgba(0,0,0,0.6)] w-[260.775px] whitespace-pre-wrap">{`PCMC , Pune , Maharashtra  - 500034`}</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lato:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[15.78px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">+91 93569 76878</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13.78px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">destiny@ateion.com</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Frame17 />
      <Frame16 />
      <Frame15 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame18 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',sans-serif] gap-[14.848px] items-start leading-[normal] not-italic relative shrink-0 text-[14.85px] text-[rgba(0,0,0,0.6)] w-full">
      <p className="relative shrink-0 w-full">Terms of Use</p>
      <p className="relative shrink-0 w-full">Privacy Policy</p>
      <p className="relative shrink-0 w-full">{`Data Collection & Consent`}</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame23 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full py-[64px] gap-[64px]">
      <FadeIn delay={0.1}>
        <Original />
      </FadeIn>
      <FadeIn delay={0.2}>
        <Frame20 />
      </FadeIn>
      <FadeIn delay={0.3}>
        <Frame21 />
      </FadeIn>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#f7f3eb] relative shrink-0 w-full py-[48px] px-[32px]">
      <div className="content-stretch flex flex-col items-center justify-center relative size-full">
        <Frame26 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#1e1632] h-[64px] relative shrink-0 w-full flex items-center justify-center px-[32px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-solid border-t-[1px] inset-[0_0_auto_0] pointer-events-none opacity-20" />
      <p className="font-['Lato:Regular',sans-serif] leading-normal not-italic relative shrink-0 text-[14px] text-center text-white opacity-80">
        Copyright ©Ateion 2026. All Rights Reserved.
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start">
      <Frame22 />
      <Frame12 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex flex-col items-center relative w-full">
      <Frame76 />
      <div className="relative w-full">
        <Frame13 />
      </div>
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="bg-[#f7f3eb] relative size-full" data-name="Homepage">
      <Frame77 />
    </div>
  );
}