"use client";

import { ExternalLink, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const playlist = [
  "Die With A Smile Lady Gaga Bruno Mars",
  "BIRDS OF A FEATHER Billie Eilish",
  "Blinding Lights The Weeknd",
  "Espresso Sabrina Carpenter",
  "As It Was Harry Styles",
  "Levitating Dua Lipa",
  "Starboy The Weeknd Daft Punk",
  "Flowers Miley Cyrus",
  "Lose Control Teddy Swims",
  "Viva La Vida Coldplay",
];

type Track = { trackId: number; trackName: string; artistName: string; artworkUrl100: string; previewUrl?: string; trackViewUrl: string };

export default function MusicApp() {
  const audio = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    Promise.all(playlist.map(async (term) => {
      try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1&country=us`);
        const data = await response.json();
        return data.results?.[0] as Track | undefined;
      } catch { return undefined; }
    })).then((items) => setTracks(items.filter(Boolean) as Track[]));
  }, []);

  useEffect(() => {
    if (!audio.current) return;
    audio.current.load();
    if (playing) audio.current.play().catch(() => setPlaying(false));
  }, [active]);

  function toggle() {
    if (!audio.current || !tracks[active]?.previewUrl) return;
    if (playing) audio.current.pause(); else audio.current.play().catch(() => setPlaying(false));
    setPlaying(!playing);
  }

  function step(delta: number) { if (tracks.length) setActive((active + delta + tracks.length) % tracks.length); }
  const current = tracks[active];

  return (
    <div className="music-app">
      <section className="now-playing">
        <div className="album-art">{current ? <img src={current.artworkUrl100.replace("100x100", "600x600")} alt={`${current.trackName} cover`} /> : <div className="album-placeholder">KY<br />MIX</div>}</div>
        <span>NOW PLAYING</span><h2>{current?.trackName ?? "Loading KY Mix…"}</h2><p>{current?.artistName ?? "10 popular tracks"}</p>
        <div className="player-controls"><button onClick={() => step(-1)} aria-label="Previous track"><SkipBack /></button><button className="play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause /> : <Play />}</button><button onClick={() => step(1)} aria-label="Next track"><SkipForward /></button></div>
        <div className="volume-line"><Volume2 size={14} /><span><i /></span></div>
        {current?.previewUrl && <audio ref={audio} src={current.previewUrl} onEnded={() => step(1)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />}
        <small>Song previews provided courtesy of iTunes.</small>
      </section>
      <div className="track-list">{(tracks.length ? tracks : playlist.map((name, index) => ({ trackId:index, trackName:name, artistName:"Loading…", artworkUrl100:"", trackViewUrl:"#" }))).map((track, index) => <button className={index === active ? "active" : ""} key={track.trackId} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2,"0")}</span><div><strong>{track.trackName}</strong><small>{track.artistName}</small></div>{track.trackViewUrl !== "#" && <a href={track.trackViewUrl} target="_blank" rel="noreferrer" aria-label={`Open ${track.trackName} in iTunes`} onClick={(event) => event.stopPropagation()}><ExternalLink size={13} /></a>}</button>)}</div>
    </div>
  );
}
