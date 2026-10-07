import { Link } from "react-router-dom";
import { socialLinks, contactEmail } from "../data/Sociallinks.js";
import { tagline } from "../data/Site.js";
import SocialLinks from "./Sociallinks.jsx";
import PixelMark from "./Pixelmark.jsx";

const linkClass = "py-2 hover:text-[var(--color-text)] transition-colors";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-hair)] px-6 pt-14 pb-28">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
                    <div className="max-w-xs">
                        <p className="font-display text-sm tracking-[0.18em] text-[var(--color-text)] inline-flex items-center gap-2">
                            <PixelMark mark="star" size={12} className="text-[var(--color-text-faint)]" />
                            DRAZYX
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">{tagline}</p>
                    </div>
                    <nav aria-label="Social">
                        <SocialLinks variant="icons" />
                    </nav>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)]">
                    <nav aria-label="Footer" className="flex flex-wrap gap-x-6">
                        <Link to="/music" className={linkClass}>Music</Link>
                        <Link to="/the-room" className={linkClass}>The Room</Link>
                        <Link to="/about" className={linkClass}>About</Link>
                        <Link to="/beats" className={linkClass}>Beats</Link>
                        <Link to="/contact" className={linkClass}>Contact</Link>
                        <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className={linkClass}>Bandcamp</a>
                        <a href={`mailto:${contactEmail}`} className={linkClass}>{contactEmail}</a>
                    </nav>
                    <p className="text-xs text-[var(--color-text-faint)]">© {new Date().getFullYear()} Drazyx</p>
                </div>
            </div>
        </footer>
    );
}