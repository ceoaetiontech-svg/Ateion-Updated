import React from "react";
import { useLocation } from "react-router";
import PlaygroundLandingPage from "./PlaygroundLandingPage";
import PlaygroundLayout from "./layouts/PlaygroundLayout";

export default function PlaygroundPage() {
  const location = useLocation();
  const isLanding = location.pathname === "/playground" || location.pathname === "/playground/";

  if (isLanding) {
    return <PlaygroundLandingPage />;
  }

  return <PlaygroundLayout />;
}
