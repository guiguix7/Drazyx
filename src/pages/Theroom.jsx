import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import NewsletterForm from "../components/Newsletterform.jsx";

// TODO: replace with real entries once there's unreleased music, demos,
// sketches, process notes or personal posts to show. Keep the numbered,
// journal-like format — it's what makes this feel alive instead of a
// static "stay tuned" page. Architecture is ready for this to eventually
// be powered by a CMS/admin panel (see README).
const roomEntries = [
    { number: "01", category: "Demo", title: "[ADD ENTRY TITLE]", note: "[ADD A SHORT NOTE]" },
    { number: "02", category: "Process", title: "[ADD ENTRY TITLE]", note: "[ADD A SHORT NOTE]" },
    { number: "03", category: "Visual", title: "[ADD ENTRY TITLE]", note: "[ADD A SHORT NOTE]" },
];

export default function TheRoom() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO path="/the-room" title="The Room" description="Demos, unfinished ideas and experiments from Drazyx." />
            <div className="max-w-2xl mx-auto">
                <Reveal as="div">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">The Room</h1>
                    <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                        Unfinished things, late night ideas, sounds that almost became songs.
                        You found something that isn't on Spotify.
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-14 space-y-px">
                    {roomEntries.map((e) => (
                        <div key={e.number} className="surface rounded-lg p-5 flex items-start gap-5 mb-3">
                            <span className="font-display text-sm text-[var(--text-low)] pt-0.5">{e.number}</span>
                            <div>
                                <p className="text-xs tracking-wide text-[var(--color-accent-soft)]">{e.category}</p>
                                <p className="text-[var(--color-text)] mt-1">{e.title}</p>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{e.note}</p>
                            </div>
                        </div>
                    ))}
                </Reveal>

                <Reveal as="div" className="mt-16 surface rounded-xl p-8">
                    <h2 className="font-display text-xl text-[var(--color-text)]">Stay in the Room</h2>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-md">
                        Get things before they leave the room — unreleased previews, demos and
                        occasional notes from Drazyx.
                    </p>
                    <div className="mt-5">
                        <NewsletterForm />
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-16">
                    <h2 className="font-display text-base text-[var(--color-text)] mb-3">Free Downloads</h2>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        [ADD FREE DOWNLOADS: free beats, MIDI, samples, wallpapers, presets or project files]
                    </p>
                </Reveal>
            </div>
        </div>
    );
}