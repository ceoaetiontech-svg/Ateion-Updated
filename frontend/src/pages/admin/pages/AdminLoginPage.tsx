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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden animated-gradient bg-[var(--color-background-primary)]">
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] cursor-pointer"
        style={{ backdropFilter: "blur(12px)" }}
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

      <div className="admin-glass-card w-full max-w-md md:max-w-lg z-10 relative">
        <div className="flex justify-center mb-4">
          <div className="admin-glass-icon p-4 rounded-full">
            <ShieldCheck size={42} className="text-[var(--color-text-primary)]" />
          </div>
        </div>

        <h1 className="text-center text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
          Ateion
        </h1>
        <p className="text-center text-[var(--color-text-secondary)] mt-0 mb-8 text-sm">
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
              className="w-full px-4 py-3 rounded-xl outline-none transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] admin-input"
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
              className="w-full px-4 py-3 rounded-xl outline-none transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] admin-input"
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
            className="w-full py-3 rounded-xl text-[var(--color-text-inverse)] font-semibold transition-all duration-300 hover:scale-[1.02] admin-btn flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
