import { Link } from 'react-router-dom';
import { FileMusic, Gamepad2, Video } from 'lucide-react';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { licensingUseCases } from '../data/Contact.js';

export default function Licensing() {
    return (
        <PageShell
            eyebrow="sync & use"
            title="Licensing"
            lede="Drazyx's music and instrumentals can be licensed for use in other people's projects."
            marker="folder"
            width="narrow"
        >
            <SEO
                path="/licensing"
                title="Licensing"
                description="License Drazyx music for videos, short films, games, content and commercial projects."
            />

            <Reveal as="section" className="grid gap-8 lg:grid-cols-[0.85fr_1.7fr] py-10 border-t border-[var(--border-hair)]">
                <div><h2 className="eyebrow">what it's for</h2><p className="terminal-label mt-3">use cases / clear terms</p></div>
                <ul className="grid sm:grid-cols-2 gap-2 max-w-2xl">
                    {licensingUseCases.map((use, index) => (
                        <li key={use} className="chip min-h-[44px] rounded-[var(--radius-small)] flex items-center gap-2 border border-[var(--border-hair)] px-3">
                            {index % 3 === 0 ? <Video size={14} /> : index % 3 === 1 ? <Gamepad2 size={14} /> : <FileMusic size={14} />}
                            <span>{use}</span>
                        </li>
                    ))}
                </ul>
            </Reveal>

            <Reveal as="section" className="grid gap-8 lg:grid-cols-[0.85fr_1.7fr] py-10 border-t border-[var(--border-hair)]">
                <div><h2 className="eyebrow">how it works</h2><p className="terminal-label mt-3">three steps / no mystery</p></div>
                <ol className="max-w-2xl space-y-5">
                    <li className="flex gap-4"><span className="font-display text-[var(--color-accent-soft)]">01</span><span className="text-[var(--color-text-secondary)] leading-relaxed">You send the details of your project and where the music will be used.</span></li>
                    <li className="flex gap-4"><span className="font-display text-[var(--color-accent-soft)]">02</span><span className="text-[var(--color-text-secondary)] leading-relaxed">Drazyx replies with terms and pricing for that specific use.</span></li>
                    <li className="flex gap-4"><span className="font-display text-[var(--color-accent-soft)]">03</span><span className="text-[var(--color-text-secondary)] leading-relaxed">Once it's agreed, you get the license and the files that are part of the agreement.</span></li>
                </ol>
            </Reveal>

            <Reveal as="div" className="pt-9 border-t border-[var(--border-hair)] flex flex-wrap items-center gap-4">
                <Link to="/contact?subject=Licensing" className="btn-primary">Request a license <span aria-hidden="true">↗</span></Link>
                <Link to="/beats" className="btn-secondary">Browse beats <span aria-hidden="true">→</span></Link>
                <RoomGlyph mark="folder" label="licensing is project-specific" />
            </Reveal>
        </PageShell>
    );
}
