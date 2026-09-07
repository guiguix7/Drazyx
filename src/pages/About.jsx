import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { releases } from "../data/Releases.js";

// Gêneros informados diretamente por você.
const genres = ["Trap", "Electronic", "Lo-fi", "Phonk", "Jersey Club"];

export default function About() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/about"
                title="About"
                description="Sobre Drazyx — artista e produtor independente."
            />
            <div className="max-w-3xl mx-auto">
                <Reveal as="div">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">About</h1>
                </Reveal>

                <Reveal as="div" className="mt-10">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-3">Bio</h2>
                    {/* TODO: substituir pelo texto de bio real do artista */}
                    <p className="text-[var(--text-mid)] leading-relaxed">[ADD BIO HERE]</p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-3">Artistic Identity</h2>
                    {/* TODO: substituir pelo texto real de influências/estética */}
                    <p className="text-[var(--text-mid)] leading-relaxed">
                        [ADD ARTISTIC IDENTITY / INFLUENCES TEXT]
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-3">Music</h2>
                    <div className="flex flex-wrap gap-2.5">
                        {genres.map((g) => (
                            <span key={g} className="glass rounded-full px-4 py-1.5 text-sm text-[var(--text-mid)]">
                                {g}
                            </span>
                        ))}
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-3">Production</h2>
                    {/* TODO: substituir pelo texto real sobre o que ele produz */}
                    <p className="text-[var(--text-mid)] leading-relaxed">
                        [ADD PRODUCTION DESCRIPTION]
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-4">Timeline</h2>
                    {/* TODO: ordenar cronologicamente com datas reais quando existirem */}
                    <ul className="space-y-3">
                        {releases.map((r) => (
                            <li key={r.id} className="flex items-baseline gap-4 text-sm">
                                <span className="text-[var(--text-low)] w-16 flex-shrink-0">{r.year}</span>
                                <span className="text-[var(--text-hi)]">{r.title}</span>
                                <span className="text-[var(--text-low)]">{r.type}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </div>
    );
}