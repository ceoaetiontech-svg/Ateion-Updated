import { ShieldCheck, BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../../../imports/admin/styles/adminstyle.css";

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("teacher", JSON.stringify({ email }));
      navigate("/teacher/dashboard");
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
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

      {/* Login Card */}
      <div
        className="
          w-full
          max-w-md
          md:max-w-lg
          bg-white/10
          backdrop-blur-[30px]
          border
          border-white/20
          shadow-xl
          rounded-[32px]
          p-6
          sm:p-8
          lg:p-10
          z-10
          relative
          overflow-hidden
        "
      >
        {/* Glass Reflection */}
        <div className="absolute top-0 left-0 w-full h-24 bg-[var(--color-white)]/10 blur-xl"></div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div
            className="
              p-4
              rounded-full
              bg-white/15
              backdrop-blur-md
              border-2
              border-[#D4AF37]
              shadow-[0_0_20px_rgba(212,175,55,0.4)]
            "
          >
            <BookOpen size={42} className="text-[#3B82F6]" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="
            text-center
            text-3xl
            sm:text-4xl
            font-bold
            text-white
            drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]
          "
        >
          Ateion
        </h1>

        <p className="text-center text-white/90 mt-2 mb-8">Instructor Portal</p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-white mb-2 text-sm sm:text-base font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="instructor@ateion.com"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-white/10
                backdrop-blur-md
                border-2
                border-[#D4AF37]/80
                text-white
                placeholder-white/60
                outline-none
                shadow-[0_0_10px_rgba(212,175,55,0.15)]
                focus:border-[#F5C71A]
                focus:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                transition-all
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2 text-sm sm:text-base font-medium">
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
                bg-white/10
                backdrop-blur-md
                border-2
                border-[#D4AF37]/80
                text-white
                placeholder-white/60
                outline-none
                shadow-[0_0_10px_rgba(212,175,55,0.15)]
                focus:border-[#F5C71A]
                focus:shadow-[0_0_20px_rgba(212,175,55,0.4)]
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
              py-3
              rounded-xl
              bg-gradient-to-r
              from-[#2563EB]
              to-[#60A5FA]
              text-white
              font-semibold
              border-2
              border-[#D4AF37]
              shadow-[0_0_15px_rgba(212,175,55,0.35)]
              hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs sm:text-sm text-white/80">
          Instructor Access Only
        </p>
      </div>
    </div>
  );
}
