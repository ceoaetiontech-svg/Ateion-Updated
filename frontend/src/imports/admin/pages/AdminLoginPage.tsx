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
        bg-[#f2f4f8]
      "
    >
      {/* Background Orbs for Light Mode */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div
        className="
          w-full
          max-w-md
          md:max-w-lg
          bg-white/90
          backdrop-blur-xl
          border
          border-white
          shadow-[0_8px_30px_rgb(0,0,0,0.08)]
          rounded-[32px]
          p-6
          sm:p-8
          lg:p-10
          z-10
          relative
          overflow-hidden
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div
            className="
              p-4
              rounded-full
              bg-white
              border-2
              border-[#D4AF37]
              shadow-[0_0_15px_rgba(212,175,55,0.2)]
            "
          >
            <ShieldCheck size={42} className="text-[#1E3A8A]" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="
            text-center
            text-3xl
            sm:text-4xl
            font-bold
            text-[#1a2235]
          "
        >
          Ateion
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8 font-medium">
          Master Admin Portal
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[#1a2235] mb-2 text-sm sm:text-base font-bold">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@ateion.com"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[#f8fafc]
                border-2
                border-gray-200
                text-[#1a2235]
                placeholder-gray-400
                outline-none
                focus:bg-white
                focus:border-[#D4AF37]
                focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]
                transition-all
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#1a2235] mb-2 text-sm sm:text-base font-bold">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[#f8fafc]
                border-2
                border-gray-200
                text-[#1a2235]
                placeholder-gray-400
                outline-none
                focus:bg-white
                focus:border-[#D4AF37]
                focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]
                transition-all
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              py-3.5
              mt-2
              rounded-xl
              bg-gradient-to-r
              from-[#1E3A8A]
              to-[#3B82F6]
              text-white
              font-bold
              shadow-[0_8px_20px_rgba(59,130,246,0.3)]
              hover:shadow-[0_10px_25px_rgba(59,130,246,0.4)]
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            Access Portal
          </button>
        </form>

        <p className="mt-6 text-center text-xs sm:text-sm text-gray-400 font-medium">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
