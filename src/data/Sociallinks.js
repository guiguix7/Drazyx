// Real links only — provided directly by you. Do not add anything here
// without confirmation.
//
// Each platform has a role in the ecosystem (see README):
//   Spotify    -> primary listening
//   SoundCloud -> experiments / alternative listening
//   YouTube    -> discovery / deeper content
//   Instagram  -> personality / visuals
//   TikTok     -> discovery
//   Bandcamp   -> support / own / collect the music

export const socialLinks = {
    spotify:
        "https://open.spotify.com/intl-pt/artist/71gVcrLVY10LjtZWvUWLQU?si=U5WPElgzTXmqdzl7WLhqDw",
    soundcloud: "https://soundcloud.com/drazyxmusic",
    youtube: "https://www.youtube.com/@drazyxmusic",
    instagram: "https://www.instagram.com/drazyxmusic/",
    tiktok: "https://www.tiktok.com/@drazyxmusic",
    bandcamp: "https://drazyx.bandcamp.com/",
};

export const spotifyArtistEmbedUrl =
    "https://open.spotify.com/embed/artist/71gVcrLVY10LjtZWvUWLQU?utm_source=generator&si=f9297101e32548b6";

export const contactEmail = "contact@drazyx.com";

// TODO: add real links once these accounts exist
export const supportLinks = {
    bandcamp: "https://drazyx.bandcamp.com/", // real — support by buying/collecting music
    buyMeACoffee: null, // e.g. "https://buymeacoffee.com/drazyx"
    koFi: null, // e.g. "https://ko-fi.com/drazyx"
    pix: null, // Pix key or payment link
};

// Each platform has a job. Used by the footer, the Home page and The Room.
export const platforms = [
    { id: "spotify", label: "Spotify", role: "listen", href: socialLinks.spotify },
    { id: "soundcloud", label: "SoundCloud", role: "experiments", href: socialLinks.soundcloud },
    { id: "youtube", label: "YouTube", role: "videos", href: socialLinks.youtube },
    { id: "instagram", label: "Instagram", role: "personality", href: socialLinks.instagram },
    { id: "tiktok", label: "TikTok", role: "discovery", href: socialLinks.tiktok },
    { id: "bandcamp", label: "Bandcamp", role: "own the music", href: socialLinks.bandcamp },
];
