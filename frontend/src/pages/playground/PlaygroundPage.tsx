import { useLocation } from "react-router";
import PlaygroundLandingPage from "./PlaygroundLandingPage";
import PlaygroundLayout from "./layouts/PlaygroundLayout";

export default function PlaygroundPage() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, "");
  const isLanding = normalizedPath === "/playground";

  if (isLanding) {
    return <PlaygroundLandingPage />;
  }

  return <PlaygroundLayout />;
}
