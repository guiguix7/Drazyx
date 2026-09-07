import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AudioPlayerProvider } from "./components/Audioplayer.jsx";
import { Analytics } from "@vercel/analytics/react";

import Home from "./pages/Home.jsx";
import Music from "./pages/Music.jsx";
import Release from "./pages/Release.jsx";
import Beats from "./pages/Beats.jsx";
import Production from "./pages/Production.jsx";
import Licensing from "./pages/Licensing.jsx";
import Theroom from "./pages/Theroom.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Support from "./pages/Support.jsx";
import Notfound from "./pages/Notfound.jsx";

export default function App() {
  return (
    <AudioPlayerProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/music/:releaseId" element={<Release />} />
            <Route path="/beats" element={<Beats />} />
            <Route path="/production" element={<Production />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/the-room" element={<Theroom />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </AudioPlayerProvider>
  );
}