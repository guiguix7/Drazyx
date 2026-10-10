import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import { contactEmail } from "../data/Sociallinks.js";

export default function Privacy() {
    useEffect(() => {
        const previousLanguage = document.documentElement.lang;
        document.documentElement.lang = "en";
        return () => { document.documentElement.lang = previousLanguage || "en"; };
    }, []);

    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/privacy"
                title="Privacy policy"
                description="Learn what data the Drazyx website processes, why, how the privacy preferences work, and how to exercise your rights under the LGPD."
            />
            <div className="max-w-3xl mx-auto">
                <Reveal as="header" className="mb-12">
                    <p className="eyebrow">transparency / data & privacy</p>
                    <h1 className="page-title mt-3">Privacy policy</h1>
                    <p className="lede mt-5">This page explains what data the Drazyx website may process, for what purposes, and how you can exercise your rights. The text describes the site's current implementation and will be updated when its features change.</p>
                    <p className="terminal-label mt-4">Last updated: October 9, 2026</p>
                </Reveal>

                <div className="privacy-content">
                    <section>
                        <h2>1. Controller and contact</h2>
                        <p>The party responsible for the site and for the processing described in this policy is Drazyx, independent artist. For questions or privacy-related requests, write to <a className="underline underline-offset-4 text-[var(--color-text)]" href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
                    </section>

                    <section>
                        <h2>2. What the site currently processes</h2>
                        <ul className="space-y-2">
                            <li><strong className="text-[var(--color-text)]">Browsing metrics:</strong> Vercel Analytics may load to understand aggregate site usage, but only after you choose "Allow analytics" in the privacy notice.</li>
                            <li><strong className="text-[var(--color-text)]">Privacy preference:</strong> a choice between enabled metrics or essential-only storage is kept in your browser's local storage to remember your decision.</li>
                            <li><strong className="text-[var(--color-text)]">Admin area:</strong> if you are an authorized administrator, Supabase Auth processes the data needed for authentication and session handling.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Forms and newsletter</h2>
                        <p>The contact form and the newsletter sign-up are not yet connected to a delivery service. The site must not present these actions as completed and, in the current implementation, does not store these messages or sign-ups through these forms. If you choose to open your email app, the message is then processed by the email provider you use.</p>
                    </section>

                    <section>
                        <h2>4. Cookies and browser storage</h2>
                        <p>The site does not use advertising cookies. Local storage is used to remember your privacy preference; authentication for the admin area may use browser storage to keep the session active. The notice offers two options: allow optional metrics or keep essential-only. You can change your choice at any time in <button type="button" className="underline underline-offset-4 text-[var(--color-text)]" onClick={() => window.dispatchEvent(new Event("drazyx:open-privacy-preferences"))}>Privacy settings</button>, in the footer.</p>
                        <p className="mt-3">If you choose "Essential only," the site's metrics component will not load. The choice is stored in this browser and may need to be made again if you clear the site's data or use another device.</p>
                    </section>

                    <section>
                        <h2>5. Purposes and legal bases</h2>
                        <p>Storing the preference serves to honor the choice you made. Authentication serves to protect the admin area. Optional metrics serve to understand overall site usage. The applicable legal basis depends on the specific operation and should be assessed in light of the Lei Geral de Proteção de Dados (Law No. 13,709/2018). No sensitive data is requested to browse the public catalog.</p>
                    </section>

                    <section>
                        <h2>6. Sharing and retention</h2>
                        <p>The hosting provider and the technical services the site uses may process data necessary for delivery, security, authentication and metrics, under their own terms and policies. The site does not sell personal data or use it for targeted advertising. Your privacy preference remains in the browser until removed by you or by your browser's controls. Authentication data is handled by Supabase according to the admin area's configuration.</p>
                    </section>

                    <section>
                        <h2>7. Security</h2>
                        <p>The project uses access controls to restrict administrative resources. No electronic transmission or storage can be guaranteed to be absolutely secure. Vulnerabilities can be reported through the channel indicated in <a className="underline underline-offset-4 text-[var(--color-text)]" href="https://github.com/guiguix7/Drazyx/blob/main/SECURITY.md" target="_blank" rel="noreferrer">SECURITY.md</a>.</p>
                    </section>

                    <section>
                        <h2>8. Your rights</h2>
                        <p>Under the LGPD, you may request confirmation of processing, access, correction, anonymization, blocking or deletion of data, information about sharing, and, where applicable, withdrawal of consent. To exercise your rights, write to <a className="underline underline-offset-4 text-[var(--color-text)]" href={`mailto:${contactEmail}`}>{contactEmail}</a>. The response depends on the verification required and the applicable legal deadlines.</p>
                    </section>

                    <section>
                        <h2>9. Changes to this policy</h2>
                        <p>This policy may change as the site gains new features or when legal or technical changes require it. The date at the top of the page indicates the latest published revision.</p>
                    </section>
                </div>

                <div className="mt-12 pt-6 border-t border-[var(--border-hair)] flex flex-wrap gap-5 text-sm">
                    <Link to="/contact" className="link-arrow">Contact <span aria-hidden="true">→</span></Link>
                    <Link to="/" className="link-arrow">Back to home <span aria-hidden="true">→</span></Link>
                </div>
            </div>
        </div>
    );
}