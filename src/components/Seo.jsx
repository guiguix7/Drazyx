import { useEffect } from "react";
import { SITE_URL, siteName, defaultOgImage } from "../data/Site.js";
import { absoluteUrl } from "../lib/helpers.js";

/**
 * Lightweight SEO, no extra dependency. Updates title, description,
 * canonical, Open Graph, Twitter card and optional JSON-LD on route change.
 *
 * NOTE: this runs in the browser. Crawlers that don't execute JS (Discord,
 * WhatsApp, X link previews) only see the static tags in index.html. For
 * per-release previews they'd need prerendering or an edge function.
 */
function setMeta(name, content, attr = "name") {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

export default function SEO({ title, description, path = "/", image, type = "website", jsonLd, noindex = false }) {
    const ld = jsonLd ? JSON.stringify(jsonLd) : "";

    useEffect(() => {
        const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — artist / producer`;
        document.title = fullTitle;

        if (description) {
            setMeta("description", description);
            setMeta("og:description", description, "property");
            setMeta("twitter:description", description);
        }

        const url = `${SITE_URL}${path}`;
        setMeta("og:title", fullTitle, "property");
        setMeta("twitter:title", fullTitle);
        setMeta("og:type", type, "property");
        setMeta("og:url", url, "property");

        const img = image ? absoluteUrl(image) : absoluteUrl(defaultOgImage);
        setMeta("og:image", img, "property");
        setMeta("twitter:image", img);

        setMeta("robots", noindex ? "noindex, follow" : "index, follow");

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", url);

        let script = null;
        if (ld) {
            script = document.createElement("script");
            script.type = "application/ld+json";
            script.dataset.page = "true";
            script.text = ld;
            document.head.appendChild(script);
        }
        return () => {
            if (script) script.remove();
        };
    }, [title, description, path, image, type, ld, noindex]);

    return null;
}
