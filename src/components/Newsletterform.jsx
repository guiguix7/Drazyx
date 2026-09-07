import { useState } from "react";
import { Send } from "lucide-react";

/**
 * TODO: conectar a um provedor real (ex: Mailchimp, Resend, Buttondown,
 * ConvertKit). Esta função é o único ponto que precisa mudar.
 */
async function subscribeToNewsletter() {
    throw new Error("Newsletter ainda não integrada a um provedor de email.");
    // Exemplo de integração futura:
    // const res = await fetch("/api/newsletter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
    // if (!res.ok) throw new Error("Falha ao inscrever.");
}

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
        try {
            await subscribeToNewsletter(email);
            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMsg(
                "Inscrição ainda não está conectada a um serviço de email — interface pronta para integração."
            );
        }
    };

    if (status === "success") {
        return <p className="text-sm text-[var(--violet-soft)]">Inscrição recebida. Bem-vindo(a) ao Room.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <label htmlFor="newsletter-email" className="sr-only">
                Email
            </label>
            <input
                id="newsletter-email"
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field rounded-full px-4 py-2.5 text-sm flex-1"
                aria-invalid={status === "error"}
            />
            <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2"
            >
                <Send size={14} /> {status === "loading" ? "Enviando..." : "Join"}
            </button>
            {status === "error" && (
                <p className="text-xs text-[var(--text-low)] sm:col-span-2" role="alert">
                    {errorMsg}
                </p>
            )}
        </form>
    );
}