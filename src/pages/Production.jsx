import { Link } from 'react-router-dom';
import { SlidersHorizontal, Sparkles, UsersRound } from 'lucide-react';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { services } from '../data/Services.js';
import { isTodo } from '../lib/helpers.js';

const subjectFor = { 'mix-master': 'Mix & Master', 'custom-beats': 'Custom Production', collaboration: 'Collaboration' };
const serviceIcons = { 'custom-beats': Sparkles, 'mix-master': SlidersHorizontal, collaboration: UsersRound };

export default function Production() {
    return (
        <PageShell
            eyebrow="for other artists"
            title="Production"
            lede="Drazyx also works with other artists. If you want to make something together, here's how."
            marker="headphones"
            width="wide"
        >
            <SEO
                path="/production"
                title="Production"
                description="Drazyx works with other artists: custom beats, mixing and mastering, and collaboration."
            />

            <section className="border-t border-[var(--border-hair)]">
                {services.map((service, index) => {
                    const Icon = serviceIcons[service.id] ?? Sparkles;
                    const included = service.included.filter((item) => !isTodo(item));
                    return (
                        <Reveal as="article" key={service.id} className="grid gap-6 lg:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.4fr)_auto] items-start py-9 border-b border-[var(--border-hair)]">
                            <span className="font-display text-sm text-[var(--color-text-faint)]">{String(index + 1).padStart(2, '0')}</span>
                            <div>
                                <div className="w-10 h-10 border border-[var(--border-hair)] inline-flex items-center justify-center text-[var(--color-accent-soft)] mb-4"><Icon size={17} /></div>
                                <h2 className="font-display text-2xl text-[var(--color-text)]">{service.title}</h2>
                                <p className="eyebrow mt-1">{service.subtitle}</p>
                            </div>
                            <div className="max-w-xl">
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">{service.description}</p>
                                <p className="mt-3 text-sm text-[var(--color-text-faint)]">{service.forWho}</p>
                                {included.length > 0 && <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">{included.map((item) => <li key={item}>— {item}</li>)}</ul>}
                            </div>
                            <Link to={`/contact?subject=${encodeURIComponent(subjectFor[service.id] ?? 'Other')}`} className="btn-secondary" aria-label={`${service.ctaLabel}: ${service.title}`}>
                                {service.ctaLabel} ↗
                            </Link>
                        </Reveal>
                    );
                })}
            </section>

            <Reveal as="div" className="mt-14 flex flex-wrap items-center gap-4">
                <RoomGlyph mark="monitor" label="listen before you book" />
                <Link to="/music" className="link-arrow text-sm">Hear what Drazyx makes first <span aria-hidden="true">→</span></Link>
            </Reveal>
        </PageShell>
    );
}
