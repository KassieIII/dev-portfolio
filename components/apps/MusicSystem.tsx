"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

const playlist = [
  { term: "Die With A Smile Lady Gaga Bruno Mars", country: "us" }, { term: "BIRDS OF A FEATHER Billie Eilish", country: "us" }, { term: "Blinding Lights The Weeknd", country: "us" }, { term: "Espresso Sabrina Carpenter", country: "us" }, { term: "Viva La Vida Coldplay", country: "us" },
  { term: "Mayonaka no Door Stay With Me Miki Matsubara", country: "jp" }, { term: "Plastic Love Mariya Takeuchi", country: "jp" }, { term: "4:00 A.M. Taeko Onuki", country: "jp" }, { term: "Remember Summer Days Anri", country: "jp" }, { term: "Midnight Pretenders Tomoko Aran", country: "jp" }, { term: "Telephone Number Junko Ohashi", country: "jp" }, { term: "Idol YOASOBI", country: "jp" }, { term: "Bling-Bang-Bang-Born Creepy Nuts", country: "jp" }, { term: "Shinunoga E-Wa Fujii Kaze", country: "jp" },
  { term: "APT ROSÉ Bruno Mars", country: "kr" }, { term: "Supernova aespa", country: "kr" }, { term: "Ditto NewJeans", country: "kr" }, { term: "Dynamite BTS", country: "kr" }, { term: "Magnetic ILLIT", country: "kr" }, { term: "Love Lee AKMU", country: "kr" }, { term: "Pierrot Smiles at Us Kim Wan Sun", country: "kr" },
  { term: "The Moon Represents My Heart Teresa Teng", country: "cn" }, { term: "Red Bean Faye Wong", country: "cn" }, { term: "Fairy Tale Michael Wong", country: "cn" }, { term: "Little Lucky Hebe Tien", country: "cn" }, { term: "Actor Joker Xue", country: "cn" }, { term: "The One and Only Leehom Wang", country: "cn" }, { term: "Last Dance Wu Bai", country: "cn" },
  { term: "Dernière danse Indila", country: "fr" }, { term: "Alors on danse Stromae", country: "fr" }, { term: "Papaoutai Stromae", country: "fr" }, { term: "Je te laisserai des mots Patrick Watson", country: "fr" },
  { term: "Despacito Luis Fonsi Daddy Yankee", country: "mx" }, { term: "Bailando Enrique Iglesias", country: "mx" }, { term: "TQG Karol G Shakira", country: "mx" },
  { term: "Calm Down Rema Selena Gomez", country: "za" }, { term: "Water Tyla", country: "za" }, { term: "Love Nwantiti CKay", country: "za" },
  { term: "Alors on danse Stromae", country: "be" }, { term: "Tout l'univers Gjon's Tears", country: "ch" },
  { term: "Seni Dert Etmeler Madrigal", country: "tr" }, { term: "Simge Aşkın Olayım", country: "tr" },
  { term: "Dernière danse Indila", country: "ca" }, { term: "Jerusalema Master KG", country: "za" },
  { term: "Pedro Jaxomy Agatino Romero Raffaella Carrà", country: "it" }, { term: "Italodisco The Kolors", country: "it" },
  { term: "I Love You Like An Alcohol The Taxpayers", country: "au" }, { term: "Somebody That I Used to Know Gotye", country: "au" },
  { term: "Pedro Sampaio PocPoc", country: "br" }, { term: "Ai Se Eu Te Pego Michel Teló", country: "br" },
  { term: "Måneskin Beggin", country: "it" }, { term: "Golden Hour JVKE", country: "us" },
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
    Promise.all(playlist.map(async ({ term, country }) => {
      try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=3&country=${country}`);
        const data = await response.json();
        return data.results?.find((item: Track) => item.previewUrl) as Track | undefined;
      } catch { return undefined; }
    })).then((items) => setTracks(items.filter(Boolean) as Track[]));
  }, []);

  useEffect(() => { if (audio.current) audio.current.volume = volume / 100; }, [volume]);
  useEffect(() => {
    if (!audio.current) return;
    audio.current.load();
    if (continuePlaying.current) {
      const nextTrack = tracks[active];
      const startNext = () => audio.current?.play().catch(() => setPlaying(false));
      if (nextTrack?.previewUrl) {
        if (audio.current.readyState >= 2) startNext();
        else audio.current.addEventListener("canplay", startNext, { once: true });
      }
    }
  }, [active, tracks]);

  function select(index: number, autoplay = playing) {
    if (!tracks.length) return;
    continuePlaying.current = autoplay;
    if (index === active) {
      if (autoplay && audio.current) { audio.current.currentTime = 0; audio.current.play().catch(() => setPlaying(false)); }
      return;
    }
    setActive(index);
  }
  function step(delta: number, autoplay = playing) { if (tracks.length) select((active + delta + tracks.length) % tracks.length, autoplay); }
  function toggle() {
    if (!audio.current || !tracks[active]?.previewUrl) return;
    if (playing) { continuePlaying.current = false; audio.current.pause(); }
    else { continuePlaying.current = true; audio.current.play().catch(() => setPlaying(false)); }
  }

  const current = tracks[active];
  return <MusicContext.Provider value={{ tracks, current, active, playing, loading: !tracks.length, volume, setVolume, select, toggle, step }}>{children}<audio ref={audio} src={current?.previewUrl} preload="auto" loop={false} onEnded={() => { continuePlaying.current = true; step(1, true); }} onError={() => { if (continuePlaying.current) step(1, true); }} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} /></MusicContext.Provider>;
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used inside MusicProvider");
  return value;
}
