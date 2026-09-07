import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AudioPlayerProvider } from "./components/Audioplayer";
import { Analytics } from "@vercel/analytics/next"

import Home from "./pages/Home";
import Music from "./pages/Music";
import Release from "./pages/Release";
import Beats from "./pages/Beats";
import Production from "./pages/Production";
import Licensing from "./pages/Licensing";
import TheRoom from "./pages/TheRoom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

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
            <Route path="/the-room" element={<TheRoom />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </AudioPlayerProvider>
  );
}