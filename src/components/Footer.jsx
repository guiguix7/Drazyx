import { Link } from "react-router-dom";
import { Music2, Video, Camera, Disc3, Radio } from "lucide-react";
import { socialLinks, contactEmail } from "../data/Sociallinks.js";

const socials = [
    { icon: Music2, label: "Spotify", href: socialLinks.spotify },
    { icon: Video, label: "YouTube", href: socialLinks.youtube },
    { icon: Camera, label: "Instagram", href: socialLinks.instagram },
    { icon: Disc3, label: "TikTok", href: socialLinks.tiktok },
    { icon: Radio, label: "SoundCloud", href: socialLinks.soundcloud },
];

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-hair)] px-6 py-12">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="font-display text-sm text-[var(--text-mid)]">
                        DRAZYX <span className="text-[var(--text-low)]">— Artist / Producer</span>
                    </p>
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

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-low)]">
                    <div className="flex items-center gap-5">
                        <Link to="/support" className="hover:text-[var(--text-hi)] transition-colors">
                            Support the music
                        </Link>
                        <Link to="/contact" className="hover:text-[var(--text-hi)] transition-colors">
                            Contact
                        </Link>
                        <a href={`mailto:${contactEmail}`} className="hover:text-[var(--text-hi)] transition-colors">
                            {contactEmail}
                        </a>
                    </div>
                    <p>© 2026 Drazyx. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}