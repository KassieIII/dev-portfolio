"use client";

import { Chess, Move, PieceSymbol, Square } from "chess.js";
import { BrainCircuit, RotateCcw, Undo2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const glyphs: Record<"w" | "b", Record<PieceSymbol, string>> = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};

const value: Record<PieceSymbol, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

function evaluate(game: Chess) {
  if (game.isCheckmate()) return game.turn() === "w" ? -99999 : 99999;
  return game.board().flat().reduce((score, piece) => score + (piece ? value[piece.type] * (piece.color === "w" ? 1 : -1) : 0), 0);
}

function minimax(game: Chess, depth: number, alpha: number, beta: number): number {
  if (!depth || game.isGameOver()) return evaluate(game);
  const maximizing = game.turn() === "w";
  let best = maximizing ? -Infinity : Infinity;
  for (const move of game.moves()) {
    game.move(move);
    const score = minimax(game, depth - 1, alpha, beta);
    game.undo();
    if (maximizing) { best = Math.max(best, score); alpha = Math.max(alpha, score); }
    else { best = Math.min(best, score); beta = Math.min(beta, score); }
    if (beta <= alpha) break;
  }
  return best;
}

function engineMove(game: Chess, depth = 2) {
  const moves = game.moves({ verbose: true });
  let best: Move | null = null;
  let bestScore = game.turn() === "w" ? -Infinity : Infinity;
  for (const move of moves) {
    game.move(move);
    const score = minimax(game, depth - 1, -Infinity, Infinity) + (Math.random() - .5) * 2;
    game.undo();
    if ((game.turn() === "w" && score > bestScore) || (game.turn() === "b" && score < bestScore)) { best = move; bestScore = score; }
  }
  return best;
}

export default function ChessApp() {
  const game = useRef(new Chess());
  const [fen, setFen] = useState(game.current.fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const legal = useMemo(() => selected ? game.current.moves({ square: selected, verbose: true }).map((move) => move.to) : [], [selected, fen]);

  useEffect(() => {
    if (game.current.turn() !== "b" || game.current.isGameOver()) return;
    setThinking(true);
    const timer = window.setTimeout(() => {
      const move = engineMove(game.current, 2);
      if (move) game.current.move(move);
      setFen(game.current.fen());
      setHistory(game.current.history());
      setThinking(false);
    }, 430);
    return () => window.clearTimeout(timer);
  }, [fen]);

  function clickSquare(square: Square) {
    if (thinking || game.current.turn() !== "w" || game.current.isGameOver()) return;
    const piece = game.current.get(square);
    if (!selected) { if (piece?.color === "w") setSelected(square); return; }
    if (piece?.color === "w") { setSelected(square); return; }
    try {
      game.current.move({ from: selected, to: square, promotion: "q" });
      setFen(game.current.fen());
      setHistory(game.current.history());
      setSelected(null);
    } catch { setSelected(null); }
  }

  function reset() { game.current.reset(); setFen(game.current.fen()); setHistory([]); setSelected(null); setThinking(false); }
  function undo() {
    if (thinking) return;
    game.current.undo();
    if (game.current.turn() === "b") game.current.undo();
    setFen(game.current.fen()); setHistory(game.current.history()); setSelected(null);
  }

  const status = game.current.isCheckmate() ? (game.current.turn() === "w" ? "Engine wins" : "You win") : game.current.isDraw() ? "Draw" : thinking ? "Engine is thinking…" : game.current.isCheck() ? "Check — your move" : "Your move";

  return (
    <div className="chess-app">
      <div className="chess-board" role="grid" aria-label="Chess board with legal moves">
        {game.current.board().flatMap((row, rowIndex) => row.map((piece, colIndex) => {
          const square = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}` as Square;
          return <button role="gridcell" aria-label={`${square} ${piece?.type ?? "empty"}`} className={`${(rowIndex + colIndex) % 2 ? "dark" : "light"} ${selected === square ? "selected" : ""} ${legal.includes(square) ? "legal" : ""}`} key={square} onClick={() => clickSquare(square)}>{piece ? glyphs[piece.color][piece.type] : ""}<small>{colIndex === 0 ? 8 - rowIndex : ""}{rowIndex === 7 ? String.fromCharCode(97 + colIndex) : ""}</small></button>;
        }))}
      </div>
      <aside className="chess-panel"><span><BrainCircuit size={13} /> KY CHESS ENGINE · ALPHA-BETA</span><h2>{status}</h2><p>Полные правила шахмат: рокировка, взятие на проходе, шах, мат и превращение пешки. За чёрных играет встроенный minimax-движок.</p><div className="chess-actions"><button onClick={reset}><RotateCcw size={14} /> New game</button><button onClick={undo} disabled={!history.length}><Undo2 size={14} /> Undo</button></div><div className="move-list">{history.length ? history.slice(-12).map((move, index) => <small key={`${move}-${index}`}>{Math.max(1, Math.ceil((history.length - Math.min(12, history.length) + index + 1) / 2))}{(history.length - Math.min(12, history.length) + index) % 2 ? "…" : "."} {move}</small>) : <small>No moves yet</small>}</div></aside>
    </div>
  );
}
