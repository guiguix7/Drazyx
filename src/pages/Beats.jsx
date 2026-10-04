import { Link } from "react-router-dom";
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
                description="Instrumentals from the Drazyx world: melancholic trap, dark lo-fi and atmospheric beats available to license as MP3, WAV or exclusive."
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="header" className="mb-12">
                    <p className="eyebrow">instrumentals</p>
                    <h1 className="page-title mt-3">Beats</h1>
                    <p className="lede mt-5">Sounds from the Drazyx world, available for your own project.</p>
                </Reveal>

                {/*
                  DEV NOTE: quando houver BeatStars/Airbit, preencha purchaseUrl em data/Beats.js
                  (ou substitua esta lista por um embed da loja).
                */}
                <Reveal as="div" className="border-t border-[var(--border-hair)]">
                    {beats.map((b) => (
                        <BeatRow key={b.id} beat={b} />
                    ))}
                </Reveal>

                <Reveal as="div" className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <Link to="/production" className="link-arrow">
                        Want one made from scratch? <span aria-hidden="true">→</span>
                    </Link>
                    <Link to="/licensing" className="link-arrow">
                        Licensing for film, games & video <span aria-hidden="true">→</span>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}
