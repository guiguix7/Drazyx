import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { services } from "../data/Services.js";
import { isTodo } from "../lib/helpers.js";

const subjectFor = { "mix-master": "Mix & Master", "custom-beats": "Custom Production", collaboration: "Collaboration" };

export default function Production() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/production"
                title="Production"
                description="Drazyx also works with other artists: custom beats, mixing and mastering, and collaboration."
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="header" className="mb-14">
                    <p className="eyebrow">for other artists</p>
                    <h1 className="page-title mt-3">Production</h1>
                    <p className="lede mt-5">Drazyx also works with other artists. If you want to make something together, here's how.</p>
                </Reveal>

                <div className="border-t border-[var(--border-hair)]">
                    {services.map((s, i) => {
                        const included = s.included.filter((item) => !isTodo(item));
                        return (
                            <Reveal as="article" key={s.id} className="grid gap-5 md:grid-cols-[3rem_1fr_2fr_auto] items-start py-8 border-b border-[var(--border-hair)]">
                                <span className="font-display text-sm text-[var(--color-text-faint)]">{String(i + 1).padStart(2, "0")}</span>
                                <div>
                                    <h2 className="font-display text-2xl text-[var(--color-text)]">{s.title}</h2>
                                    <p className="eyebrow mt-1">{s.subtitle}</p>
                                </div>
                                <div className="max-w-md">
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">{s.description}</p>
                                    <p className="mt-3 text-sm text-[var(--color-text-faint)]">{s.forWho}</p>
                                    {included.length > 0 && (
                                        <ul className="mt-3 space-y-1 text-sm text-[var(--color-text-secondary)] list-disc list-inside">
                                            {included.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <Link
                                    to={`/contact?subject=${encodeURIComponent(subjectFor[s.id] ?? "Other")}`}
                                    className="btn-secondary"
                                    aria-label={`${s.ctaLabel}: ${s.title}`}
                                >
                                    {s.ctaLabel}
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal as="div" className="mt-14">
                    <Link to="/music" className="link-arrow text-sm">
                        Hear what Drazyx makes first <span aria-hidden="true">→</span>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}
