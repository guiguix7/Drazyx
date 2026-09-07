import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Send } from "lucide-react";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { contactSubjects } from "../data/Contact.js";
import { contactEmail } from "../data/Sociallinks.js";

/**
 * TODO: conectar a um serviço real de envio de formulário (ex: Formspree,
 * Resend, um endpoint próprio). Esta é a única função que precisa mudar
 * quando o backend existir.
 */
async function sendContactMessage() {
    throw new Error("Envio de formulário ainda não integrado a um backend.");
    // Exemplo de integração futura:
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!res.ok) throw new Error("Falha ao enviar.");
}

export default function Contact() {
    const [params] = useSearchParams();
    const presetSubject = params.get("subject") || "";
    const presetBeat = params.get("beat");

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: contactSubjects.includes(presetSubject) ? presetSubject : "",
        message: presetBeat ? `Tenho interesse no beat "${presetBeat}".` : "",
    });
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error
    const [errorMsg, setErrorMsg] = useState("");

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");
        try {
            await sendContactMessage(form);
            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMsg(
                "Este formulário ainda não está conectado a um backend de envio — a interface está pronta para integração. Por enquanto, escreva para " +
                contactEmail +
                "."
            );
        }
    };

    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/contact"
                title="Contact"
                description="Fale com Drazyx sobre beats, produção, mixagem, licenciamento ou colaboração."
            />
            <div className="max-w-2xl mx-auto">
                <Reveal as="div" className="mb-10">
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)]">Contact</h1>
                    <p className="mt-3 text-[var(--text-mid)]">
                        Para parcerias, licenciamento ou orçamentos —{" "}
                        <a href={`mailto:${contactEmail}`} className="text-[var(--text-hi)] hover:underline">
                            {contactEmail}
                        </a>
                    </p>
                </Reveal>

                {status === "success" ? (
                    <Reveal as="div" className="glass rounded-2xl p-8 text-center">
                        <p className="text-[var(--text-hi)]">Mensagem pronta — interface de envio ok.</p>
                        <p className="text-sm text-[var(--text-low)] mt-2">
                            Assim que o backend de envio for conectado, sua mensagem será entregue automaticamente.
                        </p>
                    </Reveal>
                ) : (
                    <Reveal as="form" onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-[var(--text-low)]" htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Your name"
                                className="field rounded-lg px-3.5 py-2.5 text-sm"
                                value={form.name}
                                onChange={update("name")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-[var(--text-low)]" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="you@email.com"
                                className="field rounded-lg px-3.5 py-2.5 text-sm"
                                value={form.email}
                                onChange={update("email")}
                            />
                        </div>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-xs text-[var(--text-low)]" htmlFor="subject">Subject</label>
                            <select
                                id="subject"
                                required
                                className="field rounded-lg px-3.5 py-2.5 text-sm appearance-none"
                                value={form.subject}
                                onChange={update("subject")}
                            >
                                <option value="" disabled>Select a subject</option>
                                {contactSubjects.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-xs text-[var(--text-low)]" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                minLength={10}
                                placeholder="Tell me about the project..."
                                className="field rounded-lg px-3.5 py-2.5 text-sm resize-none"
                                value={form.message}
                                onChange={update("message")}
                            />
                        </div>
                        <div className="sm:col-span-2 flex flex-col gap-3">
                            {status === "error" && (
                                <p className="text-xs text-[var(--text-low)]" role="alert">{errorMsg}</p>
                            )}
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-[var(--text-low)]">
                                    {status === "submitting" ? "Enviando..." : "Resposta em até 2 dias úteis."}
                                </p>
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="btn-primary rounded-full px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2"
                                >
                                    <Send size={15} /> Send
                                </button>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}