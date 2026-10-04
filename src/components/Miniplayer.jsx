import { Play, Pause, X } from "lucide-react";
import { useAudioPlayer } from "./Audioplayer.jsx";

// Floating controller so a preview can always be paused, from any page.
export default function MiniPlayer() {
    const { current, playingId, progress, toggle, stop } = useAudioPlayer();
    if (!current) return null;
    const isPlaying = playingId === current.id;

    return (
        <div className="mini-player" role="region" aria-label="Audio player">
            <div className="flex items-center gap-3 px-3 py-2">
                <button
                    type="button"
                    onClick={() => toggle(current.id, "keep", current.title)}
                    className="w-11 h-11 rounded-full flex items-center justify-center border border-[var(--border-strong)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
                    aria-label={isPlaying ? `Pause ${current.title}` : `Play ${current.title}`}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <div className="min-w-0 flex-1">
                    <p className="eyebrow">{isPlaying ? "playing" : "paused"}</p>
                    <p className="text-sm text-[var(--color-text)] truncate">{current.title}</p>
                </div>
                <button
                    type="button"
                    onClick={stop}
                    className="w-11 h-11 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                    aria-label="Close player"
                >
                    <X size={16} />
                </button>
            </div>
            <div className="progress-track" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
        </div>
    );
}
