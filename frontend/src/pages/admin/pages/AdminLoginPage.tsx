import { ShieldCheck, Sun, Moon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../app/components/ThemeProvider";
import { useAdminAuth } from "../context/AdminAuthContext";
import "../styles/adminstyle.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { login, isAuthenticated } = useAdminAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(result.error || "Invalid email or password");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden animated-gradient bg-[var(--color-background-primary)]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-background-secondary)]/80 backdrop-blur-md border border-[var(--color-border-medium)] text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-accent)]/40 transition-colors"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={20} className="text-[var(--color-text-secondary)]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "var(--color-accent)", opacity: 0.25, filter: "blur(120px)" }}
      />
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "var(--color-background-tertiary)", opacity: 0.2, filter: "blur(120px)" }}
      />

      <motion.div 
        className="admin-glass-card w-full max-w-md md:max-w-lg z-10 relative !p-8 sm:!p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center border border-[var(--color-accent)]/20">
            <ShieldCheck size={32} className="text-[var(--color-accent)]" />
          </div>
        </div>

        <h1 className="text-center text-3xl sm:text-4xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)] mb-1 tracking-tight">
          Ateion
        </h1>
        <p className="text-center text-[var(--color-text-secondary)] mt-1 mb-8 text-sm font-medium">
          Master Admin Portal
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[var(--color-text-primary)] mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@ateion.com"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]/60 bg-[var(--color-background-primary)]/40 border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] backdrop-blur-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-primary)] mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]/60 bg-[var(--color-background-primary)]/40 border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] backdrop-blur-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-2 font-medium"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)]"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
          Authorized Personnel Only
        </p>
      </motion.div>
    </div>
  );
}
