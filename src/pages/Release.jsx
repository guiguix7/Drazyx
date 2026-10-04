import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import Artwork from "../components/Artwork.jsx";
import ReleaseCard from "../components/Releasecard.jsx";
import ListenButtons from "../components/Listenbuttons.jsx";
import { releases } from "../data/Releases.js";
import { clean, hasTitle, releaseMeta, releaseTitle } from "../lib/helpers.js";

function NotFoundRelease({ releaseId }) {
    return (
        <div className="pt-40 pb-24 px-6 text-center">
            <SEO path={`/music/${releaseId}`} title="Release not found" noindex />
            <h1 className="page-title">Not found</h1>
            <p className="text-[var(--color-text-secondary)] mt-4">That release doesn't exist (or isn't out yet).</p>
            <Link to="/music" className="link-arrow inline-block mt-4">
                Back to the music <span aria-hidden="true">→</span>
            </Link>
        </div>
    );
}

function ReleaseView({ release }) {
    const [playerOn, setPlayerOn] = useState(false);
    const related = releases.filter((r) => r.id !== release.id);
    const credits = Object.entries(release.credits ?? {}).filter(([, v]) => v);
    const tracks = release.tracks ?? [];
    const title = releaseTitle(release);
    const description = clean(release.description);
    const meta = releaseMeta(release);

    const jsonLd = hasTitle(release)
        ? {
              "@context": "https://schema.org",
              "@type": "MusicAlbum",
              name: release.title,
              byArtist: { "@type": "MusicGroup", name: "Drazyx" },
              ...(clean(release.year) ? { datePublished: String(release.year) } : {}),
              ...(release.coverUrl ? { image: release.coverUrl } : {}),
          }
        : undefined;

    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path={`/music/${release.id}`}
                title={hasTitle(release) ? title : "Release"}
                description={description || `${title} by Drazyx.`}
                image={release.coverUrl || undefined}
                type="music.album"
                jsonLd={jsonLd}
            />
            <div className="max-w-5xl mx-auto">
                <Link to="/music" className="link-arrow text-sm">
                    <span aria-hidden="true">←</span> Music
                </Link>

                <Reveal as="header" className="mt-8 grid gap-10 md:grid-cols-[minmax(0,380px)_1fr] md:gap-14 items-end">
                    <Artwork src={release.coverUrl} alt={`Cover art for ${title}`} className="w-full max-w-[380px]" priority />
                    <div>
                        <p className="eyebrow">Drazyx</p>
                        <h1 className={`page-title mt-3 ${hasTitle(release) ? "" : "text-[var(--color-text-faint)]"}`}>{title}</h1>
                        {(meta || clean(release.genre)) && (
                            <p className="eyebrow mt-4">{[meta, clean(release.genre)].filter(Boolean).join(" · ")}</p>
                        )}
                        <div className="mt-8"><ListenButtons release={release} /></div>
                    </div>
                </Reveal>

                {release.spotifyEmbedUrl && (
                    <Reveal as="section" className="mt-14 max-w-xl" aria-label="Play here">
                        {playerOn ? (
                            <iframe
                                title={`Spotify player for ${title}`}
                                src={release.spotifyEmbedUrl}
                                width="100%"
                                height={152}
                                style={{ borderRadius: 8, border: 0 }}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        ) : (
                            <button type="button" className="btn-secondary" onClick={() => setPlayerOn(true)}>
                                Play it here
                            </button>
                        )}
                    </Reveal>
                )}

                {(description || release.behindTheMusic) && (
                    <Reveal as="section" className="mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
                        <h2 className="eyebrow">about this one</h2>
                        <div className="space-y-6 max-w-xl">
                            {description && <p className="text-[var(--color-text)] text-lg leading-relaxed">{description}</p>}
                            {release.behindTheMusic && (
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">{release.behindTheMusic}</p>
                            )}
                        </div>
                    </Reveal>
                )}

                {tracks.length > 0 && (
                    <Reveal as="section" className="mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
                        <h2 className="eyebrow">tracklist</h2>
                        <ol className="max-w-xl border-t border-[var(--border-hair)]">
                            {tracks.map((t, i) => (
                                <li key={`${t.title}-${i}`} className="grid grid-cols-[2rem_1fr_auto] gap-3 py-3 border-b border-[var(--border-hair)]">
                                    <span className="text-[var(--color-text-faint)] font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-[var(--color-text)]">{t.title}</span>
                                    {t.duration && <span className="text-sm text-[var(--color-text-secondary)]">{t.duration}</span>}
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                )}

                {credits.length > 0 && (
                    <Reveal as="section" className="mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
                        <h2 className="eyebrow">credits</h2>
                        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
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
                        <h2 className="eyebrow mb-8">more music</h2>
                        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {related.map((r) => (
                                <ReleaseCard key={r.id} release={r} showMeta={false} />
                            ))}
                        </div>
                    </Reveal>
                )}

                <Reveal as="div" className="mt-20">
                    <Link to="/the-room" className="link-arrow">
                        There's an unreleased side to all this. Step into the room <span aria-hidden="true">→</span>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}

export default function Release() {
    const { releaseId } = useParams();
    const release = releases.find((r) => r.id === releaseId);
    if (!release) return <NotFoundRelease releaseId={releaseId} />;
    return <ReleaseView key={release.id} release={release} />;
}
