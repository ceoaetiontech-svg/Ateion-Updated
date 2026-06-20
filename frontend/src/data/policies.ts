// ─── Policy Data ────────────────────────────────────────────────────────────
// 12 countries / organisations aligned with Ateion.
// Only India, Singapore, Finland, United States have 2 frameworks.
// All others have 1 framework.

export interface PolicyFramework {
  name: string;
  shortDescription: string;
  description: string;
  alignmentText: string;
  hoverMessage: string;
  tags: string[];
  policyLink: string;
}

export interface PolicyEntry {
  id: string;
  country: string;
  code: string; // 3-letter display badge
  flag: string; // emoji (used in detail page)
  region: string;
  accentColor: string;
  featured: boolean; // shown on Ateion homepage (4 cards)
  frameworks: PolicyFramework[];
}

// ─────────────────────────────────────────────────────────────────────────────
export const policies: PolicyEntry[] = [
  // ═══════════════════════════════════════════════════════
  // FEATURED 5 — shown on Ateion homepage
  // ═══════════════════════════════════════════════════════

  {
    id: "singapore",
    country: "Singapore",
    code: "SGP",
    flag: "🇸🇬",
    region: "Asia",
    accentColor: "#E8192C",
    featured: true,
    frameworks: [
      {
        name: "Smart Nation 2025",
        shortDescription:
          "Singapore's bold national digital-transformation agenda.",
        description:
          "Smart Nation 2025 envisions Singapore as a world-leading digital economy powered by AI, data, and connectivity — transforming education, health, and governance at scale.",
        alignmentText:
          "Ateion aligns with Smart Nation 2025 by developing AI-ready learners equipped to contribute to Singapore's digital future through capability-based, preparation-free assessment.",
        hoverMessage:
          "Ateion develops AI-ready critical thinkers — the backbone of Smart Nation's future workforce.",
        tags: ["AI", "Digital", "STEM", "Innovation"],
        policyLink: "https://www.smartnation.gov.sg",
      },
      {
        name: "SkillsFuture Framework",
        shortDescription:
          "Lifelong learning and skills mastery for every Singaporean.",
        description:
          "SkillsFuture promotes a national culture of lifelong learning, enabling every citizen to develop their fullest potential through continuous skills upgrading and mastery.",
        alignmentText:
          "Ateion's capability-first philosophy mirrors SkillsFuture's core emphasis on skills mastery over credentials — measuring real thinking, not exam preparation.",
        hoverMessage:
          "Ateion champions skills-first assessment, directly matching SkillsFuture's core philosophy.",
        tags: ["Skills", "Lifelong Learning", "Mastery"],
        policyLink: "https://www.skillsfuture.gov.sg",
      },
    ],
  },

  {
    id: "finland",
    country: "Finland",
    code: "FIN",
    flag: "🇫🇮",
    region: "Europe",
    accentColor: "#003580",
    featured: true,
    frameworks: [
      {
        name: "National Core Curriculum 2016",
        shortDescription:
          "Phenomenon-based learning centred on thinking and creativity.",
        description:
          "Finland's National Core Curriculum emphasises transversal competencies — critical thinking, creativity, collaboration, and communication — over rote memorisation, making it a global benchmark.",
        alignmentText:
          "Ateion is philosophically identical to Finland's curriculum: both believe that the ability to reason, imagine, and solve problems matters far more than recalling textbook content.",
        hoverMessage:
          "Both Ateion and Finland's curriculum believe thinking matters infinitely more than memorising.",
        tags: ["Critical Thinking", "Creativity", "Transversal Skills"],
        policyLink: "https://www.oph.fi/en",
      },
      {
        name: "Finland's National AI Strategy",
        shortDescription:
          "Building a human-centred AI ecosystem for education and work.",
        description:
          "Finland's national AI strategy focuses on AI literacy for all citizens, responsible AI deployment, and integrating AI thinking into education at every level.",
        alignmentText:
          "Ateion's AI-integrated assessment methodology reflects Finland's AI-for-all philosophy, fostering real AI literacy through meaningful, adaptive assessments.",
        hoverMessage:
          "Ateion's AI-integrated design matches Finland's vision of AI literacy for every citizen.",
        tags: ["AI", "Ethics", "Digital Literacy"],
        policyLink: "https://vm.fi/en/finland-s-ai-policy",
      },
    ],
  },

  {
    id: "japan",
    country: "Japan",
    code: "JPN",
    flag: "🇯🇵",
    region: "Asia",
    accentColor: "#BC002D",
    featured: true,
    frameworks: [
      {
        name: "Society 5.0 Education Vision",
        shortDescription: "Human-centred innovation for a super-smart society.",
        description:
          "Society 5.0 envisions a human-centred society where AI, IoT, and robotics solve social challenges — requiring graduates with creativity, empathy, and adaptive thinking.",
        alignmentText:
          "Ateion develops the adaptive thinkers Society 5.0 needs: students who can reason, create, and innovate under real-world, pressure-tested conditions.",
        hoverMessage:
          "Ateion cultivates the human-centred innovators Japan's Society 5.0 vision demands.",
        tags: ["Innovation", "AI", "Future Skills"],
        policyLink: "https://www8.cao.go.jp/cstp/english/society5_0/index.html",
      },
    ],
  },

  {
    id: "india",
    country: "India",
    code: "IND",
    flag: "🇮🇳",
    region: "Asia",
    accentColor: "var(--color-primary)",
    featured: true,
    frameworks: [
      {
        name: "National Education Policy 2020",
        shortDescription:
          "India's most comprehensive education reform in 34 years.",
        description:
          "NEP 2020 transforms Indian education with holistic, multidisciplinary learning — emphasising critical thinking, creativity, experiential learning, and a dramatic reduction in rote-based curriculum load.",
        alignmentText:
          "Ateion directly implements NEP 2020's vision: a syllabus-free, capability-based assessment that measures higher-order thinking exactly as the policy demands.",
        hoverMessage:
          "Ateion is the assessment equivalent of NEP 2020 — beyond rote, into genuine thinking.",
        tags: ["Holistic", "Critical Thinking", "Reform"],
        policyLink: "https://www.education.gov.in/nep/about-nep",
      },
      {
        name: "NIPUN Bharat",
        shortDescription:
          "Foundational literacy and numeracy for every Indian child.",
        description:
          "NIPUN Bharat ensures every child acquires robust foundational literacy and numeracy skills by Grade 3, forming the cognitive bedrock for all future academic and life success.",
        alignmentText:
          "Ateion's foundational skill measurement tools align with NIPUN Bharat's goal of building genuine cognitive competence from the earliest age.",
        hoverMessage:
          "Ateion supports India's foundational learning mission with capability-first early assessments.",
        tags: ["Foundational Skills", "Literacy", "Numeracy"],
        policyLink: "https://nipunbharat.education.gov.in",
      },
    ],
  },

  {
    id: "uae",
    country: "UAE",
    code: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    accentColor: "#009B3A",
    featured: false,
    frameworks: [
      {
        name: "UAE National Education Strategy",
        shortDescription:
          "Building a world-class education system for UAE's knowledge economy.",
        description:
          "The UAE National Education Strategy produces graduates with 21st-century skills — innovation, critical thinking, and digital fluency — aligned with UAE Centennial 2071.",
        alignmentText:
          "Ateion aligns with the UAE strategy by producing innovation-ready, critically-thinking learners who can drive the UAE's knowledge economy forward.",
        hoverMessage:
          "Ateion is the capability platform the UAE's 21st-century education vision needs.",
        tags: ["Innovation", "21st Century Skills", "Digital"],
        policyLink: "https://www.moe.gov.ae",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // ADDITIONAL — shown on /policies page
  // ═══════════════════════════════════════════════════════

  {
    id: "usa",
    country: "United States",
    code: "USA",
    flag: "🇺🇸",
    region: "Americas",
    accentColor: "#3C3B6E",
    featured: false,
    frameworks: [
      {
        name: "Every Student Succeeds Act (ESSA)",
        shortDescription:
          "Empowering states with flexible, equity-focused education standards.",
        description:
          "ESSA shifts education accountability to individual states, focusing on well-rounded education, safe schools, and targeted support for historically underserved students.",
        alignmentText:
          "Ateion's adaptive, capability-based assessment approach directly supports ESSA's vision of well-rounded, equity-focused, barrier-free education.",
        hoverMessage:
          "Ateion measures the well-rounded capabilities ESSA's education equity framework champions.",
        tags: ["Equity", "Standards", "Accountability"],
        policyLink: "https://www.ed.gov/essa",
      },
      {
        name: "National AI Initiative",
        shortDescription:
          "Coordinating US AI research, education, and workforce development.",
        description:
          "The US National AI Initiative Act coordinates AI R&D, promotes AI education from K-12 through workforce level, and ensures America's global AI leadership.",
        alignmentText:
          "Ateion's AI-integrated assessment methodology directly contributes to developing the AI-literate workforce the National AI Initiative aims to build.",
        hoverMessage:
          "Ateion is the AI-literacy assessment tool the US National AI Initiative envisions.",
        tags: ["AI", "Workforce", "K-12"],
        policyLink: "https://www.ai.gov",
      },
    ],
  },

  {
    id: "germany",
    country: "Germany",
    code: "DEU",
    flag: "🇩🇪",
    region: "Europe",
    accentColor: "#DDAA00",
    featured: false,
    frameworks: [
      {
        name: "Digital Pact for Schools",
        shortDescription:
          "€5 billion investment in Germany's digital education infrastructure.",
        description:
          "The Digital Pact funds digital equipment, high-speed internet, and digital learning environments across all German schools — preparing students for the digital economy.",
        alignmentText:
          "Ateion's platform readiness aligns perfectly with Germany's digital infrastructure push, enabling scalable, high-quality capability assessment.",
        hoverMessage:
          "Ateion is ready for the digitally-equipped classrooms Germany's Digital Pact is funding.",
        tags: ["EdTech", "Digital Infrastructure", "STEM"],
        policyLink: "https://www.digitalpakt-schule.de",
      },
    ],
  },

  {
    id: "southkorea",
    country: "South Korea",
    code: "KOR",
    flag: "🇰🇷",
    region: "Asia",
    accentColor: "#003478",
    featured: false,
    frameworks: [
      {
        name: "2022 Revised Curriculum",
        shortDescription:
          "Competency-based learning for South Korea's digital future.",
        description:
          "South Korea's 2022 Revised National Curriculum shifts decisively toward competency-based education, digital literacy, and personalised learning pathways — moving away from rote-focused instruction.",
        alignmentText:
          "Ateion's competency-first, personalised assessment model is a direct implementation of South Korea's 2022 curriculum philosophy.",
        hoverMessage:
          "Ateion's competency model aligns perfectly with South Korea's progressive 2022 curriculum reform.",
        tags: ["Competency", "Digital Literacy", "Personalised Learning"],
        policyLink: "https://www.moe.go.kr/english",
      },
    ],
  },

  {
    id: "eu",
    country: "European Union",
    code: "EUR",
    flag: "🇪🇺",
    region: "Europe",
    accentColor: "#003399",
    featured: false,
    frameworks: [
      {
        name: "European Education Area 2025",
        shortDescription:
          "Building a borderless, high-quality education space across Europe.",
        description:
          "The European Education Area initiative aims to break down barriers to learning across EU member states, promote mutual recognition of qualifications, and build a lifelong learning culture.",
        alignmentText:
          "Ateion supports the European Education Area by providing a globally-valid, capability-based assessment that transcends national curricula.",
        hoverMessage:
          "Ateion's borderless assessment model supports the EU's vision of a unified European education space.",
        tags: ["Inclusion", "Lifelong Learning", "Qualifications"],
        policyLink:
          "https://education.ec.europa.eu/education-levels/european-education-area",
      },
    ],
  },

  {
    id: "unesco",
    country: "UNESCO",
    code: "UNS",
    flag: "🌍",
    region: "International",
    accentColor: "#009EDB",
    featured: false,
    frameworks: [
      {
        name: "Education for Sustainable Development (ESD)",
        shortDescription:
          "Empowering learners to transform themselves and the world.",
        description:
          "UNESCO's Education for Sustainable Development framework equips learners with the knowledge, skills, values, and attitudes to address global challenges like climate change, biodiversity, and social equity.",
        alignmentText:
          "Ateion's values-integrated, future-focused assessments align with UNESCO ESD by measuring the thinking capabilities needed to solve humanity's greatest challenges.",
        hoverMessage:
          "Ateion develops the transformative thinking UNESCO's ESD framework says the world urgently needs.",
        tags: ["Sustainability", "Global Citizenship", "Values"],
        policyLink:
          "https://www.unesco.org/en/education-sustainable-development",
      },
    ],
  },

  {
    id: "wef",
    country: "World Economic Forum",
    code: "WEF",
    flag: "🌐",
    region: "International",
    accentColor: "#0A3955",
    featured: false,
    frameworks: [
      {
        name: "Future of Jobs 2023 — Education Skills",
        shortDescription:
          "The skills the world economy needs by 2027 and beyond.",
        description:
          "The WEF Future of Jobs Report identifies the critical skills employers will demand by 2027 — analytical thinking, creative thinking, AI literacy, systems thinking, and motivation — forming a global blueprint for future-ready education.",
        alignmentText:
          "Ateion directly assesses the top-ranked skills in the WEF Future of Jobs Report: analytical thinking, creative problem-solving, and AI fluency — making it the world's most future-aligned assessment.",
        hoverMessage:
          "Ateion measures the exact skills the WEF says the global economy will demand most by 2027.",
        tags: ["Future Skills", "Analytical Thinking", "AI Literacy"],
        policyLink:
          "https://www.weforum.org/publications/the-future-of-jobs-report-2023",
      },
    ],
  },

  {
    id: "uk",
    country: "United Kingdom",
    code: "GBR",
    flag: "🇬🇧",
    region: "Europe",
    accentColor: "#012169",
    featured: false,
    frameworks: [
      {
        name: "Levelling Up Education",
        shortDescription:
          "Closing the attainment gap across all regions of the UK.",
        description:
          "The UK's Levelling Up agenda focuses on education equity — ensuring every child, regardless of geography or socio-economic background, achieves their full cognitive potential.",
        alignmentText:
          "Ateion's preparation-free, bias-free assessment model supports Levelling Up by removing socio-economic barriers to demonstrating true capability.",
        hoverMessage:
          "Ateion's fair, prep-free model levels the playing field — core to the UK's Levelling Up mission.",
        tags: ["Equity", "Inclusion", "Access"],
        policyLink:
          "https://www.gov.uk/government/publications/levelling-up-the-united-kingdom",
      },
    ],
  },
];

// ─── Derived exports ──────────────────────────────────────────────────────────
export const featuredPolicies = policies.filter((p) => p.featured);
export const allPolicies = policies;
export const regions = [
  "All",
  ...Array.from(new Set(policies.map((p) => p.region))),
];
