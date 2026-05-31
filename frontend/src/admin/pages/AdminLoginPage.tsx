import { ShieldCheck } from "lucide-react";
import bgimage1 from "../../assets/images/bgimage1.jpg";

export default function AdminLoginPage() {
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
    bg-cover
    bg-center
    bg-no-repeat
  "
  style={{
    backgroundImage: `url(${bgimage1})`,
  }}
  
>
    <div className="absolute inset-0 bg-[#1E3A8A]/20"></div>
      {/* Background Blur Effects */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

      {/* Login Card */}

      <div
    className="
    w-full
    max-w-md
    md:max-w-lg

    bg-white/5
    backdrop-blur-[40px]

    border
    border-white/30

    shadow-[0_8px_32px_rgba(255,255,255,0.12)]

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
<div className="absolute top-0 left-0 w-full h-24 bg-white/20 blur-xl"></div>
        {/* Logo */}

        <div className="flex justify-center mb-4">
         <div className="p-4 rounded-full bg-white/15 backdrop-blur-md border border-white/30">
            <ShieldCheck
              size={42}
              className="text-[#1E3A8A]"
            />
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

        <p className="text-center text-white/90 mt-2 mb-8">
          Master Admin Portal
        </p>

        {/* Form */}

        <form className="space-y-5">
          <div>
           <label className="block text-white mb-2 text-sm sm:text-base font-medium">
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
                bg-white/15
                backdrop-blur-md
                border
                border-white/30
                text-slate-800
                placeholder-slate-500
                outline-none
                focus:ring-2
                 focus:ring-[#4D6CFF]
  "
/>
          </div>

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
                bg-white/15
                border-white/30
                backdrop-blur-md
                border
                text-slate-800
                placeholder-slate-500
                outline-none
                focus:ring-2
                focus:ring-[#4D6CFF]
"
            />
          </div>

          <button
            type="submit"
            className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-[#4D6CFF]
            to-[#7B8FFF]
            text-white
            font-semibold
            shadow-lg
            hover:scale-[1.02]
            hover:shadow-xl
            transition-all
            "
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs sm:text-sm text-white/80">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}