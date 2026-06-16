import React, { useState } from "react";
import { getApiBaseUrl } from "../lib/apiClient";
import "../styles/login.css";

export default function LoginPage({ closeLogin, initialTab }: any) {
  const [tab, setTab] = useState<"signin" | "signup">(initialTab || "signin");

  // Sign In state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign Up state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    ageSegment: "",
  });

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }
      const data = (await response.json()) as { token?: unknown };
      if (typeof data.token !== "string" || !data.token.trim()) {
        throw new Error("The login response did not contain a valid token.");
      }
      localStorage.setItem("token", data.token.trim());
      window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
      alert("Logged in successfully!");
      closeLogin?.();
    } catch (error) {
      console.error("Login error:", error);
      alert("Login could not be completed. Please try again.");
    }
  };

  const handleCreateAccount = async (e?: any) => {
    if (e) e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const loginResponse = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        if (loginResponse.ok) {
          const responseText = await loginResponse.text();
          let token = responseText;
          try {
            const jsonData = JSON.parse(responseText);
            token = jsonData.token || jsonData.jwt || responseText;
          } catch (err) {}
          localStorage.setItem("token", token);
        }
        alert("Account created! You are now logged in.");
        if (closeLogin) closeLogin();
      } else {
        alert("Error creating account. That email might already be in use.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const handleGoogleLogin = () => { window.location.href = `${backendUrl}/oauth2/authorization/google`; };
  const handleLinkedinLogin = () => { window.location.href = `${backendUrl}/oauth2/authorization/linkedin`; };
  const handleGithubLogin = () => { window.location.href = `${backendUrl}/oauth2/authorization/github`; };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="close-btn" onClick={closeLogin}>✕</button>

        <div className="left-side">
          <h1>{tab === "signin" ? "Welcome Back" : "Join Ateion"}</h1>
          <p>
            {tab === "signin"
              ? "Log in to continue measuring your true capabilities and exploring your dashboard."
              : "Reimagining education with innovation, workshops and modern learning."}
          </p>
        </div>

        <div className="right-side">
          {/* Tabs */}
          <div className="flex mb-6 rounded-xl p-1" style={{ background: "#f3f0eb" }}>
            <button
              onClick={() => setTab("signin")}
              className="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all"
              style={{
                background: tab === "signin" ? "#fff" : "transparent",
                color: tab === "signin" ? "#1a1a2e" : "#9ca3af",
                boxShadow: tab === "signin" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("signup")}
              className="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all"
              style={{
                background: tab === "signup" ? "#fff" : "transparent",
                color: tab === "signup" ? "#1a1a2e" : "#9ca3af",
                boxShadow: tab === "signup" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              Sign Up
            </button>
          </div>

          {tab === "signin" ? (
            <>
              <h2>Sign In</h2>
              <input type="email" id="email" name="email" placeholder="Email Address"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" id="password" name="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="login-btn" onClick={handleLogin}>Login</button>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <input type="text" id="fullName" name="fullName" placeholder="Full Name"
                value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              <input type="email" id="regEmail" name="regEmail" placeholder="Email Address"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="password" id="regPassword" name="regPassword" placeholder="Password"
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
              <select id="ageSegment" name="ageSegment"
                className="w-full p-[17px] my-[10px] rounded-[14px] border border-[#e5e7eb] bg-[#faf7f2] text-[15px] outline-none focus:border-[var(--color-primary)] text-[#374151]"
                value={formData.ageSegment || ""}
                onChange={(e) => setFormData({ ...formData, ageSegment: e.target.value })}
                required
              >
                <option value="" disabled>Select your Age Segment...</option>
                <option value="Segment 1 (Age 8-11)">Segment 1 (Ages 8-11)</option>
                <option value="Segment 2 (Age 12-14)">Segment 2 (Ages 12-14)</option>
                <option value="Segment 3 (Age 15-17)">Segment 3 (Ages 15-17)</option>
                <option value="Segment 4 (Age 18-21)">Segment 4 (Ages 18-21)</option>
                <option value="Segment 5 (Professional)">Segment 5 (Professional / 22+)</option>
              </select>
              <button className="login-btn" onClick={handleCreateAccount}>Create Account</button>
            </>
          )}

          <div className="divider">OR CONTINUE WITH</div>

          <button className="google-btn" onClick={handleGoogleLogin}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button className="linkedin-btn" onClick={handleLinkedinLogin}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Continue with LinkedIn
          </button>

          <button className="github-btn" onClick={handleGithubLogin}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
