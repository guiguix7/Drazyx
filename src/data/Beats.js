// Beats atualmente cadastrados. BPM, tom, mood e preços são os que você
// informou. previewUrl / coverUrl / purchaseUrl ainda não existem —
// ficam vazios até você integrar áudio real e um checkout (BeatStars,
// Airbit, Stripe, Mercado Pago, Pix, etc).

export const beats = [
    {
        id: "",
        name: "",
        bpm: "",
        key: "",
        mood: "",
        mp3Price: "",
        wavPrice: "",
        exclusivePrice: "",
        atmosphere: "", // TODO (opcional): 1–2 linhas de clima, ex. cena/hora/sensação
        previewUrl: "", // TODO: URL do preview em áudio
        coverUrl: "", // TODO: capa do beat
        purchaseUrl: "", // TODO: link de checkout (BeatStars/Airbit/Stripe/etc.)
    },
];

// Beat em destaque na Home. TODO: trocar manualmente conforme lançamentos.
export const featuredBeat = beats[0];

// TODO: quando a loja (BeatStars/Airbit) estiver pronta, considere
// substituir esta lista por um embed, ex:
// <iframe src="https://player.beatstars.com/?storeId=XXXX" ... />