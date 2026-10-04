import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { about, genres } from "../data/About.js";
import { isTodo } from "../lib/helpers.js";

function Block({ label, text, children }) {
    return (
        <Reveal as="section" className="grid gap-4 md:grid-cols-[1fr_2fr] py-10 border-t border-[var(--border-hair)]">
            <h2 className="eyebrow">{label}</h2>
            <div className="max-w-xl">
                {text !== undefined &&
                    (isTodo(text) ? (
                        <p className="text-[var(--color-text-faint)] italic">This part is still being written.</p>
                    ) : (
                        <p className="text-[var(--color-text)] text-lg leading-relaxed">{text}</p>
                    ))}
                {children}
            </div>
        </Reveal>
    );
}

export default function About() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/about"
                title="About"
                description="Who Drazyx is, what he makes and what the music is made of. An independent artist and producer from Brazil."
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "MusicGroup",
                    name: "Drazyx",
                    genre: genres,
                }}
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="header" className="mb-12">
                    <p className="eyebrow">hello</p>
                    <h1 className="page-title mt-3">About</h1>
                </Reveal>

                <Block label="who" text={about.who} />
                <Block label="what I make" text={about.whatIMake}>
                    <ul className="flex flex-wrap gap-2 mt-5" aria-label="Genres">
                        {genres.map((g) => (
                            <li key={g} className="chip">{g}</li>
                        ))}
                    </ul>
                </Block>
                <Block label="what inspires me" text={about.inspires} />
                <Block label="the story" text={about.story} />
                <Block label="currently" text={about.currently} />

                <Reveal as="div" className="pt-10 border-t border-[var(--border-hair)]">
                    <Link to="/music" className="btn-primary">Hear it for yourself</Link>
                </Reveal>
            </div>
        </div>
    );
}
