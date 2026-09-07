import SEO from "../components/SEO";
import Reveal from "../components/Reval";
import ReleaseCard from "../components/ReleaseCard";
import { releases } from "../data/releases";

// TODO: quando houver mais lançamentos, separar de fato em grupos
// (Latest Releases / Singles / Albums & EPs / Instrumentals) filtrando
// por release.type. Por ora só temos 2 álbuns cadastrados.

export default function Music() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/music"
                title="Music"
                description="Discografia de Drazyx — álbuns e lançamentos, direto do Spotify."
            />
            <div className="max-w-6xl mx-auto">
                <Reveal as="div" className="max-w-lg mb-14">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">Music</h1>
                    <p className="mt-3 text-[var(--text-mid)]">Discografia completa.</p>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {releases.map((r) => (
                        <Reveal as="div" key={r.id}>
                            <ReleaseCard release={r} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}