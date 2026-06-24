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


        </div>
      </div>
    </div>
  );
}
