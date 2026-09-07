import { Link } from "react-router-dom";
import { ChevronDown, Music2 } from "lucide-react";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import BeatRow from "../components/Beatrow.jsx";
import { latestRelease } from "../data/Releases.js";
import { featuredBeat } from "../data/Beats.js";

export default function Home() {
    return (
        <>
            <SEO
                path="/"
                title="Producer / Artist"
                description="Site oficial de Drazyx. Sons melancólicos entre trap, electronic e lo-fi. Ouça músicas, compre beats e conheça os serviços de produção."
            />

            {/* HERO */}
            <section className="relative h-screen min-h-[640px] flex flex-col items-center justify-center px-6 overflow-hidden grain">
                <div
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full blur-[140px] glow-orb"
                    style={{ background: "radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)" }}
                />
                <div
                    className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-[130px]"
                    style={{ background: "radial-gradient(circle, rgba(156,43,70,0.2), transparent 70%)" }}
                />

                <div className="relative text-center max-w-3xl">
                    <h1 className="font-display font-bold text-[clamp(3.5rem,13vw,8rem)] leading-[0.9] tracking-tight text-[var(--text-hi)]">
                        DRAZYX
                    </h1>
                    <p className="mt-4 text-lg text-[var(--text-mid)] font-display">Producer / Artist</p>
                    <p className="mt-6 text-base sm:text-lg text-[var(--text-mid)] max-w-xl mx-auto leading-relaxed">
                        Melancholic sounds from somewhere between trap &amp; lo-fi.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Link to="/music" className="btn-secondary px-6 py-3 rounded-full text-sm">
                            Listen
                        </Link>
                        <Link to="/beats" className="btn-primary px-6 py-3 rounded-full text-sm font-medium">
                            Explore Beats
                        </Link>
                        <Link to="/contact" className="btn-secondary px-6 py-3 rounded-full text-sm">
                            Contact
                        </Link>
                    </div>
                </div>

                <a
                    href="#latest-release"
                    className="absolute bottom-8 text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors"
                    aria-label="Rolar para baixo"
                >
                    <ChevronDown size={22} />
                </a>
            </section>

            {/* LATEST RELEASE */}
            <section id="latest-release" className="py-28 px-6">
                <Reveal as="div" className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-wide text-[var(--violet-soft)] mb-3">Latest Release</p>
                    <div className="glass rounded-2xl overflow-hidden grid-cols-1 sm:grid-cols-[220px_1fr]">
                        <iframe data-testid="embed-iframe" className="p-4 h-120"
                            src={latestRelease.spotifyEmbedUrl} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
                        </iframe>
                        <div className="p-6 sm:p-8 flex flex-col">
                            <div className="mt-0 flex flex-wrap gap-3 justify-center">
                                <a
                                    href={latestRelease.spotifyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
                                >
                                    <Music2 size={15} /> Listen on Spotify
                                </a>
                                <a
                                    href={latestRelease.soundcloudUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
                                >
                                    <Music2 size={15} /> Listen on SoundCloud
                                </a>
                                <Link
                                    to={`/music/${latestRelease.id}`}
                                    className="btn-secondary px-5 py-2.5 rounded-full text-sm"
                                >
                                    View release
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* FEATURED BEAT per Album*/}
            <section className="py-16 px-6">
                <Reveal as="div" className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-wide text-[var(--violet-soft)] mb-3">Featured Beat</p>
                    <div className="glass rounded-2xl p-2">
                        <BeatRow beat={featuredBeat} />
                        <BeatRow beat={featuredBeat} />
                        <BeatRow beat={featuredBeat} />
                    </div>
                    <div className="mt-4 text-right">
                        <Link to="/beats" className="text-sm text-[var(--text-mid)] hover:text-[var(--text-hi)]">
                            View all beats
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* ABOUT TEASER */}
            <section className="py-24 px-6">
                <Reveal as="div" className="max-w-2xl mx-auto text-center">
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--text-hi)]">About</h2>
                    <p className="mt-4 text-[var(--text-mid)] leading-relaxed">
                        Drazyx is an independent artist and producer creating melancholic sounds
                        between trap, electronic and lo-fi.
                    </p>
                    <Link
                        to="/about"
                        className="inline-block mt-6 btn-secondary px-5 py-2.5 rounded-full text-sm"
                    >
                        More about Drazyx
                    </Link>
                </Reveal>
            </section>

            {/* THE ROOM TEASER */}
            <section className="py-24 px-6">
                <Reveal as="div" className="max-w-2xl mx-auto text-center">
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--text-hi)]">The Room</h2>
                    <p className="mt-4 text-[var(--text-mid)] leading-relaxed">
                        Unreleased ideas, demos, experiments and things that don't belong anywhere else.
                    </p>
                    <Link
                        to="/the-room"
                        className="inline-block mt-6 btn-secondary px-5 py-2.5 rounded-full text-sm"
                    >
                        Enter the Room
                    </Link>
                </Reveal>
            </section>

            {/* SUPPORT TEASER */}
            <section className="py-24 px-6">
                <Reveal as="div" className="max-w-2xl mx-auto text-center">
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--text-hi)]">Support the Music</h2>
                    <p className="mt-4 text-[var(--text-mid)] leading-relaxed">
                        If something I made stayed with you, you can help me make more.
                    </p>
                    <Link
                        to="/support"
                        className="inline-block mt-6 btn-primary px-5 py-2.5 rounded-full text-sm font-medium"
                    >
                        Support Drazyx
                    </Link>
                </Reveal>
            </section>
        </>
    );
}