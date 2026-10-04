import { useState } from "react";
import { Send } from "lucide-react";

/**
 * TODO: connect a real provider (Buttondown, Resend, Mailchimp, ConvertKit…).
 * This function is the only place that needs to change. Until then the form
 * says so honestly — it never pretends to have subscribed anyone.
 */
async function subscribeToNewsletter() {
    throw new Error("Newsletter provider not configured.");
    // Future integration:
    // const res = await fetch("/api/newsletter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
    // if (!res.ok) throw new Error("Subscribe failed.");
}

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await subscribeToNewsletter(email);
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <p className="text-sm text-[var(--color-accent-soft)]" role="status">
                You're in. Welcome to the room.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate={false}>
            <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                </label>
                <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field rounded px-4 py-2.5 text-sm flex-1"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                />
                <button type="submit" disabled={status === "loading"} className="btn-primary">
                    <Send size={14} /> {status === "loading" ? "Sending…" : "Join"}
                </button>
            </div>
            {status === "error" && (
                <p id="newsletter-error" className="text-xs text-[var(--color-text-secondary)] mt-3" role="alert">
                    Sign-ups aren't connected yet, so nothing was sent. Check back soon.
                </p>
            )}
        </form>
    );
}
