import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import PixelMark from '../components/Pixelmark.jsx';
import Reveal from '../components/Reval.jsx';
import Artwork from '../components/Artwork.jsx';
import SectionHeader from '../components/Sectionheader.jsx';
import ListenButtons from '../components/Listenbuttons.jsx';
import SocialLinks from '../components/Sociallinks.jsx';
import RoomPreview from '../components/Roompreview.jsx';
import NightClock from '../components/Nightclock.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { artistFeaturedTrack, featuredRelease, latestRelease, releases } from '../data/Releases.js';
import { socialLinks } from '../data/Sociallinks.js';
import { tagline } from '../data/Site.js';
import { clean, hasTitle, releaseMeta, releaseTitle } from '../lib/helpers.js';

const others = releases.filter((release) => release.id !== latestRelease.id);

export default function Home() {
    const heroRef = useRef(null);
    const pointerRef = useRef(null);
    const albumGenre = clean(featuredRelease.genre);
    const trackGenre = clean(artistFeaturedTrack?.genre) || albumGenre;

    useEffect(() => {
        const hero = heroRef.current;
        const pointer = pointerRef.current;
        if (!hero || !pointer) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        if (reduceMotion || coarsePointer) return;

        let frame = null;
        const onMove = (event) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
                const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
                pointer.style.setProperty('--mx', `${x}%`);
                pointer.style.setProperty('--my', `${y}%`);
                frame = null;
            });
        };
        const onEnter = () => pointer.classList.add('is-active');
        const onLeave = () => pointer.classList.remove('is-active');

        hero.addEventListener('pointermove', onMove);
        hero.addEventListener('pointerenter', onEnter);
        hero.addEventListener('pointerleave', onLeave);
        return () => {
            hero.removeEventListener('pointermove', onMove);
            hero.removeEventListener('pointerenter', onEnter);
            hero.removeEventListener('pointerleave', onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            <SEO
                path="/"
                description="Drazyx is an independent artist and producer making atmospheric, melancholic music between trap, electronic and lo-fi. Listen, explore the catalog and step into The Room."
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: 'Drazyx',
                    description: 'The home of Drazyx, independent artist and producer.',
                }}
            />

            <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end px-6 pt-28 pb-12 sm:pb-16 overflow-hidden grain">
                <div className="hero-light" aria-hidden="true" />
                <div ref={pointerRef} className="hero-light-pointer" aria-hidden="true" />
                <span className="ambient-lines ambient-lines--large" aria-hidden="true" />
                <span className="ambient-lines ambient-lines--small" aria-hidden="true" />
                <PixelMark mark="moon" size={14} className="hidden sm:block absolute top-24 right-10 text-[var(--color-text-faint)] opacity-60" />
                <PixelMark mark="window" size={20} className="hidden lg:block absolute bottom-28 right-16 text-[var(--color-text-faint)] opacity-30" />

                <div className="relative z-10 max-w-6xl mx-auto w-full">
                    <div className="home-hero-meta mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <p className="eyebrow inline-flex items-center gap-2">
                            <span className="pixel-dot is-live" aria-hidden="true" />
                            Artist / Producer
                        </p>
                        <span className="terminal-label">digital bedroom / open</span>
                    </div>
                    <h1 className="font-display font-semibold text-[clamp(4rem,18vw,11.5rem)] leading-[0.82] tracking-[-0.055em] text-[var(--color-text)]">
                        DRAZYX
                    </h1>
                    <div className="grid gap-8 md:grid-cols-[minmax(0,32rem)_1fr] items-end mt-7">
                        <div>
                            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl leading-snug">
                                {tagline}
                                <span className="inline-block w-px h-[1em] align-middle ml-1 bg-[var(--color-text-faint)] motion-safe:animate-pulse" aria-hidden="true" />
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-2.5">
                                <a href="#listen" className="btn-primary">Listen <span aria-hidden="true">↓</span></a>
                                <Link to="/the-room" className="btn-secondary">Enter The Room <span aria-hidden="true">↗</span></Link>
                            </div>
                        </div>
                        <div className="hidden md:block justify-self-end max-w-xs pb-1">
                            <div className="hero-terminal pixel-corners">
                                <div className="hero-terminal__bar"><span>STATUS</span><span>LOCAL</span></div>
                                <div className="hero-terminal__body">
                                    <RoomGlyph mark="monitor" label="sound, memory, late nights" />
                                    <p className="text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed">A small corner for releases, experiments, beats and the things in between.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <p className="eyebrow eyebrow-accent">Trap · Electronic · Lo-fi</p>
                        <span className="hidden sm:block w-px h-3 bg-[var(--border-strong)]" aria-hidden="true" />
                        <NightClock />
                    </div>
                </div>
            </section>

            <section id="listen" className="home-section px-6 py-20 sm:py-24 scroll-mt-6">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] lg:gap-16 lg:items-center">
                    <div className="artwork-glow min-w-0">
                        <div className="record-object aspect-square">
                            <Artwork
                                src={featuredRelease.coverUrl}
                                alt={`Cover art for ${releaseTitle(featuredRelease)}`}
                                label="release cover not added yet"
                                className="w-full"
                                priority
                            />
                        </div>
                    </div>
                    <div className="min-w-0 lg:py-4">
                        <SectionHeader number="01" label="selected release" />
                        <h2 className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em] mt-4 break-words ${hasTitle(featuredRelease) ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]'}`}>
                            {releaseTitle(featuredRelease)}
                        </h2>
                        {releaseMeta(featuredRelease) && <p className="eyebrow mt-3">{releaseMeta(featuredRelease)}</p>}
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                            {albumGenre && <p className="eyebrow">Album: {albumGenre}</p>}
                            {trackGenre && <p className="eyebrow">Track: {trackGenre}</p>}
                        </div>
                        {artistFeaturedTrack && (
                            <a
                                href={artistFeaturedTrack.url}
                                target="_blank"
                                rel="noreferrer"
                                className="link-arrow text-sm inline-flex items-center mt-5"
                            >
                                Track: {artistFeaturedTrack.title} <span aria-hidden="true">↗</span>
                            </a>
                        )}
                        {clean(featuredRelease.description) && <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed max-w-md">{featuredRelease.description}</p>}
                        <div className="mt-7">
                            <ListenButtons release={featuredRelease} />
                        </div>
                        <Link to={`/music/${featuredRelease.id}`} className="link-arrow text-sm inline-flex items-center mt-6">
                            Open the release page <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </Reveal>
            </section>

            {others.length > 0 && (
                <section className="px-6 pb-24">
                    <Reveal as="div" className="max-w-6xl mx-auto">
                        <SectionHeader number="02" label="more music" />
                        <ul className="mt-6 border-t border-[var(--border-hair)] max-w-3xl">
                            {others.map((release) => (
                                <li key={release.id}>
                                    <Link to={`/music/${release.id}`} className="row-link grid-cols-[56px_1fr_auto] sm:grid-cols-[64px_1fr_auto]">
                                        <Artwork src={release.coverUrl} alt="" label="" className="w-14 sm:w-16" />
                                        <span className="min-w-0">
                                            <span className={`row-title block font-display text-lg transition-colors truncate ${hasTitle(release) ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]'}`}>
                                                {releaseTitle(release)}
                                            </span>
                                            {releaseMeta(release) && <span className="eyebrow">{releaseMeta(release)}</span>}
                                        </span>
                                        <span className="text-[var(--color-text-secondary)]" aria-hidden="true">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="/music" className="link-arrow text-sm inline-flex mt-6">The whole catalog <span aria-hidden="true">→</span></Link>
                    </Reveal>
                </section>
            )}

            <section className="home-section border-y border-[var(--border-hair)] px-6 py-24">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-4 lg:items-stretch">
                    <div className="lg:col-start-1 lg:row-start-1">
                        <SectionHeader number="03" label="who is drazyx?" />
                    </div>
                    <div className="identity-note pixel-corners lg:col-start-1 lg:row-start-2">
                        <div className="flex items-center justify-between gap-4 border-b border-[var(--border-hair)] pb-3">
                            <RoomGlyph mark="headphones" label="artist / producer" />
                            <span className="terminal-label">local / notes</span>
                        </div>
                        <p className="font-display text-2xl sm:text-3xl leading-snug text-[var(--color-text)] mt-6">
                            An independent artist and producer from Brazil, making music that sits somewhere between trap, electronic and lo-fi.
                        </p>
                        <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                            It keeps going back to the same places: late nights, nostalgia, games, stories and the worlds you imagine yourself into.
                        </p>
                        <Link to="/about" className="link-arrow text-sm inline-flex mt-6">More about Drazyx <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="artwork-glow min-w-0 lg:col-start-2 lg:row-start-2">
                        <div className="record-object h-full min-h-[20rem]">
                            <Artwork
                                src="https://f4.bcbits.com/img/0045261838_20.jpg"
                                alt="Profile artwork for Drazyx"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </Reveal>
            </section>

            <section id="listen" className="home-section px-6 py-20 sm:py-24 scroll-mt-6">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] lg:gap-16 lg:items-center">
                    <div className="artwork-glow min-w-0">
                        <div className="record-object aspect-square">
                            <Artwork
                                src={latestRelease.coverUrl}
                                alt={`Cover art for ${releaseTitle(latestRelease)}`}
                                label="release cover not added yet"
                                className="w-full"
                                priority
                            />
                        </div>
                    </div>
                    <div className="min-w-0 lg:py-4">
                        <SectionHeader number="04" label="latest release" />
                        <h2 className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em] mt-4 break-words ${hasTitle(latestRelease) ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]'}`}>
                            {releaseTitle(latestRelease)}
                        </h2>
                        {releaseMeta(latestRelease) && <p className="eyebrow mt-3">{releaseMeta(latestRelease)}</p>}
                        {clean(latestRelease.description) && <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed max-w-md">{latestRelease.description}</p>}
                        <div className="mt-7">
                            <ListenButtons release={latestRelease} />
                        </div>
                        <Link to={`/music/${latestRelease.id}`} className="link-arrow text-sm inline-flex items-center mt-6">
                            Open the release page <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </Reveal>
            </section>

            <section className="home-section px-6 py-24">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.7fr]">
                    <SectionHeader number="05" label="the room" />
                    <div>
                        <p className="eyebrow mb-3 inline-flex items-center gap-2">
                            <span className="pixel-dot is-live" aria-hidden="true" />
                            on the desk, unfinished
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-text)] leading-tight max-w-xl">
                            The polished pages end here.
                        </h2>
                        <p className="mt-4 mb-8 text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                            Demos, unfinished ideas, sketches and the things that never made it to Spotify.
                        </p>
                        <RoomPreview />
                    </div>
                </Reveal>
            </section>

            <section className="home-section border-t border-[var(--border-hair)] px-6 py-24">
                <Reveal as="div" className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.7fr]">
                    <SectionHeader number="06" label="where drazyx exists" />
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <RoomGlyph mark="cursor" label="pick a door" />
                        </div>
                        <SocialLinks only={["spotify", "soundcloud", "youtube", "instagram", "tiktok", "bandcamp"]} />
                        <p className="mt-8 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                            Different places for different sides of the world: listening, experiments, video, visuals, discovery and owning the music.
                        </p>
                        <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className="btn-secondary platform-button platform-button--bandcamp mt-5" aria-label="Drazyx on Bandcamp (opens in a new tab)">
                            Own the music on Bandcamp ↗
                        </a>
                    </div>
                </Reveal>
            </section>
        </>
    );
}
