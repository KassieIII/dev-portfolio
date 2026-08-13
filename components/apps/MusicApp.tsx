"use client";

import { ExternalLink, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useMusic } from "./MusicSystem";

export function MusicWidget({ onOpen }: { onOpen: () => void }) {
  const { current, playing, loading, toggle, step } = useMusic();
  return <aside className="music-widget widget" aria-label="Now playing"><button className="music-widget-main" onClick={onOpen}>{current?.artworkUrl100 ? <img src={current.artworkUrl100.replace("100x100", "300x300")} alt="" /> : <span className="music-widget-art">KY</span>}<span><small>NOW PLAYING</small><strong>{current?.trackName ?? (loading ? "Loading global mix…" : "KY Mix")}</strong><em>{current?.artistName ?? "Global city-pop mix"}</em></span></button><div><button onClick={() => step(-1, playing)} aria-label="Previous"><SkipBack size={15} /></button><button onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={16} /> : <Play size={16} />}</button><button onClick={() => step(1, playing)} aria-label="Next"><SkipForward size={15} /></button></div></aside>;
}

export default function MusicApp() {
  const { tracks, current, active, playing, loading, volume, setVolume, select, toggle, step } = useMusic();
  return (
    <div className="music-app">
      <section className="now-playing">
        <div className="album-art">{current ? <img src={current.artworkUrl100.replace("100x100", "600x600")} alt={`${current.trackName} cover`} /> : <div className="album-placeholder">KY<br />MIX</div>}</div>
        <span>GLOBAL KY MIX · {tracks.length || "30+"} TRACKS</span><h2>{current?.trackName ?? "Loading music…"}</h2><p>{current?.artistName ?? "English · Korean · Japanese · Chinese · French"}</p>
        <div className="player-controls"><button onClick={() => step(-1, playing)} aria-label="Previous track"><SkipBack /></button><button className="play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause /> : <Play />}</button><button onClick={() => step(1, playing)} aria-label="Next track"><SkipForward /></button></div>
        <label className="volume-line"><Volume2 size={14} /><input aria-label="Music volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ backgroundSize: `${volume}% 100%` }} /></label>
        <small>Licensed previews play here; use the arrow beside a song for its official full version. The next track starts automatically.</small>
      </section>
      <div className="track-list">{(tracks.length ? tracks : Array.from({ length: 12 }, (_, index) => ({ trackId:index, trackName: loading ? "Loading track…" : "Unavailable", artistName:"Global mix", artworkUrl100:"", trackViewUrl:"#" }))).map((track, index) => <button className={index === active ? "active" : ""} key={`${track.trackId}-${index}`} onDoubleClick={() => select(index, true)} onClick={() => select(index, playing)}><span>{String(index + 1).padStart(2,"0")}</span><div><strong>{track.trackName}</strong><small>{track.artistName}</small></div>{track.trackViewUrl !== "#" && <a href={track.trackViewUrl} target="_blank" rel="noreferrer" aria-label={`Open ${track.trackName} in iTunes`} onClick={(event) => event.stopPropagation()}><ExternalLink size={13} /></a>}</button>)}</div>
    </div>
  );
}
