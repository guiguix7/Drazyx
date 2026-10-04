import { Link } from "react-router-dom";
import { roomEntries } from "../data/Room.js";
import { roomCategories } from "../data/Site.js";
import RoomEntry from "./Roomentry.jsx";

// Home teaser: the latest real entry if there is one, otherwise what lives inside.
export default function RoomPreview() {
    const latest = roomEntries.slice(0, 2);
    return (
        <div>
            {latest.length > 0 ? (
                <div className="border-t border-[var(--border-hair)]">
                    {latest.map((e) => (
                        <RoomEntry key={e.id} entry={e} />
                    ))}
                </div>
            ) : (
                <ul className="flex flex-wrap gap-2" aria-label="What's inside The Room">
                    {roomCategories.map((c) => (
                        <li key={c.id} className="chip" title={c.blurb}>
                            {c.label}
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/the-room" className="btn-primary mt-8">
                Enter the room
            </Link>
        </div>
    );
}
