import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/adminstyle.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("admin", JSON.stringify({ email }));
      navigate("/admin/dashboard");
    }
  };

  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
px-4
sm:px-6
lg:px-8
relative
overflow-hidden
animated-gradient
bg-[var(--color-background-primary)]
"
    >
      {/* Animated Background */}

      {/* Background orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full"
        style={{ background: "var(--color-accent)", opacity: 0.15, filter: "blur(80px)" }}
      />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full"
        style={{ background: "var(--color-primary_light)", opacity: 0.15, filter: "blur(80px)" }}
      />

      {/* Login Card — Frosted Glass */}
      <div
        className="w-full max-w-md md:max-w-lg z-10 relative overflow-hidden"
        style={{
          background: "var(--color-background-secondary)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "24px",
          border: "1px solid var(--color-border-medium)",
          padding: "40px",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div
            className="p-4 rounded-full"
            style={{
              background: "var(--color-background-tertiary)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <ShieldCheck size={42} className="text-[var(--color-text-primary)]" />
          </div>
        </div>

        <h1 className="text-center text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
          Ateion
        </h1>

        <p className="text-center text-[var(--color-text-secondary)] mt-0 mb-8 text-sm">
          Master Admin Portal
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[var(--color-text-primary)] mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@ateion.com"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              style={{
                background: "var(--color-background-primary)",
                border: "1px solid var(--color-border-input)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-primary)] mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              style={{
                background: "var(--color-background-primary)",
                border: "1px solid var(--color-border-input)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-[var(--color-text-inverse)] font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "var(--color-primary)",
              border: "1px solid transparent",
            }}
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
