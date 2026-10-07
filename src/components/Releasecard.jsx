import { Link } from 'react-router-dom';
import Artwork from './Artwork.jsx';
import { hasTitle, releaseMeta, releaseTitle, clean } from '../lib/helpers.js';

export default function ReleaseCard({ release, showMeta = true }) {
    const title = releaseTitle(release);
    const meta = releaseMeta(release);
    const genre = clean(release.genre);

    return (
        <Link to={`/music/${release.id}`} className="group block" aria-label={`Open ${title}`}>
            <div className="record-object card-hover">
                <Artwork
                    src={release.coverUrl}
                    alt={`Cover art for ${title}`}
                    label="release cover not added yet"
                    meta={genre || undefined}
                />
                <div className="record-object__meta">
                    <p className="terminal-label">/music/{release.id}</p>
                </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className={`font-display text-lg leading-tight transition-colors group-hover:text-[var(--color-accent-soft)] ${hasTitle(release) ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]'}`}>
                        {title}
                    </h3>
                    {showMeta && meta && <p className="eyebrow mt-1.5">{meta}</p>}
                    {genre && <p className="text-xs text-[var(--color-text-faint)] mt-2">{genre}</p>}
                </div>
                <span className="text-[var(--color-text-faint)] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
        </Link>
    );
}
