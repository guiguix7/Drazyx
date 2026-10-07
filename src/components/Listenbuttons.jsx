import { ExternalLink, Headphones } from 'lucide-react';
import PlatformIcon from './PlatformIcon.jsx';
import { safeUrl } from '../lib/helpers.js';

const platformIds = {
    Spotify: 'spotify',
    SoundCloud: 'soundcloud',
    YouTube: 'youtube',
    Bandcamp: 'bandcamp',
    'Apple Music': null,
};

export default function ListenButtons({ release, size = 'md' }) {
    const items = [
        { label: 'Spotify', href: release.spotifyUrl, primary: true },
        { label: 'SoundCloud', href: release.soundcloudUrl },
        { label: 'YouTube', href: release.youtubeUrl },
        { label: 'Bandcamp', href: release.bandcampUrl },
        { label: 'Apple Music', href: release.appleMusicUrl },
    ].map((item) => ({ ...item, href: safeUrl(item.href) })).filter((item) => item.href);

    if (items.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-2.5 ${size === 'sm' ? 'text-xs' : ''}`}>
            {items.map((item) => {
                const platform = platformIds[item.label];
                return (
                    <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${item.primary ? 'btn-primary' : 'btn-secondary'} ${platform ? `platform-button platform-button--${platform}` : ''}`}
                        aria-label={`${item.primary ? 'Listen on' : 'Open on'} ${item.label} (opens in a new tab)`}
                    >
                        {platform ? <PlatformIcon platform={platform} size={16} /> : <Headphones size={15} />}
                        {item.primary ? <><span>Listen</span><span className="normal-case tracking-normal opacity-70">on {item.label}</span></> : <span>{item.label}</span>}
                        {!item.primary && <ExternalLink size={12} aria-hidden="true" />}
                    </a>
                );
            })}
        </div>
    );
}
