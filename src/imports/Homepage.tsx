import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import svgPaths from "./svg-paths";
import logo from "../assets/logo.png";
import imgRectangle9 from "../assets/e54e08242e5e8cea29c382ba6bc82218d425f28e.png";
import imgImage9 from "../assets/3aab4451afd875f66a83eb26e0ca2d6f58abce98.png";
import imgImage7 from "../assets/e985b07ea1f916546c05a06ca93558ef62ecc870.png";
import imgImage13 from "../assets/a440209918fa81a1c528e2e95290d4f1f12546e7.png";
import DotMap from "../components/DotMap";
import SharedFooter from "../app/components/SharedFooter";
import SharedNavbar from "../app/components/SharedNavbar";

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

  const ITEM_HEIGHT = 52;
  // Duplicate words so wrap-around always has a prev/next
  const repeated = [...words, ...words, ...words];
  const offset = words.length; // start from middle set

  return (
    <div
      style={{
        height: `${ITEM_HEIGHT * 3}px`,
        overflow: "hidden",
        width: "229px",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ y: -(index + offset) * ITEM_HEIGHT + ITEM_HEIGHT }}
        transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {repeated.map((word, i) => {
          const actualIndex = i - offset;
          const distance = actualIndex - index;
          const isActive = distance === 0;
          const isPrev = distance === -1;
          const isNext = distance === 1;
          const isVisible = isActive || isPrev || isNext;

          return (
            <motion.p
              key={i}
              animate={{
                opacity: isActive ? 1 : isVisible ? 0.35 : 0,
                scale: isActive ? 1 : 0.88,
              }}
              transition={{ duration: 0.5 }}
              style={{
                height: `${ITEM_HEIGHT}px`,
                display: "flex",
                alignItems: "center",
                fontSize: isActive ? "42px" : "36px",
                fontFamily: "'OV Soge', sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
                color: isActive ? "#ffffff" : "#1a1a1a",
                flexShrink: 0,
                margin: 0,
                padding: 0,
                transformOrigin: "left center",
              }}
            >
              {word}
            </motion.p>
          );
        })}
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

function HeroSliderImages() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-0 top-0 w-full">
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

function SliderImageTwo() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group />
    </div>
  );
}

function SliderImageThree() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <SliderImageTwo />
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="flex items-center gap-[4px] relative shrink-0">
      <img
        src={logo}
        alt="Ateion Logo"
        className="h-[60px] object-contain w-auto"
      />
      <svg className="block w-[17px] h-[16px]" fill="none" viewBox="0 0 17.2333 16.3101">
        <path d={svgPaths.p3a430600} fill="#D4CFC5" />
      </svg>
    </div>
  );
}

function HeroSliderHeader() {
  return (
    <div className="h-[665px] relative shrink-0 w-full">
      <div className="absolute inset-0 content-stretch flex flex-col items-start">
        <HeroSliderImages />
      </div>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <SharedNavbar />
      </div>
    </div>
  );
}


// Frame merged into ExploreButton

function ExploreButton() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#fb4444] flex items-center justify-center h-[52px] px-10 relative rounded-[154px] min-w-[190px] shrink-0 cursor-pointer shadow-lg shadow-[#fb444433] hover:bg-[#ff5a5a] transition-colors"
    >
       <p className="font-bold leading-none text-[14px] text-white whitespace-nowrap" style={{ fontFamily: "'Manrope', sans-serif" }}>Explore more</p>
    </motion.div>
  );
}

function HeroTextBlock() {
  return (
    <div className="flex flex-col items-start px-[64px] w-full">
      <p className="leading-[normal] not-italic text-[72px] text-black w-full mb-6" style={{ fontFamily: "'OV Soge', sans-serif" }}>Reimagining Education</p>
      <ExploreButton />
    </div>
  );
}

function HeroHeaderSection() {
  return (
    <div className="flex flex-col items-start w-full gap-[40px]">
      <HeroSliderHeader />
      <HeroTextBlock />
    </div>
  );
}

function PurpleCapabilityCardText() {
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

function PurpleCapabilityCardInner() {
  return (
    <div className="bg-[#dadada] content-stretch flex h-[504px] items-start pb-[31px] pl-[17px] pt-[18px] relative rounded-[15px] shrink-0 w-[249px]">
      <PurpleCapabilityCardText />
    </div>
  );
}

function PurpleCapabilityCardOuter() {
  return (
    <div className="flex items-center justify-center relative shrink-0 w-full">
      <div className="content-stretch flex items-center relative shrink-0 w-[1224px]">
        <div className="bg-[#aa9dff] h-[504px] rounded-bl-[13px] rounded-tl-[13px] shrink-0 flex-1" />
        <PurpleCapabilityCardInner />
      </div>
    </div>
  );
}

function GlobalAlignedTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[260px]">
      <p className="leading-[normal] min-w-full not-italic relative shrink-0 text-[36px] text-white w-[min-content]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Globally Aligned with</p>
      <div className="h-[184px] relative rounded-[16px] shrink-0 w-[250px]" data-name="image 9">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage9} />
      </div>
    </div>
  );
}

function GlobalAlignedContent() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <GlobalAlignedTitle />
      <div className="h-[312px] relative rounded-[9px] shrink-0 w-[220px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgImage7} />
      </div>
    </div>
  );
}

function GlobalAlignedBlackCard() {
  return (
    <div className="bg-[#202020] content-stretch flex flex-col h-[376px] items-start pb-[32px] pt-[32px] px-[32px] relative rounded-[20px] shrink-0 w-[600px]">
      <GlobalAlignedContent />
    </div>
  );
}

function RedIntelligenceTitle() {
  return (
    <div className="h-[132px] relative shrink-0 w-[235px]">
      <p className="absolute leading-[normal] left-0 not-italic text-[24px] text-black top-0 w-[235px]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Education is not broken. Its measurement system is :</p>
    </div>
  );
}

function RedIntelligenceTop() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <RedIntelligenceTitle />
      <VerticalTicker />
    </div>
  );
}

function RedIntelligenceContent() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[510px]">
      <RedIntelligenceTop />
      <p className="font-['SF_Pro_Display:Medium',sans-serif] h-[88px] leading-[0] not-italic relative shrink-0 text-[0px] text-black w-full">
        <span className="leading-[32px] text-[20px]">{`Ateion replaces memory-based validation with `}</span>
        <span className="font-['IBM_Plex_Sans:Bold_Italic',sans-serif] italic leading-[32px] text-[36px]">Capability-based intelligence.</span>
      </p>
    </div>
  );
}

function RedIntelligenceCard() {
  return (
    <div className="bg-[#ff6b6b] content-stretch flex flex-col h-[376px] items-start pb-[8px] pl-[50px] pr-[24px] pt-[32px] relative rounded-[20px] shrink-0 w-[600px]">
      <RedIntelligenceContent />
    </div>
  );
}

function HeroMetricsRow() {
  return (
    <div className="flex items-center justify-center relative shrink-0 w-full">
      <div className="flex gap-[24px] items-center relative shrink-0 w-[1224px]">
        <GlobalAlignedBlackCard />
        <RedIntelligenceCard />
      </div>
    </div>
  );
}

function HeroFeatureCardsRow() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <PurpleCapabilityCardOuter />
      <HeroMetricsRow />
    </div>
  );
}

function PoweredByNumbersText() {
  return (
    <div className="flex items-center justify-center relative shrink-0 mb-8" data-name="text">
      <p className="font-semibold not-italic opacity-90 relative text-[36px] text-center text-white tracking-wide whitespace-nowrap" style={{ fontFamily: "'OV Soge', sans-serif" }}>
        Powered by Proven Numbers
      </p>
    </div>
  );
}

function CounterPartnerInstitutions() {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="content-stretch flex flex-col items-center justify-center relative shrink-0"
    >
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[54px]">
        <Counter value={200} suffix="+" />
      </p>
      <p className="font-['Inter:Medium',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[18px] mt-[12px]">Partner Institutions</p>
    </motion.div>
  );
}

function CounterStudentsEmpowered() {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="content-stretch flex flex-col items-center justify-center relative shrink-0"
    >
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[54px]">
        <Counter value={50000} suffix="+" />
      </p>
      <p className="font-['Inter:Medium',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[18px] mt-[12px]">Students Empowered</p>
    </motion.div>
  );
}

function CounterGlobalAlliances() {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="content-stretch flex flex-col items-center justify-center relative shrink-0"
    >
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[#f3ecff] text-[54px]">
        <Counter value={193} suffix="+" />
      </p>
      <p className="font-['Inter:Medium',sans-serif] leading-normal not-italic relative shrink-0 text-[#a78bfa] text-[18px] mt-[12px]">Global Alliances</p>
    </motion.div>
  );
}

function GlobalPresenceCountersRow() {
  return (
    <div className="content-stretch flex items-center justify-around relative shrink-0 w-full py-[24px]">
      <CounterPartnerInstitutions />
      <CounterStudentsEmpowered />
      <CounterGlobalAlliances />
    </div>
  );
}

function GlobalPresenceTitleInner() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-full">
      <FadeIn>
        <PoweredByNumbersText />
        <GlobalPresenceCountersRow />
      </FadeIn>
    </div>
  );
}

function GlobalPresenceTitleWrapper() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full mb-[64px]">
      <GlobalPresenceTitleInner />
    </div>
  );
}

function GlobalPresenceMapContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center relative shrink-0 w-full">
      <GlobalPresenceTitleWrapper />
      <div className="aspect-[1280/500] relative shrink-0 w-full bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 scale-[0.95] origin-center flex items-center justify-center">
          <DotMap />
        </div>
      </div>
    </div>
  );
}

function GlobalPresenceMapPadding() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <GlobalPresenceMapContainer />
    </div>
  );
}

function GlobalPresenceMapBg() {
  return (
    <div className="bg-black h-auto relative shrink-0 w-full py-[80px]">
      <div className="content-stretch flex flex-col items-center relative size-full">
        <GlobalPresenceMapPadding />
      </div>
    </div>
  );
}

function GlobalPresenceMainHeading() {
  return (
    <div className="w-full flex justify-center mb-10">
      <p className="font-semibold leading-tight text-[48px] text-black text-center" style={{ fontFamily: "'OV Soge', sans-serif" }}>Global Presence</p>
    </div>
  );
}

function GlobalPresenceMapSection() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <GlobalPresenceMainHeading />
      <GlobalPresenceMapBg />
    </div>
  );
}

function HeroAndMapRow() {
  return (
    <div className="flex flex-col items-start w-full gap-[40px]">
      <HeroHeaderSection />
      <HeroMetricsAndMap />
    </div>
  );
}

function HeroMetricsAndMap() {
  return (
    <div className="flex flex-col gap-[60px] items-center w-full">
      <div className="w-full px-[64px]">
        <HeroFeatureCardsRow />
      </div>
      <GlobalPresenceMapSection />
    </div>
  );
}

function EducationStatusHeader() {
  return (
    <div className="content-stretch flex items-center justify-between not-italic relative shrink-0 text-black w-full py-[48px] gap-[64px]">
      <p className="leading-tight relative shrink-0 text-[48px] flex-1" style={{ fontFamily: "'OV Soge', sans-serif" }}>
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

function EducationStatusRowTop() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 flex-1" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 flex-1" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 flex-1" />
    </div>
  );
}

function EducationStatusRowBottom() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 flex-1" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 flex-1" />
      <div className="bg-[#d9d9d9] h-[335px] shrink-0 flex-1" />
    </div>
  );
}

function EducationStatusGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <EducationStatusRowTop />
      <EducationStatusRowBottom />
    </div>
  );
}

function EducationStatusWrapper() {
  return (
    <div className="w-full px-[64px]">
      <FadeIn>
        <div className="flex flex-col gap-[24px] items-start w-full">
          <EducationStatusHeader />
          <EducationStatusGrid />
        </div>
      </FadeIn>
    </div>
  );
}

function HeroAndEducationRow() {
  return (
    <div className="flex flex-col w-full">
      <HeroAndMapRow />
      <EducationStatusWrapper />
    </div>
  );
}

function Tag({ text, className = "" }: { text: string, className?: string }) {
  return (
    <div className={`border-[#272424] border-[0.6px] border-solid rounded-full px-4 py-1.5 h-[30px] flex items-center justify-center bg-transparent ${className}`}>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-none text-[#272424] text-[13px] text-center pt-[1px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}

function GcoFeatureTagItemTwo() {
  return (
    <div className="absolute left-0 top-0">
      <Tag text="Brand Strategy" />
    </div>
  );
}

function GcoFeatureTagItemOne() {
  return (
    <div className="absolute left-[128px] top-0">
      <Tag text="Brand Naming" />
    </div>
  );
}

function GcoFeatureTagItemThree() {
  return (
    <div className="absolute left-0 top-[40px]">
      <Tag text="Tagline" />
    </div>
  );
}

function GcoFeatureTagsRow() {
  return (
    <div className="flex flex-wrap gap-[12px]">
      <Tag text="Brand Strategy" />
      <Tag text="Brand Naming" />
      <Tag text="Tagline" />
    </div>
  );
}

function GcoFeatureTitleContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="leading-[1.19] not-italic relative shrink-0 text-[48px] text-black tracking-[0.4px] w-full max-w-[500px]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Global Capability Olympiad (GCO)</p>
      <div className="flex justify-start w-full">
        <GcoFeatureTagsRow />
      </div>
    </div>
  );
}

function GcoFeatureNumber() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:Light',sans-serif] font-light leading-[2] relative shrink-0 text-[24px] text-black w-full opacity-60 mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
        (01)
      </p>
      <GcoFeatureTitleContainer />
    </div>
  );
}

function GcoFeatureBadge() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[32px] items-start ml-0 mt-0 relative row-1 w-[392px]">
      <GcoFeatureNumber />
      <div className="flex items-center justify-between bg-[#161616] h-[54px] pl-7 pr-6 rounded-full w-[174px] cursor-pointer group hover:bg-[#222] transition-colors" data-name="view more">
        <p className="font-['Outfit:Medium',sans-serif] leading-none text-[17px] text-white tracking-[0.16px] whitespace-nowrap pt-0.5">View More</p>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center h-[26px] w-[26px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Label handled by parent flex-row for unified centering

function EcosystemBubble({ 
  ml, mt, size, 
  defaultColor = "transparent", 
  hoverColor, 
  title, 
  description,
  isDark = false,
  titleSize = "18px",
  titleClass = "font-['Outfit:Bold',sans-serif]",
  gradientId,
  descSize = "12px",
  staticTextColor
}: { 
  ml: string, mt: string, size: string, 
  defaultColor?: string, 
  hoverColor: string, 
  title: string, 
  description: string,
  isDark?: boolean,
  titleSize?: string,
  titleClass?: string,
  gradientId?: string,
  descSize?: string,
  staticTextColor?: string
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute flex items-center justify-center cursor-pointer pointer-events-auto"
      style={{ marginLeft: ml, marginTop: mt, width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0"
        animate={{
          y: isHovered ? 0 : [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }
        }}
      >
        <svg className="absolute block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <AnimatePresence>
            {isHovered && (
              <motion.circle 
                cx="50" cy="50" r="54"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.35, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.9 }}
                fill={hoverColor}
                style={{ filter: "blur(15px)" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          <motion.circle 
            cx="50" cy="50" r="49.5" 
            animate={{ 
              fill: isHovered ? (gradientId ? `url(#${gradientId})` : "rgba(255,255,255,0.1)") : defaultColor,
              stroke: isHovered ? hoverColor : (defaultColor !== "transparent" ? defaultColor : "rgba(0,0,0,0.15)"),
              strokeWidth: isHovered ? 2.5 : 0.8,
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />
        </svg>
      </motion.div>
      
      <div className="relative z-10 flex flex-col items-center justify-center p-5 text-center pointer-events-none gap-3">
        <motion.p 
          className={`transition-all duration-500 not-italic ${titleClass} leading-tight`}
          style={{ 
            fontSize: titleSize,
            color: isHovered && isDark ? "white" : (staticTextColor || "black"),
            textShadow: isHovered && isDark ? "0 0 8px rgba(255,255,255,0.4)" : "none"
          }}
          animate={{
            y: isHovered ? -4 : 0,
            scale: isHovered ? 1.1 : 1
          }}
        >
          {title}
        </motion.p>
        
        <motion.p 
          className="font-['Inter:Regular',sans-serif] leading-snug not-italic"
          style={{ 
            fontSize: descSize,
            maxWidth: "80%",
            color: isHovered && isDark ? "rgba(255,255,255,0.9)" : (staticTextColor || "rgba(0,0,0,0.7)"),
          }}
          animate={{
            opacity: isHovered ? 1 : 0.6,
            y: isHovered ? -2 : 0
          }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

function EcosystemCluster() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="ateionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1632" />
            <stop offset="100%" stopColor="#4A3B6F" />
          </linearGradient>
          <linearGradient id="gcoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF595B" />
            <stop offset="100%" stopColor="#FF8A8C" />
          </linearGradient>
          <linearGradient id="softGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(247, 243, 235, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Curved Arrows — all ml values shifted left by 223px from original Figma */}
      <div className="col-1 h-[336.118px] ml-[259.28px] mt-[79.07px] relative row-1 w-[212.218px]">
        <div className="absolute inset-[0_0_-0.13%_-0.19%] pointer-events-none opacity-20">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.806 336.735">
            <path d={svgPaths.p242fe600} id="Vector 467" stroke="black" strokeWidth="0.88" />
          </svg>
        </div>
      </div>
      <div className="col-1 h-[125.899px] ml-[337.64px] mt-[390.74px] relative row-1 w-[71.754px]">
        <div className="absolute inset-[-0.39%_-0.72%_-0.41%_-0.61%] pointer-events-none opacity-20">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.7077 126.898">
            <path d={svgPaths.p3505a800} fill="black" id="Vector 465" />
          </svg>
        </div>
      </div>
      <div className="col-1 h-[294.499px] ml-[179.61px] mt-[108.13px] relative row-1 w-[471.022px]">
        <div className="absolute inset-[-0.61%_0_-1%_0] pointer-events-none opacity-20">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 471.903 299.228">
            <path d={svgPaths.p3938fb80} fill="black" id="Vector 466" />
          </svg>
        </div>
      </div>
      <div className="col-1 h-[178.284px] ml-[474.98px] mt-[280.69px] relative row-1 w-[84.96px]">
        <div className="absolute inset-[0_-0.48%_0_-0.51%] pointer-events-none opacity-20">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.8082 178.495">
            <path d={svgPaths.pe1a2a00} id="Vector 468" stroke="black" strokeWidth="0.88" />
          </svg>
        </div>
      </div>

      {/* Bubbles moved slightly to accommodate the left content */}
      <EcosystemBubble 
        ml="274.69px" mt="137.18px" size="272.92px" 
        defaultColor="#1E1632"
        staticTextColor="white"
        hoverColor="#1E1632" isDark={true} gradientId="ateionGrad"
        title="Ateion" 
        description="Ateion is building the infrastructure for a capability-based future by integrating early AI workshops with standard-setting competitions."
        titleSize="24px"
        titleClass="font-['Outfit:Semi_Bold',sans-serif]"
      />
      
      <EcosystemBubble 
        ml="0" mt="0" size="274.68px" 
        defaultColor="#FF595B"
        staticTextColor="black"
        hoverColor="#FF595B" isDark={true} gradientId="gcoGrad"
        title="GCO" 
        description="From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH."
        titleSize="32px"
      />

      <EcosystemBubble 
        ml="162.88px" mt="414.51px" size="248.27px" 
        hoverColor="#FF595B" isDark={true} gradientId="gcoGrad"
        title="Kronos"
        description="Focused on specialized capabilities and advanced skill validation within the Ateion ecosystem."
        titleSize="20px"
      />

      <EcosystemBubble 
        ml="468.38px" mt="369.61px" size="248.27px" 
        hoverColor="#1E1632" isDark={true} gradientId="ateionGrad"
        title="Vouch"
        description="A decentralized verification protocol for authenticating learner capabilities and achievements."
        titleSize="22px"
      />

      <EcosystemBubble 
        ml="601.32px" mt="57.94px" size="333.67px" 
        hoverColor="#FF595B" isDark={true} gradientId="gcoGrad"
        title="Workshops"
        description="Engaging, hands-on learning experiences designed to bridge theory with practical AI execution."
        titleSize="20px"
      />
    </div>
  );
}

function FAQSectionTitle() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="col-1 leading-[1.19] ml-0 mt-0 not-italic relative row-1 text-[32px] text-black text-center whitespace-nowrap" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>Your Common Questions Answered</p>
    </div>
  );
}

const faqData = [
  {
    question: "What is Ateion?",
    answer: "Ateion is a pioneering education technology ecosystem dedicated to bridging the gap between traditional rote learning and real-world capability. We focus on AI literacy, innovation, and measurable readiness, providing students with the tools they need to thrive in a rapidly evolving global landscape."
  },
  {
    question: "How is Ateion different from traditional education systems?",
    answer: "Unlike traditional systems that often prioritize memorization and standardized testing, Ateion emphasizes 'Capability-First' education. We integrate advanced AI tools, project-based learning, and global competency frameworks to ensure students are not just learning facts, but developing actionable skills."
  },
  {
    question: "Who can partner with Ateion?",
    answer: "We partner with forward-thinking K-12 schools, universities, educational institutions, and corporate organizations globally. If you are committed to future-proofing education and empowering the next generation with AI-driven capabilities, we invite you to connect with us."
  },
  {
    question: "What is the Global Capability Olympiad (GCO)?",
    answer: "The GCO is our flagship global competition that evaluates students based on their real-world problem-solving abilities and AI proficiency rather than academic recall. It serves as a benchmark for world-class capability and innovation among students worldwide."
  },
  {
    question: "How are capabilities measured?",
    answer: "Capabilities are measured through our proprietary assessment framework that tracks innovation, problem-solving, digital literacy, and collaborative skills. We use real-time data and AI-driven insights to provide a comprehensive profile of a student's readiness for the future."
  },
  {
    question: "How can institutions get connected?",
    answer: "Institutions can get connected by visiting our 'Get Connected' section or reaching out via email at destiny@ateion.com. Our team will guide you through the partnership process, from initial workshops to full ecosystem integration."
  }
];

function FAQItem({ question, answer, isOpen, toggle }: { question: string, answer: string, isOpen: boolean, toggle: () => void }) {
  return (
    <div
      className="bg-[#f7f3eb] mb-[12px] relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(25,33,61,0.04)] overflow-hidden transition-all duration-300 border border-[rgba(0,0,0,0.03)] hover:shadow-[0px_8px_30px_0px_rgba(25,33,61,0.08)]"
    >
      <button
        onClick={toggle}
        className="w-full content-stretch flex items-center justify-between px-[32px] py-[28px] relative text-left group"
      >
        <p className="flex-[1_0_0] font-semibold leading-[1.35] max-w-[700px] not-italic relative text-[#1a1a1a] text-[22px] transition-colors group-hover:text-[#fb4444]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
          {question}
        </p>
        <div className={`bg-[#e7e3dd] content-stretch flex items-center p-[8px] relative rounded-[100px] shadow-[0px_1px_2px_0px_rgba(25,33,61,0.07)] shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`}>
          <div className="overflow-clip relative shrink-0 size-[20px]">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[12px] items-center justify-center left-[calc(50%+1px)] top-1/2 w-[6px]">
              <div className="-scale-y-100 flex-none">
                <div className="h-[12px] relative w-[6px]">
                  <div className="absolute inset-[-7.14%_-14.29%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65656 13.6117">
                      <path d={svgPaths.p1487cd00} stroke="#1C1B1B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.70146" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-[32px] pb-[32px] pt-[8px]">
              <p className="leading-relaxed text-[16px] text-[rgba(0,0,0,0.7)] max-w-[750px]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQAccordionList() {
  const [openStates, setOpenStates] = useState<boolean[]>(faqData.map((_, i) => i === 0));

  const toggle = (index: number) => {
    setOpenStates(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="content-stretch flex flex-col items-stretch relative shrink-0 w-full max-w-[900px]">
      {faqData.map((item, i) => (
        <FAQItem 
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openStates[i]}
          toggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}

function FAQSectionInner() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full max-w-[1044px]">
      <FAQSectionTitle />
      <FAQAccordionList />
    </div>
  );
}

function EcosystemSection() {
  return (
    <div className="flex flex-col items-center w-full py-[120px] overflow-hidden bg-[#f7f3eb]">
      <p className="font-['Outfit:Semi_Bold',sans-serif] text-[58px] text-black text-center w-full mb-[100px] tracking-tight">
        <span className="leading-[1.2]">Ateion as an </span>
        <span className="font-['IBM_Plex_Sans:SemiBold_Italic',sans-serif] italic">Ecosystem</span>
      </p>
      
      {/* Unified Whole Entity: Shifted left by -100px to satisfy the visual centering request and address the "extra space" on the left */}
      <div className="w-full flex flex-row items-center justify-center gap-[60px] scale-[0.88] origin-center translate-x-[-100px]">
        <GcoFeatureBadge />
        <EcosystemCluster />
      </div>
    </div>
  );
}

function FAQSectionContainer() {
  return (
    <div className="flex flex-col items-center w-full px-[64px] py-[40px] mb-[60px]">
      <FAQSectionInner />
    </div>
  );
}

function MainContentWrapper() {
  return (
    <div className="flex flex-col w-full">
      <HeroAndEducationRow />
      <EcosystemSection />
      <FAQSectionContainer />
    </div>
  );
}

function FooterBrandName() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lato:Bold',sans-serif] font-bold leading-tight not-italic relative shrink-0 text-[18px] text-black">Ateion Pvt. Ltd.</p>
    </div>
  );
}

function FooterSocialLinks() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[22px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2726 22.2726">
          <g id="Group">
            <g id="Vector" />
            <path d={svgPaths.peb98800} fill="var(--fill-0, black)" fillOpacity="0.7" id="Vector_2" />
          </g>
        </svg>
      </div>
      <div className="relative shrink-0 size-[22px]">
        <div className="absolute inset-[0_0.24%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.1669 22.2727">
            <path d={svgPaths.p7943900} fill="var(--fill-0, black)" fillOpacity="0.7" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[19px]">
        <img alt="YouTube" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
      </div>
      <div className="relative shrink-0 size-[22px]">
        <div className="absolute inset-[14.77%_0]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2726 15.6929">
            <path d={svgPaths.p13c87470} fill="var(--fill-0, black)" fillOpacity="0.7" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FooterAteionBrand() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <FooterBrandName />
      <FooterSocialLinks />
    </div>
  );
}

function FooterColumnLeft() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <FooterAteionBrand />
    </div>
  );
}

function FooterAddress() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Lato:Regular',sans-serif] h-[68px] leading-[1.3] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] w-[260px] whitespace-pre-wrap">{`PCMC , Pune , Maharashtra  - 500034`}</p>
    </div>
  );
}

function FooterPhone() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lato:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">+91 93569 76878</p>
    </div>
  );
}

function FooterEmail() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">destiny@ateion.com</p>
    </div>
  );
}

function FooterContactInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <FooterAddress />
      <FooterPhone />
      <FooterEmail />
    </div>
  );
}

function FooterColumnMiddle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <FooterContactInfo />
    </div>
  );
}

function FooterLegalLinks() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] w-full">
      <p className="relative shrink-0 w-full">Terms of Use</p>
      <p className="relative shrink-0 w-full">Privacy Policy</p>
      <p className="relative shrink-0 w-full">{`Data Collection & Consent`}</p>
    </div>
  );
}

function FooterColumnRight() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <FooterLegalLinks />
    </div>
  );
}

function FooterColumnsContainer() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full max-w-[1240px] mx-auto px-[64px] gap-[64px]">
      <FooterColumnLeft />
      <FooterColumnMiddle />
      <FooterColumnRight />
    </div>
  );
}

function FooterMainArea() {
  return (
    <div className="bg-[#f7f3eb] relative shrink-0 w-full py-[48px]">
      <div className="content-stretch flex flex-col items-center justify-center relative size-full">
        <FooterColumnsContainer />
      </div>
    </div>
  );
}

function FooterCopyrightBar() {
  return (
    <div className="bg-[#1e1632] h-[64px] relative shrink-0 w-full flex items-center justify-center px-[32px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-solid border-t-[1px] inset-[0_0_auto_0] pointer-events-none opacity-20" />
      <p className="font-['Lato:Regular',sans-serif] leading-normal not-italic relative shrink-0 text-[14px] text-center text-white opacity-80">
        Copyright ©Ateion 2026. All Rights Reserved.
      </p>
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="bg-[#f7f3eb] w-full min-h-screen overflow-x-hidden" data-name="Homepage">
      <MainContentWrapper />
      <SharedFooter />
    </div>
  );
}
