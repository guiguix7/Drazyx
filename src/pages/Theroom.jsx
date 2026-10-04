import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import RoomEntry from "../components/Roomentry.jsx";
import NewsletterForm from "../components/Newsletterform.jsx";
import SocialLinks from "../components/Sociallinks.jsx";
import { roomEntries } from "../data/Room.js";
import { roomCategories } from "../data/Site.js";

export default function TheRoom() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/the-room"
                title="The Room"
                description="Demos, unfinished ideas, sketches and experiments from Drazyx. The side of the music that isn't on Spotify."
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="header" className="max-w-2xl">
                    <p className="eyebrow">you found it</p>
                    <h1 className="page-title mt-3">The Room</h1>
                    <p className="lede mt-5">
                        Unfinished things, late-night ideas, sounds that almost became songs. Not on Spotify, not on a schedule.
                    </p>
                </Reveal>

                {/* The journal: newest first. Powered by data/Room.js (CMS-ready shape). */}
                <Reveal as="section" className="mt-16 grid gap-8 md:grid-cols-[1fr_2fr]" aria-label="Entries">
                    <h2 className="eyebrow">on the desk</h2>
                    <div className="max-w-xl">
                        {roomEntries.length > 0 ? (
                            <div className="border-t border-[var(--border-hair)]">
                                {roomEntries.map((e) => (
                                    <RoomEntry key={e.id} entry={e} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--border-hair)] pt-5">
                                Nothing's been left on the desk yet. When something lands here, it'll show up first.
                            </p>
                        )}
                    </div>
                </Reveal>

                <Reveal as="section" className="mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
                    <h2 className="eyebrow">what lives here</h2>
                    <ul className="max-w-xl border-t border-[var(--border-hair)]">
                        {roomCategories.map((c) => (
                            <li key={c.id} className="grid sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6 py-4 border-b border-[var(--border-hair)]">
                                <span className="font-display text-[var(--color-text)]">{c.label}</span>
                                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c.blurb}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal as="section" className="mt-20 grid gap-8 md:grid-cols-[1fr_2fr] bg-[var(--color-surface)] border border-[var(--border-hair)] rounded-lg p-8">
                    <h2 className="eyebrow eyebrow-accent">stay in the room</h2>
                    <div>
                        <p className="font-display text-2xl text-[var(--color-text)] leading-snug max-w-md">
                            Get things before they leave the room.
                        </p>
                        <p className="mt-3 mb-6 text-sm text-[var(--color-text-secondary)] max-w-md leading-relaxed">
                            Previews, demos and the occasional note.
                        </p>
                        <NewsletterForm />
                    </div>
                </Reveal>

                <Reveal as="section" className="mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
                    <h2 className="eyebrow">or follow along</h2>
                    <div className="max-w-xl">
                        <SocialLinks only={["instagram", "youtube", "soundcloud", "tiktok"]} />
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
