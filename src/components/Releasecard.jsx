import { Link } from "react-router-dom";
import Artwork from "./Artwork.jsx";
import { hasTitle, releaseMeta, releaseTitle } from "../lib/helpers.js";

// Compact release tile: artwork first, then title and meta. Used in the
// catalog grid and in "more music" on release pages.
export default function ReleaseCard({ release, showMeta = true }) {
    const title = releaseTitle(release);
    const meta = releaseMeta(release);
    return (
        <Link to={`/music/${release.id}`} className="block group" aria-label={`Open ${title}`}>
            <Artwork src={release.coverUrl} alt={`Cover art for ${title}`} className="card-hover" />
            <h3
                className={`font-display text-lg mt-4 transition-colors group-hover:text-[var(--color-accent-soft)] ${
                    hasTitle(release) ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]"
                }`}
            >
                {title}
            </h3>
            {showMeta && meta && <p className="eyebrow mt-1">{meta}</p>}
        </Link>
    );
}
