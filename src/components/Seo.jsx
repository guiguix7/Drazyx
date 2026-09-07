import { useEffect } from "react";

/**
 * SEO leve, sem dependências extras (react-helmet não é necessário para
 * uma SPA deste porte). Atualiza title + meta description + canonical +
 * Open Graph a cada troca de página.
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

export default function SEO({ title, description, path = "/" }) {
    useEffect(() => {
        const fullTitle = title ? `${title} — Drazyx` : "Drazyx — Producer / Artist";
        document.title = fullTitle;

        if (description) {
            setMeta("description", description);
            setMeta("og:description", description, "property");
            setMeta("twitter:description", description);
        }

        setMeta("og:title", fullTitle, "property");
        setMeta("twitter:title", fullTitle);

        const canonicalUrl = `https://drazyx.com${path}`; // TODO: confirmar domínio final
        setMeta("og:url", canonicalUrl, "property");

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", canonicalUrl);

        window.scrollTo({ top: 0, behavior: "auto" });
    }, [title, description, path]);

    return null;
}