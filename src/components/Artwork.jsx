import PixelMark from './Pixelmark.jsx';
import { safeUrl } from '../lib/helpers.js';

export default function Artwork({ src, alt = '', label = 'cover art not added yet', className = '', priority = false, meta }) {
    const safeSrc = safeUrl(src);

    return (
        <div className={`artwork ${className}`}>
            {safeSrc ? (
                <img
                    src={safeSrc}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={priority ? 'high' : 'auto'}
                />
            ) : (
                <div className="artwork-empty w-full h-full" {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
                    <div className="relative z-[1] flex flex-col items-center gap-2">
                        <PixelMark mark="star" size={18} className="text-[var(--color-accent-soft)]" />
                        <span>{label}</span>
                        {meta && <span className="text-[var(--color-text-faint)] normal-case tracking-[0.04em]">{meta}</span>}
                    </div>
                </div>
            )}
        </div>
    );
}
