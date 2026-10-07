import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import RoomEntry from '../components/Roomentry.jsx';
import NewsletterForm from '../components/Newsletterform.jsx';
import SocialLinks from '../components/Sociallinks.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { roomEntries } from '../data/Room.js';
import { roomCategories } from '../data/Site.js';

export default function TheRoom() {
    return (
        <PageShell
            eyebrow="the part that isn't polished"
            title="The Room"
            lede="Unfinished things, late-night ideas, sounds that almost became songs. Not on Spotify, not on a schedule."
            marker="monitor"
        >
            <SEO
                path="/the-room"
                title="The Room"
                description="Demos, unfinished ideas, sketches and experiments from Drazyx. The side of the music that isn't on Spotify."
            />

            <Reveal as="section" className="grid gap-8 lg:grid-cols-[0.85fr_1.7fr]" aria-label="Entries">
                <div>
                    <h2 className="eyebrow">on the desk</h2>
                    <p className="terminal-label mt-3">not a blog / more like a drawer</p>
                </div>
                <div className="max-w-3xl">
                    {roomEntries.length > 0 ? (
                        <div className="room-file">
                            <div className="room-file__bar"><span>room / latest</span><span>{roomEntries.length} {roomEntries.length === 1 ? 'entry' : 'entries'}</span></div>
                            <div className="px-4">{roomEntries.map((entry) => <RoomEntry key={entry.id} entry={entry} />)}</div>
                        </div>
                    ) : (
                        <div className="room-file pixel-corners">
                            <div className="room-file__bar">
                                <span className="inline-flex items-center gap-2"><span className="pixel-dot is-live" aria-hidden="true" />room / waiting</span>
                                <span>0 entries</span>
                            </div>
                            <div className="room-file__body">
                                <RoomGlyph mark="monitor" label="nothing has been left here yet" />
                                <h3 className="font-display text-2xl sm:text-3xl mt-5 max-w-xl leading-tight">The Room is intentionally incomplete.</h3>
                                <p className="text-[var(--color-text-secondary)] mt-4 max-w-xl leading-relaxed">When real demos, sketches, visuals or notes are ready to leave the desk, this is where they can live without being turned into polished release copy.</p>
                            </div>
                        </div>
                    )}
                </div>
            </Reveal>

            <Reveal as="section" className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.7fr]">
                <div><h2 className="eyebrow">what lives here</h2><p className="terminal-label mt-3">content types / cms-ready</p></div>
                <ul className="max-w-3xl border-t border-[var(--border-hair)]">
                    {roomCategories.map((category, index) => (
                        <li key={category.id}>
                            <div className="room-entry grid-cols-[2.5rem_7rem_minmax(0,1fr)]">
                                <span className="font-display text-sm text-[var(--color-text-faint)]">{String(index + 1).padStart(2, '0')}</span>
                                <span className="font-display text-[var(--color-text)]">{category.label}</span>
                                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{category.blurb}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Reveal>

            <Reveal as="section" className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.7fr] room-file p-6 sm:p-8 pixel-corners">
                <div><h2 className="eyebrow eyebrow-accent">stay in the room</h2><p className="terminal-label mt-3">mailbox / not connected yet</p></div>
                <div>
                    <p className="font-display text-2xl sm:text-3xl text-[var(--color-text)] leading-snug max-w-xl">Get things before they leave the room.</p>
                    <p className="mt-3 mb-6 text-sm text-[var(--color-text-secondary)] max-w-xl leading-relaxed">The sign-up UI is ready; the newsletter provider is not connected yet, so this form will never pretend you were subscribed.</p>
                    <NewsletterForm />
                </div>
            </Reveal>

            <Reveal as="section" className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.7fr]">
                <h2 className="eyebrow">or follow along</h2>
                <div className="max-w-3xl"><SocialLinks only={['instagram', 'youtube', 'soundcloud', 'tiktok']} /></div>
            </Reveal>
        </PageShell>
    );
}
