import { useEffect, useState } from "react";

// Tiny "alive" detail: the visitor's own local time. Purely decorative,
// so it's hidden from screen readers (no announcements every minute).
export default function NightClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(id);
    }, []);

    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const h = now.getHours();
    const mood = h >= 0 && h < 5 ? "the quiet hours." : h < 12 ? "morning, somehow." : h < 18 ? "daylight. bear with it." : "evening. good time for this.";

    return (
        <p className="eyebrow normal-case tracking-[0.08em]" aria-hidden="true">
            {time} where you are — {mood}
        </p>
    );
}
