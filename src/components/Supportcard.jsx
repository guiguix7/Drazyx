import { safeUrl } from '../lib/helpers.js';

export default function SupportCard({ title, description, href, featured = false, icon, comingSoon = false }) {
    const safeHref = safeUrl(href);
    const className = `surface support-card rounded-[var(--radius-medium)] p-6 flex flex-col gap-4 ${featured ? 'sm:col-span-2' : ''}`;
    const content = (
        <>
            <div className="flex items-start justify-between gap-4">
                <span className="w-10 h-10 border border-[var(--border-hair)] inline-flex items-center justify-center text-[var(--color-accent-soft)]">{icon}</span>
                {comingSoon && <span className="eyebrow">coming soon</span>}
            </div>
            <h2 className="font-display text-xl text-[var(--color-text)]">{title}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
            {safeHref && <span className={`${featured ? 'btn-primary' : 'btn-secondary'} self-start mt-auto`}>{featured ? 'Open Bandcamp' : 'Support'} ↗</span>}
        </>
    );

    return safeHref ? (
        <a href={safeHref} target="_blank" rel="noreferrer" className={`${className} group`} aria-label={`${title} (opens in a new tab)`}>{content}</a>
    ) : (
        <div className={className}>{content}</div>
    );
}
