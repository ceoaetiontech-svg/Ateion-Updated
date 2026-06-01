import { useNavigate } from "react-router";
import { motion } from "framer-motion";
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
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Ateion Logo"
            className="w-[100px] h-[30px] object-contain invert-[1] brightness-200"
          />
        </div>

        <ul>
          <li onClick={() => navigate("/")}>
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            Home
          </li>
          <li onClick={() => navigate("/gco")}>
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </span>
            Olympiad
          </li>
          <li onClick={() => navigate("/PlayGround")}>
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M6 12h4"></path>
                <path d="M8 10v4"></path>
                <circle cx="15" cy="13" r="1"></circle>
                <circle cx="17" cy="11" r="1"></circle>
              </svg>
            </span>
            Playground
          </li>
          {/* DISABLED VOUCH LINK */}
          <li className="disabled-link">
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            Vouch
            <span className="coming-soon-badge">Soon</span>
          </li>
          <li onClick={() => navigate("/assessment-demo")}>
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </span>
            Analytics
          </li>
          <li onClick={() => navigate("/contact")}>
            <span className="sidebar-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            Profile
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <motion.div
          className="topbar"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1>
            Welcome Back, Students <span className="wave">👋</span>
          </h1>
          <p>Track your capability journey</p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          className="cards"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="card"
            variants={fadeUpVariant}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate("/gco")}
          >
            <div className="card-glow"></div>
            <div className="card-icon-container">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <h2>Global Olympiad</h2>
            <p>Participate in global competitions</p>
            <button className="card-btn">Enter Arena</button>
          </motion.div>

          <motion.div
            className="card"
            variants={fadeUpVariant}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate("/PlayGround")}
          >
            <div className="card-glow"></div>
            <div className="card-icon-container">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M6 12h4"></path>
                <path d="M8 10v4"></path>
                <circle cx="15" cy="13" r="1"></circle>
                <circle cx="17" cy="11" r="1"></circle>
              </svg>
            </div>
            <h2>Playground</h2>
            <p>Solve interactive challenges</p>
            <button className="card-btn">Start Practice</button>
          </motion.div>

          <motion.div className="card disabled-card" variants={fadeUpVariant}>
            <div className="card-glow disabled-glow"></div>
            <div className="card-icon-container disabled-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2>Vouch</h2>
            <p>Earn certificates & verified badges</p>
            <span className="coming-soon-label">Coming Soon</span>
          </motion.div>

          <motion.div
            className="card"
            variants={fadeUpVariant}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate("/assessment-demo")}
          >
            <div className="card-glow"></div>
            <div className="card-icon-container">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h2>Leaderboard</h2>
            <p>Track your global rankings</p>
            <button className="card-btn">View Stats</button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;

