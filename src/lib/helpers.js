// Small helpers shared by components. Keeps "is this real data or a TODO
// placeholder?" logic in one place so pages never show "[ADD ...]" raw.
import { SITE_URL } from "../data/Site.js";

export const isTodo = (v) => !v || (typeof v === "string" && /^\s*\[ADD/i.test(v));
export const clean = (v) => (isTodo(v) ? "" : v);

export const hasTitle = (release) => !isTodo(release.title);
export const releaseTitle = (release) => (hasTitle(release) ? release.title : "Title to be added");
export const releaseMeta = (release) =>
    [clean(release.type), clean(release.year)].filter(Boolean).join(" · ");

export const absoluteUrl = (pathOrUrl = "/") =>
    /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
