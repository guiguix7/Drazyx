/**
 * The newsletter provider is not connected yet. Keep the framework visible
 * without presenting an interaction that cannot succeed.
 */
export default function NewsletterForm() {
    return (
        <div className="room-mailbox" aria-label="Newsletter sign-up is not connected yet">
            <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">mailbox / offline</span>
                <span className="terminal-label">nothing is collected</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-3 max-w-md">
                The sign-up system is ready for a future provider, but there is no newsletter connection yet.
            </p>
            <button type="button" className="btn-secondary mt-5" disabled aria-disabled="true">
                Join the room when this is connected
            </button>
        </div>
    );
}
