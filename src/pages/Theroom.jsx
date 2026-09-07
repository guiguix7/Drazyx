import SEO from "../components/SEO";
import Reveal from "../components/Reval";
import NewsletterForm from "../components/NewsletterForm";

// TODO: substituir por conteúdo real quando houver demos, unreleased
// tracks, MIDI, samples, wallpapers ou project files para disponibilizar.
const placeholderItems = [
    { type: "Demo", title: "[ADD DEMO TITLE]" },
    { type: "Experiment", title: "[ADD EXPERIMENT TITLE]" },
    { type: "Behind the Music", title: "[ADD BTS CONTENT]" },
];

export default function TheRoom() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/the-room"
                title="The Room"
                description="Demos, ideias inacabadas e experimentos de Drazyx."
            />
            <div className="max-w-3xl mx-auto">
                <Reveal as="div">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">The Room</h1>
                    <p className="mt-4 text-[var(--text-mid)] leading-relaxed">
                        Unfinished things, late night ideas, sounds that almost became songs.
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {placeholderItems.map((item, i) => (
                        <div key={i} className="glass rounded-2xl p-6 aspect-square flex flex-col justify-between">
                            <p className="text-xs tracking-wide text-[var(--violet-soft)]">{item.type}</p>
                            <p className="text-sm text-[var(--text-low)]">{item.title}</p>
                        </div>
                    ))}
                </Reveal>

                <Reveal as="div" className="mt-16 glass rounded-2xl p-8">
                    <h2 className="font-display text-xl text-[var(--text-hi)]">Join the Room</h2>
                    <p className="mt-2 text-sm text-[var(--text-mid)] max-w-md">
                        Get unreleased music, demos and occasional drops from Drazyx.
                    </p>
                    <div className="mt-5">
                        <NewsletterForm />
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-16">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-3">Free Downloads</h2>
                    <p className="text-sm text-[var(--text-mid)]">
                        [ADD FREE DOWNLOADS: free beats, MIDI, samples, wallpapers, presets ou project files]
                    </p>
                </Reveal>
            </div>
        </div>
    );
}