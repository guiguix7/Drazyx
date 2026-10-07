const bandcampBaseUrl = "https://drazyx.bandcamp.com";

const track = (id, title, duration, slug, genre) => ({
    id,
    title,
    duration,
    url: `${bandcampBaseUrl}/track/${slug}`,
    genre,
});


export const releases = [
    {
        id: "5",
        title: "After My Day",
        type: "EP",
        year: "2026",
        coverUrl: "https://f4.bcbits.com/img/a3221749502_10.jpg",
        spotifyUrl: "",
        spotifyEmbedUrl: "",
        youtubeUrl: "",
        soundcloudUrl: "",
        appleMusicUrl: "",
        bandcampUrl: `${bandcampBaseUrl}/album/after-my-day`,
        genre: "Trap / Electronic",
        tracks: [
            track("after-my-day", "After My Day", "", "after-my-day"),
            track("after-my-day-slowed-reverb", "After My Day (Slowed + Reverb)", "", "after-my-day-slowed-reverb"),
            track("after-my-day-speed-up", "After My Day (Speed Up)", "", "after-my-day-speed-up"),
            track("after-my-day-super-slowed", "After My Day (Super Slowed + Reverb + Bass Boosted)", "", "after-my-day-super-slowed-reverb-bass-boosted"),
        ],
        description:
            "A melancholic atmospheric trap and electronic instrumental about exhaustion, self-doubt and the decision to keep going tomorrow.",
        behindTheMusic:
            "A late-night journey home after a difficult day, moving between sadness, reflection, emptiness and a small sense of hope.",
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "Drazyx",
            mix: "Drazyx",
            master: "Drazyx",
        },
        "featured-track": {
            id: "after-my-day",
            title: "After My Day",
            url: `${bandcampBaseUrl}/track/after-my-day`,
        },
    },
    {
        id: "4",
        title: "My Mirage (Remixes)",
        type: "Album",
        year: "2026",
        coverUrl: "https://f4.bcbits.com/img/a675605928_10.jpg",
        spotifyUrl: "",
        spotifyEmbedUrl: "",
        youtubeUrl: "",
        soundcloudUrl: "https://soundcloud.com/drazyxmusic/sets/my-mirage-remixes?si=73759a840992458bbfb35f7365885329&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        appleMusicUrl: "",
        bandcampUrl: `${bandcampBaseUrl}/album/my-mirage-remixes`,
        genre: "Electronic / Jersey Club / Trap / Lo-Fi",
        tracks: [
            track("lucid-dream-exe-slowed-reverb", "LUCID_DREAM.EXE (Slowed + Reverb)", "2:57", "lucid-dream-exe-slowed-reverb"),
            track("lucid-dream-exe-speed-up", "LUCID_DREAM.EXE (Speed Up)", "2:16", "lucid-dream-exe-speed-up"),
            track("lucid-dream-exe-super-slowed", "LUCID_DREAM.EXE (Super Slowed + Reverb)", "3:31", "lucid-dream-exe-super-slowed-reverb"),
            track("my-mirage-slowed-reverb", "My Mirage (Slowed + Reverb)", "2:52", "my-mirage-slowed-reverb"),
            track("my-mirage-super-slowed", "My Mirage (Super Slowed + Reverb)", "3:48", "my-mirage-super-slowed-reverb"),
            track("my-mirage-speed-up", "My Mirage (Speed Up)", "2:15", "my-mirage-speed-up"),
            track("my-mirage-instrumental", "My Mirage (Instrumental)", "2:55", "my-mirage-instrumental"),
            track("my-mirage-instrumental-slowed", "My Mirage (Instrumental Slowed + Reverb)", "2:52", "my-mirage-instrumental-slowed-reverb"),
            track("my-mirage-instrumental-super-slowed", "My Mirage (Instrumental Super Slowed + Reverb)", "3:48", "my-mirage-instrumental-super-slowed-reverb"),
            track("my-mirage-instrumental-speed-up", "My Mirage (Instrumental Speed Up)", "2:15", "my-mirage-instrumental-speed-up"),
            track("why-slowed-reverb", "Why? (Slowed + Reverb)", "2:53", "why-slowed-reverb"),
            track("why-super-slowed", "Why? (Super Slowed + Reverb)", "3:12", "why-super-slowed-reverb"),
            track("why-speed-up", "Why? (Speed Up)", "2:11", "why-speed-up"),
            track("wake-up-slowed-reverb", "Wake Up (Slowed + Reverb)", "2:44", "wake-up-slowed-reverb"),
            track("wake-up-speed-up", "Wake Up (Speed Up)", "2:17", "wake-up-speed-up"),
            track("wake-up-super-slowed", "Wake Up (Super Slowed + Reverb)", "2:59", "wake-up-super-slowed-reverb"),
            track("wake-up-instrumental", "Wake Up (Instrumental)", "2:28", "wake-up-instrumental"),
            track("wake-up-instrumental-slowed", "Wake Up (Instrumental Slowed + Reverb)", "2:44", "wake-up-instrumental-slowed-reverb"),
            track("wake-up-instrumental-speed-up", "Wake Up (Instrumental Speed Up)", "2:17", "wake-up-instrumental-speed-up"),
            track("wake-up-instrumental-super-slowed", "Wake Up (Instrumental Super Slowed + Reverb)", "2:59", "wake-up-instrumental-super-slowed-reverb"),
            track("wake-up-8d", "Wake Up (8D Audio)", "2:30", "wake-up-8d-audio"),
            track("wake-up-8d-slowed", "Wake Up (8D Audio Slowed + Reverb)", "3:01", "wake-up-8d-audio-slowed-reverb"),
            track("wake-up-8d-ultra-slowed", "Wake Up (8D Audio Ultra Slowed + Reverb + Bass Boosted)", "3:33", "wake-up-8d-audio-ultra-slowed-reverb-bass-boosted"),
            track("wake-up-instrumental-8d", "Wake Up (Instrumental 8D Audio)", "2:26", "wake-up-instrumental-8d-audio"),
            track("wake-up-instrumental-8d-slowed", "Wake Up (Instrumental 8D Audio Slowed + Reverb)", "3:00", "wake-up-instrumental-8d-audio-slowed-reverb"),
            track("wake-up-instrumental-8d-ultra-slowed", "Wake Up (Instrumental 8D Audio Ultra Slowed + Reverb + Bass Boosted)", "3:32", "wake-up-instrumental-8d-audio-ultra-slowed-reverb-bass-boosted"),
            track("wake-up-ultra-slowed", "Wake Up (Ultra Slowed + Reverb + Bass Boosted)", "3:45", "wake-up-ultra-slowed-reverb-bass-boosted"),
        ],
        description:
            "A melancholic electronic album blending Jersey Club, trap and atmospheric lo-fi production into a nostalgic late-night sound.",
        behindTheMusic:
            "Built around nostalgia, distance and the feeling of searching for something that may no longer exist.",
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "Drazyx",
            mix: "Drazyx",
            master: "Drazyx",
        },
        "featured-track": {
            id: "my-mirage-slowed-reverb",
            title: "My Mirage (Slowed + Reverb)",
            url: `${bandcampBaseUrl}/track/my-mirage-slowed-reverb`,
        },
    },
    {
        id: "3",
        title: "My Mirage",
        type: "EP",
        year: "2026",
        coverUrl: "https://f4.bcbits.com/img/a587586965_10.jpg",
        spotifyUrl: "",
        spotifyEmbedUrl: "",
        youtubeUrl: "",
        soundcloudUrl: "",
        appleMusicUrl: "",
        bandcampUrl: `${bandcampBaseUrl}/album/my-mirage`,
        genre: "Electronic / Jersey Club",
        tracks: [
            track("lucid-dream-exe", "LUCID_DREAM.EXE", "2:26", "lucid-dream-exe"),
            track("my-mirage", "My Mirage", "2:25", "my-mirage"),
            track("why", "Why?", "2:22", "why"),
            track("wake-up", "Wake Up", "2:27", "wake-up", "Electronic / Jersey Club / Trap / Lo-Fi"),
        ],
        description:
            "A melancholic electronic EP blending Jersey Club, trap and atmospheric lo-fi production into a nostalgic late-night sound.",
        behindTheMusic:
            "A project about nostalgia, distance and searching for something that may no longer exist.",
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "Drazyx",
            mix: "Drazyx",
            master: "Drazyx",
        },
        "featured-track": {
            id: "wake-up",
            title: "Wake Up",
            url: `${bandcampBaseUrl}/track/wake-up`,
        },
    },
    {
        id: "2",
        title: "Just Monika. (Remixes)",
        type: "EP",
        year: "2026",
        coverUrl: "https://f4.bcbits.com/img/a3808417466_10.jpg",
        spotifyUrl: "https://open.spotify.com/album/0ZcLMmGpwiOV1g0je1K3IR",
        spotifyEmbedUrl: "https://open.spotify.com/embed/album/0ZcLMmGpwiOV1g0je1K3IR",
        youtubeUrl: "",
        soundcloudUrl: "",
        appleMusicUrl: "",
        bandcampUrl: `${bandcampBaseUrl}/album/just-monika-remixes`,
        genre: "Trap / Electronic",
        tracks: [
            track("just-monika-slowed-reverb", "Just Monika. (Slowed + Reverb)", "6:27", "just-monika-slowed-reverb"),
            track("just-monika-speed-up", "Just Monika. (Speed Up)", "4:58", "just-monika-speed-up"),
            track("just-monika-8d", "Just Monika. (8D Audio)", "5:26", "just-monika-8d-audio"),
            track("just-monika-8d-slowed-reverb", "Just Monika. (8D Audio + Slowed + Reverb)", "6:28", "just-monika-8d-audio-slowed-reverb"),
        ],
        description:
            "Remixes of Just Monika. from Broken Poems, including 8D Audio, Slowed + Reverb and Speed Up versions.",
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "Drazyx",
            mix: "Drazyx",
            master: "Drazyx",
        },
        "featured-track": {
            id: "just-monika-slowed-reverb",
            title: "Just Monika. (Slowed + Reverb)",
            url: `${bandcampBaseUrl}/track/just-monika-slowed-reverb`,
        },
    },
    {
        id: "1",
        title: "Broken Poems (DDLC Fan Album - Instrumental)",
        type: "Album",
        year: "2026",
        coverUrl: "https://f4.bcbits.com/img/a4026360807_10.jpg",
        spotifyUrl: "https://open.spotify.com/album/4NMOqcPmbbe4do7jVbnZyJ",
        spotifyEmbedUrl: "https://open.spotify.com/embed/album/4NMOqcPmbbe4do7jVbnZyJ",
        youtubeUrl: "",
        soundcloudUrl: "",
        appleMusicUrl: "",
        bandcampUrl: `${bandcampBaseUrl}/album/broken-poems-ddlc-fan-album-instrumental`,
        genre: "Trap / Electronic",
        tracks: [
            track("come-in", "Come In", "2:39", "come-in"),
            track("happy-thoughts", "Happy Thoughts", "3:57", "happy-thoughts"),
            track("cupcakes", "Cupcakes!", "1:41", "cupcakes"),
            track("this-is-my-poem", "This Is My Poem.", "5:55", "this-is-my-poem"),
            track("just-monika", "Just Monika.", "5:24", "just-monika"),
            track("im-the-reason", "I'm The Reason", "3:41", "im-the-reason"),
            track("the-end", "The END.", "3:29", "the-end"),
        ],
        description:
            "A fan-made instrumental album inspired by Doki Doki Literature Club!, following the game's emotional journey.",
        behindTheMusic:
            "The project represents late-night nostalgia through music inspired by the characters, poems and emotional turns of DDLC.",
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "Drazyx",
            mix: "Drazyx",
            master: "Drazyx",
        },
        "featured-track": {
            id: "come-in",
            title: "Come In",
            url: `${bandcampBaseUrl}/track/come-in`,
        },
    },
];

export const latestRelease = releases[0];

// Change these IDs to choose the release and track for a future Home section.
export const featuredReleaseId = "3";
export const featuredTrackId = "wake-up";
export const featuredRelease = releases.find((release) => release.id === featuredReleaseId) ?? releases[0];
export const artistFeaturedTrack =
    featuredRelease.tracks.find((item) => item.id === featuredTrackId) ??
    featuredRelease.tracks[0] ??
    null;