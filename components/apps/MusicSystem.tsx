"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

const playlist = [
  "Die With A Smile Lady Gaga Bruno Mars", "BIRDS OF A FEATHER Billie Eilish", "Blinding Lights The Weeknd", "Espresso Sabrina Carpenter", "As It Was Harry Styles",
  "Levitating Dua Lipa", "Starboy The Weeknd Daft Punk", "Flowers Miley Cyrus", "Viva La Vida Coldplay", "Lose Control Teddy Swims",
  "APT ROSÉ Bruno Mars", "Supernova aespa", "Ditto NewJeans", "Idol YOASOBI", "Bling-Bang-Bang-Born Creepy Nuts", "Shinunoga E-Wa Fujii Kaze",
  "Last Dance Wu Bai", "The Eve Jay Chou", "Dernière danse Indila", "Alors on danse Stromae", "Papaoutai Stromae", "Je te laisserai des mots Patrick Watson",
];

export type Track = { trackId: number; trackName: string; artistName: string; artworkUrl100: string; previewUrl?: string; trackViewUrl: string };
type MusicContextValue = { tracks: Track[]; current?: Track; active: number; playing: boolean; loading: boolean; volume: number; setVolume: (value: number) => void; select: (index: number, autoplay?: boolean) => void; toggle: () => void; step: (delta: number, autoplay?: boolean) => void };
const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const continuePlaying = useRef(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(48);

  useEffect(() => {
    Promise.all(playlist.map(async (term) => {
      try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1&country=us`);
        const data = await response.json();
        return data.results?.find((item: Track) => item.previewUrl) as Track | undefined;
      } catch { return undefined; }
    })).then((items) => setTracks(items.filter(Boolean) as Track[]));
  }, []);

  useEffect(() => { if (audio.current) audio.current.volume = volume / 100; }, [volume]);
  useEffect(() => {
    if (!audio.current) return;
    audio.current.load();
    if (continuePlaying.current) audio.current.play().catch(() => setPlaying(false));
  }, [active, tracks]);

  function select(index: number, autoplay = playing) { continuePlaying.current = autoplay; setActive(index); }
  function step(delta: number, autoplay = playing) { if (tracks.length) select((active + delta + tracks.length) % tracks.length, autoplay); }
  function toggle() {
    if (!audio.current || !tracks[active]?.previewUrl) return;
    if (playing) { continuePlaying.current = false; audio.current.pause(); }
    else { continuePlaying.current = true; audio.current.play().catch(() => setPlaying(false)); }
  }

  const current = tracks[active];
  return <MusicContext.Provider value={{ tracks, current, active, playing, loading: !tracks.length, volume, setVolume, select, toggle, step }}>{children}<audio ref={audio} src={current?.previewUrl} onEnded={() => step(1, true)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} /></MusicContext.Provider>;
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used inside MusicProvider");
  return value;
}
