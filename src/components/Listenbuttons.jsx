import { ExternalLink } from "lucide-react";

// Only renders platforms that actually have a URL. Spotify is the primary.
export default function ListenButtons({ release, size = "md" }) {
    const items = [
        { label: "Spotify", href: release.spotifyUrl, primary: true },
        { label: "SoundCloud", href: release.soundcloudUrl },
        { label: "YouTube", href: release.youtubeUrl },
        { label: "Bandcamp", href: release.bandcampUrl },
        { label: "Apple Music", href: release.appleMusicUrl },
    ].filter((i) => i.href);

    if (items.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-3 ${size === "sm" ? "text-xs" : ""}`}>
            {items.map((i) => (
                <a
                    key={i.label}
                    href={i.href}
                    target="_blank"
                    rel="noreferrer"
                    className={i.primary ? "btn-primary" : "btn-secondary"}
                    aria-label={`${i.primary ? "Listen on" : "Open on"} ${i.label} (opens in a new tab)`}
                >
                    {i.primary ? "Listen" : i.label}
                    {i.primary ? <span className="opacity-70 normal-case tracking-normal">on {i.label}</span> : <ExternalLink size={13} />}
                </a>
            ))}
        </div>
    );
}
