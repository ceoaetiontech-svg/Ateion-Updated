import {
  User,
  Crown,
  BookOpen,
  Award,
  ClipboardCheck,
  Mail,
  Settings,
  LogOut,
  Camera,
} from "lucide-react";

import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState("/profile.jpg");

  useEffect(() => {
    const saved = localStorage.getItem("profile-pic");
    if (saved) setProfilePic(saved);
  }, []);

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfilePic(dataUrl);
      localStorage.setItem("profile-pic", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-background-primary)" }}>
      {/* Sidebar */}
      <aside className="w-72 hidden lg:block" style={{ backgroundColor: "var(--color-background-secondary)", borderRight: "1px solid var(--color-border-light)" }}>
        <div className="p-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Ateion
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>
            Student Portal
          </p>
        </div>

        <nav className="px-4 space-y-2">
  <button
    onClick={() => navigate("/profile")}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium"
    style={{ backgroundColor: "var(--color-success_light)", color: "var(--color-success_dark)" }}
  >
    <User size={18} />
    Profile
  </button>

  <button
    onClick={() => navigate("/certificate")}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:opacity-80"
    style={{ color: "var(--color-text-secondary)" }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-background-tertiary)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
  >
    <Award size={18} />
    Certificates
  </button>

  <button
    onClick={() => navigate("/dashboard")}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:opacity-80"
    style={{ color: "var(--color-text-secondary)" }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-background-tertiary)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
  >
    <Settings size={18} />
    Dashboard
  </button>

  <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:opacity-80"
    style={{ color: "var(--color-error)" }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-error_light)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
  >
    <LogOut size={18} />
    Logout
  </button>
</nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Profile
          </h1>

          <p className="mt-2" style={{ color: "var(--color-text-tertiary)" }}>
            Track your learning journey and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="rounded-3xl p-8" style={{ backgroundColor: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 shadow-lg"
                  style={{ borderColor: "var(--color-background-secondary)" }}
                />
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                  <Camera size={28} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePicChange}
                />
              </div>

              <h2 className="mt-5 text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                Test User 
              </h2>

              <span className="mt-3 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2" style={{ backgroundColor: "var(--color-warning_light)", color: "var(--color-warning_dark)" }}>
                <Crown size={14} />
                Premium Student
              </span>

              <span className="mt-4 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--color-success_light)", color: "var(--color-success_dark)" }}>
                Active Learner
              </span>
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--color-border-light)" }}>
              <div className="flex items-start gap-3">
                <Mail size={18} style={{ color: "var(--color-text-tertiary)", marginTop: "4px" }} />
                <div>
                  <p className="text-xs uppercase" style={{ color: "var(--color-text-tertiary)" }}>
                    Email
                  </p>
                  <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                    testuser@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Dashboard */}
          <div className="lg:col-span-2 rounded-3xl p-8" style={{ backgroundColor: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>
              Learning Dashboard
            </h2>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--color-background-primary)" }}>
                <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                  Full Name
                </p>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--color-text-primary)" }}>
                  Test User
                </p>
              </div>

              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--color-background-primary)" }}>
                <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                  Member Since
                </p>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--color-text-primary)" }}>
                  June 2026
                </p>
              </div>
            </div>

            {/* Stats */}
            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
              Learning Progress
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--color-success_light)" }}>
                <BookOpen className="mx-auto mb-3" style={{ color: "var(--color-success)" }} />
                <h4 className="text-3xl font-bold" style={{ color: "var(--color-success_dark)" }}>
                  8
                </h4>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  Courses Enrolled
                </p>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--color-info_light)" }}>
                <BookOpen className="mx-auto mb-3" style={{ color: "var(--color-info)" }} />
                <h4 className="text-3xl font-bold" style={{ color: "var(--color-info_dark)" }}>
                  5
                </h4>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  Completed
                </p>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--color-primary_light)" }}>
                <Award className="mx-auto mb-3" style={{ color: "var(--color-primary)" }} />
                <h4 className="text-3xl font-bold" style={{ color: "var(--color-primary_active)" }}>
                  3
                </h4>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  Certificates
                </p>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--color-warning_light)" }}>
                <ClipboardCheck className="mx-auto mb-3" style={{ color: "var(--color-warning)" }} />
                <h4 className="text-3xl font-bold" style={{ color: "var(--color-warning_dark)" }}>
                  12
                </h4>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  Assessments
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  Overall Learning Progress
                </span>
                <span className="font-semibold" style={{ color: "var(--color-success)" }}>
                  68%
                </span>
              </div>

              <div className="w-full rounded-full h-3" style={{ backgroundColor: "var(--color-border-light)" }}>
                <div
                  className="h-3 rounded-full"
                  style={{ width: "68%", backgroundColor: "var(--color-success)" }}
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
                Achievements
              </h3>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--color-success_light)", color: "var(--color-success_dark)" }}>
                  📚 Active Learner
                </span>

                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--color-info_light)", color: "var(--color-info_dark)" }}>
                  🎯 Assessment Explorer
                </span>

                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--color-primary_light)", color: "var(--color-primary_active)" }}>
                  🏆 First Certificate
                </span>

                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--color-warning_light)", color: "var(--color-warning_dark)" }}>
                  ⭐ Premium Member
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
  <button
    onClick={() => navigate("/dashboard")}
    className="px-6 py-3 rounded-xl text-white font-medium transition hover:opacity-90"
    style={{ backgroundColor: "var(--color-success)" }}
  >
    Continue Learning
  </button>

  <button
    onClick={() => navigate("/certificate")}
    className="px-6 py-3 rounded-xl font-medium transition hover:opacity-80"
    style={{ backgroundColor: "var(--color-background-primary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-medium)" }}
  >
    View Certificates
  </button>

  <button
    onClick={() => navigate("/assessment-demo")}
    className="px-6 py-3 rounded-xl font-medium transition hover:opacity-80"
    style={{ backgroundColor: "var(--color-background-primary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-medium)" }}
  >
    Take Assessment
  </button>

  <button
    onClick={() => navigate("/psychometric-assessment")}
    className="px-6 py-3 rounded-xl font-medium transition hover:opacity-80"
    style={{ backgroundColor: "var(--color-background-primary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-medium)" }}
  >
    Psychometric Test
  </button>

  <button
    onClick={() => navigate("/reset-password")}
    className="px-6 py-3 rounded-xl font-medium transition hover:opacity-80"
    style={{ backgroundColor: "var(--color-background-primary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-medium)" }}
  >
    Reset Password
  </button>
</div>
          </div>
        </div>
      </main>
    </div>
  );
}
