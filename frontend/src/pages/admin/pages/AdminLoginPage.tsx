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
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "40px",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div
            className="p-4 rounded-full"
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <ShieldCheck size={42} className="text-white" />
          </div>
        </div>

        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-1">
          Ateion
        </h1>

        <p className="text-center text-white/70 mt-0 mb-8 text-sm">
          Master Admin Portal
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@ateion.com"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all text-white placeholder-white/50"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all text-white placeholder-white/50"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
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
            className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "var(--color-accent)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
