// Beats atualmente cadastrados. BPM, tom, mood e preços são os que você
// informou. previewUrl / coverUrl / purchaseUrl ainda não existem —
// ficam vazios até você integrar áudio real e um checkout (BeatStars,
// Airbit, Stripe, Mercado Pago, Pix, etc).

export const beats = [
    {
        id: "midnight",
        name: "MIDNIGHT",
        bpm: 140,
        key: "C# minor",
        mood: "Melancholic Trap",
        mp3Price: 40,
        wavPrice: 90,
        exclusivePrice: 350,
        previewUrl: "", // TODO: URL do preview em áudio
        coverUrl: "", // TODO: capa do beat
        purchaseUrl: "", // TODO: link de checkout (BeatStars/Airbit/Stripe/etc.)
    },
    {
        id: "vidro-fosco",
        name: "VIDRO FOSCO",
        bpm: 128,
        key: "F minor",
        mood: "Dark Lo-Fi",
        mp3Price: 40,
        wavPrice: 90,
        exclusivePrice: 350,
        previewUrl: "",
        coverUrl: "",
        purchaseUrl: "",
    },
    {
        id: "insonia",
        name: "INSÔNIA",
        bpm: 150,
        key: "A minor",
        mood: "Atmospheric Trap",
        mp3Price: 45,
        wavPrice: 95,
        exclusivePrice: 380,
        previewUrl: "",
        coverUrl: "",
        purchaseUrl: "",
    },
    {
        id: "concreto",
        name: "CONCRETO",
        bpm: 134,
        key: "D minor",
        mood: "Moody Boom-Bap",
        mp3Price: 40,
        wavPrice: 90,
        exclusivePrice: 350,
        previewUrl: "",
        coverUrl: "",
        purchaseUrl: "",
    },
    {
        id: "ultima-luz",
        name: "ÚLTIMA LUZ",
        bpm: 142,
        key: "G# minor",
        mood: "Melancholic Trap",
        mp3Price: 45,
        wavPrice: 95,
        exclusivePrice: 380,
        previewUrl: "",
        coverUrl: "",
        purchaseUrl: "",
    },
];

// Beat em destaque na Home. TODO: trocar manualmente conforme lançamentos.
export const featuredBeat = beats[0];

// TODO: quando a loja (BeatStars/Airbit) estiver pronta, considere
// substituir esta lista por um embed, ex:
// <iframe src="https://player.beatstars.com/?storeId=XXXX" ... />