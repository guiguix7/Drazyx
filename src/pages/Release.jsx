import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import Artwork from '../components/Artwork.jsx';
import ReleaseCard from '../components/Releasecard.jsx';
import ListenButtons from '../components/Listenbuttons.jsx';
import PageShell from '../components/Pageshell.jsx';
import { releases } from '../data/Releases.js';
import { clean, hasTitle, releaseMeta, releaseTitle, safeUrl } from '../lib/helpers.js';

function NotFoundRelease({ releaseId }) {
    return (
        <PageShell eyebrow="music / 404" title="Not found" lede="That release doesn't exist (or isn't published yet)." marker="cursor" width="narrow">
            <SEO
                path={`/music/${releaseId}`}
                title="Release not found"
                description="The requested Drazyx release could not be found."
                noindex
            />
            <Link to="/music" className="link-arrow inline-flex mt-2">Back to the music <span aria-hidden="true">→</span></Link>
        </PageShell>
    );
}

function ReleaseView({ release }) {
    const [playerOn, setPlayerOn] = useState(false);
    const related = releases.filter((item) => item.id !== release.id);
    const credits = Object.entries(release.credits ?? {}).filter(([, value]) => value);
    const tracks = release.tracks ?? [];
    const title = releaseTitle(release);
    const safeEmbedUrl = safeUrl(release.spotifyEmbedUrl);
    const description = clean(release.description);
    const meta = releaseMeta(release);
    const genre = clean(release.genre);

    const jsonLd = hasTitle(release)
        ? {
            '@context': 'https://schema.org',
            '@type': 'MusicAlbum',
            name: release.title,
            byArtist: { '@type': 'MusicGroup', name: 'Drazyx' },
            ...(clean(release.year) ? { datePublished: String(release.year) } : {}),
            ...(release.coverUrl ? { image: release.coverUrl } : {}),
        }
        : undefined;

    return (
        <PageShell eyebrow="music / record" title={hasTitle(release) ? title : 'Release details pending'} lede={genre || undefined} marker="folder">
            <SEO
                path={`/music/${release.id}`}
                title={hasTitle(release) ? title : 'Release'}
                description={description || `${title} by Drazyx.`}
                image={release.coverUrl || undefined}
                type="music.album"
                jsonLd={jsonLd}
            />

            <Link to="/music" className="link-arrow text-sm inline-flex mb-8">← Music</Link>

            <Reveal as="header" className="release-header grid gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-16 items-end">
                <div className="artwork-glow">
                    <div className="record-object">
                        <Artwork src={release.coverUrl} alt={`Cover art for ${title}`} label="release cover not added yet" className="w-full" priority />
                    </div>
                </div>
                <div className="lg:pb-2">
                    <div className="flex items-center gap-2">
                        <span className="pixel-dot" aria-hidden="true" />
                        <p className="terminal-label">drazyx / {release.id}</p>
                    </div>
                    {hasTitle(release) && <p className="font-display text-4xl sm:text-5xl leading-[0.95] tracking-[-0.04em] mt-3 text-[var(--color-text)]">{title}</p>}
                    {!hasTitle(release) && <p className="text-[var(--color-text-secondary)] mt-4 max-w-md leading-relaxed">The page is connected to a real catalog entry, but the public title and artwork have not been added to the site data yet.</p>}
                    {(meta || genre) && <p className="eyebrow mt-4">{[meta, genre].filter(Boolean).join(' · ')}</p>}
                    <div className="mt-7"><ListenButtons release={release} /></div>
                </div>
            </Reveal>

            {safeEmbedUrl && (
                <Reveal as="section" className="mt-14 max-w-xl" aria-label="Spotify player">
                    {playerOn ? (
                        <div className="spotify-embed-frame">
                            <iframe
                                title={`Spotify player for ${title}`}
                                src={safeEmbedUrl}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <button type="button" className="btn-secondary platform-button platform-button--spotify" onClick={() => setPlayerOn(true)}>
                            Play it here <span aria-hidden="true">→</span>
                        </button>
                    )}
                </Reveal>
            )}

            {(description || release.behindTheMusic) && (
                <Reveal as="section" className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.7fr] border-t border-[var(--border-hair)] pt-12">
                    <h2 className="eyebrow">about this one</h2>
                    <div className="space-y-6 max-w-2xl">
                        {description && <p className="text-[var(--color-text)] text-lg leading-relaxed">{description}</p>}
                        {release.behindTheMusic && <p className="text-[var(--color-text-secondary)] leading-relaxed">{release.behindTheMusic}</p>}
                    </div>
                </Reveal>
            )}

            {tracks.length > 0 && (
                <Reveal as="section" className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.7fr]">
                    <h2 className="eyebrow">tracklist</h2>
                    <ol className="max-w-2xl border-t border-[var(--border-hair)]">
                        {tracks.map((track, index) => (
                            <li key={`${track.title}-${index}`}>
                                <div className="record-index px-0">
                                    <span className="record-number">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="text-[var(--color-text)]">{track.title}</span>
                                    {track.duration && <span className="text-sm text-[var(--color-text-secondary)]">{track.duration}</span>}
                                </div>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            )}

            {credits.length > 0 && (
                <Reveal as="section" className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.7fr]">
                    <h2 className="eyebrow">credits</h2>
                    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
                        {credits.map(([role, name]) => (
                            <div key={role}>
                                <dt className="eyebrow capitalize">{role}</dt>
                                <dd className="text-[var(--color-text)] mt-1">{name}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            )}

            {related.length > 0 && (
                <Reveal as="section" className="mt-24 border-t border-[var(--border-hair)] pt-12">
                    <div className="flex items-end justify-between gap-6 mb-8">
                        <div><p className="eyebrow">next doors</p><h2 className="font-display text-2xl mt-2">More music</h2></div>
                        <Link to="/music" className="link-arrow text-sm">All music <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {related.map((item) => <ReleaseCard key={item.id} release={item} showMeta={false} />)}
                    </div>
                </Reveal>
            )}

            <Reveal as="div" className="mt-20 border-t border-[var(--border-hair)] pt-8">
                <Link to="/the-room" className="link-arrow">There's an unreleased side to all this. Step into The Room <span aria-hidden="true">→</span></Link>
            </Reveal>
        </PageShell>
    );
}

export default function Release() {
    const { releaseId } = useParams();
    const release = releases.find((item) => item.id === releaseId);
    if (!release) return <NotFoundRelease releaseId={releaseId} />;
    return <ReleaseView key={release.id} release={release} />;
}
