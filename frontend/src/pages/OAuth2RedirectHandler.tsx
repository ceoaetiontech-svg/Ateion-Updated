import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // 1. Save the token
      localStorage.setItem("token", token);
      
      // 2. Tell the app we logged in
      window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
      
      // 3. Send them to the dashboard!
      window.location.href = "/playground/dashboard";
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-background-primary)]">
      <p className="text-xl font-bold">Securely logging you in...</p>
    </div>
  );
}