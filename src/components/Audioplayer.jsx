import { createContext, useContext, useEffect, useRef, useState } from "react";

/**
 * HTML5 Audio provider (no backend, no extra lib). One preview plays at a
 * time across the whole site; <MiniPlayer /> keeps it controllable while
 * the visitor browses other pages.
 * Use: const { playingId, progress, toggle } = useAudioPlayer();
 */
const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
    const audioRef = useRef(null);
    const urlRef = useRef("");
    const [current, setCurrent] = useState(null); // { id, title }
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0–1
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = new Audio();
        audio.preload = "none";
        audioRef.current = audio;

        const onTime = () => {
            if (audio.duration) setProgress(audio.currentTime / audio.duration);
        };
        const onLoaded = () => setDuration(audio.duration || 0);
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        const onEnd = () => {
            setPlaying(false);
            setProgress(0);
        };
        const onError = () => {
            setPlaying(false);
            setCurrent(null);
        };

        audio.addEventListener("timeupdate", onTime);
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnd);
        audio.addEventListener("error", onError);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", onTime);
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnd);
            audio.removeEventListener("error", onError);
        };
    }, []);

    const toggle = (id, url, title = "") => {
        const audio = audioRef.current;
        if (!audio || !url) return; // no previewUrl yet: nothing to play

        if (current?.id === id) {
            if (playing) audio.pause();
            else audio.play().catch(() => setPlaying(false));
            return;
        }

        if (urlRef.current !== url) {
            audio.src = url;
            urlRef.current = url;
        }
        setCurrent({ id, title });
        setProgress(0);
        audio.play().catch(() => setPlaying(false));
    };

    const stop = () => {
        const audio = audioRef.current;
        if (audio) audio.pause();
        urlRef.current = "";
        setCurrent(null);
        setProgress(0);
    };

    const playingId = playing && current ? current.id : null;

    return (
        <AudioPlayerContext.Provider value={{ current, playingId, progress, duration, toggle, stop }}>
            {children}
        </AudioPlayerContext.Provider>
    );
}

// The hook shares the context created by the provider in this module.
// eslint-disable-next-line react-refresh/only-export-components
export function useAudioPlayer() {
    const ctx = useContext(AudioPlayerContext);
    if (!ctx) throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
    return ctx;
}
