import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const CONSENT_KEY = "drazyx-privacy-choice-v1";
const OPEN_EVENT = "drazyx:open-privacy-preferences";

function readChoice() {
    try {
        const value = window.localStorage.getItem(CONSENT_KEY);
        return value === "essential" || value === "analytics" ? value : null;
    } catch {
        return null;
    }
}

export default function PrivacyConsent() {
    const [choice, setChoice] = useState(() => readChoice());
    const [visible, setVisible] = useState(() => readChoice() === null);

    useEffect(() => {
        const openPreferences = () => setVisible(true);
        window.addEventListener(OPEN_EVENT, openPreferences);
        return () => window.removeEventListener(OPEN_EVENT, openPreferences);
    }, []);

    const saveChoice = (nextChoice) => {
        setChoice(nextChoice);
        setVisible(false);
        try {
            window.localStorage.setItem(CONSENT_KEY, nextChoice);
        } catch {
            // Keep the choice for this session if browser storage is unavailable.
        }
    };

    return (
        <>
            {choice === "analytics" && !visible && <Analytics />}
            {visible && (
                <aside className="privacy-banner" role="region" aria-label="Privacy preferences" aria-describedby="privacy-banner-description">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-2xl">
                            <p className="eyebrow eyebrow-accent">privacy / your choice</p>
                            <h2 className="font-display text-lg mt-2">A little transparency before you stay.</h2>
                            <p id="privacy-banner-description" className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-2">
                                Essential browser storage may be used for admin sign-in and to remember this choice. Optional Vercel Analytics helps measure aggregate site usage and loads only if you allow it. No advertising cookies are used by this site.
                            </p>
                            <p className="text-sm mt-2"><Link to="/privacy" className="underline underline-offset-4 decoration-[var(--border-strong)] hover:text-[var(--color-text)]">Read the privacy policy</Link></p>
                        </div>
                        <div className="privacy-banner__actions sm:min-w-[12rem] sm:flex-col sm:items-stretch">
                            <button type="button" className="privacy-banner__button privacy-banner__button--primary" onClick={() => saveChoice("analytics")}>Allow analytics</button>
                            <button type="button" className="privacy-banner__button" onClick={() => saveChoice("essential")}>Essential only</button>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}
