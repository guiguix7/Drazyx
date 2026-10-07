import PixelMark from './Pixelmark.jsx';

export default function RoomGlyph({ mark = 'monitor', label = 'room detail', className = '' }) {
    return (
        <div className={`room-glyph ${className}`} aria-hidden="true">
            <PixelMark mark={mark} size={20} />
            <span>{label}</span>
        </div>
    );
}
