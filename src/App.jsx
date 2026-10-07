import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MiniPlayer from "./components/Miniplayer.jsx";
import { AudioPlayerProvider } from "./components/Audioplayer.jsx";
import Home from "./pages/Home.jsx";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { Login } from "./pages/admin/Login";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import BeatsList from "./admin/beats/BeatsList";
import BeatEditor from "./admin/beats/BeatEditor";

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

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route element={<AdminLayout />}>
                                    <Route path="/admin" element={<Dashboard />} />
                                    <Route path="/admin/beats" element={<BeatsList />} />
                                    <Route path="/admin/beats/new" element={<BeatEditor />} />
                                    <Route path="/admin/beats/:id" element={<BeatEditor />} />
                                    {/* Releases, Room, services and the rest follow the same pattern */}
                                </Route>
                            </Route>
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
