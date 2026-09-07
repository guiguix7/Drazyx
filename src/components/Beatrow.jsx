import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "./Audioplayer";

export default function BeatRow({ beat }) {
    const { playingId, toggle } = useAudioPlayer();
    const isPlaying = playingId === beat.id;
    const hasPreview = Boolean(beat.previewUrl);

    return (
        <div className="beat-row grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-4 px-4 sm:px-5 rounded-xl border border-transparent transition-colors">
            <button
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-hair)] text-[var(--text-hi)] hover:border-[var(--violet-soft)] transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={hasPreview ? `${isPlaying ? "Pausar" : "Tocar"} ${beat.name}` : `Preview de ${beat.name} indisponível`}
                onClick={() => toggle(beat.id, beat.previewUrl)}
                disabled={!hasPreview}
                title={hasPreview ? undefined : "Preview em breve"}
            >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            <div className="min-w-0">
                <p className="font-display text-[var(--text-hi)] tracking-wide">{beat.name}</p>
                <p className="text-sm text-[var(--text-low)] mt-0.5">
                    {beat.bpm} BPM · {beat.key} <span>— {beat.mood}</span>
                </p>
            </div>

            <div className="flex items-center gap-2 sm:justify-end flex-wrap">
                {beat.purchaseUrl ? (
                    // Quando purchaseUrl existir (BeatStars/Airbit/checkout próprio),
                    // troque estes <button> por <a href={beat.purchaseUrl}>.
                    <>
                        <button className="price-chip text-xs sm:text-sm px-3 py-1.5 rounded-full">
                            MP3 (R$ {beat.mp3Price})
                        </button>
                        <button className="price-chip text-xs sm:text-sm px-3 py-1.5 rounded-full">
                            WAV (R$ {beat.wavPrice})
                        </button>
                        <button className="price-chip text-xs sm:text-sm px-3 py-1.5 rounded-full border-[var(--violet-soft)]/40">
                            Exclusive (R$ {beat.exclusivePrice})
                        </button>
                    </>
                ) : (
                    // Sem checkout configurado ainda: leva para o contato com o
                    // assunto "Buy a Beat" pré-selecionado, em vez de simular uma compra.
                    <Link
                        to={`/contact?subject=Buy a Beat&beat=${encodeURIComponent(beat.name)}`}
                        className="price-chip text-xs sm:text-sm px-3 py-1.5 rounded-full"
                    >
                        MP3 R$ {beat.mp3Price} · WAV R$ {beat.wavPrice} · Exclusive R$ {beat.exclusivePrice} — Inquire
                    </Link>
                )}
            </div>
        </div>
    );
}