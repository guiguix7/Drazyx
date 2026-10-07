import { roomCategories } from '../data/Site.js';
import PixelMark from './Pixelmark.jsx';
import { safeUrl } from '../lib/helpers.js';

export default function RoomEntry({ entry }) {
    const category = roomCategories.find((item) => item.id === entry.category)?.label ?? entry.category;
    const content = (
        <div className="room-entry group">
            <div className="font-display text-sm text-[var(--color-text-faint)] pt-0.5">{entry.number}</div>
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="eyebrow eyebrow-accent">{category}</p>
                    {entry.date && <span className="terminal-label">{entry.date}</span>}
                </div>
                <div className="flex items-start justify-between gap-4 mt-1.5">
                    <p className="text-[var(--color-text)] text-lg leading-snug">{entry.title}</p>
                    {entry.href && <PixelMark mark="cursor" size={13} className="mt-1 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent-soft)]" />}
                </div>
                {entry.note && <p className="text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">{entry.note}</p>}
            </div>
        </div>
    );

    const safeHref = safeUrl(entry.href);
    return safeHref ? (
        <a href={safeHref} target={/^https:\/\//.test(safeHref) ? '_blank' : undefined} rel={/^https:\/\//.test(safeHref) ? 'noreferrer' : undefined} className="block">
            {content}
        </a>
    ) : content;
}
