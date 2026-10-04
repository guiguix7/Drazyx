import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Send } from "lucide-react";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { contactSubjects } from "../data/Contact.js";
import { contactEmail } from "../data/Sociallinks.js";

/**
 * TODO: connect a real form service (Formspree, Resend, your own endpoint).
 * This is the only function that needs to change. Until then the form says so
 * and points to the email address — it never reports a fake success.
 */
async function sendContactMessage() {
    throw new Error("Contact form backend not configured.");
    // Future integration:
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!res.ok) throw new Error("Send failed.");
}

export default function Contact() {
    const [params] = useSearchParams();
    const presetSubject = params.get("subject") || "";
    const presetBeat = params.get("beat");

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: contactSubjects.includes(presetSubject) ? presetSubject : "",
        message: presetBeat ? `I'm interested in the beat "${presetBeat}".` : "",
    });
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            await sendContactMessage(form);
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(form.subject || "Hello")}&body=${encodeURIComponent(form.message)}`;

    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/contact"
                title="Contact"
                description="Get in touch with Drazyx about beats, production, mixing, licensing or collaboration."
            />
            <div className="max-w-3xl mx-auto">
                <Reveal as="header" className="mb-12">
                    <p className="eyebrow">say hi</p>
                    <h1 className="page-title mt-3">Contact</h1>
                    <p className="lede mt-5">
                        For beats, projects, licensing or just to say something. You can also write directly to{" "}
                        <a href={`mailto:${contactEmail}`} className="text-[var(--color-text)] underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-[var(--color-accent)]">
                            {contactEmail}
                        </a>
                        .
                    </p>
                </Reveal>

                {status === "success" ? (
                    <Reveal as="div" className="surface rounded-lg p-8" role="status">
                        <p className="text-[var(--color-text)]">Message sent. Thanks for writing.</p>
                    </Reveal>
                ) : (
                    <Reveal as="form" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="eyebrow" htmlFor="name">Name</label>
                            <input id="name" type="text" required autoComplete="name" placeholder="Your name" className="field rounded px-3.5 py-2.5 text-sm" value={form.name} onChange={update("name")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="eyebrow" htmlFor="email">Email</label>
                            <input id="email" type="email" required autoComplete="email" placeholder="you@email.com" className="field rounded px-3.5 py-2.5 text-sm" value={form.email} onChange={update("email")} />
                        </div>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="eyebrow" htmlFor="subject">Subject</label>
                            <select id="subject" required className="field rounded px-3.5 py-2.5 text-sm" value={form.subject} onChange={update("subject")}>
                                <option value="" disabled>Select a subject</option>
                                {contactSubjects.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="eyebrow" htmlFor="message">Message</label>
                            <textarea id="message" required rows={6} minLength={10} placeholder="Tell me about it…" className="field rounded px-3.5 py-2.5 text-sm resize-y" value={form.message} onChange={update("message")} />
                        </div>

                        <div className="sm:col-span-2 flex flex-col gap-4">
                            {status === "error" && (
                                <p className="text-sm text-[var(--color-text-secondary)]" role="alert">
                                    The form isn't connected yet, so nothing was sent.{" "}
                                    <a href={mailto} className="text-[var(--color-accent-soft)] underline underline-offset-4">
                                        Open this message in your email app
                                    </a>{" "}
                                    instead.
                                </p>
                            )}
                            <div>
                                <button type="submit" disabled={status === "submitting"} className="btn-primary">
                                    <Send size={14} /> {status === "submitting" ? "Sending…" : "Send"}
                                </button>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
