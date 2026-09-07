import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reval";
import { services } from "../data/services";

export default function Production() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/production"
                title="Production"
                description="Serviços de produção de Drazyx: beats sob encomenda, mixagem, masterização e colaboração."
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="div" className="max-w-lg mb-14">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">Production</h1>
                    <p className="mt-3 text-[var(--text-mid)]">
                        Produção, mixagem e colaboração sob medida para o seu projeto.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {services.map((s) => (
                        <Reveal as="div" key={s.id} className="glass rounded-2xl p-6 flex flex-col">
                            <p className="text-xs tracking-wide text-[var(--violet-soft)]">{s.subtitle}</p>
                            <h2 className="font-display text-xl text-[var(--text-hi)] mt-1.5">{s.title}</h2>
                            <p className="mt-3 text-sm text-[var(--text-mid)] leading-relaxed">{s.description}</p>
                            <p className="mt-4 text-xs text-[var(--text-low)]">{s.forWho}</p>

                            <ul className="mt-4 space-y-1.5 text-xs text-[var(--text-low)] flex-1">
                                {s.included.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>

                            <Link
                                to={`/contact?subject=${encodeURIComponent(
                                    s.id === "mix-master" ? "Mix & Master" : s.id === "custom-beats" ? "Custom Production" : "Collaboration"
                                )}`}
                                className="btn-secondary mt-6 px-4 py-2.5 rounded-full text-sm text-center"
                            >
                                {s.ctaLabel}
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}