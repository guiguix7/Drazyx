import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import BeatRow from "../components/Beatrow.jsx";
import { listPublicBeats, beatPreviewUrl, beatArtworkUrl, formatPrice } from "../lib/beats";

// Maps a database row to the shape BeatRow renders. Missing values stay null, nothing is faked.
function toViewModel(b) {
    return {
        id: b.id,
        title: b.title,
        bpm: b.bpm,
        musical_key: b.musical_key,
        mood: b.mood,
        description: b.description,
        artworkUrl: beatArtworkUrl(b),
        previewUrl: beatPreviewUrl(b),
        purchaseUrl: b.purchase_url,
        inquiryUrl: b.inquiry_url,
        licenses: b.licenses.map((l) => ({
            name: l.name,
            price: l.price,
            priceLabel: formatPrice(l.price),
            purchaseUrl: l.purchase_url,
        })),
    };
}

export default function Beats() {
    const [state, setState] = useState({ status: "loading", beats: [], error: null });

    useEffect(() => {
        let cancelled = false;
        listPublicBeats().then((res) => {
            if (cancelled) return;
            if (res.error) setState({ status: "error", beats: [], error: res.error });
            else setState({ status: res.data.length ? "ready" : "empty", beats: res.data.map(toViewModel), error: null });
        });
        return () => { cancelled = true; };
    }, []);

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

                {state.status === "loading" && (
                    <p className="text-[var(--color-text-secondary)]" aria-busy="true">Loading beats…</p>
                )}
                {state.status === "error" && (
                    <p role="alert" className="text-[var(--color-text-secondary)]">{state.error}</p>
                )}
                {state.status === "empty" && (
                    <p className="text-[var(--color-text-secondary)]">No beats are available right now.</p>
                )}
                {state.status === "ready" && (
                    <Reveal as="div" className="border-t border-[var(--border-hair)]">
                        {state.beats.map((b) => (
                            <BeatRow key={b.id} beat={b} />
                        ))}
                    </Reveal>
                )}

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
