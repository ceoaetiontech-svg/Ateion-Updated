import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "../imports/Homepage";
import GCOPage from "../imports/GCOPage";
import BeyondScore from "../imports/gco/BeyondScore";

function ScaledHomepage() {
  const [scale, setScale] = useState(1);
  const baseWidth = 1280;
  const baseHeight = 5552;

  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth;
      setScale(width / baseWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#f7f3eb] w-full min-h-screen overflow-x-hidden">
      <div 
        style={{
          width: '100%',
          height: `${baseHeight * scale}px`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            width: `${baseWidth}px`,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <Homepage />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScaledHomepage />} />
        <Route path="/gco" element={<GCOPage />} />
        <Route path="/beyond-score" element={<BeyondScore />} />
      </Routes>
    </BrowserRouter>
  );
}