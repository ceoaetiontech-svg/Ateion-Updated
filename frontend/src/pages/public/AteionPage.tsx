import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Code2,
  Database,
  Brain,
  Users,
  Target,
  Mail,
  Globe,
  Building2,
  CheckCircle2,
  ArrowRight,
  Layers,
  Palette,
  Settings,
  TestTube,
  Rocket,
  Wrench,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Trophy,
  ClipboardCheck,
  Gamepad2,
  LayoutDashboard,
} from "lucide-react";
import SharedNavbar from "../../app/components/SharedNavbar";
import NavbarSpacer from "../../app/components/NavbarSpacer";
import SharedFooter from "../../app/components/SharedFooter";
import "../../styles/ateion-page.css";

// --- COUNT UP ANIMATION ---
function CountUp({ end, suffix = "", duration = 1.2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- CURSOR GLOW EVENT HANDLER ---
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);
};

// --- DATA ---
const services = [
  { name: "Website Design", desc: "Aesthetic, responsive UI/UX centered around user flow.", icon: Palette },
  { name: "Frontend Development", desc: "Interactive, clean React apps powered by Framer Motion.", icon: Code2 },
  { name: "Backend Development", desc: "Robust database integrations and scalable APIs.", icon: Database },
  { name: "AI Integration", desc: "Cognitive workflows, LLMs, and custom AI tools.", icon: Brain },
  { name: "Quality Assurance", desc: "Automated test suites, performance audits, and type checking.", icon: TestTube },
  { name: "Deployment & CI/CD", desc: "Fast containerized pipelines on secure cloud structures.", icon: Rocket },
  { name: "Maintenance & Support", desc: "Continuous uptime checks and security patches.", icon: Wrench },
  { name: "Performance Optimization", desc: "Sleek loads, fast indexing, and optimized asset delivery.", icon: TrendingUp },
];

const team = [
  {
    department: "Frontend Development",
    employees: 10,
    icon: Code2,
    color: "#E8856A",
    roles: ["UI/UX Engineers", "Framer Motion Experts", "CSS & Responsive Layout Gurus"],
  },
  {
    department: "Backend Development",
    employees: 10,
    icon: Database,
    color: "#6366f1",
    roles: ["API Architects", "Database Administrators", "DevOps & Security Specialists"],
  },
  {
    department: "AI Development",
    employees: 4,
    icon: Brain,
    color: "#16a34a",
    roles: ["Cognitive Flow Engineers", "Model Fine-tuning Specialists", "LLM Integration Developers"],
  },
  {
    department: "Project Management & QA",
    employees: 2,
    icon: Target,
    color: "#ca8a04",
    roles: ["Agile Scrum Masters", "QA Automation Engineers", "Client Liaison Officers"],
  },
  {
    department: "UI/UX Design",
    employees: 2,
    icon: Palette,
    color: "#2563eb",
    roles: ["Brand Identity Designers", "Wireframe & Prototyping Specialists", "User Researchers"],
  },
];

const processSteps = [
  {
    step: "Requirement Gathering",
    title: "1. Scope & Strategy",
    icon: Users,
    desc: "Collaborative discovery sessions to define objectives, user personas, project scope, and technological frameworks.",
    deliverable: "Scope Document & Site Architecture Map",
  },
  {
    step: "UI/UX Design",
    title: "2. Visual Prototyping",
    icon: Palette,
    desc: "Designing state-of-the-art interactive Figma mockups. Establishing design tokens, grids, typography scales, and accessibility features.",
    deliverable: "Figma Interactive Prototypes",
  },
  {
    step: "Frontend Development",
    title: "3. Interface Construction",
    icon: Code2,
    desc: "Coding semantic, accessible components in React/Vite. Integrating animations, page transitions, and responsive fluid layouts.",
    deliverable: "React Component Library",
  },
  {
    step: "Backend Development",
    title: "4. System Architecture",
    icon: Database,
    desc: "Constructing scalable database systems (PostgreSQL/MySQL), RESTful or GraphQL endpoints, and authentication middleware.",
    deliverable: "Secure Backend APIs",
  },
  {
    step: "AI Integration",
    title: "5. Intelligence Injection",
    icon: Brain,
    desc: "Adding custom prompt logic, semantic searches, agentic loops, and model connections to build intelligent capabilities.",
    deliverable: "AI Pipelines & Integrations",
  },
  {
    step: "Testing & Quality Assurance",
    title: "6. Quality Gatekeeping",
    icon: TestTube,
    desc: "Running extensive unit, integration, and user-acceptance test suites. Conducting load audits and TypeScript compiling reviews.",
    deliverable: "QA Pass Report & Test Coverage Matrix",
  },
  {
    step: "Deployment",
    title: "7. Production Rollout",
    icon: Rocket,
    desc: "Configuring containerized pipelines using Docker. Deploying to modern high-availability servers with SSL and CDN networks.",
    deliverable: "Live Production Environment",
  },
  {
    step: "Maintenance & Support",
    title: "8. Continuous Upgrade",
    icon: Wrench,
    desc: "Continuous performance tuning, dependency updates, telemetry monitoring, and feature iteration.",
    deliverable: "Monthly Maintenance Logs",
  },
];

const techCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: Code2,
    techs: [
      { name: "React & Vite", level: "Expert", desc: "Supercharged React applications compiled on Vite." },
      { name: "HTML5 / CSS3", level: "Expert", desc: "Semantic tags and modern variables for flexible designs." },
      { name: "Framer Motion", level: "Expert", desc: "Ultra-smooth micro-interactions and transitions." },
      { name: "TypeScript", level: "Advanced", desc: "Strict typing for clean, robust enterprise logic." },
    ],
  },
  {
    id: "backend",
    title: "Backend Services",
    icon: Database,
    techs: [
      { name: "Python / Django", level: "Expert", desc: "Highly secure and scalable MVC architecture." },
      { name: "Flask / FastAPI", level: "Expert", desc: "High-performance microservices and rapid API endpoints." },
      { name: "Node.js / Express", level: "Advanced", desc: "Non-blocking event-driven application backends." },
      { name: "REST & GraphQL", level: "Expert", desc: "Clean schemas and query-efficient endpoints." },
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    icon: Layers,
    techs: [
      { name: "PostgreSQL", level: "Expert", desc: "Robust relational data storage with JSONB support." },
      { name: "MySQL", level: "Expert", desc: "Highly efficient database clusters with quick replication." },
      { name: "Redis Cache", level: "Advanced", desc: "Memory-speed caching and user session state storage." },
      { name: "MongoDB", level: "Advanced", desc: "Dynamic document storage for flexible schemas." },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: Brain,
    techs: [
      { name: "Generative AI Integration", level: "Expert", desc: "Advanced integration of LLMs (Gemini, Claude)." },
      { name: "Machine Learning (ML)", level: "Advanced", desc: "Custom regression, categorization, and forecast models." },
      { name: "Retrieval-Augmented Gen", level: "Expert", desc: "Context-aware AI with vector database integrations." },
      { name: "Agentic Workflows", level: "Advanced", desc: "Multi-agent planning, validation, and execution loops." },
    ],
  },
];

const ecosystemNodes = [
  {
    id: "gco",
    name: "Global Capability Olympiad (GCO)",
    icon: Trophy,
    color: "#6366f1",
    path: "/gco",
    desc: "Syllabus-free capability evaluations measuring advanced thinking, logic, and reasoning in students globally.",
    benefits: ["Syllabus-Free Design", "Pressure-Tested Scoring", "Global Benchmark Rankings"],
  },
  {
    id: "psychometric",
    name: "Psychometric Assessment",
    icon: ClipboardCheck,
    color: "#f59e0b",
    path: "/psychometric-assessment",
    desc: "Scientific evaluation pathways defining cognitive styles, intelligence types, and problem-solving readiness.",
    benefits: ["Adaptive Leveling", "Cognitive Style Identification", "Institutional Reports"],
  },
  {
    id: "playground",
    name: "Ateion PlayGround",
    icon: Gamepad2,
    color: "#06b6d4",
    path: "/playground",
    desc: "Gamified simulation modules and coding playgrounds where students apply skills in high-energy interactive labs.",
    benefits: ["Real-world Scenarios", "Coding & Design Sandboxes", "Instant Code Sandbox Outputs"],
  },
  {
    id: "dashboard",
    name: "Learner Dashboard",
    icon: LayoutDashboard,
    color: "#E8856A",
    path: "/dashboard",
    desc: "Comprehensive analytics portal showing real-time growth indicators, capability index history, and verified digital certificates.",
    benefits: ["Verified Capabilities", "Telemetry Tracking", "Automated Certification Logs"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AteionPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("frontend");
  const [hoveredTech, setHoveredTech] = useState<any>(null);
  const [selectedEcosystemNode, setSelectedEcosystemNode] = useState(0);

  // Setup initial hovered tech
  useEffect(() => {
    const category = techCategories.find(c => c.id === activeTab);
    if (category && category.techs.length > 0) {
      setHoveredTech(category.techs[0]);
    }
  }, [activeTab]);

  return (
    <>
      <Helmet>
        <title>Ateion | Website Development & AI Solutions</title>
        <meta
          name="description"
          content="Ateion — Premium Web Development & AI Solutions. Explore our Bento design system, technology stack, process timeline, and services."
        />
      </Helmet>
      <SharedNavbar />
      <NavbarSpacer />
      <div className="bg-[var(--color-background-primary)] w-full min-h-screen text-[var(--color-text-primary)] transition-colors duration-300 relative overflow-hidden pb-12">

        {/* Background Ambient Blobs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-accent-light)] rounded-full mix-blend-multiply filter blur-[120px] opacity-25 animate-blob" />
          <div className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] bg-[var(--color-primary_light)] rounded-full mix-blend-multiply filter blur-[150px] opacity-15 animate-blob animation-delay-2000" />
          <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-[var(--color-accent-light)] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-blob animation-delay-4000" />
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 py-16 px-4 md:py-24 max-w-[var(--max-width)] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5" />
              Who We Are
            </div>
            <h1
              className="text-5xl md:text-8xl font-black mb-6 tracking-[-0.04em] leading-[1.02]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Building the Future of <br className="hidden md:inline" />
              <span className="text-[var(--color-accent)] glow-accent">Digital Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-6 font-medium max-w-2xl mx-auto leading-relaxed">
              We design and engineer bespoke web architectures and cognitive AI systems that elevate your institutional and business capabilities.
            </p>
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mx-auto" />
          </motion.div>
        </section>

        {/* STATS SECTION (BENTO STYLING) */}
        <section className="relative z-10 px-4 max-w-[var(--max-width)] mx-auto mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <div
              onMouseMove={handleMouseMove}
              className="glass-bento-card p-6 md:p-8 rounded-3xl text-center flex flex-col justify-center items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-2 tracking-tight">
                <CountUp end={28} />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Creative Engineers</div>
            </div>

            <div
              onMouseMove={handleMouseMove}
              className="glass-bento-card p-6 md:p-8 rounded-3xl text-center flex flex-col justify-center items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-2 tracking-tight">
                <CountUp end={100} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Projects Delivered</div>
            </div>

            <div
              onMouseMove={handleMouseMove}
              className="glass-bento-card p-6 md:p-8 rounded-3xl text-center flex flex-col justify-center items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-2 tracking-tight">
                <CountUp end={5} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Years Experience</div>
            </div>

            <div
              onMouseMove={handleMouseMove}
              className="glass-bento-card p-6 md:p-8 rounded-3xl text-center flex flex-col justify-center items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-2 tracking-tight">
                <CountUp end={20} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">AI Solutions Deployed</div>
            </div>
          </motion.div>
        </section>

        {/* INTERACTIVE ECOSYSTEM MAP SECTION */}
        <section className="relative z-10 px-4 max-w-[var(--max-width)] mx-auto mb-16">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Ateion <span className="text-[var(--color-accent)]">Ecosystem</span>
            </h2>
            <div className="h-[2px] w-20 bg-[var(--color-accent)] mx-auto mt-4 mb-2" />
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base">
              A fully integrated capability-first education model connecting Olympiads, scientific assessments, simulation playgrounds, and growth telemetry.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Desktop Center Visualization Map (Left/Center - 7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center">
              <div
                onMouseMove={handleMouseMove}
                className="glass-bento-card p-6 rounded-3xl w-full flex items-center justify-center relative min-h-[440px] overflow-hidden bg-gradient-to-br from-transparent to-[var(--color-accent-light)]/5"
              >
                {/* SVG Connections with animated dashoffset flows */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" fill="none">
                  {/* Lines from center (200, 200) to quadrant nodes */}
                  <path d="M 200 200 L 80 80" stroke="var(--color-border-medium)" strokeWidth="2" opacity="0.3" />
                  <path d="M 200 200 L 320 80" stroke="var(--color-border-medium)" strokeWidth="2" opacity="0.3" />
                  <path d="M 200 200 L 80 320" stroke="var(--color-border-medium)" strokeWidth="2" opacity="0.3" />
                  <path d="M 200 200 L 320 320" stroke="var(--color-border-medium)" strokeWidth="2" opacity="0.3" />

                  {/* Flowing animated glow dashes */}
                  <path d="M 200 200 L 80 80" stroke="#6366f1" strokeWidth="2" className="flowing-line" strokeLinecap="round" />
                  <path d="M 200 200 L 320 80" stroke="#f59e0b" strokeWidth="2" className="flowing-line" strokeLinecap="round" />
                  <path d="M 200 200 L 80 320" stroke="#06b6d4" strokeWidth="2" className="flowing-line" strokeLinecap="round" />
                  <path d="M 200 200 L 320 320" stroke="#E8856A" strokeWidth="2" className="flowing-line" strokeLinecap="round" />
                </svg>

                {/* Central Core Hub (Ateion Core) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] text-white dark:bg-white dark:text-[var(--color-primary)] flex items-center justify-center shadow-2xl border-4 border-[var(--color-background-primary)] ecosystem-center-glow">
                    <Building2 className="w-10 h-10 text-[var(--color-accent)] animate-pulse" />
                  </div>
                  <span className="block mt-2.5 text-xs font-black uppercase tracking-widest text-[var(--color-text-primary)] bg-[var(--color-background-secondary)]/80 px-2 py-0.5 rounded-full backdrop-blur-sm">Ateion Core</span>
                </div>

                {/* surrounding Nodes */}
                {ecosystemNodes.map((node, idx) => {
                  const NodeIcon = node.icon;
                  const isSelected = idx === selectedEcosystemNode;

                  // Define positions (quadrant coordinates on a 400x400 grid)
                  const positions = [
                    { top: "12%", left: "12%", x: 80, y: 80 },    // Top-Left (GCO)
                    { top: "12%", right: "12%", x: 320, y: 80 },  // Top-Right (Psychometric)
                    { bottom: "12%", left: "12%", x: 80, y: 320 }, // Bottom-Left (Playground)
                    { bottom: "12%", right: "12%", x: 320, y: 320 },// Bottom-Right (Dashboard)
                  ];

                  return (
                    <div
                      key={node.id}
                      className="absolute transition-all duration-300 z-20"
                      style={{
                        top: positions[idx].top,
                        left: positions[idx].left,
                        right: positions[idx].right,
                        bottom: positions[idx].bottom,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedEcosystemNode(idx)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "scale-110 shadow-lg border-4 border-white dark:border-[var(--color-primary)]"
                            : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:scale-105 animate-pulse"
                        }`}
                        style={isSelected ? { backgroundColor: node.color, color: "#fff" } : {}}
                      >
                        <NodeIcon className="w-6 h-6" />
                      </button>
                      <span className={`block text-center text-[10px] font-black uppercase mt-1.5 tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm bg-[var(--color-background-secondary)]/80 ${
                        isSelected ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
                      }`}>
                        {node.id.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Node Detail Card (Right - 5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedEcosystemNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onMouseMove={handleMouseMove}
                  className="glass-bento-card p-6 md:p-8 rounded-3xl flex-1 flex flex-col justify-between"
                  style={{ borderLeft: `4px solid ${ecosystemNodes[selectedEcosystemNode].color}` }}
                >
                  <div>
                    <span
                      className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] inline-block mb-4"
                      style={{ color: ecosystemNodes[selectedEcosystemNode].color, backgroundColor: `${ecosystemNodes[selectedEcosystemNode].color}15` }}
                    >
                      Ecosystem Node
                    </span>
                    <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-4">{ecosystemNodes[selectedEcosystemNode].name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                      {ecosystemNodes[selectedEcosystemNode].desc}
                    </p>

                    <div className="border-t border-[var(--color-border-light)] pt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">Capabilities & Features</h4>
                      <ul className="space-y-2.5">
                        {ecosystemNodes[selectedEcosystemNode].benefits.map((b) => (
                          <li key={b} className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)]">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ecosystemNodes[selectedEcosystemNode].color }} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--color-border-light)]">
                    <a
                      href={ecosystemNodes[selectedEcosystemNode].path}
                      className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                      style={{ backgroundColor: ecosystemNodes[selectedEcosystemNode].color, color: "#fff" }}
                    >
                      Explore Hub <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="relative z-10 py-16 px-4 bg-[var(--color-background-secondary)] border-y border-[var(--color-border-light)] mb-16">
          <div className="max-w-[var(--max-width)] mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Core <span className="text-[var(--color-accent)]">Services</span>
              </h2>
              <div className="h-[2px] w-20 bg-[var(--color-accent)] mx-auto mt-4 mb-2" />
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base">
                An integrated agency offering end-to-end design, web coding, database setups, and advanced AI agent capabilities.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={svc.name}
                    variants={itemVariants}
                    onMouseMove={handleMouseMove}
                    className="glass-bento-card p-6 rounded-3xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{svc.name}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{svc.desc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-[var(--color-accent)] text-xs font-semibold uppercase tracking-wider group cursor-pointer">
                      Learn More <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* TEAM STRUCTURE (BENTO grid + charts) */}
        <section className="relative z-10 px-4 max-w-[var(--max-width)] mx-auto mb-16">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Organisational <span className="text-[var(--color-accent)]">Structure</span>
            </h2>
            <div className="h-[2px] w-20 bg-[var(--color-accent)] mx-auto mt-4 mb-2" />
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base">
              A balanced team of 28 specialists working in dedicated, cross-functional squads to construct premium platforms.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {team.map((t, idx) => {
              const Icon = t.icon;
              const pct = (t.employees / 28) * 100;
              const radius = 26;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (pct / 100) * circumference;

              return (
                <motion.div
                  key={t.department}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onMouseMove={handleMouseMove}
                  className="glass-bento-card p-6 md:p-8 rounded-3xl flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4 items-center">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${t.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: t.color }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[var(--color-text-primary)] leading-tight">{t.department}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] font-semibold mt-1">{t.employees} Professionals</p>
                      </div>
                    </div>
                    {/* SVG CIRCULAR DONUT CHART */}
                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="transparent"
                          stroke="var(--color-border-medium)"
                          strokeWidth="5"
                          opacity="0.25"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="transparent"
                          stroke={t.color}
                          strokeWidth="5"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-[var(--color-text-primary)]">{Math.round(pct)}%</span>
                    </div>
                  </div>

                  <div className="border-t border-[var(--color-border-light)] pt-4 mt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {t.roles.map((role) => (
                        <li key={role} className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: t.color }} />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PROJECT DELIVERY PROCESS (INTERACTIVE TIMELINE BENTO) */}
        <section className="relative z-10 py-16 px-4 bg-[var(--color-background-secondary)] border-y border-[var(--color-border-light)] mb-16">
          <div className="max-w-[var(--max-width)] mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Project Delivery <span className="text-[var(--color-accent)]">Process</span>
              </h2>
              <div className="h-[2px] w-20 bg-[var(--color-accent)] mx-auto mt-4 mb-2" />
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base">
                An engineered 8-phase pipeline ensuring optimal delivery speeds, extreme design precision, and strict QA protocols.
              </p>
            </div>

            {/* TIMELINE CONTAINER */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Timeline list (Steps 1-8) */}
              <div className="lg:col-span-2 relative pl-12 lg:pl-0 lg:py-6">
                {/* Vertical Line on mobile */}
                <div className="timeline-path block lg:hidden" />

                {/* Horizontal line on large desktop */}
                <div className="hidden lg:block absolute left-4 right-4 top-1/2 h-[3px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/50 to-[var(--color-border-light)] z-0 transform -translate-y-1/2" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {processSteps.map((item, idx) => {
                    const StepIcon = item.icon;
                    const isActive = idx === activeStep;

                    return (
                      <motion.div
                        key={item.step}
                        onClick={() => setActiveStep(idx)}
                        onMouseMove={handleMouseMove}
                        className={`glass-bento-card p-5 rounded-2xl cursor-pointer select-none transition-all duration-300 relative ${
                          isActive
                            ? "border-[var(--color-accent)] shadow-md translate-y-[-4px]"
                            : "opacity-80 hover:opacity-100"
                        }`}
                        style={isActive ? { borderColor: "var(--color-accent)", background: "rgba(232, 133, 106, 0.04)" } : {}}
                      >
                        <div className="flex items-center gap-3 mb-3 justify-between">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                            isActive
                              ? "bg-[var(--color-accent)] text-white"
                              : "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                          }`}>
                            {idx + 1}
                          </div>
                          <StepIcon className={`w-5 h-5 ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"}`} />
                        </div>
                        <h4 className={`text-sm font-bold leading-tight ${isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}`}>
                          {item.step}
                        </h4>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Step Detail Card */}
              <div className="lg:col-span-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onMouseMove={handleMouseMove}
                    className="glass-bento-card p-6 md:p-8 rounded-3xl border-l-4 border-l-[var(--color-accent)] flex flex-col justify-between min-h-[300px]"
                  >
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">Phase Overview</div>
                      <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-4">{processSteps[activeStep].title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        {processSteps[activeStep].desc}
                      </p>
                    </div>

                    <div className="border-t border-[var(--color-border-light)] pt-4 mt-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">Key Deliverable</div>
                      <div className="flex gap-2.5 items-center mt-2">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0" />
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">{processSteps[activeStep].deliverable}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNOLOGIES SECTION (INTERACTIVE TECH RADAR BENTO) */}
        <section className="relative z-10 px-4 max-w-[var(--max-width)] mx-auto mb-16">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Interactive <span className="text-[var(--color-accent)]">Tech Radar</span>
            </h2>
            <div className="h-[2px] w-20 bg-[var(--color-accent)] mx-auto mt-4 mb-2" />
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base">
              Explore our tech stack categorization. Hover over radar elements to see technical proficiencies and implementation scopes.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Category Tabs & Tech List (Left/Center) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Category Tab Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-[var(--color-border-light)]">
                {techCategories.map((cat) => {
                  const TabIcon = cat.icon;
                  const isSelected = cat.id === activeTab;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-primary)] text-white dark:bg-white dark:text-[var(--color-primary)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-light)]"
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      {cat.title.split(" ")[0]}
                    </button>
                  );
                })}
              </div>

              {/* Technologies List */}
              <div className="grid sm:grid-cols-2 gap-4">
                {techCategories
                  .find((c) => c.id === activeTab)
                  ?.techs.map((tech) => {
                    const isHovered = hoveredTech?.name === tech.name;
                    return (
                      <div
                        key={tech.name}
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseMove={handleMouseMove}
                        className={`glass-bento-card p-5 rounded-2xl transition-all duration-300 ${
                          isHovered ? "border-[var(--color-accent)] translate-x-1" : ""
                        }`}
                        style={isHovered ? { borderColor: "var(--color-accent)", background: "rgba(232, 133, 106, 0.03)" } : {}}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-[var(--color-text-primary)]">{tech.name}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                            {tech.level}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{tech.desc}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Visual Tech Radar Screen (Right) */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                onMouseMove={handleMouseMove}
                className="glass-bento-card p-8 rounded-3xl flex-1 flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden bg-gradient-to-br from-transparent to-[var(--color-accent-light)]/5"
              >
                {/* Radar Ring Elements */}
                <div className="radar-scanner" />
                <div className="radar-ring w-64 h-64" />
                <div className="radar-ring w-48 h-48" />
                <div className="radar-ring w-32 h-32" />
                <div className="radar-ring w-16 h-16" />

                {/* Pulsing Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] animate-ping absolute opacity-70" />
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-[10px] font-black shadow-lg relative">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Radar Tech Nodes */}
                {techCategories
                  .find((c) => c.id === activeTab)
                  ?.techs.map((t, idx) => {
                    const isHovered = hoveredTech?.name === t.name;
                    // Calculate node position in circle
                    const total = techCategories.find((c) => c.id === activeTab)?.techs.length || 4;
                    const angle = (idx * 2 * Math.PI) / total;
                    const radius = 90; // placement radius
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <div
                        key={t.name}
                        className="absolute transition-all duration-300"
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          top: "50%",
                          left: "50%",
                        }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredTech(t)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isHovered
                              ? "bg-[var(--color-accent)] text-white scale-125 shadow-lg border-2 border-white dark:border-[var(--color-primary)]"
                              : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:scale-110"
                          }`}
                        >
                          <span className="text-[10px] font-black">{idx + 1}</span>
                        </button>
                      </div>
                    );
                  })}

                {/* Radar Info Box overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/70 dark:bg-[#0F172A]/70 border border-[var(--color-border-light)] rounded-2xl p-4 backdrop-blur-md z-10 flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[var(--color-text-primary)]">Tech Specs:</h5>
                    <p className="text-xs font-semibold text-[var(--color-text-secondary)] mt-0.5 truncate max-w-[200px] sm:max-w-xs">
                      {hoveredTech ? hoveredTech.name : "Select a Tech node"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GET IN TOUCH / CONTACT SECTION */}
        <section className="relative z-10 px-4 max-w-[var(--max-width)] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="glass-bento-card p-8 md:p-12 rounded-3xl text-center relative overflow-hidden bg-gradient-to-br from-transparent to-[var(--color-accent-light)]/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
              <Mail className="w-3.5 h-3.5" />
              Contact
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let's Build Something <br className="hidden md:inline" />
              <span className="text-[var(--color-accent)] glow-accent">Great Together</span>
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] mb-10 max-w-xl mx-auto leading-relaxed">
              Have an innovative concept, website overhaul, or AI assistant in mind? Let's connect and build a production-ready model.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <a
                href="mailto:destiny@ateion.info"
                className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-md transition-all shrink-0"
              >
                <Mail className="w-4.5 h-4.5" />
                destiny@ateion.info
              </a>
              <a
                href="https://ateion.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[var(--color-border-medium)] text-[var(--color-text-primary)] font-bold text-sm tracking-wide bg-[var(--color-background-secondary)]/50 hover:bg-[var(--color-background-primary)] transition-all shrink-0"
              >
                <Globe className="w-4.5 h-4.5" />
                ateion.com
              </a>
            </div>
          </motion.div>
        </section>

      </div>

      <SharedFooter />
    </>
  );
}
