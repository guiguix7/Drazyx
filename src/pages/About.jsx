import { Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { about, genres } from '../data/About.js';
import { latestRelease } from '../data/Releases.js';
import { isTodo, releaseTitle } from '../lib/helpers.js';
import Artwork from '../components/Artwork.jsx';

function Block({ number, label, text, children, marker }) {
    return (
        <Reveal as="section" className="about-block grid gap-6 lg:grid-cols-[0.85fr_1.7fr] py-12 border-t border-[var(--border-hair)]">
            <div>
                <p className="eyebrow inline-flex items-center gap-2"><span className="text-[var(--color-accent-soft)]">{number}</span> {label}</p>
                <div className="mt-4"><RoomGlyph mark={marker} label="field note" /></div>
            </div>
            <div className="max-w-2xl">
                {text !== undefined && (
                    isTodo(text)
                        ? <div className="room-empty-note pixel-corners"><p className="terminal-label">content / waiting</p><p className="text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed">This part is still being written. The layout is ready; the biography is not being invented to fill it.</p></div>
                        : <p className="text-[var(--color-text)] text-xl sm:text-2xl leading-relaxed">{text}</p>
                )}
                {children}
            </div>
        </Reveal>
    );
}

export default function About() {
    return (
        <PageShell
            eyebrow="behind the music"
            title="About"
            lede="Who Drazyx is, what he makes and what the music is made of."
            marker="heart"
        >
            <SEO
                path="/about"
                title="About"
                description="Who Drazyx is, what he makes and what the music is made of. An independent artist and producer from Brazil."
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'MusicGroup',
                    name: 'Drazyx',
                    genre: genres,
                }}
            />

            <Reveal as="section" className="about-intro pixel-corners mb-10">
                <div className="about-intro__grid">
                    <div className="about-intro__object relative aspect-square shrink-0 flex items-center justify-center overflow-hidden">
                        <div className="about-orbit" aria-hidden="true" />
                        <Artwork
                            src={`https://f4.bcbits.com/img/0045261838_20.jpg`}
                            alt={`Profile photo of Drazyx`}
                            label=""
                            className="relative z-[1] object-contain w-0 h-0 min-w-full min-h-full max-w-full max-h-full"
                        />
                    </div>
                    <div className="flex min-w-0 flex-col p-6">
                        <p className="eyebrow eyebrow-accent">artist / at a glance</p>
                        <p className="font-display text-2xl sm:text-3xl mt-3 leading-snug max-w-xl">An independent artist and producer whose work keeps circling atmosphere, nighttime, nostalgia and imagined worlds.</p>
                        <div className="flex flex-wrap gap-2 mt-6" aria-label="Genres and current catalog focus">
                            {genres.map((genre) => <span key={genre} className="chip">{genre}</span>)}
                        </div>
                        <p className="terminal-label mt-auto pt-6">visual artifact / {releaseTitle(latestRelease)}</p>
                    </div>
                </div>
            </Reveal>

            <Block number="01" label="who" text={about.who} marker="heart" />
            <Block number="02" label="what I make" text={about.whatIMake} marker="headphones" />

            <Reveal as="section" className="grid gap-6 lg:grid-cols-[0.85fr_1.7fr] py-12 border-t border-[var(--border-hair)]">
                <div>
                    <p className="eyebrow inline-flex items-center gap-2"><span className="text-[var(--color-accent-soft)]">03</span> notebook / still being written</p>
                    <div className="mt-4"><RoomGlyph mark="window" label="private notes" /></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 max-w-3xl">
                    {[
                        ['what inspires me', about.inspires],
                        ['the story', about.story],
                        ['currently', about.currently],
                    ].map(([label, value]) => (
                        <div key={label} className="room-empty-note pixel-corners min-h-0">
                            <p className="eyebrow">{label}</p>
                            <p className="text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed">
                                {isTodo(value) ? 'This part is still being written. The site will only publish it when there is something real to say.' : value}
                            </p>
                        </div>
                    ))}
                </div>
            </Reveal>

            <Reveal as="section" className="pt-10 border-t border-[var(--border-hair)] flex flex-wrap items-center gap-3">
                <Link to="/music" className="btn-primary">Hear the music <span aria-hidden="true">→</span></Link>
                <Link to="/the-room" className="btn-secondary">See The Room <span aria-hidden="true">↗</span></Link>
            </Reveal>
        </PageShell>
    );
}