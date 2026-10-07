import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import PixelMark from "./Pixelmark.jsx";

const primaryLinks = [
    { to: "/music", label: "Music" },
    { to: "/the-room", label: "The Room" },
    { to: "/about", label: "About" },
];

const moreLinks = [
    { to: "/beats", label: "Beats" },
    { to: "/production", label: "Production" },
    { to: "/licensing", label: "Licensing" },
    { to: "/contact", label: "Contact" },
    { to: "/support", label: "Support" },
];

export default function Navbar() {
    const { pathname } = useLocation();
    const [menuAt, setMenuAt] = useState(null);
    const [moreAt, setMoreAt] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const moreRef = useRef(null);
    const open = menuAt === pathname;
    const moreOpen = moreAt === pathname;
    const moreActive = moreLinks.some((link) => pathname === link.to || pathname.startsWith(`${link.to}/`));

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onClick = (event) => {
            if (moreRef.current && !moreRef.current.contains(event.target)) setMoreAt(null);
        };
        const onKey = (event) => {
            if (event.key === "Escape") {
                setMoreAt(null);
                setMenuAt(null);
            }
        };
        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header className={`site-nav fixed top-0 inset-x-0 z-50 ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main">
                <Link to="/" className="inline-flex items-center gap-2 font-display text-[0.95rem] tracking-[0.2em] text-[var(--color-text)]" aria-label="Drazyx — home">
                    <span className="nav-active-dot" aria-hidden="true" />
                    DRAZYX
                </Link>

                <div className="hidden md:flex items-center gap-7 text-sm">
                    {primaryLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                                    {link.label}
                                </>
                            )}
                        </NavLink>
                    ))}

                    <div className="relative" ref={moreRef}>
                        <button
                            type="button"
                            className={`nav-link ${moreActive ? "active" : ""}`}
                            onClick={() => setMoreAt(moreOpen ? null : pathname)}
                            aria-expanded={moreOpen}
                            aria-controls="more-menu"
                        >
                            {moreActive && <span className="nav-active-dot" aria-hidden="true" />}
                            More
                            <ChevronDown size={14} aria-hidden="true" className={moreOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                        </button>
                        {moreOpen && (
                            <ul id="more-menu" className="nav-more-menu absolute top-full right-0 mt-2 rounded-[var(--radius-medium)]">
                                {moreLinks.map((link) => {
                                    const active = pathname === link.to || pathname.startsWith(`${link.to}/`);
                                    return (
                                        <li key={link.to}>
                                            <NavLink to={link.to} className={`nav-more-item ${active ? "active" : ""}`}>
                                                <span>{link.label}</span>
                                                {active && <PixelMark mark="star" size={10} aria-hidden="true" />}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-[var(--color-text)]"
                    onClick={() => setMenuAt(open ? null : pathname)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div id="mobile-menu" className="mobile-menu md:hidden fixed inset-x-0 top-16 bottom-0 px-6 pt-7 pb-10 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="pixel-dot is-live" aria-hidden="true" />
                        <span className="terminal-label">the room is online</span>
                    </div>
                    <ul className="flex flex-col">
                        {primaryLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) => `flex items-center gap-3 py-4 font-display text-3xl border-b border-[var(--border-hair)] ${isActive ? "text-[var(--color-accent-soft)]" : "text-[var(--color-text)]"}`}
                                >
                                    {({ isActive }) => <>{isActive && <span className="nav-active-dot" aria-hidden="true" />}{link.label}</>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <p className="eyebrow mt-9 mb-3">More</p>
                    <ul className="grid grid-cols-2 border-t border-[var(--border-hair)]">
                        {moreLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) => `flex items-center min-h-[52px] border-b border-[var(--border-hair)] text-base ${isActive ? "text-[var(--color-accent-soft)]" : "text-[var(--color-text-secondary)]"}`}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
