import { Link } from 'react-router-dom';
import { ExternalLink, Play, Pause, MessageCircle } from 'lucide-react';
import { useAudioPlayer } from './Audioplayer.jsx';
import Artwork from './Artwork.jsx';
import { safeUrl } from '../lib/helpers.js';

function BeatCover({ beat }) {
    if (beat.artworkUrl) {
        return <Artwork src={beat.artworkUrl} alt={`Artwork for ${beat.title}`} className="beat-cover" />;
    }
    return (
        <div className="beat-cover beat-cover--empty" aria-hidden="true">
            <span>{beat.title}<br />{beat.bpm ? `${beat.bpm} BPM` : 'instrumental'}</span>
        </div>
    );
}

export default function BeatRow({ beat }) {
    const { playingId, toggle } = useAudioPlayer();
    const isPlaying = playingId === beat.id;
    const hasPreview = Boolean(beat.previewUrl);
    const licenses = (beat.licenses ?? []).filter((license) => license.price !== null);
    const primaryHref = safeUrl(beat.purchaseUrl);
    const inquiryHref = safeUrl(beat.inquiryUrl) || `/contact?subject=Beat&beat=${encodeURIComponent(beat.title)}`;

    return (
        <article className="beat-row group">
            <div className="beat-row__main">
                <button
                    type="button"
                    className="beat-play"
                    aria-label={hasPreview ? `${isPlaying ? 'Pause' : 'Play'} ${beat.title}` : `${beat.title}: preview not available`}
                    aria-pressed={hasPreview ? isPlaying : undefined}
                    onClick={() => toggle(beat.id, beat.previewUrl, beat.title)}
                    disabled={!hasPreview}
                    title={hasPreview ? undefined : 'Preview not available yet'}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>

                <BeatCover beat={beat} />

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-xl tracking-tight text-[var(--color-text)] truncate">{beat.title}</h2>
                        {beat.featured && <span className="eyebrow eyebrow-accent">featured</span>}
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1.5">
                        {[beat.bpm && `${beat.bpm} BPM`, beat.musical_key, beat.mood, beat.genre].filter(Boolean).join(' · ')}
                    </p>
                    {beat.description && <p className="text-sm text-[var(--color-text-faint)] mt-2 leading-relaxed">{beat.description}</p>}
                    {licenses.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {licenses.map((license) => (
                                <span key={license.name} className="price-chip">{license.name} <strong className="font-medium text-[var(--color-text)]">{license.priceLabel}</strong></span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                {primaryHref ? (
                    <a href={primaryHref} target="_blank" rel="noreferrer" className="btn-secondary platform-button platform-button--bandcamp">
                        <span>License</span><ExternalLink size={12} aria-hidden="true" />
                    </a>
                ) : (
                    <Link to={inquiryHref} className="btn-secondary">
                        <MessageCircle size={14} />
                        <span>Ask about it</span>
                    </Link>
                )}
            </div>
        </article>
    );
}
