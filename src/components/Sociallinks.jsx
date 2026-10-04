import { Music2, Video, Camera, Disc3, Radio, Disc } from "lucide-react";
import { platforms } from "../data/Sociallinks.js";

const icons = {
    spotify: Music2,
    soundcloud: Radio,
    youtube: Video,
    instagram: Camera,
    tiktok: Disc3,
    bandcamp: Disc,
};

/**
 * variant="rows"  → label + what it's for (Home, "follow the world")
 * variant="icons" → compact icon row (footer)
 */
export default function SocialLinks({ variant = "rows", only }) {
    const list = only ? platforms.filter((p) => only.includes(p.id)) : platforms;

    if (variant === "icons") {
        return (
            <ul className="flex items-center gap-1">
                {list.map((p) => {
                    const Icon = icons[p.id];
                    return (
                        <li key={p.id}>
                            <a
                                href={p.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${p.label} (opens in a new tab)`}
                                className="w-11 h-11 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-soft)] transition-colors"
                            >
                                <Icon size={18} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <ul className="border-t border-[var(--border-hair)]">
            {list.map((p) => {
                const Icon = icons[p.id];
                return (
                    <li key={p.id}>
                        <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="social-row"
                            aria-label={`${p.label} — ${p.role} (opens in a new tab)`}
                        >
                            <span className="social-name flex items-center gap-3 text-[var(--color-text)] transition-colors">
                                <Icon size={16} className="text-[var(--color-text-faint)]" />
                                {p.label}
                            </span>
                            <span className="text-sm text-[var(--color-text-secondary)]">{p.role} ↗</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
