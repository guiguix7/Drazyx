import SEO from "../components/SEO";
import Reveal from "../components/Reval";
import SupportCard from "../components/SupportCard";
import { supportLinks } from "../data/socialLinks";

export default function Support() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/support"
                title="Support the Music"
                description="Apoie o trabalho de Drazyx."
            />
            <div className="max-w-2xl mx-auto">
                <Reveal as="div">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">
                        Support the Music
                    </h1>
                    <p className="mt-4 text-[var(--text-mid)] leading-relaxed">
                        If something I made stayed with you, you can help me make more.
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SupportCard
                        title="Buy Me a Coffee"
                        description="Um apoio pontual para ajudar a manter a produção."
                        href={supportLinks.buyMeACoffee}
                    />
                    <SupportCard
                        title="Ko-fi"
                        description="Outra forma de apoiar pontualmente o trabalho."
                        href={supportLinks.koFi}
                    />
                    <SupportCard
                        title="Pix"
                        description="Apoio direto via Pix."
                        href={supportLinks.pix}
                    />
                    <SupportCard
                        title="Support monthly"
                        description="Apoio recorrente — em breve."
                        href={null}
                    />
                </Reveal>
            </div>
        </div>
    );
}