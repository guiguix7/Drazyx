import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reval";
import { licensingUseCases } from "../data/contact";

export default function Licensing() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/licensing"
                title="License My Music"
                description="Licencie músicas de Drazyx para vídeos, filmes, jogos e outros projetos."
            />
            <div className="max-w-3xl mx-auto">
                <Reveal as="div">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">
                        License My Music
                    </h1>
                    <p className="mt-4 text-[var(--text-mid)] leading-relaxed">
                        Músicas e instrumentais de Drazyx podem ser licenciadas para uso em outros projetos.
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-4">O que pode ser licenciado</h2>
                    <div className="flex flex-wrap gap-2.5">
                        {licensingUseCases.map((use) => (
                            <span
                                key={use}
                                className="glass rounded-full px-4 py-1.5 text-sm text-[var(--text-mid)]"
                            >
                                {use}
                            </span>
                        ))}
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <h2 className="font-display text-lg text-[var(--text-hi)] mb-3">Como funciona</h2>
                    <ol className="space-y-2 text-sm text-[var(--text-mid)] list-decimal list-inside">
                        <li>Você envia os detalhes do projeto e onde a música será usada.</li>
                        <li>Drazyx retorna com os termos e valores de licenciamento.</li>
                        <li>Após aprovação, a licença e o arquivo são entregues.</li>
                    </ol>
                </Reveal>

                <Reveal as="div" className="mt-12">
                    <Link
                        to="/contact?subject=Licensing"
                        className="btn-primary inline-block px-6 py-3 rounded-full text-sm font-medium"
                    >
                        Request a License
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}