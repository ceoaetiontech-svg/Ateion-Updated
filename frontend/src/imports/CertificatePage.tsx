import SharedNavbar from "../app/components/SharedNavbar";
import SharedFooter from "../app/components/SharedFooter";

import imgImage9 from "../assets/3aab4451afd875f66a83eb26e0ca2d6f58abce98.png";
import imgImage7 from "../assets/e985b07ea1f916546c05a06ca93558ef62ecc870.png";

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] overflow-x-hidden">

      {/* NAVBAR */}
      <SharedNavbar />

      {/* PAGE */}
      <div className="px-6 md:px-20 pt-32 pb-20">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <h1
            className="text-[40px] md:text-[60px] font-bold text-black mb-6"
            style={{ fontFamily: "'OV Soge', sans-serif" }}
          >
            Globally Aligned With
          </h1>

          {/* SUBTITLE */}
          <p className="text-[16px] md:text-[20px] text-gray-600 mb-16 max-w-3xl leading-[1.7]">
            Ateion is globally aligned with internationally recognized
            educational and innovation ecosystems empowering future-ready
            learning and capability-first education.
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* CARD 1 */}
            <div className="bg-[#202020] rounded-[30px] p-10 hover:scale-[1.02] transition duration-300">

              <img
                src={imgImage9}
                alt="certificate"
                className="w-full rounded-2xl"
              />

            </div>

            {/* CARD 2 */}
            <div className="bg-[#202020] rounded-[30px] p-10 hover:scale-[1.02] transition duration-300">

              <img
                src={imgImage7}
                alt="certificate"
                className="w-full rounded-2xl"
              />

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <SharedFooter />

    </div>
  );
}