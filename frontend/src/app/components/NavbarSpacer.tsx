import { useState, useEffect } from "react";

export default function NavbarSpacer() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setHeight(navbar.offsetHeight);
      }
    };

    updateHeight();

    const navbar = document.querySelector("nav");
    if (!navbar) return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(navbar);

    window.addEventListener("scroll", updateHeight, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return <div style={{ height, flexShrink: 0 }} />;
}
