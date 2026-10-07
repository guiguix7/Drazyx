import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import BeatRow from '../components/Beatrow.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { listPublicBeats, beatPreviewUrl, beatArtworkUrl, formatPrice } from '../lib/beats';

function toViewModel(beat) {
    return {
        id: beat.id,
        title: beat.title,
        bpm: beat.bpm,
        musical_key: beat.musical_key,
        genre: beat.genre,
        mood: beat.mood,
        description: beat.description,
        artworkUrl: beatArtworkUrl(beat),
        previewUrl: beatPreviewUrl(beat),
        purchaseUrl: beat.purchase_url,
        inquiryUrl: beat.inquiry_url,
        featured: beat.featured,
        licenses: beat.licenses.map((license) => ({
            name: license.name,
            price: license.price,
            priceLabel: formatPrice(license.price),
            purchaseUrl: license.purchase_url,
        })),
    };
}

export default function Beats() {
    const [state, setState] = useState({ status: 'loading', beats: [], error: null });

    useEffect(() => {
        let cancelled = false;
        listPublicBeats().then((result) => {
            if (cancelled) return;
            if (result.error) setState({ status: 'error', beats: [], error: result.error });
            else setState({ status: result.data.length ? 'ready' : 'empty', beats: result.data.map(toViewModel), error: null });
        });
        return () => { cancelled = true; };
    }, []);

    return (
        <PageShell
            eyebrow="instrumentals / shop"
            title="Beats"
            lede="Sounds from the Drazyx world, available for your own project. Preview when a real file exists; ask when a checkout is not connected."
            marker="headphones"
        >
            <SEO
                path="/beats"
                title="Beats"
                description="Instrumentals from the Drazyx world: melancholic trap, dark lo-fi and atmospheric beats available to license."
            />

            <Reveal as="section" className="shop-note room-file pixel-corners mb-10">
                <div className="room-file__bar"><span>beat shop / listening desk</span><span>preview → license → project</span></div>
                <div className="room-file__body flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div><RoomGlyph mark="headphones" label="curated instrumentals" /><p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xl mt-3">Each row is built around the real CMS record. Missing artwork, preview audio or checkout links stay visibly missing instead of being fabricated.</p></div>
                    <Link to="/contact?subject=Beat" className="btn-secondary shrink-0">Ask about a beat <span aria-hidden="true">↗</span></Link>
                </div>
            </Reveal>

            {state.status === 'loading' && <p className="text-[var(--color-text-secondary)]" aria-busy="true">Loading published beats…</p>}
            {state.status === 'error' && <p role="alert" className="text-[var(--color-text-secondary)]">{state.error}</p>}
            {state.status === 'empty' && <p className="text-[var(--color-text-secondary)]">No published beats are available right now.</p>}
            {state.status === 'ready' && (
                <Reveal as="section" className="border-t border-[var(--border-hair)]" aria-label="Published beats">
                    {state.beats.map((beat) => <BeatRow key={beat.id} beat={beat} />)}
                </Reveal>
            )}

            <Reveal as="div" className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <Link to="/production" className="link-arrow">Want one made from scratch? <span aria-hidden="true">→</span></Link>
                <Link to="/licensing" className="link-arrow">Licensing for film, games & video <span aria-hidden="true">→</span></Link>
            </Reveal>
        </PageShell>
    );
}
