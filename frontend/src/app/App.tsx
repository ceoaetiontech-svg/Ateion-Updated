import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "../imports/Homepage";
import GCOPage from "../imports/GCOPage";
import ContactPage from "../imports/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gco" element={<GCOPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
