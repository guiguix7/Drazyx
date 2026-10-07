import { Coffee, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import SupportCard from '../components/Supportcard.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { supportLinks } from '../data/Sociallinks.js';

const options = [
    { key: 'bandcamp', title: 'Bandcamp', description: 'Buy and collect the music directly. The most direct way to support it.', featured: true, icon: Heart },
    { key: 'buyMeACoffee', title: 'Buy Me a Coffee', description: 'A one-time thank-you.', icon: Coffee },
    { key: 'koFi', title: 'Ko-fi', description: 'Another way to leave a one-time tip.', icon: Heart },
    { key: 'pix', title: 'Pix', description: 'Direct support via Pix.', icon: Heart },
];

export default function Support() {
    const activeOptions = options.filter((option) => option.key === 'bandcamp' || supportLinks[option.key]);

    return (
        <PageShell
            eyebrow="thank you for being here"
            title="Support"
            lede="If the music means something to you and you want to help keep it moving, thank you. Listening and sharing already count."
            marker="heart"
            width="narrow"
            className="support-page"
        >
            <SEO
                path="/support"
                title="Support"
                description="Ways to support Drazyx: collect the music on Bandcamp or use other configured support methods."
            />

            <Reveal as="section" className="support-note room-file pixel-corners mb-8">
                <div className="room-file__bar"><span>support / no pressure</span><span>thank you</span></div>
                <div className="room-file__body">
                    <RoomGlyph mark="heart" label="music first" />
                    <p className="font-display text-2xl sm:text-3xl text-[var(--color-text)] leading-snug mt-4 max-w-xl">The best support is still listening.</p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-3 max-w-xl">Everything below is optional. There is no countdown, no urgency and no fake exclusivity.</p>
                </div>
            </Reveal>

            <Reveal as="div" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {activeOptions.map((option) => {
                    const Icon = option.icon;
                    return <SupportCard key={option.key} title={option.title} description={option.description} href={supportLinks[option.key]} featured={option.featured} icon={<Icon size={17} />} />;
                })}
                <SupportCard title="Merch" description="A small merch shop is planned, but there is no real store connected yet." comingSoon icon={<ShoppingBag size={17} />} />
            </Reveal>

            <Reveal as="div" className="mt-14 flex flex-wrap gap-4">
                <Link to="/music" className="link-arrow">Keep listening <span aria-hidden="true">→</span></Link>
                <Link to="/the-room" className="link-arrow">Step into The Room <span aria-hidden="true">→</span></Link>
            </Reveal>
        </PageShell>
    );
}
