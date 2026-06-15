import { Navigate, useLocation } from "react-router";
import PlaygroundLandingPage from "./PlaygroundLandingPage";
import PlaygroundLayout from "./layouts/PlaygroundLayout";

export default function PlaygroundPage() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, "");
  const isLanding = normalizedPath === "/playground";
  const isPublicCourseCatalogue = normalizedPath === "/playground/discover";
  const hasToken = Boolean(localStorage.getItem("token"));

  if (isLanding) {
    return <PlaygroundLandingPage />;
  }

  if (!hasToken && !isPublicCourseCatalogue) {
    return <Navigate to="/playground/discover" replace />;
  }

  return <PlaygroundLayout />;
}
