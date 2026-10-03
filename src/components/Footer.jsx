import { Link } from "react-router-dom";
import { Music2, Video, Camera, Disc3, Radio, Disc } from "lucide-react";
import { socialLinks, contactEmail } from "../data/Sociallinks.js";

const socials = [
    { icon: Music2, label: "Spotify", href: socialLinks.spotify },
    { icon: Radio, label: "SoundCloud", href: socialLinks.soundcloud },
    { icon: Video, label: "YouTube", href: socialLinks.youtube },
    { icon: Camera, label: "Instagram", href: socialLinks.instagram },
    { icon: Disc3, label: "TikTok", href: socialLinks.tiktok },
    { icon: Disc, label: "Bandcamp", href: socialLinks.bandcamp },
];

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-hair)] px-6 py-12">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="font-display text-sm text-[var(--color-text)]">DRAZYX</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                            music from somewhere between the internet, midnight and memory.
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={s.label}
                                className="social-icon"
                            >
                                <s.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                        <Link to="/music" className="hover:text-[var(--color-text)] transition-colors">Music</Link>
                        <Link to="/the-room" className="hover:text-[var(--color-text)] transition-colors">The Room</Link>
                        <Link to="/about" className="hover:text-[var(--color-text)] transition-colors">About</Link>
                        <Link to="/beats" className="hover:text-[var(--color-text)] transition-colors">Beats</Link>
                        <Link to="/contact" className="hover:text-[var(--color-text)] transition-colors">Contact</Link>
                        <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors">
                            Bandcamp
                        </a>
                        <a href={`mailto:${contactEmail}`} className="hover:text-[var(--color-text)] transition-colors">
                            {contactEmail}
                        </a>
                    </div>
                    <p>© 2026 Drazyx. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}