import { useMemo, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import Reveal from '../components/Reval.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';
import { contactSubjects } from '../data/Contact.js';
import { contactEmail } from '../data/Sociallinks.js';

export default function Contact() {
    const [params] = useSearchParams();
    const presetSubject = params.get('subject') || '';
    const presetBeat = params.get('beat');
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: contactSubjects.includes(presetSubject) ? presetSubject : '',
        message: presetBeat ? `I'm interested in the beat "${presetBeat}".` : '',
    });
    const [handoff, setHandoff] = useState(false);

    const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
    const mailto = useMemo(() => {
        const body = [`Name: ${form.name}`, `Email: ${form.email}`, '', form.message].join('\n');
        return `mailto:${contactEmail}?subject=${encodeURIComponent(form.subject || 'Hello')}&body=${encodeURIComponent(body)}`;
    }, [form]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.currentTarget.reportValidity()) return;
        setHandoff(true);
        window.location.href = mailto;
    };

    return (
        <PageShell
            eyebrow="say hi / contact"
            title="Contact"
            lede={<>For beats, projects, licensing or just to say something. You can also write directly to <a href={`mailto:${contactEmail}`} className="text-[var(--color-text)] underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-[var(--color-accent)]">{contactEmail}</a>.</>}
            marker="cursor"
            width="narrow"
        >
            <SEO
                path="/contact"
                title="Contact"
                description="Get in touch with Drazyx about beats, production, mixing, licensing or collaboration."
            />

            <Reveal as="section" className="room-file pixel-corners mb-8">
                <div className="room-file__bar"><span>contact / direct line</span><span>mailto handoff</span></div>
                <div className="room-file__body flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div><RoomGlyph mark="cursor" label="this site does not store your message" /><p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-3 max-w-xl">The site currently prepares a message in your email app. Nothing is reported as sent by the website itself.</p></div>
                    <a href={`mailto:${contactEmail}`} className="btn-secondary shrink-0"><Mail size={14} /> {contactEmail}</a>
                </div>
            </Reveal>

            {handoff && (
                <Reveal as="div" className="mb-6 text-sm text-[var(--color-text-secondary)] border-l-2 border-[var(--color-accent)] pl-4" role="status">
                    Your email app was asked to open with the message prepared. If nothing opened, email {contactEmail} directly.
                </Reveal>
            )}

            <Reveal as="form" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <label className="eyebrow" htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className="field" value={form.name} onChange={update('name')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="eyebrow" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className="field" value={form.email} onChange={update('email')} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="eyebrow" htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" required className="field" value={form.subject} onChange={update('subject')}>
                        <option value="" disabled>Select a subject</option>
                        {contactSubjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="eyebrow" htmlFor="message">Message</label>
                    <textarea id="message" name="message" required minLength={10} placeholder="Tell me about it…" className="field resize-y" value={form.message} onChange={update('message')} />
                </div>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
                    <button type="submit" className="btn-primary"><Send size={14} /> Open email draft ↗</button>
                    <span className="terminal-label">no fake success state / no message stored here</span>
                </div>
            </Reveal>
        </PageShell>
    );
}
