// Only rendered for destinations that are actually configured.
export default function SupportCard({ title, description, href, featured = false }) {
    return (
        <div className={`surface rounded-lg p-6 flex flex-col gap-3 ${featured ? "sm:col-span-2" : ""}`}>
            <h3 className="font-display text-lg text-[var(--color-text)]">{title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`${featured ? "btn-primary" : "btn-secondary"} self-start mt-2`}
                aria-label={`${title} (opens in a new tab)`}
            >
                {featured ? "Take a look" : "Support"}
            </a>
        </div>
    );
}
