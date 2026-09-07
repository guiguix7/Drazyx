import { createContext, useContext, useEffect, useRef, useState } from "react";

/**
 * Provider simples baseado em HTML5 Audio (sem backend, sem lib externa).
 * Garante que apenas um preview toque por vez em todo o site.
 * Uso: const { playingId, progress, toggle } = useAudioPlayer();
 */
const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
    const audioRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);
    const [progress, setProgress] = useState(0); // 0–1
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = new Audio();
        audioRef.current = audio;

        const onTime = () => {
            if (audio.duration) setProgress(audio.currentTime / audio.duration);
        };
        const onLoaded = () => setDuration(audio.duration || 0);
        const onEnd = () => {
            setPlayingId(null);
            setProgress(0);
        };

        audio.addEventListener("timeupdate", onTime);
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("ended", onEnd);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", onTime);
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("ended", onEnd);
        };
    }, []);

    const toggle = (id, url) => {
        const audio = audioRef.current;
        if (!audio || !url) return; // sem previewUrl ainda: não faz nada

        if (playingId === id) {
            audio.pause();
            setPlayingId(null);
            return;
        }

        if (audio.src !== url) {
            audio.src = url;
        }
        audio
            .play()
            .then(() => setPlayingId(id))
            .catch(() => setPlayingId(null));
    };

    return (
        <AudioPlayerContext.Provider value={{ playingId, progress, duration, toggle }}>
            {children}
        </AudioPlayerContext.Provider>
    );
}

// O hook compartilha o contexto usado pelo provider neste módulo.
// eslint-disable-next-line react-refresh/only-export-components
export function useAudioPlayer() {
    const ctx = useContext(AudioPlayerContext);
    if (!ctx) throw new Error("useAudioPlayer deve ser usado dentro de AudioPlayerProvider");
    return ctx;
}