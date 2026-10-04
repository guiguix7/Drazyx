import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { licensingUseCases } from "../data/Contact.js";

export default function Licensing() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/licensing"
                title="Licensing"
                description="License Drazyx music for videos, short films, games, content and commercial projects. Custom licensing available."
            />
            <div className="max-w-5xl mx-auto">
                <Reveal as="header" className="mb-12">
                    <p className="eyebrow">sync & use</p>
                    <h1 className="page-title mt-3">Licensing</h1>
                    <p className="lede mt-5">
                        Drazyx's music and instrumentals can be licensed for use in other people's projects.
                    </p>
                </Reveal>

                <Reveal as="section" className="grid gap-6 md:grid-cols-[1fr_2fr] py-10 border-t border-[var(--border-hair)]">
                    <h2 className="eyebrow">what it's for</h2>
                    <ul className="flex flex-wrap gap-2 max-w-xl">
                        {licensingUseCases.map((use) => (
                            <li key={use} className="chip">{use}</li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal as="section" className="grid gap-6 md:grid-cols-[1fr_2fr] py-10 border-t border-[var(--border-hair)]">
                    <h2 className="eyebrow">how it works</h2>
                    <ol className="max-w-xl space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
                        <li><span className="font-display text-[var(--color-accent-soft)] mr-3">01</span>You send the details of your project and where the music will be used.</li>
                        <li><span className="font-display text-[var(--color-accent-soft)] mr-3">02</span>Drazyx replies with terms and pricing.</li>
                        <li><span className="font-display text-[var(--color-accent-soft)] mr-3">03</span>Once it's agreed, you get the license and the files.</li>
                    </ol>
                </Reveal>

                <Reveal as="div" className="pt-10 border-t border-[var(--border-hair)] flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link to="/contact?subject=Licensing" className="btn-primary">Request a license</Link>
                    <Link to="/beats" className="link-arrow text-sm">
                        Browse beats <span aria-hidden="true">→</span>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}
