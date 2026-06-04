import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Home,
  Award,
  Gamepad2,
  BadgeCheck,
  BarChart3,
  User,
  Target,
  Zap,
  Globe,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import "../styles/Dashboard.css";
import logo from "../assets/logo.png";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const sidebarLinks = [
  { label: "Home", icon: Home, path: "/", activePaths: ["/dashboard"] },
  { label: "Olympiad", icon: Award, path: "/gco" },
  { label: "Playground", icon: Gamepad2, path: "/PlayGround" },
  { label: "Vouch", icon: BadgeCheck, path: null, disabled: true },
  { label: "Analytics", icon: BarChart3, path: "/assessment-demo" },
  { label: "Profile", icon: User, path: "/profile" },
];

const cards = [
  {
    title: "Global Olympiad",
    desc: "Participate in global competitions",
    btn: "Enter Arena",
    icon: Award,
    path: "/gco",
    accent: "coral",
  },
  {
    title: "Playground",
    desc: "Solve interactive challenges",
    btn: "Start Practice",
    icon: Gamepad2,
    path: "/PlayGround",
    accent: "coral",
  },
  {
    title: "Vouch",
    desc: "Earn certificates & verified badges",
    icon: BadgeCheck,
    disabled: true,
    accent: "coral",
  },
  {
    title: "Leaderboard",
    desc: "Track your global rankings",
    btn: "View Stats",
    icon: TrendingUp,
    path: "/assessment-demo",
    accent: "coral",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Dashboard | Ateion</title>
        <meta name="description" content="Track your capability journey and access Ateion's learning ecosystem from your dashboard." />
      </Helmet>
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Ateion" className="logo-img" />
        </div>

        <ul>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isDisabled = link.disabled;
            return (
              <li
                key={link.label}
                className={isDisabled ? "disabled-link" : ""}
                onClick={() => !isDisabled && link.path && navigate(link.path)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{link.label}</span>
                {isDisabled && <span className="coming-soon-badge">Soon</span>}
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-stat">
            <Zap size={14} className="text-[var(--color-accent)]" />
            <span>Capability Score</span>
            <strong>87</strong>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <motion.div
          className="topbar"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <div className="topbar-left">
            <div className="accent-bar" />
            <div>
              <h1>
                Welcome Back
                <motion.span
                  className="wave inline-block"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={28} className="inline text-[var(--color-accent)] ml-2 -mt-1" />
                </motion.span>
              </h1>
              <p>Track your capability journey</p>
            </div>
          </div>
          <div className="topbar-badge">
            <Globe size={16} />
            <span>Student Dashboard</span>
          </div>
        </motion.div>

        <motion.div
          className="cards"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            if (card.disabled) {
              return (
                <motion.div
                  key={card.title}
                  className="card disabled-card"
                  variants={fadeUpVariant}
                >
                  <div className="card-accent" />
                  <div className="card-icon-container disabled-icon">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>
                  <span className="coming-soon-label">Coming Soon</span>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={card.title}
                className="card"
                variants={fadeUpVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => card.path && navigate(card.path)}
              >
                <div className="card-accent" />
                <div className="card-glow" />
                <div className="card-icon-container">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
                <button className="card-btn">
                  <span>{card.btn}</span>
                  <Target size={14} className="card-btn-icon" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
    </>
  );
};

export default DashboardPage;
