import { Link } from "react-router-dom";
import { contactEmail, socialLinks } from "../data/Sociallinks.js";
import { tagline } from "../data/Site.js";
import SocialLinks from "./Sociallinks.jsx";
import PixelMark from "./Pixelmark.jsx";
import NightClock from "./Nightclock.jsx";

const linkClass = "py-2 hover:text-[var(--color-text)] transition-colors";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-hair)] px-6 pt-16 pb-28">
            <div className="max-w-6xl mx-auto">
                <div className="grid gap-10 md:grid-cols-[1fr_auto] items-start">
                    <div>
                        <p className="font-display text-5xl sm:text-6xl tracking-[-0.05em] text-[var(--color-text)]">DRAZYX</p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                            <p className="terminal-label">end of page / still listening</p>
                            <NightClock />
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-4 max-w-md leading-relaxed">{tagline}</p>
                    </div>
                    <nav aria-label="Social" className="justify-self-start md:justify-self-end">
                        <SocialLinks variant="icons" only={["spotify", "soundcloud", "youtube", "instagram", "tiktok", "bandcamp"]} />
                    </nav>
                </div>

                <div className="mt-12 pt-7 border-t border-[var(--border-hair)] flex flex-col lg:flex-row lg:items-center justify-between gap-5 text-sm text-[var(--color-text-secondary)]">
                    <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link to="/music" className={linkClass}>Music</Link>
                        <Link to="/the-room" className={linkClass}>The Room</Link>
                        <Link to="/about" className={linkClass}>About</Link>
                        <Link to="/beats" className={linkClass}>Beats</Link>
                        <Link to="/contact" className={linkClass}>Contact</Link>
                        <Link to="/support" className={linkClass}>Support</Link>
                        <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className={linkClass}>Bandcamp ↗</a>
                        <a href={`mailto:${contactEmail}`} className={linkClass}>{contactEmail}</a>
                    </nav>
                    <p className="text-xs text-[var(--color-text-faint)] inline-flex items-center gap-2">
                        <PixelMark mark="star" size={10} />
                        © {new Date().getFullYear()} Drazyx
                    </p>
                </div>
            </div>
        </footer>
    );
}
