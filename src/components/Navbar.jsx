import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
    { to: "/music", label: "Music" },
    { to: "/beats", label: "Beats" },
    { to: "/production", label: "Production" },
    { to: "/the-room", label: "The Room" },
    { to: "/about", label: "About" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass" : "bg-transparent border-b border-transparent"
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="font-display text-lg tracking-tight text-[var(--text-hi)]">
                    DRAZYX
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </div>

                <Link
                    to="/support"
                    className="hidden md:inline-flex btn-primary text-sm px-4 py-2 rounded-full"
                >
                    Support
                </Link>

                <button
                    className="md:hidden text-[var(--text-hi)]"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={open}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div className="md:hidden glass border-t border-[var(--border-hair)] px-6 py-4 flex flex-col gap-4 text-sm">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <Link to="/support" className="nav-link" onClick={() => setOpen(false)}>
                        Support
                    </Link>
                </div>
            )}
        </header>
    );
}