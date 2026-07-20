import { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, GraduationCap, Building2, Heart, KeyRound, Trophy, CheckCircle } from "lucide-react";
import GCONavbar from "../../app/components/GCONavbar";
import { getApiBaseUrl } from "../../lib/apiClient";
import "../../styles/gco/index.css";
import "../../styles/gco/fonts.css";
import "../../styles/gco/theme.css";
import "../../styles/gco/pill-navbar.css";
import "../../styles/gco/gco-registration.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export default function GCOLoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "forgot">("signin");
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      const data = await response.json() as { token?: string };
      if (!data.token) throw new Error("No token returned.");

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login could not be completed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const handleLinkedinLogin = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/linkedin`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/github`;
  };

  return (
    <>
      <Helmet>
        <title>Sign In | GCO – Ateion</title>
        <meta name="description" content="Sign in to your GCO account. Access your Olympiad dashboard, results and resources." />
      </Helmet>
      <GCONavbar />

      <div className="gco-login-page">
        {/* Background particles */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(124,110,240,0.04) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(232,133,106,0.04) 2px, transparent 2px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="gco-login-container">
          <AnimatePresence mode="wait">
            {/* ── SIGN IN ── */}
            {tab === "signin" && !forgotSent && (
              <motion.div key="signin" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}>
                {/* Logo area */}
                <div className="gco-login-logo-area">
                  <div className="gco-login-logo-icon"><Trophy size={24} /></div>
                  <h1 className="gco-login-logo-title">Welcome Back</h1>
                  <p className="gco-login-logo-sub">Sign in to your GCO account</p>
                </div>

                <div className="gco-login-card">
                  {/* Role tabs */}
                  <div style={{
                    display: "flex", gap: 6, marginBottom: 24,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 14, padding: 5,
                  }}>
                    {([
                      { icon: GraduationCap, label: "Student" },
                      { icon: Building2, label: "School" },
                      { icon: Heart, label: "Volunteer" },
                    ] as const).map(role => (
                      <button key={role.label} type="button" className="gco-login-tab"
                        style={{ borderRadius: 10, padding: "10px 0", gap: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <role.icon size={16} />
                        <span>{role.label}</span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSignIn}>
                    <h2 className="gco-login-heading">Sign In</h2>
                    <p className="gco-login-desc">Access your dashboard, results and resources.</p>

                    {/* Email */}
                    <div className="gco-reg-field" style={{ marginBottom: 14 }}>
                      <label className="gco-reg-label">Email Address</label>
                      <div className="gco-reg-input-wrap">
                        <span className="gco-reg-input-icon"><Mail size={15} /></span>
                        <input id="gco-login-email" className="gco-reg-input" type="email" placeholder="you@example.com" required
                          value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="gco-reg-field" style={{ marginBottom: 10 }}>
                      <label className="gco-reg-label">Password</label>
                      <div className="gco-reg-input-wrap">
                        <span className="gco-reg-input-icon"><Lock size={15} /></span>
                        <input id="gco-login-password" className="gco-reg-input" type={showPw ? "text" : "password"} placeholder="Enter your password" required
                          value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
                        <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowPw(v => !v)}>
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me / Forgot */}
                    <div className="gco-login-forgot-row" style={{ marginBottom: 24 }}>
                      <label className="gco-login-remember">
                        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                        <span>Remember me</span>
                      </label>
                      <button type="button" className="gco-login-forgot" onClick={() => setTab("forgot")}>
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit */}
                    <button id="gco-login-submit" type="submit" className="gco-reg-submit" disabled={loading}
                      style={{ marginBottom: 20, opacity: loading ? 0.75 : 1 }}>
                      {loading ? "Signing in…" : "Sign In →"}
                    </button>

                    {/* Divider */}
                    <div className="gco-reg-divider"><span>or continue with</span></div>

                    {/* Social */}
                    <div className="gco-reg-social-row" style={{ marginTop: 16 }}>
                      <button type="button" id="gco-google-login" className="gco-reg-social-btn" onClick={handleGoogleLogin}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button type="button" id="gco-linkedin-login" className="gco-reg-social-btn" onClick={handleLinkedinLogin}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button type="button" id="gco-github-login" className="gco-reg-social-btn" onClick={handleGithubLogin}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        GitHub
                      </button>
                    </div>

                    <p className="gco-reg-login-link" style={{ marginTop: 24 }}>
                      Don't have an account?{" "}
                      <button type="button" onClick={() => navigate("/gco/register-student")}>Register as Student</button>
                      {" · "}
                      <button type="button" onClick={() => navigate("/gco/register-school")}>School</button>
                      {" · "}
                      <button type="button" onClick={() => navigate("/gco/register-volunteer")}>Volunteer</button>
                    </p>
                  </form>
                </div>

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button type="button"
                    onClick={() => navigate("/gco")}
                    style={{
                      background: "none", border: "none", color: "rgba(241,240,250,0.4)",
                      fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                    }}>
                    <ArrowLeft size={14} /> Back to GCO
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── FORGOT PASSWORD ── */}
            {tab === "forgot" && !forgotSent && (
              <motion.div key="forgot" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}>
                <div className="gco-login-logo-area">
                  <div className="gco-login-logo-icon"><KeyRound size={24} /></div>
                  <h1 className="gco-login-logo-title">Reset Password</h1>
                  <p className="gco-login-logo-sub">Enter your email to receive a reset link</p>
                </div>

                <div className="gco-login-card">
                  <form onSubmit={handleForgotPassword}>
                    <div className="gco-reg-field" style={{ marginBottom: 24 }}>
                      <label className="gco-reg-label">Email Address</label>
                      <div className="gco-reg-input-wrap">
                        <span className="gco-reg-input-icon"><Mail size={15} /></span>
                        <input className="gco-reg-input" type="email" placeholder="you@example.com" required
                          value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
                      </div>
                    </div>

                    <button type="submit" className="gco-reg-submit">Send Reset Link</button>

                    <p className="gco-reg-login-link" style={{ marginTop: 20 }}>
                      Remember your password?{" "}
                      <button type="button" onClick={() => setTab("signin")}>Sign In</button>
                    </p>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── FORGOT SUCCESS ── */}
            {forgotSent && (
              <motion.div key="forgot-success" variants={fadeUp} initial="hidden" animate="show">
                <div className="gco-login-logo-area">
                  <div className="gco-login-logo-icon"><Mail size={24} /></div>
                  <h1 className="gco-login-logo-title">Check Your Email</h1>
                  <p className="gco-login-logo-sub">A reset link has been sent to <strong style={{ color: "#e8856a" }}>{forgotEmail}</strong></p>
                </div>
                <div className="gco-login-card">
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 20,
                      background: "rgba(232,133,106,0.1)", border: "1px solid rgba(232,133,106,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}><CheckCircle size={28} /></div>
                    <p style={{ color: "rgba(241,240,250,0.55)", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
                      If an account exists for <strong style={{ color: "#f1f0fa" }}>{forgotEmail}</strong>, you'll receive a password reset link within a few minutes. Check your spam folder if you don't see it.
                    </p>
                    <button className="gco-reg-submit" onClick={() => { setForgotSent(false); setTab("signin"); }}>
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
