"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";

const initial = [
  ["♜","♞","♝","♛","♚","♝","♞","♜"],
  ["♟","♟","♟","♟","♟","♟","♟","♟"],
  ["","","","","","","",""] ,
  ["","","","","","","",""] ,
  ["","","","","","","",""] ,
  ["","","","","","","",""] ,
  ["♙","♙","♙","♙","♙","♙","♙","♙"],
  ["♖","♘","♗","♕","♔","♗","♘","♖"],
];

export default function ChessApp() {
  const [board, setBoard] = useState(initial.map((row) => [...row]));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [moves, setMoves] = useState<string[]>([]);

  function square(row: number, col: number) {
    if (!selected) {
      if (board[row][col]) setSelected([row, col]);
      return;
    }
    const [fromRow, fromCol] = selected;
    if (fromRow === row && fromCol === col) return setSelected(null);
    const next = board.map((line) => [...line]);
    const piece = next[fromRow][fromCol];
    next[row][col] = piece;
    next[fromRow][fromCol] = "";
    setBoard(next);
    setMoves((list) => [...list, `${piece} ${String.fromCharCode(97 + fromCol)}${8 - fromRow} → ${String.fromCharCode(97 + col)}${8 - row}`]);
    setSelected(null);
  }

  function reset() { setBoard(initial.map((row) => [...row])); setMoves([]); setSelected(null); }

  return (
    <div className="chess-app">
      <div className="chess-board" role="grid" aria-label="Interactive chess board">
        {board.flatMap((row, rowIndex) => row.map((piece, colIndex) => <button role="gridcell" aria-label={`${String.fromCharCode(97 + colIndex)}${8-rowIndex} ${piece || "empty"}`} className={`${(rowIndex + colIndex) % 2 ? "dark" : "light"} ${selected?.[0] === rowIndex && selected?.[1] === colIndex ? "selected" : ""}`} key={`${rowIndex}-${colIndex}`} onClick={() => square(rowIndex, colIndex)}>{piece}</button>))}
      </div>
      <aside className="chess-panel"><span>CASUAL BOARD</span><h2>Your move.</h2><p>Pick up any piece, then choose a square. This board is a playful portfolio toy rather than a rules engine.</p><button onClick={reset}><RotateCcw size={14} /> New game</button><div className="move-list">{moves.slice(-8).map((move, index) => <small key={`${move}-${index}`}>{index + 1}. {move}</small>)}</div></aside>
    </div>
  );
}
