"use client";

import { Download, Eraser, RotateCcw } from "lucide-react";
import { PointerEvent, useEffect, useRef, useState } from "react";

const colors = ["#211436", "#7c3fc2", "#c58cff", "#ef5d9a", "#ffffff", "#38c788", "#f0b34d"];

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [color, setColor] = useState(colors[1]);
  const [size, setSize] = useState(7);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const snapshot = document.createElement("canvas");
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      snapshot.getContext("2d")?.drawImage(canvas, 0, 0);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.fillStyle = "#fbf8ff";
      context.fillRect(0, 0, rect.width, rect.height);
      if (snapshot.width) context.drawImage(snapshot, 0, 0, snapshot.width, snapshot.height, 0, 0, rect.width, rect.height);
      context.lineCap = "round";
      context.lineJoin = "round";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function start(event: PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const context = event.currentTarget.getContext("2d");
    const p = point(event);
    if (!context) return;
    context.beginPath();
    context.moveTo(p.x, p.y);
  }

  function draw(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const context = event.currentTarget.getContext("2d");
    const p = point(event);
    if (!context) return;
    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineTo(p.x, p.y);
    context.stroke();
  }

  function clear() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = "#fbf8ff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "ky-os-sketch.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="paint-app">
      <div className="paint-toolbar">
        <div className="paint-palette">{colors.map((item) => <button key={item} aria-label={`Use ${item}`} className={color === item ? "active" : ""} style={{ background: item }} onClick={() => setColor(item)} />)}</div>
        <label>Brush <input type="range" min="2" max="28" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <button onClick={() => setColor("#fbf8ff")}><Eraser size={15} /> Eraser</button>
        <button onClick={clear}><RotateCcw size={15} /> Clear</button>
        <button onClick={download}><Download size={15} /> Save</button>
      </div>
      <canvas ref={canvasRef} onPointerDown={start} onPointerMove={draw} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} aria-label="Interactive paint canvas" />
    </div>
  );
}
