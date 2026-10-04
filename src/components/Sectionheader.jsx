// Editorial section label: "01 — latest". Small, quiet, consistent.
export default function SectionHeader({ number, label, title, children, className = "" }) {
    return (
        <header className={className}>
            <p className="eyebrow">
                {number && <span className="text-[var(--color-accent-soft)]">{number}</span>}
                {number && " — "}
                {label}
            </p>
            {title && (
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-text)] mt-3 leading-tight">
                    {title}
                </h2>
            )}
            {children}
        </header>
    );
}
