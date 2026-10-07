// Small helpers shared by components. Keeps "is this real data or a TODO
// placeholder?" logic in one place so pages never show "[ADD ...]" raw.
import { SITE_URL } from "../data/Site.js";

export const isTodo = (v) => !v || (typeof v === "string" && /^\s*\[ADD/i.test(v));
export const clean = (v) => (isTodo(v) ? "" : v);

export const hasTitle = (release) => !isTodo(release.title);
export const releaseTitle = (release) => (hasTitle(release) ? release.title : "Release details pending");
export const releaseMeta = (release) =>
    [clean(release.type), clean(release.year)].filter(Boolean).join(" · ");

export const absoluteUrl = (pathOrUrl = "/") =>
    /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;


// Only allow web URLs or same-site relative paths to cross the public UI.
// This is a defense-in-depth check for CMS-driven links; database RLS remains the authority.
export const safeUrl = (value) => {
    if (!value || typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("/")) return trimmed;
    try {
        const url = new URL(trimmed, SITE_URL);
        return url.protocol === "https:" ? trimmed : null;
    } catch {
        return null;
    }
};
