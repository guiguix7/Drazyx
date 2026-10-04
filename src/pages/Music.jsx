import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import Artwork from "../components/Artwork.jsx";
import ReleaseCard from "../components/Releasecard.jsx";
import ListenButtons from "../components/Listenbuttons.jsx";
import { releases } from "../data/Releases.js";
import { bandcampCatalog } from "../data/Bandcampcatalog.js";
import { socialLinks } from "../data/Sociallinks.js";
import { clean, hasTitle, releaseMeta, releaseTitle } from "../lib/helpers.js";

// TODO: com mais lançamentos, agrupar por release.type (Singles / Albums & EPs / Instrumentals).

export default function Music() {
    const [featured, ...rest] = releases;

    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/music"
                title="Music"
                description="The Drazyx catalog: albums, EPs and remixes of atmospheric, melancholic music between trap, electronic and lo-fi."
            />
            <div className="max-w-6xl mx-auto">
                <Reveal as="header" className="mb-16">
                    <p className="eyebrow">catalog</p>
                    <h1 className="page-title mt-3">Music</h1>
                    <p className="lede mt-5">Everything released so far, in one place. Start anywhere.</p>
                </Reveal>

                {featured && (
                    <Reveal as="article" className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14 items-end">
                        <Link to={`/music/${featured.id}`} aria-label={`Open ${releaseTitle(featured)}`}>
                            <Artwork src={featured.coverUrl} alt={`Cover art for ${releaseTitle(featured)}`} className="w-full max-w-[420px] card-hover" priority />
                        </Link>
                        <div>
                            <p className="eyebrow eyebrow-accent">latest</p>
                            <h2 className={`font-display text-3xl sm:text-4xl mt-3 leading-tight ${hasTitle(featured) ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]"}`}>
                                <Link to={`/music/${featured.id}`}>{releaseTitle(featured)}</Link>
                            </h2>
                            {releaseMeta(featured) && <p className="eyebrow mt-3">{releaseMeta(featured)}</p>}
                            {clean(featured.description) && (
                                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed max-w-md">{featured.description}</p>
                            )}
                            <div className="mt-6"><ListenButtons release={featured} /></div>
                        </div>
                    </Reveal>
                )}

                {rest.length > 0 && (
                    <div className="mt-24 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((r) => (
                            <Reveal as="article" key={r.id}>
                                <ReleaseCard release={r} />
                            </Reveal>
                        ))}
                    </div>
                )}

                {/* Real Bandcamp titles — no metadata invented, links out */}
                <Reveal as="section" className="mt-28 grid gap-8 md:grid-cols-[1fr_2fr] border-t border-[var(--border-hair)] pt-12">
                    <div>
                        <p className="eyebrow">also on bandcamp</p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-[16rem] leading-relaxed">
                            Where you can own and collect the music.
                        </p>
                    </div>
                    <div>
                        <ul>
                            {bandcampCatalog.map((title) => (
                                <li key={title} className="py-3 border-b border-[var(--border-hair)] text-[var(--color-text)]">
                                    {title}
                                </li>
                            ))}
                        </ul>
                        <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className="link-arrow text-sm inline-block mt-5">
                            Open Bandcamp <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-20">
                    <Link to="/the-room" className="link-arrow">
                        Looking for something that isn't here? Try the room <span aria-hidden="true">→</span>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}
