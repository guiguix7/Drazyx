import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "./Audioplayer.jsx";

// A beat as a small piece of the Drazyx world, not a marketplace listing.
// Expects a row from listPublicBeats(): { id, title, bpm, musical_key, mood, description,
// previewUrl, purchaseUrl, inquiryUrl, licenses: [{ name, price, purchaseUrl }] }
export default function BeatRow({ beat }) {
    const { playingId, toggle } = useAudioPlayer();
    const isPlaying = playingId === beat.id;
    const hasPreview = Boolean(beat.previewUrl);
    const licenses = (beat.licenses ?? []).filter((l) => l.price !== null);
    const primaryHref = beat.purchaseUrl || null;

    return (
        <article className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-4 py-6 border-b border-[var(--border-hair)]">
            <button
                type="button"
                className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border-strong)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={hasPreview ? `${isPlaying ? "Pause" : "Play"} ${beat.title}` : `${beat.title}: no preview yet`}
                aria-pressed={hasPreview ? isPlaying : undefined}
                onClick={() => toggle(beat.id, beat.previewUrl, beat.title)}
                disabled={!hasPreview}
                title={hasPreview ? undefined : "No preview yet"}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <div className="min-w-0">
                <h2 className="font-display text-xl tracking-wide text-[var(--color-text)]">{beat.title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {[beat.bpm && `${beat.bpm} BPM`, beat.musical_key, beat.mood].filter(Boolean).join(" · ")}
                </p>
                {beat.description && (
                    <p className="text-sm text-[var(--color-text-faint)] mt-2 italic">{beat.description}</p>
                )}
                {licenses.length > 0 && (
                    <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        {licenses.map((l) => `${l.name} ${l.priceLabel}`).join(" · ")}
                    </p>
                )}
            </div>

            <div className="col-span-2 sm:col-span-1 sm:text-right">
                {primaryHref ? (
                    <a href={primaryHref} target="_blank" rel="noreferrer" className="btn-secondary">
                        Get this beat
                    </a>
                ) : (
                    <Link to={beat.inquiryUrl || "/contact"} className="btn-secondary">
                        Ask about this beat
                    </Link>
                )}
            </div>
        </article>
    );
}
