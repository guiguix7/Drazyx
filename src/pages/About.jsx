import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";

// Genres you've confirmed directly — real, not inferred.
const genres = ["Trap", "Electronic", "Lo-fi", "Phonk", "Jersey Club"];

export default function About() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO path="/about" title="About" description="Who Drazyx is, what he makes, and what inspires him." />
            <div className="max-w-2xl mx-auto">
                <Reveal as="div">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">About</h1>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--color-accent-soft)] mb-3">Who</h2>
                    {/* TODO: replace with the artist's real voice — who he is, in his own words */}
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">[ADD BIO HERE]</p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--color-accent-soft)] mb-3">What I Make</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                        Music that moves between genres but keeps the same feeling — atmosphere,
                        nighttime, nostalgia, the space between darkness and warmth.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((g) => (
                            <span key={g} className="surface rounded-full px-4 py-1.5 text-sm text-[var(--color-text-secondary)]">
                                {g}
                            </span>
                        ))}
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--color-accent-soft)] mb-3">What Inspires Me</h2>
                    {/* TODO: real influences — games, anime, specific artists, personal experiences */}
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        [ADD INFLUENCES — games, anime, artists, memories, anything that actually shaped the sound]
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--color-accent-soft)] mb-3">The Story</h2>
                    {/* TODO: how it started, how the sound has changed over time — no invented milestones */}
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">[ADD THE STORY]</p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--color-accent-soft)] mb-3">Currently</h2>
                    {/* TODO: what he's working on / listening to / playing right now — keep this one easy to update often */}
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">[ADD WHAT'S CURRENT]</p>
                </Reveal>
            </div>
        </div>
    );
}