import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import BeatRow from "../components/Beatrow.jsx";
import { beats } from "../data/Beats.js";

export default function Beats() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/beats"
                title="Beats"
                description="Beat store de Drazyx — instrumentais melancólicas de trap e lo-fi, licenciamento em MP3, WAV e exclusivo."
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="div" className="max-w-lg mb-10">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">Beats</h1>
                    <p className="mt-3 text-[var(--text-mid)]">
                        Instrumentais disponíveis para licenciamento.
                    </p>
                </Reveal>

                {/*
          DEV NOTE: quando a conta do BeatStars ou Airbit estiver pronta,
          esta lista manual pode ser substituída por um embed, ex:
          <iframe src="https://player.beatstars.com/?storeId=XXXX" width="100%" height="600" />
        */}
                <Reveal as="div" className="glass rounded-2xl p-2 sm:p-3 divide-y divide-[var(--border-hair)]">
                    {beats.map((b) => (
                        <BeatRow key={b.id} beat={b} />
                    ))}
                </Reveal>
            </div>
        </div>
    );
}