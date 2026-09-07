export default function SupportCard({ title, description, href }) {
    return (
        <div className="glass rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="font-display text-lg text-[var(--text-hi)]">{title}</h3>
            <p className="text-sm text-[var(--text-mid)] leading-relaxed">{description}</p>
            {href ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary self-start mt-2 px-4 py-2 rounded-full text-sm"
                >
                    Support
                </a>
            ) : (
                <span className="text-xs text-[var(--text-low)] mt-2">Em breve — link ainda não configurado.</span>
            )}
        </div>
    );
}