import {
  User,
  Crown,
  BookOpen,
  Award,
  ClipboardCheck,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:block">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Ateion
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Student Portal
          </p>
        </div>

        <nav className="px-4 space-y-2">
  <button
    onClick={() => navigate("/profile")}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-medium"
  >
    <User size={18} />
    Profile
  </button>

  <button
    onClick={() => navigate("/certificate")}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700"
  >
    <Award size={18} />
    Certificates
  </button>

  <button
    onClick={() => navigate("/dashboard")}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700"
  >
    <Settings size={18} />
    Dashboard
  </button>

  <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600"
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
          <h1 className="text-4xl font-bold text-gray-900">
            Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Track your learning journey and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col items-center">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Test User 
              </h2>

              <span className="mt-3 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium flex items-center gap-2">
                <Crown size={14} />
                Premium Student
              </span>

              <span className="mt-4 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Active Learner
              </span>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-900 font-medium">
                    testuser@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Dashboard */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Learning Dashboard
            </h2>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500">
                  Full Name
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  Test User
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500">
                  Member Since
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  June 2026
                </p>
              </div>
            </div>

            {/* Stats */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Learning Progress
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <BookOpen className="mx-auto mb-3 text-green-600" />
                <h4 className="text-3xl font-bold text-green-700">
                  8
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Courses Enrolled
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5 text-center">
                <BookOpen className="mx-auto mb-3 text-blue-600" />
                <h4 className="text-3xl font-bold text-blue-700">
                  5
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Completed
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 text-center">
                <Award className="mx-auto mb-3 text-purple-600" />
                <h4 className="text-3xl font-bold text-purple-700">
                  3
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Certificates
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-5 text-center">
                <ClipboardCheck className="mx-auto mb-3 text-orange-600" />
                <h4 className="text-3xl font-bold text-orange-700">
                  12
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Assessments
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">
                  Overall Learning Progress
                </span>
                <span className="font-semibold text-green-600">
                  68%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: "68%" }}
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Achievements
              </h3>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  📚 Active Learner
                </span>

                <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  🎯 Assessment Explorer
                </span>

                <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  🏆 First Certificate
                </span>

                <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                  ⭐ Premium Member
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
  <button
    onClick={() => navigate("/dashboard")}
    className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
  >
    Continue Learning
  </button>

  <button
    onClick={() => navigate("/certificate")}
    className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium"
  >
    View Certificates
  </button>

  <button
    onClick={() => navigate("/assessment-demo")}
    className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium"
  >
    Take Assessment
  </button>

  <button
    onClick={() => navigate("/psychometric-assessment")}
    className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium"
  >
    Psychometric Test
  </button>

  <button
    onClick={() => navigate("/reset-password")}
    className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium"
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