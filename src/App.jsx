import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MiniPlayer from "./components/Miniplayer.jsx";
import { AudioPlayerProvider } from "./components/Audioplayer.jsx";
import Home from "./pages/Home.jsx";

// Code splitting: everything except the landing page loads on demand.
const Music = lazy(() => import("./pages/Music.jsx"));
const Release = lazy(() => import("./pages/Release.jsx"));
const Beats = lazy(() => import("./pages/Beats.jsx"));
const Production = lazy(() => import("./pages/Production.jsx"));
const Licensing = lazy(() => import("./pages/Licensing.jsx"));
const Theroom = lazy(() => import("./pages/Theroom.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Support = lazy(() => import("./pages/Support.jsx"));
const Notfound = lazy(() => import("./pages/Notfound.jsx"));

// Scroll to top on navigation, but leave in-page #anchors alone.
function ScrollManager() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (!hash) window.scrollTo({ top: 0, behavior: "auto" });
    }, [pathname, hash]);
    return null;
}

export default function App() {
    const { pathname } = useLocation();
    return (
        <AudioPlayerProvider>
            <a href="#main" className="skip-link">Skip to content</a>
            <ScrollManager />
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main id="main" key={pathname} className="page-enter flex-1">
                    <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
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
                    </Suspense>
                </main>
                <Footer />
            </div>
            <MiniPlayer />
            <Analytics />
        </AudioPlayerProvider>
    );
}
