import { roomCategories } from "../data/Site.js";

// One journal-style entry. Shape matches the future `room_posts` table.
export default function RoomEntry({ entry }) {
    const category = roomCategories.find((c) => c.id === entry.category)?.label ?? entry.category;
    const body = (
        <div className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-[var(--border-hair)]">
            <span className="font-display text-sm text-[var(--color-text-faint)] pt-0.5">{entry.number}</span>
            <div>
                <p className="eyebrow eyebrow-accent">
                    {category}
                    {entry.date && <span className="text-[var(--color-text-faint)]"> · {entry.date}</span>}
                </p>
                <p className="text-[var(--color-text)] mt-1.5 text-lg leading-snug">{entry.title}</p>
                {entry.note && <p className="text-sm text-[var(--color-text-secondary)] mt-1.5">{entry.note}</p>}
            </div>
        </div>
    );
    return entry.href ? (
        <a href={entry.href} className="block hover:bg-[var(--color-surface)] transition-colors -mx-3 px-3">
            {body}
        </a>
    ) : (
        body
    );
}
