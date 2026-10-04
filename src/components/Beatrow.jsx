import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "./Audioplayer.jsx";

// A beat as a small piece of the Drazyx world, not a marketplace listing.
export default function BeatRow({ beat }) {
    const { playingId, toggle } = useAudioPlayer();
    const isPlaying = playingId === beat.id;
    const hasPreview = Boolean(beat.previewUrl);
    const prices = `MP3 R$ ${beat.mp3Price} · WAV R$ ${beat.wavPrice} · Exclusive R$ ${beat.exclusivePrice}`;

    return (
        <article className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-4 py-6 border-b border-[var(--border-hair)]">
            <button
                type="button"
                className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border-strong)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={hasPreview ? `${isPlaying ? "Pause" : "Play"} ${beat.name}` : `${beat.name}: preview coming soon`}
                aria-pressed={hasPreview ? isPlaying : undefined}
                onClick={() => toggle(beat.id, beat.previewUrl, beat.name)}
                disabled={!hasPreview}
                title={hasPreview ? undefined : "Preview coming soon"}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <div className="min-w-0">
                <h2 className="font-display text-xl tracking-wide text-[var(--color-text)]">{beat.name}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {beat.bpm} BPM · {beat.key} · {beat.mood}
                </p>
                {beat.atmosphere && (
                    <p className="text-sm text-[var(--color-text-faint)] mt-2 italic">{beat.atmosphere}</p>
                )}
            </div>

            <div className="col-span-2 sm:col-span-1 sm:text-right">
                {beat.purchaseUrl ? (
                    <a href={beat.purchaseUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                        Get this beat
                    </a>
                ) : (
                    <Link
                        to={`/contact?subject=${encodeURIComponent("Buy a Beat")}&beat=${encodeURIComponent(beat.name)}`}
                        className="btn-secondary"
                        aria-label={`Inquire about ${beat.name}. ${prices}`}
                    >
                        Inquire
                    </Link>
                )}
                <p className="text-xs text-[var(--color-text-faint)] mt-2">{prices}</p>
            </div>
        </article>
    );
}
