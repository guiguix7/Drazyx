import PlatformIcon from './PlatformIcon.jsx';
import { platforms } from '../data/Sociallinks.js';

const platformClass = (id) => `platform-button--${id}`;

export default function SocialLinks({ variant = 'rows', only }) {
    const list = only ? platforms.filter((platform) => only.includes(platform.id)) : platforms;

    if (variant === 'icons') {
        return (
            <ul className="flex flex-wrap items-center gap-1" aria-label="Drazyx platforms">
                {list.map((platform) => (
                    <li key={platform.id}>
                        <a
                            href={platform.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`social-icon-button platform-button--${platform.id}`}
                            aria-label={`${platform.label} — ${platform.role} (opens in a new tab)`}
                        >
                            <PlatformIcon platform={platform.id} size={18} />
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul className="border-t border-[var(--border-hair)]" aria-label="Drazyx elsewhere">
            {list.map((platform) => (
                <li key={platform.id}>
                    <a
                        href={platform.href}
                        target="_blank"
                        rel="noreferrer"
                        className="social-row group"
                        aria-label={`${platform.label} — ${platform.role} (opens in a new tab)`}
                    >
                        <span className="social-name min-w-0 flex items-center gap-3 text-[var(--color-text-secondary)] transition-colors">
                            <span className={`w-8 h-8 shrink-0 inline-flex items-center justify-center border border-[var(--border-hair)] ${platformClass(platform.id)}`}>
                                <PlatformIcon platform={platform.id} size={16} />
                            </span>
                            <span className="font-display text-[0.96rem] text-[var(--color-text)]">{platform.label}</span>
                        </span>
                        <span className="social-role text-sm">{platform.role} <span aria-hidden="true">↗</span></span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
