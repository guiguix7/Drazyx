import { Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import Artwork from '../components/Artwork.jsx';
import ReleaseCard from '../components/Releasecard.jsx';
import ListenButtons from '../components/Listenbuttons.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { releases } from '../data/Releases.js';
import { bandcampCatalog } from '../data/Bandcampcatalog.js';
import { socialLinks } from '../data/Sociallinks.js';
import { clean, hasTitle, releaseMeta, releaseTitle } from '../lib/helpers.js';

export default function Music() {
    const [featured, ...rest] = releases;

    return (
        <PageShell
            eyebrow="catalog / music"
            title="Music"
            lede="Everything released so far, in one place. Start anywhere."
            marker="headphones"
        >
            <SEO
                path="/music"
                title="Music"
                description="The Drazyx catalog: albums, EPs and remixes of atmospheric, melancholic music between trap, electronic and lo-fi."
            />

            {featured && (
                <Reveal as="article" className="grid gap-8 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-16 items-end">
                    <Link to={`/music/${featured.id}`} className="artwork-link block artwork-glow" aria-label={`Open ${releaseTitle(featured)}`}>
                        <div className="record-object">
                            <Artwork src={featured.coverUrl} alt={`Cover art for ${releaseTitle(featured)}`} label="release cover not added yet" className="w-full" priority />
                        </div>
                    </Link>
                    <div className="lg:pb-2">
                        <p className="eyebrow eyebrow-accent">selected from the catalog</p>
                        <h2 className={`font-display text-4xl sm:text-5xl mt-3 leading-[0.94] tracking-[-0.04em] ${hasTitle(featured) ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]'}`}>
                            {releaseTitle(featured)}
                        </h2>
                        {releaseMeta(featured) && <p className="eyebrow mt-3">{releaseMeta(featured)}</p>}
                        {clean(featured.description) && <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed max-w-md">{featured.description}</p>}
                        <div className="mt-7"><ListenButtons release={featured} /></div>
                        <div className="mt-7 flex items-center gap-2 terminal-label"><RoomGlyph mark="folder" label={`/music/${featured.id}`} /></div>
                    </div>
                </Reveal>
            )}

            {rest.length > 0 && (
                <section className="mt-24">
                    <Reveal as="header" className="flex items-end justify-between gap-6 mb-8">
                        <div><p className="eyebrow">catalog / more</p><h2 className="font-display text-2xl sm:text-3xl mt-2">More records</h2></div>
                        <span className="terminal-label hidden sm:block">{rest.length} item{rest.length === 1 ? '' : 's'}</span>
                    </Reveal>
                    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((release) => <ReleaseCard key={release.id} release={release} />)}
                    </div>
                </section>
            )}

            <Reveal as="section" className="mt-28 grid gap-10 lg:grid-cols-[0.85fr_1.7fr] border-t border-[var(--border-hair)] pt-12">
                <div>
                    <p className="eyebrow">also on bandcamp</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-xs leading-relaxed">The full set of titles currently listed on the artist's Bandcamp. Metadata is intentionally kept separate until each release is mapped to the catalog.</p>
                </div>
                <div className="max-w-3xl">
                    <div className="record-object p-2 sm:p-3">
                        <div className="terminal-label px-3 py-2">bandcamp / catalog index</div>
                        <ul>
                            {bandcampCatalog.map((title, index) => (
                                <li key={title}>
                                    <div className="record-index px-3">
                                        <span className="record-number">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="text-[var(--color-text)] leading-snug">{title}</span>
                                        <span className="text-[var(--color-text-faint)]" aria-hidden="true">↗</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a href={socialLinks.bandcamp} target="_blank" rel="noreferrer" className="link-arrow text-sm inline-flex mt-5">Open Bandcamp <span aria-hidden="true">↗</span></a>
                </div>
            </Reveal>

            <Reveal as="div" className="mt-20 border-t border-[var(--border-hair)] pt-8">
                <Link to="/the-room" className="link-arrow">Some of the unfinished side lives in The Room <span aria-hidden="true">→</span></Link>
            </Reveal>
        </PageShell>
    );
}
