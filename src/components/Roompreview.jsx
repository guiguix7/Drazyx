import { Link } from 'react-router-dom';
import { roomEntries } from '../data/Room.js';
import { roomCategories } from '../data/Site.js';
import RoomEntry from './Roomentry.jsx';
import RoomGlyph from './Roomglyph.jsx';

export default function RoomPreview() {
    const latest = roomEntries.slice(0, 2);

    return (
        <div>
            {latest.length > 0 ? (
                <div className="room-file">
                    <div className="room-file__bar">
                        <span>desk / recent</span>
                        <span>{latest.length} drop{latest.length === 1 ? '' : 's'}</span>
                    </div>
                    <div className="px-4">
                        {latest.map((entry) => <RoomEntry key={entry.id} entry={entry} />)}
                    </div>
                </div>
            ) : (
                <div className="room-file pixel-corners">
                    <div className="room-file__bar">
                        <span className="inline-flex items-center gap-2"><span className="pixel-dot" aria-hidden="true" />desk / waiting</span>
                        <span>0 drops</span>
                    </div>
                    <div className="room-file__body">
                        <RoomGlyph mark="monitor" label="nothing left on the desk yet" />
                        <p className="font-display text-xl sm:text-2xl text-[var(--color-text)] mt-5 leading-snug max-w-lg">
                            The Room is ready for the things that don't belong on the polished pages.
                        </p>
                        <ul className="flex flex-wrap gap-2 mt-6" aria-label="What's inside The Room">
                            {roomCategories.map((category) => <li key={category.id} className="chip" title={category.blurb}>{category.label}</li>)}
                        </ul>
                    </div>
                </div>
            )}
            <Link to="/the-room" className="btn-primary mt-7">Enter The Room <span aria-hidden="true">↗</span></Link>
        </div>
    );
}
