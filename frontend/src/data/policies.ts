// ─── Policy Data ────────────────────────────────────────────────────────────
// All 15 countries / organisations aligned with Ateion.
// Each has exactly 2 frameworks with softened, modernised flag-themed accent colors.

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
  // FEATURED 4 — shown on Ateion homepage
  // ═══════════════════════════════════════════════════════

  {
    id: "singapore",
    country: "Singapore",
    code: "SGP",
    flag: "🇸🇬",
    region: "Asia",
    accentColor: "#D63E4B",
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
    accentColor: "#305D91",
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
    accentColor: "#C44056",
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
      {
        name: "GIGA School Program",
        shortDescription:
          "MEXT's flagship program providing ICT devices and high-speed networks to schools.",
        description:
          "The GIGA School Program integrates technology into all levels of learning, providing one device per student and high-speed internet to foster individually optimized and collaborative learning.",
        alignmentText:
          "Ateion's assessment platform seamlessly operates on GIGA devices, allowing scalable, digital-first capability evaluations directly in the classroom.",
        hoverMessage:
          "Ateion aligns with MEXT's GIGA initiative by optimizing capability-first assessment for digital classrooms.",
        tags: ["ICT Infrastructure", "Digital Learning", "Accessibility"],
        policyLink: "https://www.mext.go.jp/en/policy/education/else/mext_00001.html",
      },
    ],
  },

  {
    id: "india",
    country: "India",
    code: "IND",
    flag: "🇮🇳",
    region: "Asia",
    accentColor: "#E67333",
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

  // ═══════════════════════════════════════════════════════
  // ADDITIONAL — shown on /policies page
  // ═══════════════════════════════════════════════════════

  {
    id: "uae",
    country: "UAE",
    code: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    accentColor: "#2C8550",
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
      {
        name: "UAE Centennial 2071 - Future Education",
        shortDescription:
          "Cabinet strategy preparing future generations for the best nation vision.",
        description:
          "The education pillar of UAE Centennial 2071 focuses on advanced science, engineering, space science, and talent discovery, instilling Emirati moral values and lifelong learning.",
        alignmentText:
          "Ateion prepares graduates for the UAE Centennial goals by measuring advanced scientific and innovative problem-solving capabilities.",
        hoverMessage:
          "Ateion supports UAE's centenary vision by measuring future-focused scientific and cognitive skills.",
        tags: ["Centennial 2071", "Space & Science", "Values"],
        policyLink: "https://uaecabinet.ae/en/details/prime-ministers-initiatives/uae-centennial-2071",
      },
    ],
  },

  {
    id: "usa",
    country: "United States",
    code: "USA",
    flag: "🇺🇸",
    region: "Americas",
    accentColor: "#4F5582",
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
    accentColor: "#C29525",
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
      {
        name: "KMK Education in the Digital World",
        shortDescription:
          "Unified federal standing conference strategy for digital education competencies.",
        description:
          "Adopted by the KMK, this strategy ensures students nationwide develop core digital competencies, modernizing curricula, teacher training, and learning media.",
        alignmentText:
          "Ateion directly assesses the digital-age reasoning and literacy skills prioritized by the KMK's nationwide education standards.",
        hoverMessage:
          "Ateion's capability framework maps cleanly to the six digital action areas set by the KMK.",
        tags: ["Digital Competencies", "Curriculum Reform", "Teacher Training"],
        policyLink: "https://www.kmk.org/themen/bildung-in-der-digitalen-welt.html",
      },
    ],
  },

  {
    id: "southkorea",
    country: "South Korea",
    code: "KOR",
    flag: "🇰🇷",
    region: "Asia",
    accentColor: "#335E94",
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
      {
        name: "AI Digital Textbook Initiative",
        shortDescription:
          "Integrating AI-driven digital aids in classrooms to personalize learning.",
        description:
          "This initiative integrates adaptive, algorithmic software and digital textbooks into core subjects, facilitating personalized student progress and supporting teacher-led digital transitions.",
        alignmentText:
          "Ateion's adaptive, AI-enhanced evaluation engines match South Korea's goals of personalized pacing and digital classroom equity.",
        hoverMessage:
          "Ateion's adaptive assessments support South Korea's transition to personalized AI classrooms.",
        tags: ["AI Textbooks", "Equity", "Adaptive Pacing"],
        policyLink: "https://english.moe.go.kr",
      },
    ],
  },

  {
    id: "eu",
    country: "European Union",
    code: "EUR",
    flag: "🇪🇺",
    region: "Europe",
    accentColor: "#3B63B3",
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
      {
        name: "Digital Education Action Plan (2021-2027)",
        shortDescription:
          "EU initiative supporting the sustainable adaptation of education systems to the digital age.",
        description:
          "The Action Plan outlines a vision for high-quality, inclusive, and accessible digital education in Europe, focusing on infrastructure, digital skills, and teacher capabilities.",
        alignmentText:
          "Ateion provides the necessary scalable, digital-first evaluation tools to validate digital literacy and advanced skills across member states.",
        hoverMessage:
          "Ateion supports the EU's digital transformation by verifying core digital capabilities.",
        tags: ["Digital Transformation", "Inclusive Education", "Digital Skills"],
        policyLink: "https://education.ec.europa.eu/focus-areas/digital-education/action-plan",
      },
    ],
  },

  {
    id: "unesco",
    country: "UNESCO",
    code: "UNS",
    flag: "🌍",
    region: "International",
    accentColor: "#3CA1CC",
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
      {
        name: "Beijing Consensus on AI and Education",
        shortDescription:
          "The first global recommendations on leveraging AI for the Education 2030 Agenda.",
        description:
          "Adopted in 2019, the Beijing Consensus guides governments in responding to AI opportunities and challenges, promoting human-in-the-loop, ethical AI deployment in learning environments.",
        alignmentText:
          "Ateion implements the Consensus's human-centric principles by using AI as an ethical tool to support and measure authentic thinking rather than replace it.",
        hoverMessage:
          "Ateion's ethical AI design reflects the principles of UNESCO's Beijing Consensus.",
        tags: ["AI Ethics", "Education 2030", "Global Policy"],
        policyLink: "https://unesdoc.unesco.org/ark:/48223/pf0000368303",
      },
    ],
  },

  {
    id: "wef",
    country: "World Economic Forum",
    code: "WEF",
    flag: "🌐",
    region: "International",
    accentColor: "#3C6D8A",
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
      {
        name: "Defining Education 4.0",
        shortDescription:
          "A taxonomy outlining essential cognitive, social, and personal skills for the future.",
        description:
          "Education 4.0 reorganizes learning around active future skills, including cognitive capabilities, digital fluency, ethical values, and collaborative problem-solving tailored for the 4th Industrial Revolution.",
        alignmentText:
          "Ateion's assessment framework directly targets the core skills and values highlighted in the WEF Education 4.0 taxonomy.",
        hoverMessage:
          "Ateion's skills mapping is built on the foundation of the WEF Education 4.0 taxonomy.",
        tags: ["Education 4.0", "Skills Taxonomy", "Future Ready"],
        policyLink: "https://www.weforum.org/reports/defining-education-4-0-a-taxonomy-for-the-future-of-learning/",
      },
    ],
  },

  {
    id: "uk",
    country: "United Kingdom",
    code: "GBR",
    flag: "🇬🇧",
    region: "Europe",
    accentColor: "#355594",
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
      {
        name: "Skills for Jobs",
        shortDescription:
          "Further education white paper transforming technical education and post-16 training.",
        description:
          "This policy transforms post-16 education by aligning technical courses with employer needs, funding technical qualifications, and supporting lifetime learning opportunities.",
        alignmentText:
          "Ateion supports technical mastery by offering objective, competency-based assessments that reflect real-world employer standards.",
        hoverMessage:
          "Ateion aligns with the UK's Skills for Jobs strategy by validating employer-relevant technical capabilities.",
        tags: ["Technical Education", "Qualifications", "Lifelong Learning"],
        policyLink: "https://www.gov.uk/government/publications/skills-for-jobs-lifelong-learning-for-opportunity-and-growth",
      },
    ],
  },

  {
    id: "australia",
    country: "Australia",
    code: "AUS",
    flag: "🇦🇺",
    region: "International",
    accentColor: "#38439E",
    featured: false,
    frameworks: [
      {
        name: "Mparntwe Education Declaration",
        shortDescription:
          "Australia's national education commitment to excellence and equity.",
        description:
          "The Alice Springs (Mparntwe) Education Declaration sets the national vision for Australian education, promoting excellence, equity, and fostering confident, creative, lifelong learners.",
        alignmentText:
          "Ateion aligns with the Mparntwe Declaration by providing creative, capability-first assessment that measures true critical thinking and lifelong learning competence.",
        hoverMessage:
          "Ateion develops the confident, creative, and active lifelong learners Australia's Mparntwe Declaration champions.",
        tags: ["Excellence", "Equity", "Lifelong Learning", "Creativity"],
        policyLink:
          "https://www.education.gov.au/alice-springs-mparntwe-education-declaration",
      },
      {
        name: "Australian Qualifications Framework (AQF)",
        shortDescription:
          "Standardising national qualifications and flexible education pathways.",
        description:
          "The AQF is Australia's national policy regulating qualifications, enabling seamless pathways, recognition of prior learning, and flexible student transitions between education stages.",
        alignmentText:
          "Ateion's skills-focused approach aligns with the AQF by measuring modular, transparent capability standards that map directly to advanced pathways and workforce readiness.",
        hoverMessage:
          "Ateion supports AQF's pathways by validating real cognitive and technical competence beyond rote exams.",
        tags: ["Qualifications", "Pathways", "Skills"],
        policyLink: "https://www.aqf.edu.au",
      },
    ],
  },

  {
    id: "canada",
    country: "Canada",
    code: "CAN",
    flag: "🇨🇦",
    region: "Americas",
    accentColor: "#D94E4E",
    featured: false,
    frameworks: [
      {
        name: "Learn Canada 2020",
        shortDescription:
          "CMEC's pan-Canadian framework for lifelong learning and student success.",
        description:
          "Learn Canada 2020 is a national educational policy framework prioritizing quality lifelong learning opportunities, foundational literacy and numeracy, and education for sustainable development.",
        alignmentText:
          "Ateion's competency-based assessments support Canada's goals by measuring real-world literacy and critical thinking essential for a resilient knowledge economy.",
        hoverMessage:
          "Ateion aligns with Learn Canada 2020 by focusing on foundational skill mastery and lifelong competency.",
        tags: ["Lifelong Learning", "Literacy", "Numeracy", "Inclusion"],
        policyLink: "https://www.cmec.ca/228/Learn_Canada_2020.html",
      },
      {
        name: "Innovation and Skills Plan",
        shortDescription:
          "Federal strategy building a world-class workforce through K-12 STEM and coding.",
        description:
          "This plan funds youth digital literacy (CanCode), expands work-integrated learning, and supports the training of Canadians for next-generation technology industries.",
        alignmentText:
          "Ateion's analytical and logical evaluation modules map directly to the STEM and coding-adjacent competencies championed by Canada's Innovation Plan.",
        hoverMessage:
          "Ateion supports Canada's Innovation and Skills Plan by validating K-12 STEM and digital proficiency.",
        tags: ["STEM", "Coding Skills", "Digital Literacy", "Workforce"],
        policyLink: "https://www.canada.ca",
      },
    ],
  },

  {
    id: "saudiarabia",
    country: "Saudi Arabia",
    code: "SAU",
    flag: "🇸🇦",
    region: "Middle East",
    accentColor: "#318559",
    featured: false,
    frameworks: [
      {
        name: "Human Capability Development Program (HCDP)",
        shortDescription:
          "Saudi Vision 2030 program preparing citizens for global competitiveness.",
        description:
          "The HCDP transforms education in Saudi Arabia to instill values, build a strong foundation, and develop future-proof skills like critical thinking, innovation, and digital literacy.",
        alignmentText:
          "Ateion's advanced assessment platform prepares Saudi students for a globalized market by assessing problem-solving, analytical thinking, and future-ready capabilities.",
        hoverMessage:
          "Ateion helps realize Saudi Vision 2030's HCDP by nurturing future-proof skills and global competitiveness.",
        tags: ["Vision 2030", "Critical Thinking", "Innovation", "Competitiveness"],
        policyLink: "https://www.vision2030.gov.sa/v2030/vrps/hcdp/",
      },
      {
        name: "Vision 2030 Digital Education Strategy",
        shortDescription:
          "Enabling smart learning solutions and interactive virtual platforms.",
        description:
          "Under Vision 2030, this policy implements virtual learning systems (Madrasati), integrates interactive e-learning resources, and enhances digital literacy for teachers and students.",
        alignmentText:
          "Ateion's digital capability assessments integrate seamlessly with e-learning systems to measure cognitive reasoning rather than rote memory.",
        hoverMessage:
          "Ateion supports Saudi Arabia's digital education push with secure, online capability assessments.",
        tags: ["Digital Strategy", "E-Learning", "Smart Schools"],
        policyLink: "https://www.moe.gov.sa",
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
