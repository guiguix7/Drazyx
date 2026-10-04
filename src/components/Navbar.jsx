import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

// Primary nav: an artist's site, not an agency's. Commercial pages live
// under "More" so they never compete with the music.
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
    // Menus remember the path they were opened on, so they close by themselves
    // on any navigation (including browser back) without an effect.
    const [menuAt, setMenuAt] = useState(null);
    const [moreAt, setMoreAt] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const moreRef = useRef(null);
    const open = menuAt === pathname;
    const moreOpen = moreAt === pathname;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) setMoreAt(null);
        };
        const onKey = (e) => {
            if (e.key === "Escape") {
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
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
                scrolled || open ? "bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--border-hair)]" : "bg-transparent"
            }`}
        >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main">
                <Link to="/" className="font-display text-lg tracking-[0.18em] text-[var(--color-text)]" aria-label="Drazyx — home">
                    DRAZYX
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm">
                    {primaryLinks.map((l) => (
                        <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                            {l.label}
                        </NavLink>
                    ))}

                    <div className="relative" ref={moreRef}>
                        <button
                            type="button"
                            className="nav-link inline-flex items-center gap-1"
                            onClick={() => setMoreAt(moreOpen ? null : pathname)}
                            aria-expanded={moreOpen}
                            aria-controls="more-menu"
                        >
                            More <ChevronDown size={14} aria-hidden="true" />
                        </button>
                        {moreOpen && (
                            <ul id="more-menu" className="absolute top-full right-0 mt-3 w-48 surface rounded-lg py-2 text-sm">
                                {moreLinks.map((l) => (
                                    <li key={l.to}>
                                        <NavLink
                                            to={l.to}
                                            className="block px-4 py-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                                        >
                                            {l.label}
                                        </NavLink>
                                    </li>
                                ))}
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
                <div
                    id="mobile-menu"
                    className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[var(--color-bg)] px-6 pt-8 pb-10 flex flex-col overflow-y-auto"
                >
                    <ul className="flex flex-col">
                        {primaryLinks.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    className={({ isActive }) =>
                                        `block py-4 font-display text-3xl border-b border-[var(--border-hair)] ${
                                            isActive ? "text-[var(--color-accent-soft)]" : "text-[var(--color-text)]"
                                        }`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <p className="eyebrow mt-10 mb-2">More</p>
                    <ul className="grid grid-cols-2">
                        {moreLinks.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    className={({ isActive }) =>
                                        `block py-3 text-base ${isActive ? "text-[var(--color-accent-soft)]" : "text-[var(--color-text-secondary)]"}`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
