import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import Artwork from "../components/Artwork.jsx";
import SectionHeader from "../components/Sectionheader.jsx";
import ListenButtons from "../components/Listenbuttons.jsx";
import SocialLinks from "../components/Sociallinks.jsx";
import RoomPreview from "../components/Roompreview.jsx";
import NightClock from "../components/Nightclock.jsx";
import { latestRelease, releases } from "../data/Releases.js";
import { socialLinks } from "../data/Sociallinks.js";
import { tagline } from "../data/Site.js";
import { clean, hasTitle, releaseMeta, releaseTitle } from "../lib/helpers.js";

const others = releases.filter((r) => r.id !== latestRelease.id);

export default function Home() {
    return (
        <>
            <SEO
                path="/"
                description="Drazyx is an independent artist and producer making atmospheric, melancholic music between trap, electronic and lo-fi. Listen, explore the catalog and step into The Room."
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "Drazyx",
                    description: "The home of Drazyx, independent artist and producer.",
                }}
            />

            {/* HERO — the name is the loudest thing. One next action: listen. */}
            <section className="relative min-h-[100svh] flex flex-col justify-end px-6 pt-28 pb-14 sm:pb-20 overflow-hidden grain">
                <div className="hero-light" aria-hidden="true" />
                <div className="relative max-w-6xl mx-auto w-full">
                    <p className="eyebrow mb-4">Artist / Producer</p>
                    <h1 className="font-display font-semibold text-[clamp(3.75rem,18vw,11.5rem)] leading-[0.85] tracking-[-0.04em] text-[var(--color-text)]">
                        DRAZYX
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-md leading-snug">
                        {tagline}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <a href="#latest" className="btn-primary">Listen</a>
                        <div>
                            <a href=""><img src="../img/spotify.png" alt="" /></a>
                        </div>
                        <div>
                            <a href=""><img src="../img/soundcloud.png" alt="" /></a>
                        </div>
                        <div>
                            <a href=""><img src="../img/music.png" alt="" /></a>
                        </div>
                    </div>

                    <div className="mt-14 sm:mt-20">
                        <h3 className="text-purple-900">Trap ● Electronic ● Lo-fi</h3> // Estilizar isso de forma mais elegante
                        < NightClock />
                    </div>
                </div>
            </section>

            {/* 01 — LATEST */}
            <section id="latest" className="px-6 py-24 scroll-mt-8">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16 items-end">
                    <Artwork
                        src={latestRelease.coverUrl}
                        alt={`Cover art for ${releaseTitle(latestRelease)}`}
                        className="w-full max-w-[440px]"
                    />
                    <div>
                        <SectionHeader number="01" label="latest" />
                        <h2 className={`font-display text-4xl sm:text-5xl leading-none tracking-tight mt-4 ${hasTitle(latestRelease) ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]"}`}>
                            {releaseTitle(latestRelease)}
                        </h2>
                        {releaseMeta(latestRelease) && (
                            <p className="eyebrow mt-3">{releaseMeta(latestRelease)}</p>
                        )}
                        {clean(latestRelease.description) && (
                            <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed max-w-md">
                                {latestRelease.description}
                            </p>
                        )}
                        <div className="mt-8">
                            <ListenButtons release={latestRelease} />
                        </div>
                        <Link to={`/music/${latestRelease.id}`} className="link-arrow text-sm inline-block mt-6">
                            Open the release page <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* 02 — MORE MUSIC (compact on purpose: hierarchy over a cover grid) */}
            {others.length > 0 && (
                <section className="px-6 pb-24">
                    <Reveal as="div" className="max-w-6xl mx-auto">
                        <SectionHeader number="02" label="more music" />
                        <ul className="mt-6 border-t border-[var(--border-hair)] max-w-2xl">
                            {others.map((r) => (
                                <li key={r.id}>
                                    <Link to={`/music/${r.id}`} className="row-link grid-cols-[64px_1fr_auto]">
                                        <Artwork src={r.coverUrl} alt="" label="" className="w-16" />
                                        <span className="min-w-0">
                                            <span className={`row-title block font-display text-lg transition-colors truncate ${hasTitle(r) ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]"}`}>
                                                {releaseTitle(r)}
                                            </span>
                                            {releaseMeta(r) && <span className="eyebrow">{releaseMeta(r)}</span>}
                                        </span>
                                        <span className="text-[var(--color-text-secondary)]" aria-hidden="true">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="/music" className="link-arrow text-sm inline-block mt-6">
                            The whole catalog <span aria-hidden="true">→</span>
                        </Link>
                    </Reveal>
                </section>
            )}

            {/* 03 — WHO */}
            <section className="px-6 py-24 border-t border-[var(--border-hair)]">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_2fr]">
                    <SectionHeader number="03" label="who is drazyx?" />
                    <div>
                        <p className="font-display text-2xl sm:text-3xl leading-snug text-[var(--color-text)]">
                            An independent artist and producer from Brazil, making music that sits somewhere between trap, electronic and lo-fi.
                        </p>
                        <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                            It keeps going back to the same places: late nights, nostalgia, games, stories and the worlds you imagine yourself into.
                        </p>
                        <Link to="/about" className="link-arrow text-sm inline-block mt-6">
                            More about Drazyx <span aria-hidden="true">→</span>
                        </Link>
                        <iframe className="mt-10" data-testid="embed-iframe" src="https://open.spotify.com/embed/artist/71gVcrLVY10LjtZWvUWLQU?utm_source=generator&theme=0&si=9892b56c6a704a82" width="100%" height="467" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </Reveal>
            </section>

            {/* 04 — THE ROOM */}
            <section className="px-6 py-24 bg-[var(--color-surface)] border-y border-[var(--border-hair)]">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_2fr]">
                    <SectionHeader number="04" label="the room" />
                    <div>
                        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-text)] leading-tight">
                            There's more here.
                        </h2>
                        <p className="mt-4 mb-8 text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                            Demos, unfinished ideas, sketches and the things that never made it to Spotify.
                        </p>
                        <RoomPreview />
                    </div>
                </Reveal>
            </section>

            {/* 05 — ELSEWHERE */}
            <section className="px-6 py-24">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_2fr]">
                    <SectionHeader number="05" label="follow the world" />
                    <div className="max-w-xl">
                        <SocialLinks only={["spotify", "soundcloud", "youtube", "instagram", "tiktok"]} />
                        <p className="mt-10 text-[var(--color-text-secondary)] leading-relaxed">
                            If something here stayed with you, you can also own the music on Bandcamp.
                        </p>
                        <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className="btn-secondary mt-4" aria-label="Drazyx on Bandcamp (opens in a new tab)">
                            Bandcamp
                        </a>
                    </div>
                </Reveal>
            </section>
        </>
    );
}
