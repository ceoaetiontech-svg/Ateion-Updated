import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import Homepage from "../imports/Homepage";
import GCOPage from "../imports/GCOPage";
import ContactPage from "../imports/ContactPage";
import ResourcesPage from "../imports/ResourcesPage";


import RegisterPage from "../imports/RegisterPage";
import LoginPage from "../imports/LoginPage";

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
      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Homepage />} />

          {/* Other Pages */}
          <Route path="/gco" element={<GCOPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/PlayGround" element={<ResourcesPage />} />
        </Routes>

        {/* REGISTER POPUP */}
        {showRegister && (
            <RegisterPage closeRegister={() => setShowRegister(false)} />
        )}

        {/* LOGIN POPUP */}
        {showLogin && (
            <LoginPage closeLogin={() => setShowLogin(false)} />
        )}
      </BrowserRouter>
  );
}



