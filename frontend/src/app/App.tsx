import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router";
import { useState, useEffect, Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { AnimatePresence } from "framer-motion";
import AIChatBot from "./components/AIChatbot";

const Homepage = lazy(() => import("../pages/Homepage"));
const GCOPage = lazy(() => import("../pages/GCOPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const ResourcesPage = lazy(() => import("../pages/playground/PlaygroundPage"));
const CertificatePage = lazy(() => import("../pages/CertificatePage"));
const AssessmentDemoPage = lazy(() => import("../pages/AssessmentDemoPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const PsychometricAssessmentPage = lazy(() => import("../pages/PsychometricAssessmentPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const PoliciesPage = lazy(() => import("../pages/PoliciesPage"));
const PolicyDetailPage = lazy(() => import("../pages/PolicyDetailPage"));
const AdminDashboardPage = lazy(() => import("../pages/admin/pages/AdminDashboardPage"));
const AdminLayout = lazy(() => import("../pages/admin/layouts/AdminLayout"));
const CourseListView = lazy(() => import("../pages/admin/components/CourseListView"));
const CourseUploadView = lazy(() => import("../pages/admin/components/CourseUploadView"));
const UsersPage = lazy(() => import("../pages/admin/pages/UsersPage"));
const SettingsPage = lazy(() => import("../pages/admin/pages/SettingsPage"));
import ThemeProvider from "./components/ThemeProvider";
import PageTransition from "./components/PageTransition";

const AdminLoginPage = lazy(() => import("../pages/admin/pages/AdminLoginPage"));
const TeacherLoginPage = lazy(() => import("../pages/teacher/pages/TeacherLoginPage"));
const TeacherLayout = lazy(() => import("../pages/teacher/layouts/TeacherLayout"));
const TeacherDashboardPage = lazy(() => import("../pages/teacher/pages/TeacherDashboardPage"));
const TeacherStudentsPage = lazy(() => import("../pages/teacher/pages/TeacherStudentsPage"));
const TeacherSettingsPage = lazy(() => import("../pages/teacher/pages/TeacherSettingsPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Homepage />
            </PageTransition>
          }
        />

        <Route
          path="/gco"
          element={
            <PageTransition>
              <GCOPage />
            </PageTransition>
          }
        />

        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />

        <Route
          path="/playground/*"
          element={
            <PageTransition>
              <ResourcesPage />
            </PageTransition>
          }
        />

        <Route
          path="/certificate"
          element={
            <PageTransition>
              <CertificatePage />
            </PageTransition>
          }
        />

        <Route
          path="/assessment-demo"
          element={
            <PageTransition>
              <AssessmentDemoPage />
            </PageTransition>
          }
        />

        {/* NEW PSYCHOMETRIC PAGE */}
        <Route
          path="/psychometric-assessment"
          element={
            <PageTransition>
              <PsychometricAssessmentPage />
            </PageTransition>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          }
        />

        <Route
          path="/policies"
          element={
            <PageTransition>
              <PoliciesPage />
            </PageTransition>
          }
        />

        <Route
          path="/policy/:id"
          element={
            <PageTransition>
              <PolicyDetailPage />
            </PageTransition>
          }
        />

        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminLoginPage />
            </PageTransition>
          }
        />

        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <PageTransition>
                <AdminDashboardPage />
              </PageTransition>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <PageTransition>
                <CourseListView />
              </PageTransition>
            }
          />
          <Route
            path="/admin/upload"
            element={
              <PageTransition>
                <CourseUploadView
                  onUploadSuccess={() => navigate("/admin/courses")}
                />
              </PageTransition>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PageTransition>
                <UsersPage />
              </PageTransition>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PageTransition>
                <SettingsPage />
              </PageTransition>
            }
          />
        </Route>

        {/* TEACHER PORTAL */}
        <Route
          path="/teacher"
          element={
            <PageTransition>
              <TeacherLoginPage />
            </PageTransition>
          }
        />

        <Route element={<TeacherLayout />}>
          <Route
            path="/teacher/dashboard"
            element={
              <PageTransition>
                <TeacherDashboardPage />
              </PageTransition>
            }
          />
          {/* Reusing Admin components for Teacher features as requested */}
          <Route
            path="/teacher/courses"
            element={
              <PageTransition>
                <CourseListView />
              </PageTransition>
            }
          />
          <Route
            path="/teacher/upload"
            element={
              <PageTransition>
                <CourseUploadView
                  onUploadSuccess={() => navigate("/teacher/courses")}
                />
              </PageTransition>
            }
          />
          {/* Restricted Teacher Pages */}
          <Route
            path="/teacher/students"
            element={
              <PageTransition>
                <TeacherStudentsPage />
              </PageTransition>
            }
          />
          <Route
            path="/teacher/settings"
            element={
              <PageTransition>
                <TeacherSettingsPage />
              </PageTransition>
            }
          />
        </Route>

        <Route
  path="/profile"
  element={
    <PageTransition>
      <ProfilePage />
    </PageTransition>
  }
/>

<Route
  path="/reset-password"
  element={
    <PageTransition>
      <ResetPasswordPage />
    </PageTransition>
  }
/>

<Route
  path="*"
  element={
    <PageTransition>
      <NotFoundPage />
    </PageTransition>
  }
/>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    window.addEventListener("open-login", () => setShowLogin(true), { signal: ac.signal });
    window.addEventListener("open-register", () => setShowRegister(true), { signal: ac.signal });
    return () => ac.abort();
  }, []);

  function ChatBotWrapper() {
    const location = useLocation();
    const hiddenPaths = ["/admin", "/teacher", "/reset-password"];
    const shouldHide = hiddenPaths.some((p) => location.pathname.startsWith(p));
    if (shouldHide) return null;
    return <AIChatBot greeting="Hello! 👋" />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedRoutes />
          <ChatBotWrapper />
          {showRegister && (
            <RegisterPage
              closeRegister={() => {
                setShowRegister(false);
                window.dispatchEvent(new CustomEvent("close-register"));
              }}
            />
          )}
          {showLogin && (
            <LoginPage
              closeLogin={() => {
                setShowLogin(false);
                window.dispatchEvent(new CustomEvent("close-login"));
              }}
            />
          )}
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

