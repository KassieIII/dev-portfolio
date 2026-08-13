"use client";

import { Flag, RotateCcw, Sparkles, Timer, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; adjacent: number };
const modes = { Easy: { rows: 9, cols: 9, mines: 10 }, Medium: { rows: 12, cols: 12, mines: 24 }, Hard: { rows: 16, cols: 16, mines: 48 } } as const;
type Mode = keyof typeof modes;

function build(mode: Mode, safe?: number) {
  const { rows, cols, mines } = modes[mode];
  const cells: Cell[] = Array.from({ length: rows * cols }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }));
  const blocked = new Set<number>(safe == null ? [] : [safe, safe - 1, safe + 1, safe - cols, safe + cols]);
  let placed = 0;
  while (placed < mines) { const index = Math.floor(Math.random() * cells.length); if (!cells[index].mine && !blocked.has(index)) { cells[index].mine = true; placed++; } }
  for (let index = 0; index < cells.length; index++) {
    const row = Math.floor(index / cols), col = index % cols;
    cells[index].adjacent = [-1,0,1].flatMap((dr) => [-1,0,1].map((dc) => [row+dr,col+dc])).filter(([r,c]) => r >= 0 && r < rows && c >= 0 && c < cols && cells[r*cols+c].mine).length;
  }
  return cells;
}

export default function MinesweeperApp() {
  const [mode, setMode] = useState<Mode>("Easy");
  const [cells, setCells] = useState<Cell[]>(() => build("Easy"));
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [lost, setLost] = useState(false);
  const config = modes[mode];
  const won = useMemo(() => !lost && started && cells.every((cell) => cell.mine || cell.revealed), [cells, lost, started]);
  useEffect(() => { if (!started || lost || won) return; const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [started, lost, won]);

  function restart(next = mode) { setMode(next); setCells(build(next)); setStarted(false); setSeconds(0); setLost(false); }
  function reveal(index: number) {
    if (lost || won || cells[index].flagged) return;
    let next = cells.map((cell) => ({ ...cell }));
    if (!started) { next = build(mode, index); setStarted(true); }
    if (next[index].mine) { next.forEach((cell) => { if (cell.mine) cell.revealed = true; }); setLost(true); setCells(next); return; }
    const queue = [index], seen = new Set<number>();
    while (queue.length) { const current = queue.shift()!; if (seen.has(current)) continue; seen.add(current); const cell = next[current]; if (cell.flagged || cell.mine) continue; cell.revealed = true; if (!cell.adjacent) { const row=Math.floor(current/config.cols), col=current%config.cols; for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){const r=row+dr,c=col+dc;if(r>=0&&r<config.rows&&c>=0&&c<config.cols) queue.push(r*config.cols+c);} } }
    setCells(next);
  }
  function flag(event: React.MouseEvent, index: number) { event.preventDefault(); if (lost || won || cells[index].revealed) return; setCells((items) => items.map((cell, cellIndex) => cellIndex === index ? { ...cell, flagged: !cell.flagged } : cell)); }
  const flags = cells.filter((cell) => cell.flagged).length;

  return <div className="mines-app"><header><div><strong>{lost ? "Mine exploded" : won ? "Field cleared!" : "KY Mines"}</strong><span><Flag size={13} /> {config.mines - flags}<Timer size={13} /> {String(seconds).padStart(3,"0")}</span></div><div className="mine-modes">{(Object.keys(modes) as Mode[]).map((item) => <button className={mode === item ? "active" : ""} onClick={() => restart(item)} key={item}>{item}</button>)}</div><button className="mine-reset" onClick={() => restart()} aria-label="Restart"><RotateCcw size={16} /></button></header><div className="mine-board" style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${config.rows}, minmax(0, 1fr))` }}>{cells.map((cell,index) => <button key={index} onClick={() => reveal(index)} onContextMenu={(event) => flag(event,index)} className={`${cell.revealed ? "revealed" : ""} n${cell.adjacent} ${cell.mine ? "mine" : ""}`} aria-label={`Cell ${index + 1}`}>{cell.flagged && !cell.revealed ? "⚑" : cell.revealed && cell.mine ? "✹" : cell.revealed && cell.adjacent ? cell.adjacent : ""}</button>)}</div><footer>Click to reveal · right-click to flag · first move is always safe</footer>{won && <div className="mine-win" role="dialog" aria-label="You won Minesweeper"><div className="mine-confetti"><Sparkles /><Sparkles /><Sparkles /></div><Trophy size={38} /><span>FIELD CLEARED</span><h2>You won!</h2><p>{mode} completed in {seconds} seconds.</p><button onClick={() => restart()}><RotateCcw size={15} /> Play again</button></div>}</div>;
}
