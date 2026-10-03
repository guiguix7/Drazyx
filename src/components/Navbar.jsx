import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

// Primary nav: an artist site, not an agency site. Music, The Room and
// About carry equal weight with the artist name. Commercial pages live
// under "More" so they don't compete visually with the music/identity.
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
    const [open, setOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const moreRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? "surface border-b border-[var(--border-hair)]" : "bg-transparent"
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="font-display text-lg tracking-tight text-[var(--color-text)]">
                    DRAZYX
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm">
                    {primaryLinks.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        >
                            {l.label}
                        </NavLink>
                    ))}

                    <div className="relative" ref={moreRef}>
                        <button
                            className="nav-link inline-flex items-center gap-1"
                            onClick={() => setMoreOpen((v) => !v)}
                            aria-expanded={moreOpen}
                            aria-haspopup="true"
                        >
                            More <ChevronDown size={14} />
                        </button>
                        {moreOpen && (
                            <div className="absolute top-full right-0 mt-3 w-44 surface rounded-lg py-2 text-sm">
                                {moreLinks.map((l) => (
                                    <NavLink
                                        key={l.to}
                                        to={l.to}
                                        className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                                        onClick={() => setMoreOpen(false)}
                                    >
                                        {l.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    className="md:hidden text-[var(--color-text)]"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div className="md:hidden surface border-t border-[var(--border-hair)] px-6 py-4 flex flex-col gap-4 text-sm">
                    {[...primaryLinks, ...moreLinks].map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
}