import { Link } from "react-router-dom";
import { ChevronDown, Music2, Radio, Video, Camera, Disc3, Disc } from "lucide-react";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { latestRelease, releases } from "../data/Releases.js";
import { socialLinks } from "../data/Sociallinks.js";

const followPlatforms = [
    { icon: Music2, label: "Spotify", sub: "listen", href: socialLinks.spotify },
    { icon: Radio, label: "SoundCloud", sub: "experiments", href: socialLinks.soundcloud },
    { icon: Video, label: "YouTube", sub: "videos", href: socialLinks.youtube },
    { icon: Camera, label: "Instagram", sub: "personality", href: socialLinks.instagram },
    { icon: Disc3, label: "TikTok", sub: "discovery", href: socialLinks.tiktok },
];

export default function Home() {
    return (
        <>
            <SEO
                path="/"
                title="Producer / Artist"
                description="Drazyx — an independent artist and producer making atmospheric, melancholic music between trap, electronic and lo-fi."
            />

            {/* HERO — atmospheric, personal. Artist name is the strongest element. */}
            <section className="relative h-screen min-h-[640px] flex flex-col items-center justify-center px-6 overflow-hidden grain">
                <div
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[150px] glow-orb"
                    style={{ background: "radial-gradient(circle, rgba(184,77,255,0.3), transparent 70%)" }}
                />

                <div className="relative text-center max-w-2xl">
                    <h1 className="font-display font-bold text-[clamp(3.5rem,13vw,8rem)] leading-[0.9] tracking-tight text-[var(--color-text)]">
                        DRAZYX
                    </h1>
                    <p className="mt-5 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
                        music from somewhere between the internet, midnight and memory.
                    </p>

                    <div className="mt-10">
                        <Link to="/music" className="btn-primary px-7 py-3 rounded-full text-sm font-medium inline-block">
                            Listen
                        </Link>
                    </div>
                </div>

                <a
                    href="#latest-music"
                    className="absolute bottom-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                    aria-label="Scroll down"
                >
                    <ChevronDown size={22} />
                </a>
            </section>

            {/* LATEST MUSIC */}
            <section id="latest-music" className="py-24 px-6">
                <Reveal as="div" className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-wide text-[var(--color-accent-soft)] mb-3">Latest</p>
                    <div className="surface rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-[220px_1fr]">
                        <div className="aspect-square bg-[var(--color-surface-2)] flex items-center justify-center">
                            {latestRelease.coverUrl ? (
                                <img
                                    src={latestRelease.coverUrl}
                                    alt={`Cover art for ${latestRelease.title}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xs text-[var(--text-low)]">[ADD COVER]</span>
                            )}
                        </div>
                        <div className="p-6 sm:p-8 flex flex-col justify-center">
                            <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-text)]">
                                {latestRelease.title}
                            </h2>
                            <p className="text-sm text-[var(--text-low)] mt-1">
                                {latestRelease.type} · {latestRelease.year}
                            </p>
                            <p className="mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                {latestRelease.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={latestRelease.spotifyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary px-5 py-2.5 rounded-full text-sm"
                                >
                                    Listen
                                </a>
                                <Link to={`/music/${latestRelease.id}`} className="btn-secondary px-5 py-2.5 rounded-full text-sm">
                                    Open release
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* SELECTED MUSIC */}
            {releases.length > 1 && (
                <section className="py-16 px-6">
                    <Reveal as="div" className="max-w-4xl mx-auto">
                        <p className="text-xs tracking-wide text-[var(--color-accent-soft)] mb-6">Selected Music</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {releases.map((r) => (
                                <Link key={r.id} to={`/music/${r.id}`} className="card-hover surface rounded-lg overflow-hidden block">
                                    <div className="aspect-square bg-[var(--color-surface-2)] flex items-center justify-center">
                                        {r.coverUrl ? (
                                            <img src={r.coverUrl} alt={`Cover art for ${r.title}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] text-[var(--text-low)] px-2 text-center">[ADD COVER]</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[var(--color-text)] px-2 py-2 truncate">{r.title}</p>
                                </Link>
                            ))}
                        </div>
                        <Link to="/music" className="inline-block mt-6 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
                            See the full catalog →
                        </Link>
                    </Reveal>
                </section>
            )}

            {/* WHO IS DRAZYX — short, human, not corporate */}
            <section className="py-24 px-6">
                <Reveal as="div" className="max-w-xl mx-auto text-center">
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-text)]">Who is Drazyx?</h2>
                    <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                        Drazyx is an independent artist and producer making atmospheric, melancholic
                        music somewhere between trap, electronic and lo-fi — built from late nights,
                        internet culture and the worlds he's imagined himself into.
                    </p>
                    <Link to="/about" className="inline-block mt-6 btn-secondary px-5 py-2.5 rounded-full text-sm">
                        More about Drazyx
                    </Link>
                </Reveal>
            </section>

            {/* THE ROOM — emotional center */}
            <section className="py-24 px-6">
                <Reveal as="div" className="max-w-xl mx-auto text-center">
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-text)]">The Room</h2>
                    <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                        There's more here. Unreleased music, demos, experiments, notes — the side
                        of the process that doesn't belong anywhere else.
                    </p>
                    <Link to="/the-room" className="inline-block mt-6 btn-primary px-5 py-2.5 rounded-full text-sm font-medium">
                        Enter the Room
                    </Link>
                </Reveal>
            </section>

            {/* FOLLOW THE WORLD */}
            <section className="py-20 px-6">
                <Reveal as="div" className="max-w-2xl mx-auto">
                    <p className="text-xs tracking-wide text-[var(--color-accent-soft)] mb-6 text-center">Follow the World</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {followPlatforms.map((p) => (
                            <a
                                key={p.label}
                                href={p.href}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-secondary px-4 py-2 rounded-full text-sm inline-flex items-center gap-2"
                            >
                                <p.icon size={15} /> {p.label}
                            </a>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* BANDCAMP / SUPPORT — a softer CTA */}
            <section className="py-20 px-6">
                <Reveal as="div" className="max-w-md mx-auto text-center">
                    <p className="text-[var(--color-text-secondary)]">
                        If something here stayed with you, the music lives on Bandcamp too.
                    </p>
                    <a
                        href={socialLinks.bandcamp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-5 btn-secondary px-5 py-2.5 rounded-full text-sm"
                    >
                        <Disc size={15} /> Drazyx on Bandcamp
                    </a>
                </Reveal>
            </section>
        </>
    );
}