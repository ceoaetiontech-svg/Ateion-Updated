import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Homepage from "../imports/Homepage";
import GCOPage from "../imports/GCOPage";
import ContactPage from "../imports/ContactPage";
import ResourcesPage from "../imports/ResourcesPage";
import CertificatePage from "../imports/CertificatePage";
import AssessmentDemoPage from "../imports/AssessmentDemoPage";
import DashboardPage from "../imports/DashboardPage";
import PsychometricAssessmentPage from "../imports/PsychometricAssessmentPage";

import RegisterPage from "../imports/RegisterPage";
import LoginPage from "../imports/LoginPage";
import PoliciesPage from "../imports/PoliciesPage";
import PolicyDetailPage from "../imports/PolicyDetailPage";
import AdminDashboardPage from "../imports/admin/pages/AdminDashboardPage";
import AdminLayout from "../imports/admin/layouts/AdminLayout";
import CourseListView from "../imports/admin/components/CourseListView";
import CourseUploadView from "../imports/admin/components/CourseUploadView";
import UsersPage from "../imports/admin/pages/UsersPage";
import SettingsPage from "../imports/admin/pages/SettingsPage";
import ThemeProvider from "./components/ThemeProvider";
import PageTransition from "./components/PageTransition";

import AdminLoginPage from "../imports/admin/pages/AdminLoginPage";
import TeacherLoginPage from "../imports/teacher/pages/TeacherLoginPage";
import TeacherLayout from "../imports/teacher/layouts/TeacherLayout";
import TeacherDashboardPage from "../imports/teacher/pages/TeacherDashboardPage";
import TeacherStudentsPage from "../imports/teacher/pages/TeacherStudentsPage";
import TeacherSettingsPage from "../imports/teacher/pages/TeacherSettingsPage";
import ProfilePage from "../imports/ProfilePage";
import ResetPasswordPage from "../imports/ResetPasswordPage";

function AnimatedRoutes() {
  const location = useLocation();

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
          path="/PlayGround"
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
                  onUploadSuccess={() =>
                    (window.location.href = "/admin/courses")
                  }
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
                  onUploadSuccess={() =>
                    (window.location.href = "/teacher/courses")
                  }
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
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleOpenLogin = () => setShowLogin(true);
    const handleOpenRegister = () => setShowRegister(true);

    window.addEventListener("open-login", handleOpenLogin);
    window.addEventListener("open-register", handleOpenRegister);

    return () => {
      window.removeEventListener("open-login", handleOpenLogin);
      window.removeEventListener("open-register", handleOpenRegister);
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatedRoutes />

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
      </BrowserRouter>
    </ThemeProvider>
  );
}

