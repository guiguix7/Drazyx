// Site-wide configuration. Edit here, not inside components.

// TODO: confirmar o domínio final. Pode ser definido sem mexer no código com
// a variável VITE_SITE_URL (ex.: na Vercel). Afeta canonical, OG e sitemap.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || "https://drazyx.com").replace(/\/$/, "");

export const siteName = "Drazyx";

export const tagline = "music from somewhere between the internet, midnight and memory.";

// TODO: adicionar /public/og-image.jpg (1200x630). Até lá, as páginas ficam
// sem imagem de preview ao compartilhar. Capas de release usam o coverUrl.
export const defaultOgImage = "/og-image.jpg";

// What lives in The Room. These are categories of content, not fake entries.
export const roomCategories = [
    { id: "music", label: "Music", blurb: "unreleased songs, demos, alternate versions, unfinished ideas" },
    { id: "visuals", label: "Visuals", blurb: "wallpapers, sketches, cover experiments, moodboards" },
    { id: "process", label: "Process", blurb: "project screenshots, sound design, abandoned ideas" },
    { id: "personal", label: "Personal", blurb: "what I'm playing, watching and listening to; small thoughts" },
    { id: "community", label: "Community", blurb: "early access, downloads, previews, the occasional poll" },
];
