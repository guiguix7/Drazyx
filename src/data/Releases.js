// Lançamentos reais conhecidos: apenas os 2 álbuns cujos links de Spotify
// você forneceu. Título, ano, capa, tipo exato (Album/EP) e descrição
// ainda não foram informados — preenchidos como TODO abaixo.
// Substitua os placeholders pelos dados reais; não invente nada aqui.

export const releases = [
    {
        id: "album-1", // TODO: trocar por um slug baseado no título real (ex: "my-mirage")
        title: "[ADD RELEASE TITLE]", // TODO
        type: "[ADD TYPE]", // TODO: "Album" | "EP" | "Single"
        year: "[ADD YEAR]", // TODO
        coverUrl: "", // TODO: URL da capa
        spotifyUrl:
            "https://open.spotify.com/album/4NMOqcPmbbe4do7jVbnZyJ?si=ECdItaA-Tz2QXgH3eEbwbA",
        spotifyEmbedUrl:
            "https://open.spotify.com/embed/album/4NMOqcPmbbe4do7jVbnZyJ?utm_source=generator&si=88ea5e006c6c4025",
        youtubeUrl: "", // TODO
        soundcloudUrl: "", // TODO
        appleMusicUrl: "", // TODO
        description: "[ADD PROJECT DESCRIPTION]", // TODO
        behindTheMusic: "", // TODO (opcional)
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "", // TODO
            mix: "", // TODO
            master: "", // TODO
        },
        "featured-beat": {
            id: "beat-1", // TODO: trocar por um slug baseado no título real
            title: "[ADD BEAT TITLE]", // TODO
            url: "", // TODO
            bpm: "", // TODO
            key: "", // TODO
            description: "", // TODO (opcional)
        }
    },
    {
        id: "album-2", // TODO: trocar por um slug baseado no título real
        title: "[ADD RELEASE TITLE]", // TODO
        type: "[ADD TYPE]", // TODO
        year: "[ADD YEAR]", // TODO
        coverUrl: "", // TODO
        spotifyUrl:
            "https://open.spotify.com/intl-pt/album/0ZcLMmGpwiOV1g0je1K3IR?si=3oKMpp0uRIWZS-GwW8hcdw",
        spotifyEmbedUrl:
            "https://open.spotify.com/embed/album/0ZcLMmGpwiOV1g0je1K3IR?utm_source=generator&si=b598b54259f94e7d",
        youtubeUrl: "", // TODO
        soundcloudUrl: "", // TODO
        appleMusicUrl: "", // TODO
        description: "[ADD PROJECT DESCRIPTION]", // TODO
        behindTheMusic: "", // TODO
        credits: {
            artist: "Drazyx",
            producer: "Drazyx",
            composer: "",
            mix: "",
            master: "",
        },
        "featured-beat": {
            id: "beat-1", // TODO: trocar por um slug baseado no título real
            title: "[ADD BEAT TITLE]", // TODO
            url: "", // TODO
        },
    },
];

// TODO: definir qual é de fato o lançamento mais recente (ordem cronológica
// real ainda não informada). Por enquanto a Home usa releases[0].
export const latestRelease = releases[0];