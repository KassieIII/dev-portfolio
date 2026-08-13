"use client";

import { Circle, Download, Eraser, Minus, Pencil, Redo2, RotateCcw, Square, Undo2 } from "lucide-react";
import { PointerEvent, useEffect, useRef, useState } from "react";

const colors = ["#17111f", "#ffffff", "#7c3fc2", "#b46cff", "#ef5d9a", "#ff425c", "#ff9d3d", "#ffd84b", "#55d37c", "#20c7ba", "#43a5ff", "#2355ce", "#795548", "#8a8f98", "#f0a6ff", "#6d28a8"];
type Tool = "brush" | "line" | "rect" | "ellipse" | "eraser";

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false), origin = useRef({ x: 0, y: 0 }), base = useRef<ImageData | null>(null);
  const [color, setColor] = useState(colors[2]), [size, setSize] = useState(7), [opacity, setOpacity] = useState(100), [tool, setTool] = useState<Tool>("brush"), [fill, setFill] = useState(false);
  const [undo, setUndo] = useState<string[]>([]), [redo, setRedo] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect(), ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * ratio); canvas.height = Math.floor(rect.height * ratio);
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.scale(ratio, ratio); ctx.fillStyle = "#fbf8ff"; ctx.fillRect(0, 0, rect.width, rect.height); ctx.lineCap = "round"; ctx.lineJoin = "round";
  }, []);

  function point(event: PointerEvent<HTMLCanvasElement>) { const rect = event.currentTarget.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; }
  function snapshot() { const canvas = canvasRef.current; if (canvas) setUndo((items) => [...items.slice(-24), canvas.toDataURL()]); setRedo([]); }
  function style(ctx: CanvasRenderingContext2D) { ctx.globalAlpha = opacity / 100; ctx.strokeStyle = tool === "eraser" ? "#fbf8ff" : color; ctx.fillStyle = color; ctx.lineWidth = size; }
  function start(event: PointerEvent<HTMLCanvasElement>) {
    snapshot(); drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId);
    const ctx = event.currentTarget.getContext("2d"), p = point(event); if (!ctx) return;
    origin.current = p; base.current = ctx.getImageData(0, 0, event.currentTarget.width, event.currentTarget.height); style(ctx); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    if (tool === "brush" || tool === "eraser") { ctx.lineTo(p.x + .01, p.y + .01); ctx.stroke(); }
  }
  function draw(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return; const canvas = event.currentTarget, ctx = canvas.getContext("2d"), p = point(event); if (!ctx) return; style(ctx);
    if (tool === "brush" || tool === "eraser") { ctx.lineTo(p.x, p.y); ctx.stroke(); return; }
    if (base.current) ctx.putImageData(base.current, 0, 0); ctx.beginPath(); const o = origin.current;
    if (tool === "line") { ctx.moveTo(o.x, o.y); ctx.lineTo(p.x, p.y); }
    if (tool === "rect") ctx.rect(o.x, o.y, p.x - o.x, p.y - o.y);
    if (tool === "ellipse") ctx.ellipse((o.x + p.x) / 2, (o.y + p.y) / 2, Math.abs(p.x - o.x) / 2, Math.abs(p.y - o.y) / 2, 0, 0, Math.PI * 2);
    fill && tool !== "line" ? ctx.fill() : ctx.stroke();
  }
  function restore(url: string) { const canvas = canvasRef.current, ctx = canvas?.getContext("2d"); if (!canvas || !ctx) return; const img = new window.Image(); img.onload = () => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0, canvas.width, canvas.height); ctx.restore(); }; img.src = url; }
  function undoOnce() { const last = undo.at(-1), canvas = canvasRef.current; if (!last || !canvas) return; setRedo((items) => [...items, canvas.toDataURL()]); setUndo((items) => items.slice(0, -1)); restore(last); }
  function redoOnce() { const last = redo.at(-1), canvas = canvasRef.current; if (!last || !canvas) return; setUndo((items) => [...items, canvas.toDataURL()]); setRedo((items) => items.slice(0, -1)); restore(last); }
  function clear() { snapshot(); const canvas = canvasRef.current, ctx = canvas?.getContext("2d"); if (!canvas || !ctx) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = "#fbf8ff"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.restore(); }
  function download() { const canvas = canvasRef.current; if (!canvas) return; const link = document.createElement("a"); link.download = "ky-os-artwork.png"; link.href = canvas.toDataURL("image/png"); link.click(); }
  const tools: [Tool, typeof Pencil, string][] = [["brush", Pencil, "Brush"], ["line", Minus, "Line"], ["rect", Square, "Rectangle"], ["ellipse", Circle, "Ellipse"], ["eraser", Eraser, "Eraser"]];

  return <div className="paint-app">
    <div className="paint-toolbar">
      <div className="paint-tools">{tools.map(([id, Icon, label]) => <button title={label} aria-label={label} className={tool === id ? "active" : ""} onClick={() => setTool(id)} key={id}><Icon size={15} /></button>)}</div>
      <div className="paint-palette">{colors.map((item) => <button key={item} aria-label={`Use ${item}`} className={color === item ? "active" : ""} style={{ background: item }} onClick={() => { setColor(item); setTool("brush"); }} />)}<input aria-label="Custom color" type="color" value={color} onChange={(event) => setColor(event.target.value)} /></div>
      <label>Size <input type="range" min="1" max="42" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <label>Opacity <input type="range" min="10" max="100" value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} /></label>
      <button className={fill ? "active" : ""} onClick={() => setFill((value) => !value)}>Fill</button>
      <button onClick={undoOnce} disabled={!undo.length}><Undo2 size={15} /></button><button onClick={redoOnce} disabled={!redo.length}><Redo2 size={15} /></button>
      <button onClick={clear}><RotateCcw size={15} /> Clear</button><button onClick={download}><Download size={15} /> Save</button>
    </div>
    <canvas ref={canvasRef} onPointerDown={start} onPointerMove={draw} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} aria-label="Interactive paint canvas" />
  </div>;
}
